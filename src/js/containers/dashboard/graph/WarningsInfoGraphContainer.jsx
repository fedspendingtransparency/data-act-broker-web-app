/**
 * WarningsInfoGraphContainer.jsx
 * Created by Lizzie Salita 11/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import * as DashboardHelper from 'helpers/dashboardHelper';
import WarningsInfoGraph from 'components/dashboard/graph/WarningsInfoGraph';

const propTypes = {
    appliedFilters: PropTypes.object
};

export class WarningsInfoGraphContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            groups: [],
            xSeries: [],
            ySeries: [],
            allY: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.appliedFilters, this.props.appliedFilters)) {
            this.fetchData();
        }
    }

    fetchData() {
        this.setState({
            loading: true,
            error: false
        });

        // Format the API params
        const apiParams = {
            filters: {
                fys: this.props.appliedFilters.fy.toArray(),
                quarters: this.props.appliedFilters.quarters.toArray(),
                agencies: [this.props.appliedFilters.agency],
                files: [this.props.appliedFilters.file],
                rules: this.props.appliedFilters.rules.toArray()
            }
        };

        DashboardHelper.fetchWarnings(apiParams)
            .then((res) => {
                this.parseData(res);
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    parseData(data) {
        const groups = []; // Fiscal Quarter labels
        const xSeries = []; // Fiscal Quarter values
        const ySeries = []; // Total Warnings values
        const yData = []; // Warnings by Rule
        const allY = [];

        // For now, only one file at a time
        const file = data[this.props.appliedFilters.file];

        file.forEach((submission) => {
            const timePeriodLabel = `FY ${submission.fy - 2000} / Q${submission.quarter}`;
            groups.push(timePeriodLabel);
            xSeries.push(timePeriodLabel);
            ySeries.push([submission.total_warnings]);
            yData.push(submission.warnings);
            allY.push(submission.total_warnings);
        });

        this.setState({
            groups,
            xSeries,
            ySeries,
            yData,
            allY,
            loading: false,
            error: false
        });
    }

    render() {
        return (
            <WarningsInfoGraph
                loading={this.state.loading}
                data={this.state} />
        );
    }
}

WarningsInfoGraphContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters.filters
    })
)(WarningsInfoGraphContainer);
