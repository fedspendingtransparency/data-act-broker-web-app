/**
  * DetachedDashboardContainer.jsx
  * Created by Daniel Boos 6/29/17
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SubmissionListHelper from '../../helpers/submissionListHelper.js';

import DetachedDashboardContent from '../../components/detachedDashboard/DetachedDashboardContent.jsx';

class DetachedDashboardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeLoading: true,
            certifiedLoading: true,
            activeTotal: 0,
            certifiedTotal: 0,
            activeSubmissions: []
        };
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
             SubmissionListHelper.loadSubmissionList(page, 10, certified, category, order, true)
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
			<DetachedDashboardContent {...this.state} {...this.props} loadTableData={this.loadTableData.bind(this)} />
		)
	}
}

export default connect(
	state => ({ session: state.session })
)(DetachedDashboardContainer)