/**
 * ValidateValuesErrorReport.jsx
 * Created by Kevin Li 4/4/2016
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import ScrollableTable from '../../SharedComponents/table/ScrollableTable';

import ValidateValuesTreemap from './ValidateValuesTreemap';
import * as Icons from '../../SharedComponents/icons/Icons';

import * as ReviewHelper from '../../../helpers/reviewHelper';

const propTypes = {
    colors: PropTypes.object,
    data: PropTypes.object,
    dataKey: PropTypes.string,
    fileType: PropTypes.string,
    name: PropTypes.string,
    reportType: PropTypes.string,
    submission: PropTypes.string
};

const defaultProps = {
    colors: {},
    data: {},
    dataKey: 'error_data',
    fileType: '',
    name: '',
    reportType: '',
    submission: ''
};

export default class ValidateValuesErrorReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortDirection: 'asc',
            sortField: 0,
            headerClasses: ['headerColA', 'headerColB', 'headerColC'],
            cellClasses: ['cellColA', 'cellColB', 'cellColC'],
            table: null,
            signedUrl: '',
            signInProgress: false
        };
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

        const rows = [];
        data.forEach((item) => {
            let description = item.error_description;
            if (item.error_name === 'rule_failed') {
                description = 'Rule ' + item.original_label + ': ' + item.rule_failed;
            }

            const row = [item.field_name, description, parseInt(item.occurrences, 10)];

            rows.push(row);
        });

        // sort the data
        const sortedRows = this.sortData(rows);
        table = (<ScrollableTable
            headers={headers}
            data={sortedRows}
            onSort={this.sortTable.bind(this)}
            cellClasses={this.state.cellClasses}
            headerClasses={this.state.headerClasses} />);
        return table;
    }

    sortData(data) {
        // sort the data based on the selected column (defaults to the first one)
        let output = _.clone(data);
        output = _.sortBy(data, (col) => {
            return col[this.state.sortField];
        });

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
            });
        }
    }

    openReport() {
        window.location = this.state.signedUrl;
    }

    signReport() {
        ReviewHelper.submissionReport(this.props.submission, this.props.reportType === 'warning', this.props.fileType)
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
            return;
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
        let reportLinkText = `Download ${this.props.name}s Report`;
        if (this.state.signInProgress) {
            reportLinkText = `Preparing ${this.props.name}s Report...`;
        }

        return (
            <div className="row usa-da-validate-item-bottom-section">
                <div className="usa-da-validate-error-report">
                    <div className="row center-block">
                        <div className="col-md-9">
                            <h6>{this.props.name}s</h6>
                        </div>
                        <div className="col-md-3">
                            <div
                                className="usa-da-download pull-right"
                                onClick={this.clickedReport.bind(this)}>
                                <span className="usa-da-icon usa-da-download-report"><Icons.CloudDownload /></span>
                                {reportLinkText}
                            </div>
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
