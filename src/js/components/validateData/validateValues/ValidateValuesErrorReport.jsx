/**
 * ValidateValuesErrorReport.jsx
 * Created by Kevin Li 4/4/2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollableTable from '../../SharedComponents/table/ScrollableTable';

import ValidateValuesTreemap from './ValidateValuesTreemap';

import * as ReviewHelper from '../../../helpers/reviewHelper';
import { createOnKeyDownHandler } from '../../../helpers/util';

const propTypes = {
    colors: PropTypes.object,
    data: PropTypes.object,
    dataKey: PropTypes.string,
    fileType: PropTypes.string,
    name: PropTypes.string,
    reportType: PropTypes.string,
    submissionId: PropTypes.string,
    publishStatus: PropTypes.string
};

const defaultProps = {
    colors: {},
    data: {},
    dataKey: 'error_data',
    fileType: '',
    name: '',
    reportType: '',
    submissionId: '',
    publishStatus: ''
};

export default class ValidateValuesErrorReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortDirection: 'asc',
            sortField: 0,
            headerClasses: ['colA', 'colB', 'colC'],
            cellClasses: ['colA', 'colB', 'colC'],
            table: null,
            signedUrl: '',
            signInProgress: false
        };
        this.clickedReport = this.clickedReport.bind(this);
        this.sortTable = this.sortTable.bind(this);
        this.createTable = this.createTable.bind(this);
    }


    componentDidMount() {
        this.createTable();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.data, this.props.data) || prevProps.dataKey !== this.props.dataKey) {
            this.createTable();
        }
    }

    createTable() {
        // retrieve the data for the appropriate key, parse it, and save table component into state
        const data = this.props.data[this.props.dataKey];
        this.setState({
            table: this.processData(data)
        });
    }

    processData(data) {
        let table = '';

        const headers = ['Field Name', this.props.name, 'Occurrences'];
        const unsortableHeaders = [0];

        const rows = [];
        data.forEach((item) => {
            let description = item.error_description;
            if (item.error_name === 'rule_failed') {
                description = `Rule ${item.original_label}: ${item.rule_failed}`;
            }

            const row = [item.field_name, description, parseInt(item.occurrences, 10)];

            rows.push(row);
        });

        // sort the data
        const sortedRows = this.sortData(rows);
        table = (<ScrollableTable
            headers={headers}
            data={sortedRows}
            onSort={this.sortTable}
            cellClasses={this.state.cellClasses}
            headerClasses={this.state.headerClasses}
            unsortable={unsortableHeaders} />);
        return table;
    }

    sortData(data) {
        // sort the data based on the selected column (defaults to the first one)
        let output = _.clone(data);
        output = _.sortBy(data, (col) => col[this.state.sortField]);

        // lodash sorts by ascending, so if we want descending, reverse the array
        if (this.state.sortDirection === 'desc') {
            output = _.reverse(output);
        }

        return output;
    }

    sortTable(direction, column) {
        if (direction !== this.state.sortDirection || column !== this.state.sortField) {
            this.setState({
                sortDirection: direction,
                sortField: column
            }, this.createTable);
        }
    }

    openReport() {
        window.location = this.state.signedUrl;
    }

    signReport() {
        ReviewHelper.submissionReport(this.props.submissionId, this.props.reportType === 'warning', this.props.fileType)
            .then((data) => {
                this.setState({
                    signInProgress: false,
                    signedUrl: data.url
                }, () => {
                    this.openReport();
                });
            })
            .catch((err) => {
                this.setState({
                    signInProgress: false
                });
                console.error(err);
            });
    }

    clickedReport() {
        // check if the link is already signed
        if (this.state.signInProgress) {
            // sign is in progress, do nothing

        }
        else if (this.state.signedUrl !== '') {
            // it is signed, open immediately
            this.openReport();
        }
        else {
            // not signed yet, sign
            this.setState({
                signInProgress: true
            }, () => {
                this.signReport();
            });
        }
    }

    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.clickedReport);
        let reportLinkText = `Download ${this.props.name}s Report`;
        if (this.state.signInProgress) {
            reportLinkText = `Preparing ${this.props.name}s Report...`;
        }

        let downloadLink = (
            <div
                role="button"
                tabIndex={0}
                className="usa-da-download pull-right"
                onKeyDown={onKeyDownHandler}
                onClick={this.clickedReport}>
                <span className="usa-da-icon usa-da-download-report">
                    <FontAwesomeIcon icon="cloud-download-alt" />
                </span>
                {reportLinkText}
            </div>
        );
        const blockedStatuses = ['reverting', 'publishing'];
        if (blockedStatuses.indexOf(this.props.publishStatus) > -1) {
            downloadLink = null;
        }

        return (
            <div className="row usa-da-validate-item-bottom-section">
                <div className="usa-da-validate-error-report">
                    <div className="row center-block">
                        <div className="col-md-9">
                            <h6>{this.props.name}s</h6>
                        </div>
                        <div className="col-md-3">
                            {downloadLink}
                        </div>
                        <div className="col-md-12">
                            {this.state.table}
                            <div className="mt-20">
                                <ValidateValuesTreemap
                                    data={this.props.data[this.props.dataKey]}
                                    type="error"
                                    colors={this.props.colors} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ValidateValuesErrorReport.propTypes = propTypes;
ValidateValuesErrorReport.defaultProps = defaultProps;
