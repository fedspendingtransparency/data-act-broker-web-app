/**
 * QuarterFilterContainer.jsx
 * Created by Lizzie Salita 10/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as DashboardHelper from 'helpers/dashboardHelper';
import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import QuarterPicker from 'components/dashboard/filters/QuarterPicker';

const propTypes = {
    updateFilterSet: PropTypes.func,
    selectedFilters: PropTypes.object
};

export class QuarterFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latestQuarter: 0,
            latestYear: 0,
            disabledQuarters: [false, false, false, false]
        };

        this.pickedQuarter = this.pickedQuarter.bind(this);
    }

    componentDidMount() {
        this.getLatestQuarter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedFilters.fy !== prevProps.selectedFilters.fy) {
            this.getDisabledStatus();
            this.removeDisabledSelections();
        }
    }

    getLatestQuarter() {
        DashboardHelper.fetchQuarterlyRevalidationThreshold()
            .then((data) => {
                const allFy = [];
                for (let i = data.year; i >= 2017; i--) {
                    allFy.push(i);
                }
                this.setState({
                    latestQuarter: data.quarter,
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

    removeDisabledSelections() {
        // Remove Q1 if FY 2017 is the only FY selected
        const selectedFy = this.props.selectedFilters.fy.toArray();
        const justFy17 = selectedFy.length === 1 && selectedFy[0] === 2017;
        const q1Selected = this.props.selectedFilters.quarters.includes(1);
        if (justFy17 && q1Selected) {
            this.pickedQuarter(1);
        }

        // Remove future quarters if only the current FY is selected
        const justCurrentFy = selectedFy.length === 1 && selectedFy[0] === this.state.latestYear;
        if (justCurrentFy) {
            this.props.selectedFilters.quarters.forEach((quarter) => {
                if (quarter > this.state.latestQuarter) {
                    this.pickedQuarter(quarter);
                }
            });
        }
    }

    pickedQuarter(quarter) {
        this.props.updateFilterSet('historical', 'quarters', quarter);
    }

    render() {
        return (
            <QuarterPicker
                pickedQuarter={this.pickedQuarter}
                selectedQuarters={this.props.selectedFilters.quarters.toArray()}
                disabledQuarters={this.state.disabledQuarters} />
        );
    }
}

QuarterFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.historical
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch)
)(QuarterFilterContainer);
