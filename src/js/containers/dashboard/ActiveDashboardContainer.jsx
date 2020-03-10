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

const propTypes = {
    appliedFilters: PropTypes.object
};

const ActiveDashboardContainer = (props) => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

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
            certified: 'false'
        })
            .then((data) => {
                setResults(data.submissions);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [props.appliedFilters.filters.active]);

    if (loading) {
        return (<p>Loading...</p>);
    }
    if (results.length === 0 || error) {
        return (<NoResultsMessage />);
    }
    if (results.length === 1) {
        return (<ActiveDashboard submissionID={results[0].submission_id} />);
    }
    return (<p>Table here</p>);
};

ActiveDashboardContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters
    }),
)(ActiveDashboardContainer);
