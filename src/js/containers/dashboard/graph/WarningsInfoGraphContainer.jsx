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
            ySeries: []
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

        const apiParams = { filters: { ...this.props.appliedFilters } };

        DashboardHelper.fetchWarnings(apiParams)
            .then((res) => {
                this.parseData(res.data);
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    generateTimeLabels() {

    }

    parseData(data) {
        // const groups = [];
        // const xSeries = [];
        // const ySeries = [];
        // const rawLabels = [];

        console.log(data);

        this.setState({
            loading: false,
            error: false
        });
    }

    render() {
        return (
            <WarningsInfoGraph />
        );
    }
}

WarningsInfoGraphContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.dashboardAppliedFilters.filters
    })
)(WarningsInfoGraphContainer);
