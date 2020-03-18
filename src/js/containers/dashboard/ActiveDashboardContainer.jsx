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
            order
        })
            .then((data) => {
                setResults(data.submissions);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [props.appliedFilters.filters.active, sort, order]);

    if (loading) {
        return (<LoadingMessage />);
    }
    if (results.length === 0 || error) {
        return (<NoResultsMessage />);
    }
    if (!submission && results.length === 1) {
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
            order={order} />
    );
};

ActiveDashboardContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters
    })
)(ActiveDashboardContainer);
