/**
 * DashboardTable.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, uniqueId } from 'lodash';

import DashboardTableHeader from 'components/dashboard/visualizations/DashboardTableHeader';
import DashboardTableRow from 'components/dashboard/visualizations/DashboardTableRow';

const propTypes = {
    results: PropTypes.array
};

const defaultProps = {
    results: []
};

const tableHeaders = [
    {
        text: 'File',
        class: 'dashboard-table__file-column'
    },
    {
        text: 'Fiscal Year/ Quarter',
        class: 'dashboard-table__fyq-column'
    },
    {
        text: 'Warning Rule',
        class: 'dashboard-table__label-column'
    },
    {
        text: 'Number of Instances',
        class: 'dashboard-table__instances-column'
    },
    {
        text: 'Rule Description',
        class: null
    }
];

export default class DashboardTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parsedData: []
        };

        this.buildRows = this.buildRows.bind(this);
    }

    componentDidMount() {
        this.buildRows();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.results, this.props.results)) {
            this.buildRows();
        }
    }

    buildRows() {
        const rows = [];
        this.props.results.forEach((item) => {
            rows.push(this.formatRow(item));
        });

        this.setState({
            parsedData: rows
        });
    }

    formatRow(item) {
        const row = [];
        let file = '';
        if (item.files.length > 1) {
            const fileLabels = item.files.map((itemFile) => itemFile.type);
            fileLabels.sort();
            file = `CROSS FILE: ${fileLabels.join('/')}`;
        }
        else {
            file = `FILE ${item.files[0].type}`;
        }
        row.push({
            data: file,
            class: null
        });
        row.push({
            data: `FY ${item.fy - 2000} / Q${item.quarter}`,
            class: null
        });
        row.push({
            data: item.rule_label,
            class: null
        });
        row.push({
            data: item.instance_count,
            class: null
        });
        row.push({
            data: item.rule_description,
            class: 'ellipse-box'
        });
        return row;
    }

    render() {
        const tableRows = this.state.parsedData.map((row, index) => (
            <DashboardTableRow key={`dashboard-table-row-${uniqueId()}`} cells={row} rowNum={index} />
        ));
        return (
            <div className="dashboard-table">
                <h3>Table</h3>
                <table>
                    <DashboardTableHeader headers={tableHeaders} />
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

DashboardTable.defaultProps = defaultProps;
DashboardTable.propTypes = propTypes;
