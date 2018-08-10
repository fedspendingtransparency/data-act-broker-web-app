/**
  * DashboardContainer.jsx
  * Created by Kevin Li 10/21/16
  */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dashboardFilterActions from '../../redux/actions/dashboardFilterActions';

import * as SubmissionListHelper from '../../helpers/submissionListHelper';

import DashboardContent from '../../components/dashboard/DashboardContent';

const propTypes = {
    type: PropTypes.string,
    updateDashboardFilter: PropTypes.func,
    resetDashboardFilters: PropTypes.func,
    currentFilters: PropTypes.object
};

const defaultProps = {
    type: ""
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

    loadTableData(page = 1, certified = false, category = 'modified', order = 'desc') {
        /**
        Sortable fields: Valid values for category
        'modified','reporting','status','agency','submitted_by'
        */
        let tableName = 'active';
        if (certified) {
            tableName = 'certified';
        }

        this.setState({
            [tableName + 'Loading']: true
        }, () => {
            SubmissionListHelper.loadSubmissionList(page, 10, certified, category, order, this.state.type === 'fabs')
                .then((data) => {
                    this.setState({
                        [tableName + 'Total']: data.total,
                        [tableName + 'Submissions']: data.submissions,
                        [tableName + 'Loading']: false
                    });
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
        currentFilters: state.dashboardFilters
    }),
    (dispatch) => bindActionCreators(dashboardFilterActions, dispatch)
)(DashboardContainer);
