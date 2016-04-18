/**
  * RegisterEmailContainer.jsx
  * Created by Kevin Li 4/18/2016
  */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { kGlobalConstants } from '../../GlobalConstants.js';
import RegisterEmailPage from '../../components/registration/RegisterEmailPage.jsx';

import * as registrationActions from '../../redux/actions/registrationActions.js';

class RegisterEmailContainer extends React.Component {
	render() {

		return (
			<RegisterEmailPage {...this.props} />
		);
	}
}

export default connect(
	state => ({ registration: state.registration }),
	dispatch => bindActionCreators(registrationActions, dispatch)
)(RegisterEmailContainer)