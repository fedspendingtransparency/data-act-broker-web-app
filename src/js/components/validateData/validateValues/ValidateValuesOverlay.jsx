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

		let uploadButtonClass = '-disabled';
		let uploadButtonDisabled = true;

		let nextButtonClass = ' hide';
		let nextButtonDisabled = true;
		if (this.props.allowUpload) {
			uploadButtonDisabled = false;
			uploadButtonClass = '';
		}

		let buttonText = 'Upload Corrected CSV Files';
		if (this.props.submission.state == 'uploading') {
			uploadButtonDisabled = true;
			uploadButtonClass = '-disabled';
			buttonText = 'Uploading files...';
		}

		let message = 'You must fix the Critical Errors found in ' + this.props.errors.length + ' of the .CSV files before moving on to the next step. View and download individual reports above.';

		if (this.props.errors.length == 0) {
			message = 'No Critical Errors were found in the .CSV files. Click Review to review and publish these files.';
			buttonDisabled = ' hide';
			nextButtonClass = '';
			nextButtonDisabled = false;
		}


		return (
			<div className="usa-da-validation-overlay">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-2">
						<div className="row">
							<div className="col-xs-2 col-md-1 usa-da-icon-exclamation-circle usa-da-alert-icon" />
							<div className="col-xs-10 col-md-11">
								{message}
							</div>
						</div>
					</div>
					<div className="col-sm-4 center-block">
						<button className={"usa-button" + uploadButtonClass} disabled={uploadButtonDisabled} onClick={this.props.uploadFiles}>{buttonText}</button>
						<button className={"usa-button" + nextButtonClass} disabled={nextButtonDisabled} onClick={this.pressedNext.bind(this)}>Review</button>
					</div>
				</div>
            </div>
		);
	}
}

ValidateValuesOverlay.defaultProps = defaultProps;
