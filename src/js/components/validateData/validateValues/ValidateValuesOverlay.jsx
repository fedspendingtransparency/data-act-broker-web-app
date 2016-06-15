/**
 * ValidateValuesOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';
import { hashHistory } from 'react-router';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

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

	isUploadingFiles() {
		if (Object.keys(this.props.submission.files).length > 0) {
			return true;
		}
		return false;
	}

	render() {

		let uploadButtonClass = '-disabled';
		let uploadButtonDisabled = true;

		let nextButtonClass = ' hide';
		let nextButtonDisabled = true;
		if (this.props.allowUpload) {
			uploadButtonDisabled = false;
			uploadButtonClass = ' btn-primary';
		}


		let message = 'You must fix the Critical Errors found in ' + this.props.errors.length + ' of the .CSV files before moving on to the next step. View and download individual reports above.';

		if (this.props.errors.length == 0) {

			message = 'No Critical Errors were found in the .CSV files. Click Next to review and publish these files.';
			uploadButtonDisabled = true;
			uploadButtonClass = '-disabled';
			nextButtonClass = ' btn-primary';
			nextButtonDisabled = false;

			if (this.isUploadingFiles()) {
				uploadButtonDisabled = false;
				uploadButtonClass = ' btn-primary';
			}


		}

		let buttonText = 'Upload Corrected CSV Files';
		if (this.props.submission.state == 'uploading') {
			uploadButtonDisabled = true;
			uploadButtonClass = '-disabled';
			buttonText = 'Uploading files...';
		}
		else if (this.props.submission.state == 'prepare') {
			uploadButtonDisabled = true;
			uploadButtonDisabled = '-disabled';
			buttonText = 'Gathering data...';
		}


		return (
			<div className="center-block usa-da-validation-overlay">
				<div className="container">
					<div className="row">
						<div className="col-md-8 usa-da-overlay-content-wrap">
							<div className="row">
								<div className="col-xs-2 col-md-1 usa-da-icon">
									<Icons.CheckCircle />
								</div>
								<div className="col-xs-10 col-md-11">
									<h6>{message}</h6>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className='usa-da-btn-bg'>
								<button className={"usa-da-button" + uploadButtonClass} disabled={uploadButtonDisabled} onClick={this.props.uploadFiles} data-testid="validate-overlay-upload-button">{buttonText}</button>
								<button className={"usa-da-validation-overlay-review usa-da-button" + nextButtonClass} disabled={nextButtonDisabled} onClick={this.pressedNext.bind(this)} data-testid="validate-overlay-review-button">Next</button>
							</div>
						</div>
					</div>
				</div>
            </div>
		);
	}
}

ValidateValuesOverlay.defaultProps = defaultProps;
