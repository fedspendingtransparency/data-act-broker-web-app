/**
 * ActiveDashboardContainer.jsx
 * Created by Lizzie Salita 3/9/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSubmissions } from 'helpers/dashboardHelper';
import ActiveDashboard from 'components/dashboard/ActiveDashboard';
import NoResultsMessage from 'components/dashboard/NoResultsMessage';
import LoadingMessage from 'components/dashboard/LoadingMessage';
import SelectSubmissionTable from 'components/dashboard/SelectSubmissionTable';

const propTypes = {
    appliedFilters: PropTypes.object
};

const ActiveDashboardContainer = (props) => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submission, setSubmission] = useState('');
    const [sort, setSort] = useState('reporting_start');
    const [order, setOrder] = useState('desc');
    const [limit, changeLimit] = useState(10);
    const [page, changePage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setLoading(true);
        const filters = props.appliedFilters.filters.active;
        const payload = {
            agency_codes: [filters.agency],
            file_names: [filters.file]
        };
        if (filters.lastModified.start || filters.lastModified.end) {
            payload.last_modified_range = {
                start_date: filters.lastModified.start,
                end_date: filters.lastModified.end
            };
        }
        if (filters.submissionId) {
            payload.submission_ids = [filters.submissionId];
        }
        if (filters.createdBy.id) {
            payload.user_ids = [filters.createdBy.id];
        }
        fetchSubmissions({
            filters: payload,
            certified: 'false',
            sort,
            order,
            limit
        })
            .then((data) => {
                setResults(data.submissions);
                setTotalItems(data.total);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [props.appliedFilters.filters.active, sort, order, limit, page]);

    if (loading) {
        return (<LoadingMessage />);
    }
    if (totalItems === 0 || error) {
        return (<NoResultsMessage />);
    }
    if (!submission && totalItems === 1) {
        setSubmission(`${results[0].submission_id}`);
    }
    if (submission) {
        return (<ActiveDashboard submissionID={submission} />);
    }
    return (
        <SelectSubmissionTable
            results={results}
            clickedSubmission={setSubmission}
            setOrder={setOrder}
            setSort={setSort}
            sort={sort}
            order={order}
            limit={limit}
            page={page}
            changeLimit={changeLimit}
            changePage={changePage}
            totalItems={totalItems} />
    );
};

ActiveDashboardContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters
    })
)(ActiveDashboardContainer);
