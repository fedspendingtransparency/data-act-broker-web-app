/**
 * WarningsInfoGraphContainer.jsx
 * Created by Lizzie Salita 11/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual, uniq } from 'lodash';

import * as DashboardHelper from 'helpers/dashboardHelper';
import { buildLegend } from 'helpers/stackedBarChartHelper';
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
            allY: [],
            legend: []
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

    generateLegend(ySeries) {
        const yData = ySeries && ySeries[0];
        let rules = [];
        if (yData) {
            rules = yData.map((rule) => Object.values(rule)[0]);
        }
        // Remove any duplicate rules
        rules = uniq(rules);
        return buildLegend(rules);
    }

    parseData(data) {
        const groups = []; // Fiscal Quarter labels
        const xSeries = []; // Fiscal Quarter values
        const ySeries = []; // Warnings by Rule
        const allY = []; // Total Warnings values

        // For now, only one file at a time
        const file = data[this.props.appliedFilters.file];

        file.forEach((submission) => {
            const timePeriodLabel = `FY ${submission.fy - 2000} / Q${submission.quarter}`;
            groups.push(timePeriodLabel);
            xSeries.push(timePeriodLabel);
            ySeries.push(submission.warnings);
            allY.push(submission.total_warnings);
        });

        const legend = this.generateLegend(ySeries);

        this.setState({
            groups,
            xSeries,
            ySeries,
            allY,
            legend,
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
