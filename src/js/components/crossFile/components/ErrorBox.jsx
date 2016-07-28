/**
  * ErrorBox.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import _ from 'lodash';
import ComparisonTable from './ComparisonTable.jsx';
import FileProgress from '../../SharedComponents/FileProgress.jsx';
import UploadButtonContainer from '../../../containers/crossFile/CrossFileUploadButtonContainer.jsx';
import FileWarning from './FileWarning.jsx';

import * as ReviewHelper from '../../../helpers/reviewHelper.js';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

export default class ErrorBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstType: '',
			secondType: '',
			stagedFiles: []
		};
	}

	componentDidMount() {
		this.stagedFiles();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(prevProps.submission.files,this.props.submission.files)) {
			this.stagedFiles();
		}
	}

	clickedDownload(e) {
		e.preventDefault();
		const url = this.props.meta.report;
		window.open(url, '_blank');
	}

	
	stagedFiles() {
		let leftFile = this.props.submission.files[this.props.meta.firstKey];
		let rightFile = this.props.submission.files[this.props.meta.secondKey];

		const stagedFiles = [];
		let firstType = '';
		let secondType = '';

		if (leftFile) {
			stagedFiles.push(this.props.meta.firstKey);
			secondType = 'optional';
		}

		if (rightFile) {
			stagedFiles.push(this.props.meta.secondKey);
			if (stagedFiles.length == 1) {
				firstType = 'optional';
			}
		}

		this.setState({
			firstType: firstType,
			secondType: secondType,
			stagedFiles: stagedFiles
		});
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
		if (this.state.stagedFiles.length > 0) {
			warning = <FileWarning files={this.state.stagedFiles} {...this.props} />
		}


		return (
			<div className="col-md-12">
				<div className="error-box">
					<div className="vertical-line" />
					<div className="row">
						<div className="col-xs-6 col-md-6">
							<h6>Cross-File Validation Errors</h6>
						</div>
						<div className="col-xs-6 col-md-3 mr-0">
            	            <a href="#" className="usa-da-download pull-right" onClick={this.clickedDownload.bind(this)}>
            	                <span className="usa-da-icon usa-da-download-report"><Icons.CloudDownload /></span>Download Error Report
            	            </a>
            	        </div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-8 col-md-9">
							<ComparisonTable data={this.props.submission.crossFile[this.props.meta.key]} />
						</div>
						<div className="col-xs-12 col-sm-4 col-md-3">
								<div className="button-list">
								<div className="row">
									<div className="col-md-12">
										<div className="upload-title">
											Upload Corrected Files
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-12">
										<div className="upload-progress">
											{uploadProgress}
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-12">
										{warning}
									</div>
								</div>

								<div className="row mb-10">
									<div className="col-md-12">
										<UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.firstKey]} fileKey={this.props.meta.firstKey} pair={this.props.meta.key} type={this.state.firstType} />
									</div>
								</div>

								<div className="row">
									<div className="col-md-12">
										<UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.secondKey]} fileKey={this.props.meta.secondKey} pair={this.props.meta.key} type={this.state.secondType} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}