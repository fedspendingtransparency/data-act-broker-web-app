/**
  * ErrorBox.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import ComparisonTable from './ComparisonTable.jsx';
import FileProgress from '../../SharedComponents/FileProgress.jsx';
import UploadButtonContainer from '../../../containers/crossFile/CrossFileUploadButtonContainer.jsx';

export default class ErrorBox extends React.Component {
	
	fileProgress() {
		let leftFile = this.props.submission.files[this.props.leftFileName];
		let rightFile = this.props.submission.files[this.props.rightFileName];

		let fileCount = 2;

		if (!leftFile) {
			leftFile = {
				progress: 0
			};
			fileCount = 1;
		}
		else if (!rightFile) {
			rightFile = {
				progress: 0
			};
			fileCount = 1;
		}
		
		return (leftFile.progress + rightFile.progress) / fileCount;
	}

	render() {

		let uploadProgress = null;

		if (this.props.submission.state == 'uploading') {
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
									<UploadButtonContainer type="A" fullName="Appropriations Account" fileKey={this.props.leftFileName} />
									<UploadButtonContainer type="B" fullName="Program Activity and Object Class" fileKey={this.props.rightFileName} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}