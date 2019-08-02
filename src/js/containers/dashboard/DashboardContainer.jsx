/**
  * DashboardContainer.jsx
  * Created by Kevin Li 10/21/16
  */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dashboardFilterActions from '../../redux/actions/dashboard/dashboardFilterActions';
import { resetAppliedFilters } from '../../redux/actions/dashboard/appliedFilterActions';

import * as SubmissionListHelper from '../../helpers/submissionListHelper';

import DashboardContent from '../../components/dashboard/DashboardContent';

const combinedActions = Object.assign({}, dashboardFilterActions, {
    resetAppliedFilters
});

const propTypes = {
    type: PropTypes.string,
    toggleDashboardFilter: PropTypes.func,
    updateDashboardFilter: PropTypes.func,
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    resetDashboardFilters: PropTypes.func,
    resetAppliedFilters: PropTypes.func
};

const defaultProps = {
    type: '',
    toggleDashboardFilter: null,
    updateDashboardFilter: null,
    stagedFilters: {},
    appliedFilters: {},
    resetDashboardFilters: null,
    resetAppliedFilters: null
};

export class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            activeLoading: true,
            certifiedLoading: true,
            activeTotal: 0,
            certifiedTotal: 0,
            activeSubmissions: [],
            certifiedSubmissions: [],
            activeMinDateLastModified: '',
            certifiedMinDateLastModified: '',
            type: this.props.type
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.state.type) {
            this.setState({ type: nextProps.type });
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

    loadTableData(page = 1, certified = false, category = 'modified', order = 'desc', appliedFilters) {
    /**
        Sortable fields: Valid values for category
        'modified','reporting','status','agency','submitted_by'
        */
        let tableName = 'active';
        if (certified) {
            tableName = 'certified';
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
        }

        this.setState({
            [`${tableName}Loading`]: true
        });

        SubmissionListHelper.loadSubmissionList(page, 10, certified, category, order,
            this.state.type === 'fabs', filters)
            .then((data) => {
                this.setState({
                    [`${tableName}Total`]: data.total,
                    [`${tableName}Submissions`]: data.submissions,
                    [`${tableName}Loading`]: false,
                    [`${tableName}MinDateLastModified`]: data.min_last_modified
                });
            });
    }

    render() {
        return (
            <DashboardContent
                {...this.state}
                {...this.props}
                loadTableData={this.loadTableData.bind(this)} />
        );
    }
}

DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        session: state.session,
        stagedFilters: state.dashboardFilters,
        appliedFilters: state.appliedDashboardFilters
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch),
)(DashboardContainer);
