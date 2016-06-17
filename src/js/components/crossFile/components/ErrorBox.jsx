/**
  * ErrorBox.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import ComparisonTable from './ComparisonTable.jsx';
import FileProgress from '../../SharedComponents/FileProgress.jsx';
import UploadButtonContainer from '../../../containers/crossFile/CrossFileUploadButtonContainer.jsx';

export default class ErrorBox extends React.Component {
	
	isUploading() {
		// check if the files are staged for upload
		if (this.props.submission.files.hasOwnProperty(this.props.leftFileName) && this.props.submission.files.hasOwnProperty(this.props.rightFileName)) {
			// they are staged, check if they have started uploading
			const leftFile = this.props.submission.files[this.props.leftFileName];
			const rightFile = this.props.submission.files[this.props.rightFileName];

			if (leftFile.state == 'uploading' || rightFile.state == 'uploading') {
				return true;
			}
			else {
				return false;
			}
		}

		return false;
	}

	fileProgress() {
		const leftFile = this.props.submission.files[this.props.leftFileName];
		const rightFile = this.props.submission.files[this.props.rightFileName];
		
		return (leftFile.progress + rightFile.progress) / 2;
	}

	render() {

		let uploadProgress = null;

		if (this.isUploading()) {
			uploadProgress = <FileProgress fileStatus={this.fileProgress()} />
		}

		return (
			<div className="error-box">
				<div className="vertical-line" />
				<h6>Cross-File Validation Errors</h6>
				<div className="error-content">
					<div className="table-wrapper">
						<ComparisonTable />
					</div>
					<div className="button-wrapper">
						<div className="button-list">
							<div className="download-button">
								<button className="usa-button-primary">Download Error File</button>
							</div>

							<div className="upload-buttons-wrap">
								<div className="upload-title">
									Upload Corrected Files
								</div>
								<div className="upload-progress">
									{uploadProgress}
								</div>
								<div className="upload-buttons">
									<UploadButtonContainer text="File A: Appropriations Account" fileKey={this.props.leftFileName} />
									<UploadButtonContainer text="File B: Program Activity and Object Class" fileKey={this.props.rightFileName} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}