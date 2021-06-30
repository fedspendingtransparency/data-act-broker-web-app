/**
 * WarningsInfoGraphContainer.jsx
 * Created by Lizzie Salita 11/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, union } from 'lodash';

import * as DashboardHelper from 'helpers/dashboardHelper';
import { buildLegend } from 'helpers/stackedBarChartHelper';
import DashboardGraph from 'components/dashboard/graph/DashboardGraph';

const propTypes = {
    appliedFilters: PropTypes.object
};

export default class WarningsInfoGraphContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            xSeries: [],
            ySeries: [],
            allY: {
                totalWarnings: [],
                shownWarnings: []
            },
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
        const periods = DashboardHelper.getPeriodListFromFilter(this.props.appliedFilters.period);
        const apiParams = {
            filters: {
                fys: this.props.appliedFilters.fy.toArray(),
                periods,
                agencies: [this.props.appliedFilters.agency.code],
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
            rules = union(rules, submission.map((rule) => rule.label));
        });
        return buildLegend(rules);
    }

    generateySeries(yData, allY) {
        return yData.map((submission, index) => {
            let bottom = 0;
            const barObject = {};
            submission.forEach((rule) => {
                barObject[rule.label] = {
                    value: rule.instances,
                    bottom,
                    top: bottom + rule.instances,
                    description: rule.label,
                    percent: rule.percent_total,
                    totalWarnings: allY.totalWarnings[index],
                    shownWarnings: allY.shownWarnings[index]
                };
                bottom += rule.instances;
            });
            return barObject;
        });
    }

    parseData(data) {
        const xSeries = []; // Fiscal Quarter labels
        const yData = []; // Warnings by rule for each submission
        const allY = {
            totalWarnings: [],
            shownWarnings: []
        }; // Total warnings values

        // For now, only one file at a time
        const file = data[this.props.appliedFilters.file];

        // Sort the results into chronologic order
        const compare = (a, b) => {
            let comparison = 0;
            if (a.fy > b.fy || (a.fy === b.fy && a.period > b.period)) {
                comparison = 1;
            }
            else if (a.fy < b.fy || (a.fy === b.fy && a.period < b.period)) {
                comparison = -1;
            }
            return comparison;
        };
        file.sort(compare);

        file.forEach((submission) => {
            let period = `Q${submission.period / 3}`;
            if (!submission.is_quarter) {
                period = submission.period === 2 ? 'P01-P02' : `P${submission.period.toString().padStart(2, '0')}`;
            }
            const timePeriodLabel = `FY ${submission.fy.toString(10).substring(2)} / ${period}`;
            xSeries.push(timePeriodLabel);
            yData.push(submission.warnings);
            allY.totalWarnings.push(submission.total_warnings);
            allY.shownWarnings.push(submission.filtered_warnings);
        });

        const legend = this.generateLegend(yData);
        const ySeries = this.generateySeries(yData, allY);

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
            <DashboardGraph
                type="historical"
                errorLevel="warning"
                {...this.state} />
        );
    }
}

WarningsInfoGraphContainer.propTypes = propTypes;
