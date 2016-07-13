/**
  * CrossFileOverlay.jsx
  * Created by Kevin Li 6/16/16
  **/
import React from 'react';
import _ from 'lodash';
import { hashHistory } from 'react-router';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const defaultProps = {
	errors: ['error'],
	loading: true
};

export default class CrossFileOverlay extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			allowUpload: false
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(prevProps.submission.files, this.props.submission.files) || !_.isEqual(prevProps.submission.crossFile, this.props.submission.crossFile)) {
			this.setState({
				allowUpload: this.isReadyForUpload()
			});
		}
	}

	pressedNext(e) {
		e.preventDefault();
		hashHistory.push('/reviewData/' + this.props.submission.id);
	}

	isUploadingFiles() {
		if (Object.keys(this.props.submission.files).length > 0) {
			return true;
		}
		return false;
	}

	isReadyForUpload() {

		const expectedPairs = [];
		for (let pair of this.props.submission.crossFileOrder) {
			expectedPairs.push(pair.key);
		}

		for (let key in this.props.submission.crossFile) {

			// check if this is a valid cross-file pair
			if (_.indexOf(expectedPairs, key) == -1) {
				continue;
			}
			
			const firstKey = key.split('-')[0];
			const secondKey = key.split('-')[1];

			if (!this.props.submission.files.hasOwnProperty(firstKey) && !this.props.submission.files.hasOwnProperty(secondKey)) {
				// neither file in the pair is staged for upload, submission isn't ready for re-upload
				return false;
			}
		}

		// if we hit this point, the files are ready
		return true;
	}

	render() {

		let icon = <Icons.ExclamationCircle />;

		let uploadButtonClass = '-disabled';
		let uploadButtonDisabled = true;

		let nextButtonClass = ' hide';
		let nextButtonDisabled = true;

		let hideButtons = '';
		let hideHelpText = ' hide';

		if (this.state.allowUpload) {
			uploadButtonDisabled = false;
			uploadButtonClass = ' btn-primary';
		}


		let message = 'You must the correct the cross-file validation errors listed above.';

		if (Object.keys(this.props.submission.crossFile).length == 0) {
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
			nextButtonDisabled = true;
			nextButtonClass = '-disabled';
			buttonText = 'Uploading files...';
		}
		else if (this.props.submission.state == 'prepare') {
			uploadButtonDisabled = true;
			uploadButtonDisabled = '-disabled';
			nextButtonDisabled = true;
			nextButtonClass = '-disabled';
			buttonText = 'Gathering data...';
		}

		if (this.props.loading) {
			uploadButtonDisabled = true;
			uploadButtonClass = ' hide';
			nextButtonClass = ' hide';
			nextButtonDisabled = true;
			icon = null;
			message = 'Your files are being validated.';
			hideButtons = ' hide';
			hideHelpText = '';
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
									<div className={"overlay-help-text" + hideHelpText}>
										You can return to this page at any time to check the validation status by using this link:<br />
										<a href={window.location.href}>{window.location.href}</a>
									</div>
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