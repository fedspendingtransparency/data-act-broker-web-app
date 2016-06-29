/**
  * ErrorBox.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import ComparisonTable from './ComparisonTable.jsx';
import FileProgress from '../../SharedComponents/FileProgress.jsx';
import UploadButtonContainer from '../../../containers/crossFile/CrossFileUploadButtonContainer.jsx';
import FileWarning from './FileWarning.jsx';

import * as ReviewHelper from '../../../helpers/reviewHelper.js';

export default class ErrorBox extends React.Component {
	
	stagedFiles() {
		let leftFile = this.props.submission.files[this.props.meta.firstKey];
		let rightFile = this.props.submission.files[this.props.meta.secondKey];

		const stagedFiles = [];
		if (leftFile) {
			stagedFiles.push(this.props.meta.firstKey);
		}

		if (rightFile) {
			stagedFiles.push(this.props.meta.secondKey);
		}

		return stagedFiles;
	}

	fileProgress() {
		let leftFile = this.props.submission.files[this.props.meta.firstKey];
		let rightFile = this.props.submission.files[this.props.meta.secondKey];

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

		let warning = null;
		const stagedFiles = this.stagedFiles();
		if (stagedFiles.length > 0) {
			warning = <FileWarning files={stagedFiles} {...this.props} />
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
									{warning}
									<UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.firstKey]} fileKey={this.props.meta.firstKey} pair={this.props.meta.key} />
									<UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.secondKey]} fileKey={this.props.meta.secondKey} pair={this.props.meta.key} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}