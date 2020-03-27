/**
 * SignificanceGraphContainer.jsx
 * Created by Lizzie Salita 3/27/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import * as DashboardHelper from 'helpers/dashboardHelper';
import DashboardGraph from 'components/dashboard/graph/DashboardGraph';

const propTypes = {
    appliedFilters: PropTypes.object,
    submissionID: PropTypes.string.isRequired,
    errorLevel: PropTypes.oneOf(['error', 'warning']).isRequired
};

export class SignificanceGraphContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            xSeries: [...Array(10).keys()],
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

        const file = this.props.appliedFilters.file;
        const id = parseInt(this.props.submissionID, 10);

        DashboardHelper.fetchSignificanceCounts(id, file, this.props.errorLevel)
            .then((res) => {
                this.parseData(res.rules);
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    parseData(rules) {
        const ySeries = [];
        const allY = []; // Number of instances for each rule

        rules.forEach((rule) => {
            ySeries.push({
                label: rule.rule_label,
                category: rule.category,
                significance: rule.significance,
                impact: rule.impact,
                instances: rule.instances,
                percentage: rule.percentage
            });
            allY.push(rule.instances);
        });

        this.setState({
            ySeries,
            allY,
            loading: false,
            error: false
        });
    }

    render() {
        return (
            <DashboardGraph
                type="active"
                title="Significance"
                description="Identify the significance of a particular rule based upon your agency’s preset values and filter warnings by category."
                {...this.state} />
        );
    }
}

SignificanceGraphContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters.filters.active
    })
)(SignificanceGraphContainer);
