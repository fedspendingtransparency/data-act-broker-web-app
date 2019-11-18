/**
 * DashboardSummaryContainer.jsx
 * Created by Daniel Boos 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as DashboardHelper from 'helpers/dashboardHelper';
import DashboardSummaries from 'components/dashboard/summary/DashboardSummaries';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired
};

class DashboardSummaryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            inFlight: false
        };

        this.getSummary = this.getSummary.bind(this);
    }

    componentDidMount() {
        this.getSummary();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getSummary();
        }
    }

    getSummary() {
        const filters = {
            filters: {
                quarters: this.props.appliedFilters.filters.quarters,
                fys: this.props.appliedFilters.filters.fy,
                agencies: [this.props.appliedFilters.filters.agency]
            }
        };
        DashboardHelper.fetchSummary(filters)
            .then((data) => {
                this.setState({
                    results: data
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return <DashboardSummaries appliedFilters={this.props.appliedFilters} results={this.state.results} />;
    }
}

DashboardSummaryContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters
    }),
)(DashboardSummaryContainer);
