/**
  * DashboardContainer.jsx
  * Created by Kevin Li 10/21/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class DashboardContainer extends React.Component {
	render() {
		return (
			<div />
		)
	}
}

export default connect(
	state => ({ session: state.session })
)(DashboardContainer)