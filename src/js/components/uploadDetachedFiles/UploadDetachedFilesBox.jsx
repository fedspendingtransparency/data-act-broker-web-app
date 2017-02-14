/**
* UploadDetachedFilesBox.jsx
* Created by Michael Hess
**/

import React from 'react';
import FileComponent from '../addData/FileComponent.jsx';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';

export default class UploadDetachedFilesBox extends React.Component {
	handleDateChange(file, date, dateType) {
		this.props.handleDateChange(file, date, dateType);
	}

	showError(file, header, description) {
		this.props.showError(file, header, description);
	}

	hideError(file) {
		this.props.hideError(file);
	}

	uploadFile(file) {
		this.props.uploadFile(file);
	}

	render() {
		let d2Text = "Upload D2 File";
		let loadingD2 = null;
		if (this.props.detachedAward.status == "uploading") {
			d2Text = "Uploading";
			loadingD2 = <LoadingBauble />
		}
		let d2FileUpload = <FileComponent fileTitle="File D2: Financial Assistance"
											fileTemplateName="award.csv"
											requestName="detached_award" />;

		let fileStateReady = this.props.submission.files && this.props.submission.files.detached_award && this.props.submission.files.detached_award.state === 'ready';
		let disabled = !fileStateReady || (!this.props.detachedAward.valid || this.props.detachedAward.status == "uploading");
		return (
			<div className="usa-da-upload-detached-files-box dashed-border-top">
				{d2FileUpload}
				<div className="right-align-box">
					<button className="usa-da-button btn-default" disabled={disabled} onClick={this.props.uploadFile.bind(this, "award")}>{loadingD2}{d2Text}</button>
				</div>
			</div>
		);
	}
}