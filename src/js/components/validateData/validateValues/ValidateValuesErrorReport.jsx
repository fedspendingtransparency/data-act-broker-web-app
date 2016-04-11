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

const propTypes = {

};

export default class ValidateValuesErrorReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortDirection: 'asc',
            sortField: 0
        };
    }

    processData(data) {

        let table = '';

        const headers = ['Field Name', this.props.name, 'Occurrences'];

        const rows = [];
        data.forEach((item) => {

            let description = item.error_description;
            if (item.error_name == 'rule_error') {
                description = item.rule_failed;
            }

            const row = [item.field_name, description, item.occurrences];

            rows.push(row);
        });

        // sort the data
        const sortedRows = this.sortData(rows);
        
        table = <ScrollableTable headers={headers} data={sortedRows} sortable={true} onSort={this.sortTable.bind(this)} />



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

    render() {
                
        let tables = '';

        if (this.props.data.error_data.length > 0) {
            tables = this.processData(this.props.data.error_data);
        }

        return (
            <div className="row usa-da-validate-item-bottom-section">
                <div className="row usa-da-validate-error-report">
                    <div className="row center-block">
                        <div className="col-md-10">
                            <h6>Invididual {this.props.name}s</h6>
                        </div>
                        <div className="col-md-2">
                            <a href={this.props.link} target="_blank">Download {this.props.name}s Report</a>
                        </div>
                        <div className="col-md-12">
                            {tables}
                            <ValidateValuesTreemap data={this.props.data.error_data} type="error" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ValidateValuesErrorReport.propTypes = propTypes;