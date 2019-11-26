/**
 * WarningsInfoGraphContainer.jsx
 * Created by Lizzie Salita 11/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual, union } from 'lodash';

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

    generateLegend(yData) {
        let rules = [];
        yData.forEach((submission) => {
            rules = union(rules, submission.map((rule) => Object.values(rule)[0]));
        });
        return buildLegend(rules);
    }

    generateySeries(yData) {
        return yData.map((submission) => {
            let bottom = 0;
            const barObject = {};
            submission.forEach((rule) => {
                barObject[rule.label] = {
                    value: rule.instances,
                    bottom,
                    top: bottom + rule.instances,
                    description: `Rule ${rule.label}`,
                    percent: rule.percent_total
                };
                bottom += rule.instances;
            });
            return barObject;
        });
    }

    parseData(data) {
        const xSeries = []; // Fiscal Quarter labels
        const yData = []; // Warnings by rule for each submission
        const allY = []; // Total warnings values

        // For now, only one file at a time
        const file = data[this.props.appliedFilters.file];

        file.forEach((submission) => {
            const timePeriodLabel = `FY ${submission.fy.toString(10).substring(2)} / Q${submission.quarter}`;
            xSeries.push(timePeriodLabel);
            yData.push(submission.warnings);
            allY.push(submission.total_warnings);
        });

        const legend = this.generateLegend(yData);
        const ySeries = this.generateySeries(yData);

        this.setState({
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
                {...this.state} />
        );
    }
}

WarningsInfoGraphContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters.filters
    })
)(WarningsInfoGraphContainer);
