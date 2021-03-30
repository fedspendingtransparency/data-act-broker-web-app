/**
  * SubmissionsTableContainer.jsx
  * Created by Kevin Li 10/21/16
  */

import React from 'react';
import PropTypes from 'prop-types';
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

const defaultProps = {
    type: 'dabs',
    toggleDashboardFilter: null,
    updateDashboardObjectFilter: null,
    updateDashboardStringFilter: null,
    stagedFilters: {},
    appliedFilters: {},
    resetDashboardFilters: null,
    resetAppliedFilters: null
};

export class SubmissionsTableContainer extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            activeLoading: true,
            publishedLoading: true,
            activeError: '',
            publishedError: '',
            activeTotal: 0,
            publishedTotal: 0,
            activeSubmissions: [],
            publishedSubmissions: [],
            activeMinDateLastModified: '',
            publishedMinDateLastModified: ''
        };

        this.loadTableData = this.loadTableData.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
            this.loadTableData();
        }
    }

    componentWillUnmount() {
        this.props.resetDashboardFilters({
            dashboard: this.props.type
        });
        this.props.resetAppliedFilters({
            dashboard: this.props.type
        });
    }

    loadTableData(page = 1, published = false, category = 'modified', order = 'desc', appliedFilters) {
    /**
        Sortable fields: Valid values for category
        'modified','reporting_start','status','agency','submitted_by'
        */
        let tableName = 'active';
        if (published) {
            tableName = 'published';
        }

        // Generate the filter params
        const filters = {};

        if (appliedFilters) {
            if (appliedFilters.submissionIds && appliedFilters.submissionIds.length > 0) {
                filters.submission_ids = appliedFilters.submissionIds;
            }
            if (appliedFilters.fileNames && appliedFilters.fileNames.length > 0) {
                filters.file_names = appliedFilters.fileNames;
            }
            if (appliedFilters.agencies && appliedFilters.agencies.length > 0) {
                filters.agency_codes = appliedFilters.agencies.map((agency) => agency.code);
            }

            if (appliedFilters.createdBy && appliedFilters.createdBy.length > 0) {
                filters.user_ids = appliedFilters.createdBy.map((createdByNames) => createdByNames.userId);
            }

            if (appliedFilters.lastDateModified && appliedFilters.lastDateModified.endDate) {
                filters.last_modified_range = {
                    start_date: appliedFilters.lastDateModified.startDate,
                    end_date: appliedFilters.lastDateModified.endDate
                };
            }

            if (appliedFilters.submissionType && appliedFilters.submissionType !== '') {
                filters.submission_type = appliedFilters.submissionType;
            }
        }

        this.setState({
            [`${tableName}Loading`]: true,
            [`${tableName}Error`]: '',
            [`${tableName}Submissions`]: []
        });

        SubmissionListHelper.loadSubmissionList(page, 10, published, category, order,
            this.props.type === 'fabs', filters)
            .then((data) => {
                this.setState({
                    [`${tableName}Total`]: data.total,
                    [`${tableName}Submissions`]: data.submissions,
                    [`${tableName}Loading`]: false,
                    [`${tableName}MinDateLastModified`]: data.min_last_modified
                });
            })
            .catch((error) => {
                this.setState({
                    [`${tableName}Total`]: 0,
                    [`${tableName}Submissions`]: [],
                    [`${tableName}Loading`]: false,
                    [`${tableName}Error`]: error.message,
                    [`${tableName}MinDateLastModified`]: ''
                });
            });
    }

    render() {
        return (
            <SubmissionsTableContent
                {...this.state}
                {...this.props}
                loadTableData={this.loadTableData} />
        );
    }
}

SubmissionsTableContainer.propTypes = propTypes;
SubmissionsTableContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        session: state.session,
        stagedFilters: state.submissionsTableFilters,
        appliedFilters: state.appliedSubmissionsTableFilters
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(SubmissionsTableContainer);
