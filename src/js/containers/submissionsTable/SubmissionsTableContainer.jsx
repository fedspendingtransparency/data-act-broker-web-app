/**
  * SubmissionsTableContainer.jsx
  * Created by Kevin Li 10/21/16
  */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dashboardFilterActions from 'redux/actions/submissionsTable/stagedFiltersActions';
import { resetAppliedFilters } from 'redux/actions/submissionsTable/appliedFilterActions';

import * as SubmissionListHelper from 'helpers/submissionListHelper';

import SubmissionsTableContent from 'components/submissionsTable/SubmissionsTableContent';

const combinedActions = Object.assign({}, dashboardFilterActions, {
    resetAppliedFilters
});

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs']),
    toggleDashboardFilter: PropTypes.func,
    updateDashboardObjectFilter: PropTypes.func,
    updateDashboardStringFilter: PropTypes.func,
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    resetDashboardFilters: PropTypes.func,
    resetAppliedFilters: PropTypes.func
};

const SubmissionsTableContainer = ({
    type = 'dabs',
    toggleDashboardFilter = null,
    updateDashboardObjectFilter = null,
    updateDashboardStringFilter = null,
    stagedFilters = {},
    appliedFilters = {},
    resetDashboardFilters = null,
    resetAppliedFilters = null,
    ...props
}) => {
    const [activeLoading, setActiveLoading] = useState(true);
    const [publishedLoading, setPublishedLoading] = useState(true);
    const [activeError, setActiveError] = useState('');
    const [publishedError, setPublishedError] = useState('');
    const [activeTotal, setActiveTotal] = useState(0);
    const [publishedTotal, setPublishedTotal] = useState(0);
    const [activeSubmissions, setActiveSubmissions] = useState([]);
    const [publishedSubmissions, setPublishedSubmissions] = useState([]);
    const [activeMinDateLastModified, setActiveMinDateLastModified] = useState('');
    const [publishedMinDateLastModified, setPublishedMinDateLastModified] = useState('');

    useEffect(() => {
        return () => {
            resetDashboardFilters({
                dashboard: type
            });
            resetAppliedFilters({
                dashboard: type
            });
        };
    }, []);

    useEffect(() => {
        loadTableData();
    }, [type]);

    const loadTableData = (page = 1, published = false, category = 'modified', order = 'desc', currAppliedFilters) => {
    /**
        Sortable fields: Valid values for category
        'modified','reporting_start','status','agency','submitted_by'
        */
        // Generate the filter params
        const filters = {};

        if (currAppliedFilters) {
            if (currAppliedFilters.submissionIds && currAppliedFilters.submissionIds.length > 0) {
                filters.submission_ids = currAppliedFilters.submissionIds;
            }
            if (currAppliedFilters.fileNames && currAppliedFilters.fileNames.length > 0) {
                filters.file_names = currAppliedFilters.fileNames;
            }
            if (currAppliedFilters.agencies && currAppliedFilters.agencies.length > 0) {
                filters.agency_codes = currAppliedFilters.agencies.map((agency) => agency.code);
            }

            if (currAppliedFilters.createdBy && currAppliedFilters.createdBy.length > 0) {
                filters.user_ids = currAppliedFilters.createdBy.map((createdByNames) => createdByNames.userId);
            }

            if (currAppliedFilters.lastDateModified && currAppliedFilters.lastDateModified.endDate) {
                filters.last_modified_range = {
                    start_date: currAppliedFilters.lastDateModified.startDate,
                    end_date: currAppliedFilters.lastDateModified.endDate
                };
            }

            if (currAppliedFilters.submissionType && currAppliedFilters.submissionType !== '') {
                filters.submission_type = currAppliedFilters.submissionType;
            }
        }

        if (published) {
            setPublishedLoading(true);
            setPublishedError('');
            setPublishedSubmissions([]);
        }
        else {
            setActiveLoading(true);
            setActiveError('');
            setActiveSubmissions([]);
        }

        SubmissionListHelper.loadSubmissionList(page, 10, published, category, order, type === 'fabs', filters)
            .then((res) => {
                const data = {
                    submissions: SubmissionListHelper.parseRecentActivity(res.data.submissions),
                    total: res.data.total,
                    min_last_modified: res.data.min_last_modified
                };
                if (published) {
                    setPublishedTotal(data.total);
                    setPublishedSubmissions(data.submissions);
                    setPublishedLoading(false);
                    setPublishedMinDateLastModified(data.min_last_modified);
                }
                else {
                    setActiveTotal(data.total);
                    setActiveSubmissions(data.submissions);
                    setActiveLoading(false);
                    setActiveMinDateLastModified(data.min_last_modified);
                }
            })
            .catch((error) => {
                if (published) {
                    setPublishedTotal(0);
                    setPublishedSubmissions([]);
                    setPublishedLoading(false);
                    setPublishedMinDateLastModified('');
                    setPublishedError(error.message);
                }
                else {
                    setActiveTotal(0);
                    setActiveSubmissions([]);
                    setActiveLoading(false);
                    setActiveMinDateLastModified('');
                    setActiveError(error.message);
                }
            });
    };

    return (
        <SubmissionsTableContent
            loadTableData={loadTableData}
            activeSubmissions={activeSubmissions}
            publishedSubmissions={publishedSubmissions}
            type={type}
            activeTotal={activeTotal}
            publishedTotal={publishedTotal}
            activeLoading={activeLoading}
            publishedLoading={publishedLoading}
            activeError={activeError}
            publishedError={publishedError}
            toggleDashboardFilter={toggleDashboardFilter}
            updateDashboardObjectFilter={updateDashboardObjectFilter}
            updateDashboardStringFilter={updateDashboardStringFilter}
            activeMinDateLastModified={activeMinDateLastModified}
            publishedMinDateLastModified={publishedMinDateLastModified}
            stagedFilters={stagedFilters}
            appliedFilters={appliedFilters}
            {...props} />
    );
};

SubmissionsTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        session: state.session,
        stagedFilters: state.submissionsTableFilters,
        appliedFilters: state.appliedSubmissionsTableFilters
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(SubmissionsTableContainer);
