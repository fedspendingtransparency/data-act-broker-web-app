/**
  * ErrorBox.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import _ from 'lodash';
import ComparisonTable from './ComparisonTable.jsx';
import FileProgress from '../../SharedComponents/FileProgress.jsx';
import UploadButtonContainer from '../../../containers/crossFile/CrossFileUploadButtonContainer.jsx';
import GeneratedErrorButton from './GeneratedErrorButton.jsx';
import FileWarning from './FileWarning.jsx';
import ErrorTabs from './ErrorTabs.jsx';

import * as ReviewHelper from '../../../helpers/reviewHelper.js';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const dFiles = ['d1', 'd2'];

export default class ErrorBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstType: '',
			secondType: '',
			firstButton: null,
			secondButton: null,
			stagedFiles: [],
			activeTab: 'errors',
            signInProgress: false,
            signedUrl: ''
		};
	}

	componentDidMount() {
		if (this.props.status == 'warning') {
			this.setState({
				activeTab: 'warnings'
			});
		}
		this.stagedFiles();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(prevProps.submission.files,this.props.submission.files)) {
			this.stagedFiles();
		}
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
		}, () => {
			this.uploadButtons();
		});
	}

	uploadButtons() {
		let firstUploadButton = <UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.firstKey]} fileKey={this.props.meta.firstKey} pair={this.props.meta.key} type={this.state.firstType} />;
		let secondUploadButton = <UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.secondKey]} fileKey={this.props.meta.secondKey} pair={this.props.meta.key} type={this.state.secondType} />;

		const firstFile = ReviewHelper.globalFileData[this.props.meta.firstKey];
		const secondFile = ReviewHelper.globalFileData[this.props.meta.secondKey];

		if (_.indexOf(dFiles, firstFile.letter.toLowerCase()) > -1) {
			// first file is a D1/D2 file
			firstUploadButton = <GeneratedErrorButton file={firstFile} fileKey={this.props.meta.firstKey} pair={this.props.meta.key} type={this.state.firstType} submissionID={this.props.submissionID} forceUpdate={this.props.forceUpdate} />;
		}
		if (_.indexOf(dFiles, secondFile.letter.toLowerCase()) > -1) {
			// second file is a D1/D2 file
			secondUploadButton = <GeneratedErrorButton file={secondFile} fileKey={this.props.meta.secondKey} pair={this.props.meta.key} type={this.state.secondType} submissionID={this.props.submissionID} forceUpdate={this.props.forceUpdate} />;
		}

		this.setState({
			firstButton: firstUploadButton,
			secondButton: secondUploadButton
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

	changeTab(tab) {
		this.setState({
			activeTab: tab
		});
	}

    openReport() {
        window.location = this.state.signedUrl;
    }

    signReport(type) {
        const fileName = `submission_${this.props.submission.id}_cross${type}${this.props.meta.firstKey}_${this.props.meta.secondKey}`;
        ReviewHelper.signErrorWarningReport(this.props.submission.id, fileName)
            .then((data) => {
                this.setState({
                    signInProgress: false,
                    signedUrl: data.url
                }, () => {
                    this.openReport();
                });
            })
            .catch((err) => {
                this.setState({
                    signInProgress: false
                });
                console.log(err);
            });
    }

    clickedReport(type, e) {
        e.preventDefault();
        // check if the link is already signed
        if (this.state.signInProgress) {
            // sign is in progress, do nothing
            return;
        }
        else if (this.state.signedUrl !== '') {
            // it is signed, open immediately
            this.openReport();
        }
        else {
            // not signed yet, sign
            this.setState({
                signInProgress: true
            }, () => {
                this.signReport(type);
            });
        }
    }


	render() {

		let uploadProgress = null;
		if (this.props.submission.state == 'uploading' && this.state.stagedFiles.length > 0) {
			uploadProgress = <FileProgress fileStatus={this.fileProgress()} />
		}

		let warning = null;
		if (this.state.stagedFiles.length > 0) {
			warning = <FileWarning files={this.state.stagedFiles} {...this.props} />
		}

		let tableKey = this.state.activeTab;
		let reportName = "Error Report";
        let reportFileNameType = "_";

		if (this.state.activeTab == 'errors' && this.props.status == 'warning') {
			// in the case of a warning only pair, the state won't have time to change to warnings on initial load
			tableKey = 'warnings';
		}

		if (tableKey == 'warnings') {
			reportName = "Warning Report";
            reportFileNameType = "_warning_";
		}

        let downloadLabel = `Download ${reportName}`;
        if (this.state.signInProgress) {
            downloadLabel = `Preparing ${reportName}...`;
        }

		return (
			<div className="col-md-12">
				
				<div className="error-box">
					<ErrorTabs {...this.props} changeTab={this.changeTab.bind(this)} activeTab={this.state.activeTab} />
					<div className="vertical-line" />
					<div className="box-content">
						<div className="row">
							<div className="col-xs-12 col-sm-8 col-md-9">
								<ComparisonTable data={this.props.submission.crossFile[tableKey][this.props.meta.key]} />
							</div>
							<div className="col-xs-12 col-sm-4 col-md-3">
								<div className="button-list">
									<div className="row">
										<div className="col-md-12">
                                            <a href="#" onClick={this.clickedReport.bind(this, reportFileNameType)} className="usa-da-button btn-full btn-primary">
				            	            	{downloadLabel}
				            	            </a>
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
											{this.state.firstButton}
										</div>
									</div>

									<div className="row">
										<div className="col-md-12">
											{this.state.secondButton}
										</div>
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