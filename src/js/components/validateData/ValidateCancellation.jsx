/**
  * ValidateCancellation.jsx
  * Created by Kevin Li 4/11/2016
  */

import React from 'react';

export default class ValidateCancellation extends React.Component {
	render() {
		return (
			<div className="alert alert-danger" role="alert">
				Your submission has been stuck in validation for a while. Would you like to cancel and try again?
				&nbsp;&nbsp;&nbsp;
				<a href="#/addData" className="btn btn-danger">Cancel Submission</a>
			</div>
		);
	}
}