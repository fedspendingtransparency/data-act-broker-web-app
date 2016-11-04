/**
  * DashboardContainer.jsx
  * Created by Kevin Li 10/21/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
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
            certifiedSubmissions: []
        };
    }

    loadTableData(page = 1, certified = false) {
        let tableName = 'active';
        if (certified) {
            tableName = 'certified';
        }

        this.setState({
            [tableName + 'Loading']: true
        }, () => {
             SubmissionListHelper.loadSubmissionList(page, 10, certified)
                .then((data) => {
                    this.setState({
                        [tableName + 'Total']: data.total,
                        [tableName + 'Submissions']: data.submissions,
                        [tableName + 'Loading']: false
                    });
                })
        })
    }

	render() {
		return (
			<DashboardContent {...this.state} loadTableData={this.loadTableData.bind(this)} />
		)
	}
}

export default connect(
	state => ({ session: state.session })
)(DashboardContainer)