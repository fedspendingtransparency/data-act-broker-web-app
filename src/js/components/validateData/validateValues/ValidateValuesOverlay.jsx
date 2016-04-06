/**
 * ValidateValuesOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';
import { hashHistory } from 'react-router';

const defaultProps = {
	allowUpload: false
};

export default class ValidateValuesOverlay extends React.Component {

	constructor(props) {
		super(props);
	}

	pressedNext(e) {

		hashHistory.push('/reviewData/' + this.props.submission.id);

	}

	render() {

		let buttonDisabled = ' disabled';
		let nextButton = ' hide';
		if (this.props.allowUpload) {
			buttonDisabled = '';
		}

		let buttonText = 'Upload Corrected CSV Files';
		if (this.props.submission.state == 'uploading') {
			buttonDisabled = ' disabled';
			buttonText = 'Uploading files...';
		}

		let message = 'You must fix the Critical Errors found in ' + this.props.errors.length + ' of the .CSV files before moving on to the next step. View and download individual reports above.';

		if (this.props.errors.length == 0) {
			message = 'No Critical Errors were found in the .CSV files. Click Review to review and publish these files.';
			buttonDisabled = ' hide';
			nextButton = '';
		}


		return (
			<div className="usa-da-validation-overlay">
				<div className="row">
					<div className="col-md-6 col-md-offset-2">
						{message}
					</div>
					<div className="col-md-4 center-block">
						<button className={"btn btn-primary" + buttonDisabled} onClick={this.props.uploadFiles}>{buttonText}</button>
						<button className={"btn btn-primary" + nextButton} onClick={this.pressedNext.bind(this)}>Review</button>
					</div>
				</div>
            </div>
		);
	}
}

ValidateValuesOverlay.defaultProps = defaultProps;
