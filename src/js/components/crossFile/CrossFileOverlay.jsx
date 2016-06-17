/**
  * CrossFileOverlay.jsx
  * Created by Kevin Li 6/16/16
  **/
import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const defaultProps = {
	errors: ['error'],
	allowUpload: true
};

export default class CrossFileOverlay extends React.Component {

	pressedNext(e) {
		e.preventDefault();
	}

	isUploadingFiles() {
		if (Object.keys(this.props.submission.files).length > 0) {
			return true;
		}
		return false;
	}

	render() {

		let icon = <Icons.ExclamationCircle />;

		let uploadButtonClass = '-disabled';
		let uploadButtonDisabled = true;

		let nextButtonClass = ' hide';
		let nextButtonDisabled = true;

		let hideButtons = '';

		if (this.props.allowUpload) {
			uploadButtonDisabled = false;
			uploadButtonClass = ' btn-primary';
		}


		let message = 'You must the correct the cross-file validation errors listed above.';

		if (this.props.errors.length == 0) {
			icon = <Icons.CheckCircle />;
			message = 'Your files have been successfully cross-validated.';
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

		if (this.props.loading) {
			uploadButtonDisabled = true;
			uploadButtonClass = ' hide';
			nextButtonClass = ' hide';
			nextButtonDisabled = true;
			icon = null;
			message = 'Gathering data...';
			hideButtons = ' hide';

		}

		return (
			<div className="center-block usa-da-validation-overlay">
				<div className="container">
					<div className="row">
						<div className="col-md-8 usa-da-overlay-content-wrap">
							<div className="row full-row">
								<div className="col-sm-2 col-lg-1 usa-da-icon">
									{icon}
								</div>
								<div className="col-sm-10 col-lg-11">
									<h6>{message}</h6>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className={'usa-da-btn-bg' + hideButtons}>
								<button className={"usa-da-button" + uploadButtonClass} disabled={uploadButtonDisabled} onClick={this.props.uploadFiles}>{buttonText}</button>
								<button className={"usa-da-validation-overlay-review usa-da-button" + nextButtonClass} disabled={nextButtonDisabled} onClick={this.pressedNext.bind(this)}>Next</button>
							</div>
						</div>
					</div>
				</div>
            </div>
		);
	}
}

CrossFileOverlay.defaultProps = defaultProps;