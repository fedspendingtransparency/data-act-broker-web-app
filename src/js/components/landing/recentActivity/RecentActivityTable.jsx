/**
 * RecentActivityTable.jsx
 * Created by Kevin Li 5/16/16
 */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import * as SubmissionListHelper from 'helpers/submissionListHelper';
import * as PermissionsHelper from 'helpers/permissionsHelper';
import FormattedTable from 'components/SharedComponents/table/FormattedTable';
import LastModifiedCell from 'components/landing/recentActivity/LastModifiedCell';
import SubmissionLink from './SubmissionLink';
import DeleteLink from './DeleteLink';
import * as Status from './SubmissionStatus';

const propTypes = {
    session: PropTypes.object,
    type: PropTypes.string
};

const RecentActivityTable = ({session = {}, type = ''}) => {
    const [cachedResponse, setCachedResponse] = useState([]);
    const [data, setData] = useState([]);
    const [cellClasses, setCellClasses] = useState([]);
    const [headerClasses, setHeaderClasses] = useState([]);
    const [rowClasses, setRowClasses] = useState([]);
    const [message, setMessage] = useState('Loading recent activity...');
    const [sortDirection, setSortDirection] = useState('desc');
    const [sortColumn, setSortColumn] = useState(4);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [isUnmounted, setIsUnmounted] = useState(false);

    useEffect(() => {
        reload();
        setIsUnmounted(false);

        return () => {
            setIsUnmounted(true);
        };
    }, []);

    useEffect(() => {
        reload();
    }, [type]);

    useEffect(() => {
        if (deleteIndex !== -1) {
            buildRow();
        }
    }, [deleteIndex]);

    useEffect(() => {
        buildRow();
    }, [cachedResponse, sortColumn, sortDirection]);

    const getAgency = (item) => {
        let agency = item.agency;
        if (type === 'fabs') {
            agency += `:\n${item.files[0]
                .split('/')
                .pop()
                .replace(/^[0-9]*_/, '')}`;
        }
        return agency;
    };

    const getHeaders = () => {
        let headers = [];
        if (type === 'fabs') {
            headers = [
                'Submission ID',
                'Agency: Filename',
                'Action Date Range',
                'Created By',
                'Last Modified'
            ];
            if (PermissionsHelper.checkFabsPermissions(session)) {
                headers.push('Delete');
            }
        }
        else {
            headers = [
                'View',
                'Agency',
                'Reporting Period (CY)',
                'Created By',
                'Last Modified',
                'Status'
            ];
            if (PermissionsHelper.checkPermissions(session)) {
                headers.push('Delete');
            }
        }
        return headers;
    };

    const deleteWarning = (index) => {
        setDeleteIndex(index);
    };

    const reload = () => {
        setDeleteIndex(-1);
        loadActivity();
    };

    const loadActivity = () => {
        SubmissionListHelper.loadRecentActivity(type)
            .then((res) => {
                if (isUnmounted) {
                    return;
                }
                // save the response for sorting later
                setCachedResponse(SubmissionListHelper.parseRecentActivity(res.data.submissions));
            })
            .catch((err) => {
                if (isUnmounted) {
                    return;
                }
                setMessage('An error occurred while loading recent activity.');
                console.error(err);
            });
    };

    const buildRow = () => {
        // iterate through the recent activity
        const output = [];
        const allCellClasses = [];
        const allRowClasses = [];

        let baseCellClasses = [
            'row-12_5',
            'row-17_5',
            'row-15 white-space',
            'row-12_5',
            'row-15',
            'row-20 progress-cell',
            'row-7_5 text-center'
        ];
        if (type === 'fabs') {
            baseCellClasses = [
                'row-10 text-center',
                'row-35',
                'row-15',
                'row-15',
                'row-15',
                'row-10 text-center'
            ];
        }
        const allHeaderClasses = [...baseCellClasses];
        allHeaderClasses[allHeaderClasses.length - 1] = allHeaderClasses[allHeaderClasses.length - 1].split(' ')[0];

        // sort the array by object key
        const orderKeys = [
            'sortableAgency',
            'sortableReportingDate',
            'sortableName',
            'sortableDate'
        ];
        // When sorting the FABS recent activity table, we need two values to sort by the agency/filename column
        if (type === 'fabs') {
            orderKeys[0] = ['sortableAgency', 'sortableFileName'];
        }
        const data = _.orderBy(
            cachedResponse,
            orderKeys[sortColumn - 1],
            sortDirection
        );

        // iterate through each item returned from the API
        data.forEach((item, index) => {
            // break the object out into an array for the table component
            const row = formatRow(item, index);

            const rowClass = item.test_submission ? 'test-submission-row' : '';

            allRowClasses.push(rowClass);
            allCellClasses.push(baseCellClasses);
            output.push(row);
        });

        setData(output);
        setCellClasses(allCellClasses);
        setHeaderClasses(allHeaderClasses);
        setRowClasses(allRowClasses);
        setMessage(data.length === 0 ? 'No recent activity' : '');
    };

    const formatRow = (rowData, index) => {
        const link = (<SubmissionLink
            submissionId={rowData.submission_id}
            type={type}
            testSubmission={rowData.test_submission} />);
        let reportingDateString = `Start: ${rowData.reporting_start_date}\nEnd: ${rowData.reporting_end_date}`;
        if (type === 'fabs') {
            reportingDateString = `Earliest: ${rowData.reporting_start_date}\nLatest: ${rowData.reporting_end_date}`;
        }

        if (!rowData.reporting_start_date || !rowData.reporting_end_date) {
            reportingDateString = 'No reporting period specified';
        }

        const userName = Object.prototype.hasOwnProperty.call(rowData, 'user')
            ? rowData.user.name
            : '--';

        const row = [
            link,
            getAgency(rowData),
            reportingDateString,
            userName,
            <LastModifiedCell expirationDate={rowData.expiration_date} lastModified={rowData.last_modified} />
        ];

        const unpublished = rowData.publish_status === 'unpublished';
        const certfied = rowData.certified;
        let deleteCol = false;
        let canDelete = false;
        if (type === 'fabs') {
            deleteCol = PermissionsHelper.checkFabsPermissions(session);
            canDelete = PermissionsHelper.checkFabsAgencyPermissions(
                session,
                rowData.agency
            );
        }
        else {
            row.push(
                <Status.SubmissionStatus status={rowData.rowStatus} published={!unpublished} certified={certfied} />
            );

            deleteCol = PermissionsHelper.checkPermissions(session);
            canDelete = PermissionsHelper.checkAgencyPermissions(session, rowData.agency);
        }

        if (deleteCol) {
            if (canDelete && unpublished) {
                const deleteConfirm = deleteIndex !== -1 && index === deleteIndex;
                row.push(
                    <DeleteLink
                        submissionId={rowData.submission_id}
                        index={index}
                        warning={deleteWarning}
                        confirm={deleteConfirm}
                        reload={reload}
                        item={rowData}
                        account={session.user} />
                );
            }
            else {
                row.push('N/A');
            }
        }
        return row;
    };

    const sortTable = (direction, column) => {
        // the table sorting changed
        let dir = direction;
        // When sorting by agency/filename in FABS, we need two directions
        if (type === 'fabs' && column === 1) {
            dir = [direction, direction];
        }
        setSortDirection(dir);
        setSortColumn(column);
    };

    return (
        <div className="usa-da-recent-activity">
            <FormattedTable
                headers={getHeaders()}
                data={data}
                cellClasses={cellClasses}
                headerClasses={headerClasses}
                rowClasses={rowClasses}
                unsortable={[0, 2, 5, 6]}
                onSort={sortTable} />
            <div className="text-center">{message}</div>
        </div>
    );
};

RecentActivityTable.propTypes = propTypes;
export default RecentActivityTable;
