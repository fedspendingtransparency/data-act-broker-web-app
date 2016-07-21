/**
 * ValidateValuesErrorReport.jsx
 * Created by Kevin Li 4/4/2016
 **/

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { kGlobalConstants } from '../../../GlobalConstants.js';
import ScrollableTable from '../../SharedComponents/table/ScrollableTable.jsx';

import SubmitButton from '../../SharedComponents/SubmitButton.jsx';
import Table from '../../SharedComponents/table/TableComponent.jsx';

import ValidateValuesTreemap from './ValidateValuesTreemap.jsx';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const propTypes = {

};

export default class ValidateValuesErrorReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortDirection: 'asc',
            sortField: 0,
            headerClasses: ['headerColA','headerColB', 'headerColC'],
            cellClasses: ['cellColA', 'cellColB', 'cellColC']
        };
    }

    processData(data) {

        let table = '';

        const headers = ['Field Name', this.props.name, 'Occurrences'];

        const rows = [];
        data.forEach((item) => {

            let description = item.error_description;
            if (item.error_name == 'rule_failed') {
                description = item.rule_failed;
            }

            const row = [item.field_name, description, parseInt(item.occurrences)];

            rows.push(row);
        });

        // sort the data
        const sortedRows = this.sortData(rows);
        
        table = <ScrollableTable headers={headers} data={sortedRows} sortable={true} onSort={this.sortTable.bind(this)} cellClasses={this.state.cellClasses} headerClasses={this.state.headerClasses} />



        return table;

    }

    sortData(data) {

        // sort the data based on the selected column (defaults to the first one)
        let output = _.clone(data);
        output = _.sortBy(data, (col) => {
            return col[this.state.sortField];
        });

        // lodash sorts by ascending, so if we want descending, reverse the array
        if (this.state.sortDirection == 'desc') {
            output = _.reverse(output);
        }

        return output;
    }

    sortTable(direction, column) {
        if (direction != this.state.sortDirection || column != this.state.sortField) {
            this.setState({
                sortDirection: direction,
                sortField: column
            });
        }
    }

    openWindow() {
        window.open(this.props.link, '_blank');
    }

    render() {
                
        let tables = '';

        if (this.props.data.error_data.length > 0) {
            tables = this.processData(this.props.data.error_data);
        }

        return (
            <div className="row usa-da-validate-item-bottom-section">
                <div className="usa-da-validate-error-report">
                    <div className="row center-block">
                        <div className="col-md-9">
                            <h6>{this.props.name}s</h6>
                        </div>
                        <div className="col-md-3">
                            <div className="usa-da-download pull-right" onClick={this.openWindow.bind(this)}>
                                <span className="usa-da-icon usa-da-download-report"><Icons.CloudDownload /></span>
                                Download {this.props.name}s Report
                            </div>
                        </div>
                        <div className="col-md-12">
                            {tables}
                            <div className="mt-20">
                                <ValidateValuesTreemap data={this.props.data.error_data} type="error" color={this.props.color} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ValidateValuesErrorReport.propTypes = propTypes;