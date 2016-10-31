/**
  * DashboardContainer.jsx
  * Created by Kevin Li 10/21/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DashboardContent from '../../components/dashboard/DashboardContent';

class DashboardContainer extends React.Component {
	render() {
		return (
			<DashboardContent />
		)
	}
}

export default connect(
	state => ({ session: state.session })
)(DashboardContainer)