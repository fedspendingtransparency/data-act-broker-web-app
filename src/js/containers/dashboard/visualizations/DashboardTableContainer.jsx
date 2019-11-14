/**
 * DashboardTableContainer.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as DashboardHelper from 'helpers/dashboardHelper';
import DashboardTable from 'components/dashboard/visualizations/DashboardTable';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired
};

export default class DashboardTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            total: 0,
            inFlight: true
        };

        this.updateTable = this.updateTable.bind(this);
    }

    componentDidMount() {
        this.updateTable();
    }

    updateTable() {
        const searchParams = {
            filters: {
                quarters: [],
                fys: [],
                agencies: [],
                files: [],
                rules: []
            },
            page: 1,
            limit: 10,
            sort: 'period',
            order: 'desc'
        };

        DashboardHelper.fetchDashboardTableContents(searchParams)
            .then((res) => {
                this.setState({
                    results: res.results,
                    total: res.page_metadata.total,
                    inFlight: false
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    inFlight: false
                });
            });
    }

    render() {
        return (
            <DashboardTable {...this.state} />
        );
    }
}

DashboardTableContainer.propTypes = propTypes;
