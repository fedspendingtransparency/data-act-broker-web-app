/**
  * RegisterTokenContainer.jsx
  * Created by Kevin Li 4/17/2016
  */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { kGlobalConstants } from '../../GlobalConstants.js';
import RegisterTokenPage from '../../components/registration/RegisterTokenPage.jsx';

import * as registrationActions from '../../redux/actions/registrationActions.js';

class RegisterTokenContainer extends React.Component {
	render() {

		return (
			<RegisterTokenPage {...this.props} />
		);
	}
}

export default connect(
	state => ({ registration: state.registration }),
	dispatch => bindActionCreators(registrationActions, dispatch)
)(RegisterTokenContainer)