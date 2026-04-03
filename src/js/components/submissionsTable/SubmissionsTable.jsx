/**
* SubmissionsTable.jsx
* Created by Kevin Li 10/28/16
*/

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import cx from 'classnames';
import { Pagination } from 'data-transparency-ui';

import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import LastModifiedCell from 'components/landing/recentActivity/LastModifiedCell';

import FormattedTable from '../SharedComponents/table/FormattedTable';
import SubmissionLink from '../landing/recentActivity/SubmissionLink';
import HistoryLink from './HistoryLink';
import * as Status from '../landing/recentActivity/SubmissionStatus';
import * as UtilHelper from '../../helpers/util';
import * as PermissionsHelper from '../../helpers/permissionsHelper';
import DeleteLink from '../landing/recentActivity/DeleteLink';
import NoResultsMessage from '../SharedComponents/NoResultsMessage';
import LoadingMessage from '../SharedComponents/LoadingMessage';

const propTypes = {
    loadTableData: PropTypes.func,
    appliedFilters: PropTypes.object,
    session: PropTypes.object,
    data: PropTypes.array,
    type: PropTypes.string,
    total: PropTypes.number,
    isPublished: PropTypes.bool,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string
};

const SubmissionsTable = ({
    data = [],
    isLoading = true,
    isPublished = true,
    loadTableData = null,
    appliedFilters = {},
    session = null,
    type = '',
    total = 0,
    errorMessage = ''
}) => {
    const [parsedData, setParsedData] = useState([]);
    const [cellClasses, setCellClasses] = useState([]);
    const [headerClasses, setHeaderClasses] = useState([]);
    const [rowClasses, setRowClasses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [account, setAccount] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('desc');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        reload();
        loadAccount();
    }, []);

    useEffect(() => {
        changePage(1);
        reload();
    }, [appliedFilters]);

    useEffect(() => {
        buildRow();
    }, [data, deleteIndex]);

    useEffect(() => {
        // re-display the data
        reload();
    }, [type, sortColumn, sortDirection, currentPage]);

    const getHeaders = () => {
        let headers = [];
        if (isPublished) {
            if (type === 'fabs') {
                headers = [
                    'Submission ID',
                    'Agency: Filename',
                    'Created By',
                    'Action Date Range',
                    'Published By',
                    'Published On'
                ];
            }
            else {
                headers = [
                    'Reporting Period (CY)\nSubmission ID',
                    'Agency',
                    'Created By',
                    'Last Modified',
                    'Status',
                    'Submission History'
                ];
            }
        }
        else {
            let canDelete = false;
            if (type === 'fabs') {
                canDelete = PermissionsHelper.checkFabsPermissions(session);
                headers = [
                    'Submission ID',
                    'Agency:Filename',
                    'Action Date Range'
                ];
            }
            else {
                canDelete = PermissionsHelper.checkPermissions(session);
                headers = [
                    'View',
                    'Agency',
                    'Reporting Period (CY)'
                ];
            }
            headers = headers.concat([
                'Created By',
                'Last Modified',
                'Status'
            ]);
            if (canDelete) {
                headers = headers.concat('Delete');
            }
        }
        return headers;
    };

    const getCategory = () => {
        if (isPublished) {
            switch (sortColumn) {
                case 0:
                    return 'reporting_start';
                case 1:
                    return 'agency';
                case 2:
                    return 'submitted_by';
                case 3:
                    return 'modified';
                case 5:
                    return 'last_pub_or_cert';
                default:
                    return 'modified';
            }
        }
        switch (sortColumn) {
            case 1:
                return 'agency';
            case 2:
                return 'reporting_start';
            case 3:
                return 'submitted_by';
            default:
                return 'modified';
        }
    };

    const getAgency = (item) => {
        let agency = item.agency;
        if (type === 'fabs') {
            agency += `:\n${item.files[0].split('/').pop().replace(/^[0-9]*_/, '')}`;
        }
        return agency;
    };

    const buildRow = () => {
    // iterate through the recent activity
        const output = [];
        const tmpRowClasses = [];
        const allCellClasses = [];
        const agencySize = type === 'fabs' ? '20' : '17_5';
        const progressSize = type === 'fabs' ? '15' : '20';
        const viewSize = type === 'fabs' ? '15' : '10';
        const modifiedSize = type === 'fabs' ? '12_5' : '15';
        let baseCellClasses = ['row-12_5 text-center', `row-${agencySize} text-left`, 'row-15 white-space', 'row-12_5',
            `row-${modifiedSize}`, `row-${progressSize} progress-cell`, 'row-7_5 text-center'];

        if (isPublished) {
            baseCellClasses = [`row-${viewSize} text-center`, 'row-20', 'row-12_5', 'row-10', 'row-20 progress-cell',
                'row-15 text-center'];
            if (type === 'fabs') {
                baseCellClasses = ['row-10 text-center', 'row-25', 'row-10', 'row-15 white-space', 'row-10',
                    'row-10 text-center'];
            }
        }
        const tmpHeaderClasses = [...baseCellClasses];
        if (!isPublished && type !== 'fabs') {
            baseCellClasses[0] = 'row-12_5 text-left';
        }

        // iterate through each item returned from the API
        data.forEach((item, index) => {
            // break the object out into an array for the table component
            const row = formatRow(item, index);

            const rowClass = item.test_submission ? 'test-submission-row' : '';

            tmpRowClasses.push(rowClass);
            allCellClasses.push(baseCellClasses);
            output.push(row);
        });

        let tmpNoResults = false;
        if (data.length === 0) {
            tmpNoResults = true;
        }

        setParsedData(output);
        setCellClasses(allCellClasses);
        setRowClasses(tmpRowClasses);
        setHeaderClasses(tmpHeaderClasses);
        setNoResults(tmpNoResults);
    };


    const formatRow = (item, index) => {
        let start = 'Start: ';
        let end = '\nEnd: ';
        if (type === 'fabs') {
            start = 'Earliest: ';
            end = '\nLatest: ';
        }
        let reportingDateString = start + item.reporting_start_date + end + item.reporting_end_date;
        if (!item.reporting_start_date || !item.reporting_end_date) {
            reportingDateString = 'No reporting period\nspecified';
        }

        const userName = Object.prototype.hasOwnProperty.call(item, 'user') ? item.user.name : '--';

        const deleteConfirm = deleteIndex !== -1 && index === deleteIndex;

        let link = (<SubmissionLink
            submissionId={item.submission_id}
            type={type}
            testSubmission={item.test_submission} />);

        if (isPublished) {
            link = (<SubmissionLink
                submissionId={item.submission_id}
                value={reportingDateString}
                type={type} />);
        }

        let row = [];
        if (isPublished) {
            // Published Submissions table
            row = [
                link,
                getAgency(item),
                userName
            ];

            const lastPubOrCert = item.last_pub_or_cert !== '' ? UtilHelper.convertToLocalDate(item.last_pub_or_cert) :
                item.last_pub_or_cert;
            if (type === 'fabs') {
                row = row.concat([
                    reportingDateString,
                    item.publishing_user,
                    lastPubOrCert
                ]);
            }
            else {
                row = row.concat([
                    UtilHelper.convertToLocalDate(item.last_modified),
                    <Status.SubmissionStatus
                        status={item.rowStatus}
                        published={isPublished}
                        certified={item.certified} />,
                    <span>
                        {item.publishing_user}<br />
                        {lastPubOrCert}<br />
                        <HistoryLink submissionId={item.submission_id} />
                    </span>
                ]);
            }
        }
        else {
            // Active Submissions table
            row = [
                link,
                getAgency(item),
                reportingDateString,
                userName,
                <LastModifiedCell expirationDate={item.expiration_date} lastModified={item.last_modified} />,
                <Status.SubmissionStatus status={item.rowStatus} />
            ];

            let deleteCol = false;
            let canDelete = false;
            if (type === 'fabs') {
                deleteCol = PermissionsHelper.checkFabsPermissions(session);
                canDelete = PermissionsHelper.checkFabsAgencyPermissions(session, item.agency);
            }
            else {
                deleteCol = PermissionsHelper.checkPermissions(session);
                canDelete = PermissionsHelper.checkAgencyPermissions(session, item.agency);
            }

            if (deleteCol) {
                if (canDelete && item.publish_status === 'unpublished') {
                    row.push(<DeleteLink
                        submissionId={item.submission_id}
                        index={index}
                        warning={deleteWarning}
                        confirm={deleteConfirm}
                        reload={reload}
                        item={item}
                        account={account} />);
                }
                else {
                    row.push('N/A');
                }
            }
        }
        return row;
    };

    const sortTable = (direction, column) => {
    // the table sorting changed
        setSortDirection(direction);
        setSortColumn(column);
    };

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const reload = () => {
        loadTableData(currentPage, isPublished, getCategory(), sortDirection, appliedFilters);
    };

    const loadAccount = () => {
        // Leaving this as a function in case the user changes and we want to update it
        setAccount(session.user);
    };

    const deleteWarning = (index) => {
        setDeleteIndex(index);
    };

    const id = `pagination-${isPublished ? 'published' : 'active'}`;
    const paginator = (
        <Pagination
            currentPage={currentPage}
            totalItems={total}
            changePage={changePage}
            pageSize={10}
            goToPage
            id={id} />);

    const tableHeaderClasses = cx({
        'submission-table-content': true,
        loading: isLoading || noResults || errorMessage
    });

    const headers = getHeaders();
    // cannot be added to the const because if a user is read only then delete will not be created
    let unsortable = [0, 2, 5, 6];
    if (isPublished && type === 'fabs') {
        unsortable = [0, 3, 4];
    }
    else if (isPublished) {
        unsortable = [4];
    }

    let tableMessage = null;
    if (isLoading) {
        tableMessage = <LoadingMessage />;
    }
    else if (errorMessage) {
        tableMessage = <ErrorMessageOverlay errorMessage={errorMessage} />;
    }
    else if (noResults) {
        tableMessage = <NoResultsMessage />;
    }

    return (
        <div className="usa-da-submission-list">
            <div className={tableHeaderClasses}>
                <FormattedTable
                    headers={headers}
                    data={parsedData}
                    cellClasses={cellClasses}
                    unsortable={unsortable}
                    headerClasses={headerClasses}
                    rowClasses={rowClasses}
                    onSort={sortTable} />
            </div>
            <div className="text-center">
                {tableMessage}
            </div>
            <div className="paginator-wrap">
                {paginator}
            </div>
        </div>
    );
};

SubmissionsTable.propTypes = propTypes;
export default SubmissionsTable;
