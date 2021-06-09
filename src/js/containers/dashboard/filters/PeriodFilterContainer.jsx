/**
 * PeriodFilterContainer.jsx
 * Created by Alisa Burdeyny 06/07/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as DashboardHelper from 'helpers/dashboardHelper';
import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import PeriodPicker from 'components/generateDetachedFiles/PeriodPicker';
import ShownValue from 'components/dashboard/filters/ShownValue';

const propTypes = {
    updateFilterSet: PropTypes.func,
    selectedFilters: PropTypes.object
};

export class PeriodFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latestPeriod: 0,
            latestYear: 0,
            disabledQuarters: [false, false, false, false]
        };

        this.pickedQuarter = this.pickedQuarter.bind(this);
        this.removePeriod = this.removePeriod.bind(this);
    }

    componentDidMount() {
        this.getLatestQuarter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedFilters.fy !== prevProps.selectedFilters.fy) {
            this.getDisabledStatus();
        }
    }

    getLatestQuarter() {
        DashboardHelper.fetchLatestPublicationPeriod()
            .then((data) => {
                const allFy = [];
                for (let i = data.year; i >= 2017; i--) {
                    allFy.push(i);
                }
                this.setState({
                    latestQuarter: Math.floor(data.period / 3),
                    latestYear: data.year,
                    allFy
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getDisabledStatus() {
        const selectedFy = this.props.selectedFilters.fy.toArray();
        if (selectedFy.length === 1) {
            // If only the current FY is selected, disable any quarters after the latest
            // possible quarter that could have been certified in the current year
            if (selectedFy[0] === this.state.latestYear) {
                const disabledQuarters = this.state.disabledQuarters.map((quarter, i) => i + 1 > this.state.latestQuarter);
                this.setState({
                    disabledQuarters
                });
            }
            else {
                // Reporting began Q2 2017, so disable Q1 if 2017 is the only FY selected
                this.setState({
                    disabledQuarters: [selectedFy[0] === 2017, false, false, false]
                });
            }
        }
        else {
            this.setState({
                disabledQuarters: [false, false, false, false]
            });
        }
    }

    pickedQuarter(quarter) {
        this.props.updateGenericFilter('historical', 'quarters', quarter);
    }

    removePeriod() {
        this.pickedQuarter(this.props.selectedFilters.quarters);
    }

    render() {
        let selectedPeriod = null;
        if (this.props.selectedFilters.quarters !== null) {
            let label = this.props.selectedFilters.quarters;
            if (typeof label !== 'string') {
                label = label === 2 ? 'P01/P02' : `P${label.toString().padStart(2, '0')}`;
            }
            selectedPeriod = (
                <div className="selected-filters">
                    <ShownValue
                        label={label}
                        removeValue={this.removePeriod} />
                </div>
            );
        }
        return (
            <div className="historical-dashboard-period-picker">
                <PeriodPicker
                    period={null}
                    periodArray={['Q1', 2, 3, 'Q2', 4, 5, 6, 'Q3', 7, 8, 9, 'Q4', 10, 11, 12]}
                    pickedPeriod={this.pickedQuarter}
                    type="historicDashboard" />
                {selectedPeriod}
            </div>
        )
    }
}

PeriodFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.historical
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch)
)(PeriodFilterContainer);
