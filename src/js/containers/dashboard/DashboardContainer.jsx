/**
  * DashboardContainer.jsx
  * Created by Kevin Li 10/21/16
  **/

import React from 'react';
import { connect } from 'react-redux';

import * as SubmissionListHelper from '../../helpers/submissionListHelper.js';

import DashboardContent from '../../components/dashboard/DashboardContent.jsx';

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

    loadTableData(page = 1, certified = false, category='modified', order='desc') {
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
            <DashboardContent {...this.state} {...this.props} loadTableData={this.loadTableData.bind(this)} />
        );
    }
}

export default connect(
    (state) => ({ session: state.session })
)(DashboardContainer);
