/**
 * FyFilterContainer.jsx
 * Created by Lizzie Salita 10/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import * as DashboardHelper from 'helpers/dashboardHelper';
import FiscalYearFilter from 'components/dashboard/filters/FiscalYearFilter';

const propTypes = {
    updateFilterSet: PropTypes.func,
    selectedFilters: PropTypes.object
};

export class FyFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latestPeriod: 0,
            latestYear: 0,
            allFy: []
        };

        this.pickedFy = this.pickedFy.bind(this);
    }

    componentDidMount() {
        this.getLatestPeriod();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedFilters.period !== prevProps.selectedFilters.period) {
            this.generateAllFy();
            this.removeDisabledSelections();
        }
    }

    getLatestPeriod() {
        DashboardHelper.fetchLatestPublicationPeriod()
            .then((data) => {
                this.setState({
                    latestPeriod: data.period,
                    latestYear: data.year
                }, () => this.generateAllFy());
            })
            .catch((err) => {
                console.error(err);
            });
    }

    pickedFy(year) {
        this.props.updateFilterSet('historical', 'fy', year);
    }

    generateAllFy() {
        const allFy = [];
        // get the max selected period. If a quarter is selected, check the minimum period in that quarter
        let selectedPeriod = null;
        if(this.props.selectedFilters.period !== null) {
            selectedPeriod = Math.min(...DashboardHelper.getPeriodListFromFilter(this.props.selectedFilters.period));
        }

        for (let i = this.state.latestYear; i >= 2017; i--) {
            let disabled = false;
            // Reporting began Q2 2017, so disable FY 17 if P02, P03, or Q1 is selected
            if (selectedPeriod !== null && selectedPeriod <= 3) {
                disabled = (i === 2017);
            }
            // Disable the current year if the only period selected is greater than the latest possible period that
            // could have been certified in the current year
            else if (i === this.state.latestYear && selectedPeriod !== null) {
                disabled = selectedPeriod > this.state.latestPeriod;
            }
            allFy.push({
                year: i,
                disabled
            });
        }
        this.setState({
            allFy
        });
    }

    removeDisabledSelections() {
        // remove FY 2017 if P02, P03, or Q1 is selected
        const selectedPeriod = typeof this.props.selectedFilters.period === 'string' ?
            parseInt(this.props.selectedFilters.period.substring(1), 10) * 3 : this.props.selectedFilters.period;
        const justQ1 = (selectedPeriod !== null && selectedPeriod <= 3);
        const fy17Selected = this.props.selectedFilters.fy.includes(2017);
        if (justQ1 && fy17Selected) {
            this.pickedFy(2017);
        }

        // remove the current FY if a future period is selected
        const selectedFuturePeriod = selectedPeriod !== null && selectedPeriod > this.state.latestPeriod;
        const currentFySelected = this.props.selectedFilters.fy.includes(this.state.latestYear);
        if (selectedFuturePeriod && currentFySelected) {
            this.pickedFy(this.state.latestYear);
        }
    }

    render() {
        return (
            <FiscalYearFilter
                pickedFy={this.pickedFy}
                selectedFY={this.props.selectedFilters.fy.toArray()}
                allFy={this.state.allFy} />
        );
    }
}

FyFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.historical
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch)
)(FyFilterContainer);
