/**
 * ValidateValuesErrorReport.jsx
 * Created by Kevin Li 4/4/2016
 */

import { useState, useEffect } from 'react';
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

const ValidateValuesErrorReport = ({
    colors = {},
    data = {},
    dataKey = 'error_data',
    fileType = '',
    name = '',
    reportType = '',
    submissionId = '',
    publishStatus = ''
}) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortField, setSortField] = useState(0);
    const [table, setTable] = useState(null);
    const [signedUrl, setSignedUrl] = useState('');
    const [signInProgress, setSignInProgress] = useState(false);
    const tableClasses = ['colA', 'colB', 'colC'];

    useEffect(() => {
        createTable();
    }, []);

    useEffect(() => {
        createTable();
    }, [data, dataKey, sortDirection, sortField]);

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

    const createTable = () => {
        // retrieve the data for the appropriate key, parse it, and save table component into state
        setTable(processData(data[dataKey]));
    };

    const processData = (values) => {
        let table = '';

        const headers = ['Field Name', name, 'Occurrences'];
        const unsortableHeaders = [0];

        const rows = [];
        values.forEach((item) => {
            let description = item.error_description;
            if (item.error_name === 'rule_failed') {
                description = `Rule ${item.original_label}: ${item.rule_failed}`;
            }

            const row = [item.field_name, description, parseInt(item.occurrences, 10)];

            rows.push(row);
        });

        // sort the data
        const sortedRows = sortData(rows);
        table = (<ScrollableTable
            headers={headers}
            data={sortedRows}
            onSort={sortTable}
            cellClasses={tableClasses}
            headerClasses={tableClasses}
            unsortable={unsortableHeaders} />);
        return table;
    };

    const sortData = (values) => {
        // sort the data based on the selected column (defaults to the first one)
        let output = _.clone(values);
        output = _.sortBy(values, (col) => col[sortField]);

        // lodash sorts by ascending, so if we want descending, reverse the array
        if (sortDirection === 'desc') {
            output = _.reverse(output);
        }

        return output;
    };

    const sortTable = (direction, column) => {
        if (direction !== sortDirection || column !== sortField) {
            setSortDirection(direction);
            setSortField(column);
        }
    };

    const openReport = () => {
        window.location = signedUrl;
    };

    const signReport = () => {
        ReviewHelper.submissionReport(submissionId, reportType === 'warning', fileType)
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
    let reportLinkText = `Download ${name}s Report`;
    if (signInProgress) {
        reportLinkText = `Preparing ${name}s Report...`;
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
            </span>
            {reportLinkText}
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
                        <h6>{name}s</h6>
                    </div>
                    <div className="col-md-3">
                        {downloadLink}
                    </div>
                    <div className="col-md-12">
                        {table}
                        <div className="mt-20">
                            <ValidateValuesTreemap
                                data={data[dataKey]}
                                type="error"
                                colors={colors} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ValidateValuesErrorReport.propTypes = propTypes;
export default ValidateValuesErrorReport;
