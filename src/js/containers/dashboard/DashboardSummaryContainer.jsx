/**
 * DashboardSummaryContainer.jsx
 * Created by Daniel Boos 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as DashboardHelper from 'helpers/dashboardHelper';
import DashboardSummaries from 'components/dashboard/summary/DashboardSummaries';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired
};

export class DashboardSummaryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            inFlight: false,
            hasFailed: false
        };

        this.getSummary = this.getSummary.bind(this);
    }

    componentDidMount() {
        this.getSummary();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
            this.getSummary();
        }
    }

    getSummary() {
        this.setState({
            inFlight: true
        });
        const filters = {
            filters: {
                quarters: this.props.appliedFilters.quarters,
                fys: this.props.appliedFilters.fy,
                agencies: [this.props.appliedFilters.agency]
            }
        };
        DashboardHelper.fetchSummary(filters)
            .then((data) => {
                this.setState({
                    hasFailed: false,
                    results: data,
                    inFlight: false
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    hasFailed: true,
                    inFlight: false
                });
            });
    }

    render() {
        return (
            <DashboardSummaries
                appliedFilters={this.props.appliedFilters}
                {...this.state} />
        );
    }
}

DashboardSummaryContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters.filters.historical
    }),
)(DashboardSummaryContainer);
