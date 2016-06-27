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
						<ComparisonTable data={this.props.submission.crossFile[this.props.meta.key]} />
					</div>
					<div className="button-wrapper">
						<div className="button-list">
							<div className="download-button">
								<button className="usa-da-button btn-primary">Download Error File</button>
							</div>

							<div className="upload-buttons-wrap">
								<div className="upload-title">
									Upload Corrected Files
								</div>
								<div className="upload-progress">
									{uploadProgress}
								</div>
								<div className="upload-buttons">
									<UploadButtonContainer type={this.props.meta.firstType} fullName={this.props.meta.firstName} fileKey={this.props.meta.firstKey} />
									<UploadButtonContainer type={this.props.meta.secondType} fullName={this.props.meta.secondName} fileKey={this.props.meta.secondKey} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}