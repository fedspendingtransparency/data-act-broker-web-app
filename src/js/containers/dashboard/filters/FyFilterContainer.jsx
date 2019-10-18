/**
 * FyFilterContainer.jsx
 * Created by Lizzie Salita 10/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import * as DashboardHelper from 'helpers/dashboardHelper';
import FiscalYearFilter from 'components/dashboard/filters/FiscalYearFilter';

const propTypes = {
    updateGenericFilter: PropTypes.func,
    selectedFiscalYears: PropTypes.object
};

export class FyFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quarter: 0,
            year: 0,
            allFy: []
        };

        this.pickedFy = this.pickedFy.bind(this);
    }

    componentDidMount() {
        this.getLatestQuarter();
    }

    getLatestQuarter() {
        DashboardHelper.fetchQuarterlyRevalidationThreshold()
            .then((data) => {
                const allFy = [];
                for (let i = data.year; i >= 2017; i--) {
                    allFy.push(i);
                }
                this.setState({
                    quarter: data.quarter,
                    year: data.year,
                    allFy
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    pickedFy(year) {
        this.props.updateGenericFilter('fy', year);
    }

    render() {
        return (
            <FiscalYearFilter
                pickedFy={this.pickedFy}
                selectedFY={this.props.selectedFiscalYears.toArray()}
                allFy={this.state.allFy} />
        );
    }
}

FyFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFiscalYears: state.dashboardFilters.fy
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch),
)(FyFilterContainer);
