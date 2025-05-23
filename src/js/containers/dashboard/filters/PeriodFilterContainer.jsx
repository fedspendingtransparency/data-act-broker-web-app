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
    updateGenericFilter: PropTypes.func,
    selectedFilters: PropTypes.object
};

const periodList = ['Q1', 2, 3, 'Q2', 4, 5, 6, 'Q3', 7, 8, 9, 'Q4', 10, 11, 12];

export class PeriodFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latestPeriod: 0,
            latestYear: 0,
            disabledPeriods: periodList.map(() => '')
        };

        this.pickedPeriod = this.pickedPeriod.bind(this);
        this.removePeriod = this.removePeriod.bind(this);
        this.getDisabledStatus = this.getDisabledStatus.bind(this);
    }

    componentDidMount() {
        this.getLatestPeriod();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedFilters.fy !== prevProps.selectedFilters.fy) {
            this.getDisabledStatus();
        }
    }

    getLatestPeriod() {
        DashboardHelper.fetchLatestPublicationPeriod()
            .then((res) => {
                const data = res.data;
                const allFy = [];
                for (let i = data.year; i >= 2017; i--) {
                    allFy.push(i);
                }
                this.setState({
                    latestPeriod: data.period,
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
        const disabledPeriods = periodList.map((period) =>
            DashboardHelper.isPeriodDisabled(period, selectedFy, this.state.latestPeriod, this.state.latestYear)
        );
        this.setState({
            disabledPeriods
        });
    }

    pickedPeriod(period) {
        this.props.updateGenericFilter('historical', 'period', period);
    }

    removePeriod() {
        this.pickedPeriod(this.props.selectedFilters.period);
    }

    render() {
        let selectedPeriod = null;
        if (this.props.selectedFilters.period !== null) {
            let label = this.props.selectedFilters.period;
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
                    periodArray={periodList}
                    pickedPeriod={this.pickedPeriod}
                    type="historicDashboard"
                    latestYear={this.state.latestYear}
                    disabledPeriods={this.state.disabledPeriods} />
                {selectedPeriod}
            </div>
        );
    }
}

PeriodFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.historical
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch)
)(PeriodFilterContainer);
