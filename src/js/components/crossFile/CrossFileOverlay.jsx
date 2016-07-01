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
		if (!_.isEqual(prevProps.submission.files, this.props.submission.files)) {
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
		// check if at least one file is staged for upload for each error pair

		for (let key in this.props.submission.crossFile) {
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