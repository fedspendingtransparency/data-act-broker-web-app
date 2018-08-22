/**
  * DashboardContainer.jsx
  * Created by Kevin Li 10/21/16
  */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dashboardFilterActions from '../../redux/actions/dashboard/dashboardFilterActions';
import * as appliedFilterActions from '../../redux/actions/dashboard/appliedFilterActions';

import * as SubmissionListHelper from '../../helpers/submissionListHelper';

import DashboardContent from '../../components/dashboard/DashboardContent';

const combinedActions = Object.assign({}, dashboardFilterActions, appliedFilterActions);

const propTypes = {
    type: PropTypes.string,
    updateDashboardFilter: PropTypes.func,
    toggleDashboardFilter: PropTypes.func,
    resetDashboardFilters: PropTypes.func,
    setAppliedFilterCompletion: PropTypes.func,
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object
};

const defaultProps = {
    type: "",
    updateDashboardFilter: null,
    toggleDashboardFilter: null,
    resetDashboardFilters: null,
    setAppliedFilterCompletion: null,
    stagedFilters: {},
    appliedFilters: {}
};

class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            activeLoading: true,
            certifiedLoading: true,
            activeTotal: 0,
            certifiedTotal: 0,
            activeSubmissions: [],
            certifiedSubmissions: [],
            type: this.props.type
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.state.type) {
            this.setState({ type: nextProps.type });
        }
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
        const filters = {
            submissionIds: appliedFilters.submissionIds
        };

        this.setState({
            [tableName + 'Loading']: true
        });

        SubmissionListHelper.loadSubmissionList(
            page, 10, certified, category, order, this.state.type === 'fabs', filters)
            .then((data) => {
                this.setState({
                    [tableName + 'Total']: data.total,
                    [tableName + 'Submissions']: data.submissions,
                    [tableName + 'Loading']: false
                });
                this.props.setAppliedFilterCompletion({
                    complete: true,
                    dashboard: this.props.type,
                    table: tableName
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
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(DashboardContainer);
