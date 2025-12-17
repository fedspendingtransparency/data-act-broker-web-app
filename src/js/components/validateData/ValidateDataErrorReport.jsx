/**
 * ValidateDataErrorReport.jsx
 * Created by Mike Bray 3/28/16
 */

import { useState, useEffect } from 'react';
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

const ValidateDataErrorReport = ({ data = [], submissionId = '', publishStatus = '', type = '' }) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [signedUrl, setSignedUrl] = useState('');
    const [signInProgress, setSignInProgress] = useState(false);

    useEffect(() => {
        if (signedUrl) {
            openReport();
        }
    }, [signedUrl]);

    useEffect(() => {
        if (signInProgress) {
            signReport();
        }
    }, [signInProgress]);

    const sortTable = (direction) => {
        if (direction !== sortDirection) {
            setSortDirection(direction);
        }
    };

    const openReport = () => {
        window.location = signedUrl;
    };

    const signReport = () => {
        ReviewHelper.submissionReport(submissionId, false, type)
            .then((res) => {
                setSignInProgress(false);
                setSignedUrl(res.data.url);
            })
            .catch((err) => {
                setSignInProgress(false);
                console.error(err);
            });
    };

    const clickedReport = () => {
        // if it's not already signing the link, check whether it's already signed
        if (!signInProgress) {
            if (signedUrl !== '') {
            // it is signed, open immediately
                openReport();
            }
            else {
                // not signed yet, sign
                setSignInProgress(true);
            }
        }
    };

    const onKeyDownHandler = createOnKeyDownHandler(clickedReport);
    let tables = '';

    if (data.length > 0) {
        tables = data.map((errorData, index) => {
            let rowData = errorData.data;
            if (sortDirection !== 'asc') {
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
                onSort={sortTable} />);
        });
    }

    let reportLinkText = 'Download Error Report';
    if (signInProgress) {
        reportLinkText = 'Preparing Error Report...';
    }

    let downloadLink = (
        <div
            role="button"
            tabIndex={0}
            className="usa-da-download pull-right"
            onKeyDown={onKeyDownHandler}
            onClick={clickedReport}>
            <span className="usa-da-icon usa-da-download-report">
                <FontAwesomeIcon icon="cloud-arrow-down" />
            </span>{reportLinkText}
        </div>
    );
    const blockedStatuses = ['reverting', 'publishing'];
    if (blockedStatuses.indexOf(publishStatus) > -1) {
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
};

ValidateDataErrorReport.propTypes = propTypes;
export default ValidateDataErrorReport;
