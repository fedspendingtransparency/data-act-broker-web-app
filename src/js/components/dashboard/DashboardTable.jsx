/**
  * DashboardTable.jsx
  * Created by Kevin Li 10/28/16
  **/

import React from 'react';
import Reactable from 'reactable';

import FormattedTable from '../SharedComponents/table/FormattedTable.jsx';


const defaultProps = {
    data: [
        {
            status: "started",
            submission_id: 1,
            last_modified: "05/17/2016",
            error: 0,
            size: 15021
        }
    ]
};

const tableHeaders = [
    'View',
    'Reporting Period',
    'Submitted By',
    'Last Modified Date',
    'Size',
    'Status',
    'Errors'
];

export default class DashboardTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cellClasses: [],
            headerClasses: [],
            message: 'Loading submissions...',
            sortDirection: 'desc',
            sortColumn: 1
        }
    };

    sortTable(direction, column) {
        // the table sorting changed
        this.setState({
            sortDirection: direction,
            sortColumn: column
        }, () => {
            // re-display the data
            // this.buildRow();
        });
    }

    render() {
        return (
            <div className="usa-da-recent-activity">
                <FormattedTable headers={tableHeaders} data={this.state.data} sortable={true} cellClasses={this.state.cellClasses} headerClasses={this.state.headerClasses} unsortable={[0]} onSort={this.sortTable.bind(this)} />
                <div className="text-center">
                    {this.state.message}
                </div>
            </div>
        );
    }
}

DashboardTable.defaultProps = defaultProps;