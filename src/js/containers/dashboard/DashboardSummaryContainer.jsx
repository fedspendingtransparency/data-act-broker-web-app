/**
 * DashboardSummaryContainer.jsx
 * Created by Daniel Boos 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as DashboardHelper from 'helpers/dashboardHelper';
import DashboardSummary from 'components/dashboard/DashboardSummary';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired
};

export default class DashboardSummaryContainer extends React.Component {
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
                quarters: [],
                fys: [2019],
                agencies: []
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
        return <DashboardSummary appliedFilters={this.props.appliedFilters} results={this.state.results} />;
    }
}

DashboardSummaryContainer.propTypes = propTypes;
