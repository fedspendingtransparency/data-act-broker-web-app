/**
 * ValidateDataErrorReport.jsx
 * Created by Mike Bray 3/28/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollableTable from '../SharedComponents/table/ScrollableTable';
import * as ReviewHelper from '../../helpers/reviewHelper';
import { createOnKeyDownHandler } from '../../helpers/util';

const propTypes = {
    data: PropTypes.array,
    submissionId: PropTypes.string,
    publishStatus: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    data: [],
    submissionId: '',
    publishStatus: '',
    type: ''
};

export default class ValidateDataErrorReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortDirection: 'asc',
            signedUrl: '',
            signInProgress: false
        };
        this.clickedReport = this.clickedReport.bind(this);
    }

    sortTable(direction) {
        if (direction !== this.state.sortDirection) {
            this.setState({
                sortDirection: direction
            });
        }
    }

    openReport() {
        window.location = this.state.signedUrl;
    }

    signReport() {
        ReviewHelper.submissionReport(this.props.submissionId, false, this.props.type)
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
        let tables = '';

        if (this.props.data.length > 0) {
            tables = this.props.data.map((errorData, index) => {
                let rowData = errorData.data;
                if (this.state.sortDirection !== 'asc') {
                    // reverse the array
                    rowData = _.reverse(_.clone(errorData.data));
                }

                const rows = [];
                rowData.forEach((row) => {
                    rows.push([row]);
                });
                return (<ScrollableTable
                    headers={[errorData.header]}
                    data={rows}
                    key={index}
                    onSort={this.sortTable.bind(this)} />);
            });
        }

        let reportLinkText = 'Download Error Report';
        if (this.state.signInProgress) {
            reportLinkText = 'Preparing Error Report...';
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
                </span>{reportLinkText}
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
                            <h6>Header Error Report</h6>
                        </div>
                        <div className="col-md-3 mr-0">
                            {downloadLink}
                        </div>
                        <div className="col-md-12">
                            {tables}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ValidateDataErrorReport.propTypes = propTypes;
ValidateDataErrorReport.defaultProps = defaultProps;
