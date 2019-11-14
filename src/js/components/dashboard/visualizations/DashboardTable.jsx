/**
 * DashboardTable.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import DashboardTableHeader from 'components/dashboard/visualizations/DashboardTableHeader';
import DashboardTableRow from 'components/dashboard/visualizations/DashboardTableRow';

const propTypes = {
    results: PropTypes.array,
    total: PropTypes.number
};

const defaultProps = {
    results: [],
    total: 0
};

const tableHeaders = [
    {
        text: 'File',
        class: null
    },
    {
        text: 'Fiscal Year/Quarter',
        class: null
    },
    {
        text: 'Warning Rule',
        class: null
    },
    {
        text: 'Number of Instances',
        class: null
    },
    {
        text: 'Rule Description',
        class: null
    }
]

export default class DashboardTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parsedData: []
        };

        this.formatRow = this.formatRow.bind(this);
    }

    componentDidMount() {
        const rows = [];
        this.props.results.forEach((item) => {
            rows.push(this.formatRow(item));
        });

        this.setState({
            parsedData: rows
        });
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.results, this.props.results)) {
            const rows = [];
            this.props.results.forEach((item) => {
                rows.push(this.formatRow(item));
            });

            this.setState({
                parsedData: rows
            });
        }
    }

    formatRow(item) {
        const row = [];
        let file = '';
        if (item.files.length > 1) {
            file = 'Cross File';
        }
        else {
            file = 'File ' + item.files[0].type;
        }
        row.push(file);
        row.push(`FY ${item.fy - 2000} / Q${item.quarter}`);
        row.push(item.rule_label);
        row.push(item.instance_count);
        row.push(item.rule_description);
        return row;
    }

    render() {
        const tableRows = this.state.parsedData.map((row, index) => (
            <DashboardTableRow key={'dashboard-table-row-' + index} cells={row} />
        ));
        return (
            <div className="dashboard-table">
                <h3>Table</h3>
                <table>
                    <DashboardTableHeader headers={tableHeaders} />
                    {tableRows}
                </table>
            </div>
        );
    }
}

DashboardTable.defaultProps = defaultProps;
DashboardTable.propTypes = propTypes;
