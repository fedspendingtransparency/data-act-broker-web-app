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
    updateGenericFilter: PropTypes.func,
    selectedFilters: PropTypes.object
};

export class FyFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latestQuarter: 0,
            latestYear: 0,
            allFy: []
        };

        this.pickedFy = this.pickedFy.bind(this);
    }

    componentDidMount() {
        this.getLatestQuarter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedFilters.quarters !== prevProps.selectedFilters.quarters) {
            this.generateAllFy();
            this.removeDisabledSelections();
        }
    }

    getLatestQuarter() {
        DashboardHelper.fetchQuarterlyRevalidationThreshold()
            .then((data) => {
                this.setState({
                    latestQuarter: data.quarter,
                    latestYear: data.year
                }, () => this.generateAllFy());
            })
            .catch((err) => {
                console.error(err);
            });
    }

    pickedFy(year) {
        this.props.updateGenericFilter('fy', year);
    }

    generateAllFy() {
        const allFy = [];
        const selectedQuarters = this.props.selectedFilters.quarters.toArray();
        for (let i = this.state.latestYear; i >= 2017; i--) {
            let disabled = false;
            // Reporting began Q2 2017, so disable FY 17 if only Q1 is selected
            if (selectedQuarters.length === 1 && selectedQuarters[0] === 1) {
                disabled = (i === 2017);
            }
            // Disable the current year if the only quarters selected are greater
            // than the latest possible quarter that could have been certified in
            // the current year
            else if (i === this.state.latestYear && selectedQuarters.length > 0) {
                disabled = selectedQuarters.every((quarter) => quarter > this.state.latestQuarter);
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
        // remove FY 2017 if Q1 is the only quarter selected
        const selectedQuarters = this.props.selectedFilters.quarters.toArray();
        const justQ1 = (selectedQuarters.length === 1 && selectedQuarters[0] === 1);
        const fy17Selected = this.props.selectedFilters.fy.includes(2017);
        if (justQ1 && fy17Selected) {
            this.pickedFy(2017);
        }

        // remove the current FY if only future quarters are selected
        const selectedFutureQuarters = selectedQuarters.filter((quarter) => quarter > this.state.latestQuarter);
        const justFutureQuarters = _.isEqual(selectedQuarters, selectedFutureQuarters) && selectedQuarters.length > 0;
        const currentFySelected = this.props.selectedFilters.fy.includes(this.state.latestYear);
        if (justFutureQuarters && currentFySelected) {
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
        selectedFilters: state.dashboardFilters
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch),
)(FyFilterContainer);
