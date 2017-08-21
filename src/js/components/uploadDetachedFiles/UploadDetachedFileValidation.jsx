/**
* UploadDetachedFileValidation.jsx
* Created by Minahm Kim
**/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Footer from '../SharedComponents/FooterComponent.jsx';
import SubTierAgencyListContainer from '../../containers/SharedContainers/SubTierAgencyListContainer.jsx';
import ValidateValuesFileContainer from '../../containers/validateData/ValidateValuesFileContainer.jsx';
import ValidateDataFileContainer from '../../containers/validateData/ValidateDataFileContainer.jsx';
import PublishModal from './PublishModal.jsx';
import Banner from '../SharedComponents/Banner.jsx';

import UploadDetachedFilesError from './UploadDetachedFilesError.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as GenerateFilesHelper from '../../helpers/generateFilesHelper.js';
import * as PermissionsHelper from '../../helpers/permissionsHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

const timerDuration = 5;

class UploadDetachedFileValidation extends React.Component {
	constructor(props) {
		super(props);

		this.isUnmounted = false;

		this.state = {
			agency: "",
			submissionID: this.props.params.submissionID ? this.props.params.submissionID: 0,
			detachedAward: {
				startDate: null,
				endDate: null,
				error: {
					show: false,
					header: '',
					description: ''
				},
				valid: false,
				status: ""
			},
			cgac_code:'',
			jobResults: {detached_award: {}},
			headerErrors: false,
			validationFinished: false,
			error: 0,
			rep_start: '',
			rep_end: '',
			published: false,
			submit: true,
			showPublish: false,
			modified_date: null,
			type: props.route.type,
			fabs_meta: {valid_rows:0, total_rows: 0, publish_date: null}
		};
	}

	componentDidMount() {
		this.isUnmounted = false;
		this.checkFileStatus(this.state.submissionID)
	}

	componentWillReceiveProps(nextProps) {
		if(this.state.agency==="" || nextProps.params.submissionID !== this.state.submissionID){
			this.setState({
				submissionID: nextProps.params.submissionID
			})
			this.checkFileStatus(nextProps.params.submissionID);	
		}
	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	openModal() {
        this.setState({
            showPublish: true
        });
    }

    closeModal() {
        this.setState({
            showPublish: false
        });
    }

	checkFileStatus(submissionID) {
		// callback to check file status
		GenerateFilesHelper.fetchSubmissionMetadata(submissionID)
			.then((response) => {
				if (this.isUnmounted) {
					return;
				}
				var submission = true;
				if(response.publish_status==='published'){
					submission = false;
				}
				const job = Object.assign({}, this.state.jobResults);
				job.detached_award = response.jobs[0];
				this.setState({
					jobResults: job,
					agency: response.agency_name,
					rep_start: response.reporting_period_start_date,
					rep_end: response.reporting_period_end_date,
					submit: submission,
					cgac_code: response.cgac_code,
					published: (response.publish_status === 'published' ? true : false),
					modified_date: response.last_updated,
					error: 0,
					fabs_meta: response.fabs_meta
				}, () => {
					this.parseJobStates(response);
				});			
			})
			.catch((err)=>{
				if(err.status == 400){
					this.setState({error: 2, submit: false});
				}
			});
	}

	validateSubmission(item){
		ReviewHelper.validateDetachedSubmission(this.props.params.submissionID)
				.then((response) => {
					this.setState({
						detachedAward: item,
						validationFinished: true,
						headerErrors: false,
						jobResults: response
					});
				});
	}

	parseJobStates(data) {
		let runCheck = true;

		if (data.jobs[0].job_status === 'failed' || data.jobs[0].job_status === 'invalid') {
			// don't run the check again if it failed
			runCheck = false;

			let message = 'Error during D2 validation.';

			if (!data.jobs[0].error_data[0] && data.jobs[0].error_data[0].error_description !== '') {
				message = data.jobs[0].error_data[0].error_description;
			}

			// make a clone of the file's react state
			const item = Object.assign({}, this.state.detachedAward);
			item.status = "failed";

			if (data.jobs[0].error_type && data.jobs[0].error_type === "header_errors") {
				this.setState({
					detachedAward: item,
					validationFinished: true,
					headerErrors: true
				});
			}
			else {
				this.validateSubmission(item);
			}
		}
		else if (data.jobs[0].job_status === 'finished') {
			// don't run the check again if it's done
			runCheck = false;

			// display dowload buttons
			// make a clone of the file's react state
			const item = Object.assign({}, this.state.detachedAward);
			item.status = "done";
			this.validateSubmission(item);
		}

		if (this.isUnmounted) {
			return;
		}

		if (runCheck && !this.isUnmounted) {
			// wait 5 seconds and check the file status again
			window.setTimeout(() => {
				if(this.props.params.submissionID){
					this.checkFileStatus(this.props.params.submissionID);	
				}
			}, timerDuration * 1000);
		}
	}

	submitFabs(){
		UploadHelper.submitFabs({'submission_id': this.props.submission.id})
			.then((response)=>{
				this.setState({submit: false, published: true})
			})
			.catch((error)=>{
				if (error.httpStatus === 400) {
					this.setState({error: 1, submit: false});
				}
				else if (error.httpStatus === 500) {
					this.setState({error: 4, submit: false, showPublish: false});
				}
			})
	}

	// ERRORS
	// 1: Submission is already published
	// 2: Fetching file metadata failed
	// 3: File already has been submitted in another submission

	uploadFileHelper(local, submission){
		if (local) {
			return UploadHelper.performDetachedLocalCorrectedUpload(submission);
		}
		return UploadHelper.performDetachedFileCorrectedUpload(submission);
	}

	uploadFile(item) {
		if (this.isUnmounted) {
			return;
		}

		// upload specified file
		this.props.setSubmissionState('uploading');
		let submission = this.props.submission;
		submission.files.detached_award = this.state.detachedAward;
		submission.files.detached_award.file = item;
		submission.sub = this.state.submissionID;
		submission.meta['startDate'] = this.state.rep_start;
		submission.meta['endDate'] = this.state.rep_end;
		submission.meta['subTierAgency'] = this.state.agency;

		// reset file and job status
		let currentResults = this.state.jobResults;
		currentResults['detached_award'].file_status = '';
		currentResults['detached_award'].job_status = '';
		this.setState({
			jobResults: currentResults
		});

		this.uploadFileHelper(kGlobalConstants.LOCAL, submission)
			.then((submissionID) => {
				this.setState({
					validationFinished: false
				})
				setTimeout(()=>{
					this.checkFileStatus(submissionID);
				}, 2000);
			})
			.catch((err) => {
				this.setState({
					validationFinished: false,
					notAllowed: err.httpStatus === 403,
					errorMessage: err.httpStatus === 403 ? err.message : err.body.message
				});
			});
	}

	render() {
		let validationButton = null;
		let validationBox = null;
		let headerDate = null;
		let updated = null;

		if (this.state.modified_date) {
			updated = moment(this.state.modified_date).format('MM/DD/YYYY')
		}
		
		if (this.state.agency !== '' && this.state.rep_start !== '' && this.state.rep_end !== ''){
			headerDate = <div className="col-md-2 ">
							 <div className = 'header-box'>
								 <span>
								 	 Agency: {this.state.agency}
								 </span>
								 <br/>
								 <span>
								 	 Last Modified Date: {updated}
								 </span>
							 </div>
						 </div>;
		}

		const type = {
			fileTitle: 'Upload',
			fileTemplateName: 'detached_award.csv',
			requestName: 'detached_award',
			progress: '0'
		}

		const fileData = this.state.jobResults[type.requestName];
		const status = fileData.job_status;
		let errorMessage = null;
		validationBox = <ValidateDataFileContainer type={type} data={this.state.jobResults}
												   setUploadItem={this.uploadFile.bind(this)}
												   updateItem={this.uploadFile.bind(this)} />;
		if (fileData.file_status == 'complete' && this.state.validationFinished) {
			if (status != 'invalid' || fileData.file_status == 'complete') {
				validationBox = <ValidateValuesFileContainer type={type} data={this.state.jobResults}
														 	 setUploadItem={this.uploadFile.bind(this)}
														 	 updateItem={this.uploadFile.bind(this)}
														 	 published={this.state.published} />;
			}

			if (this.state.error !== 0) {
				errorMessage = <UploadDetachedFilesError errorCode={this.state.error} />
			}
			else if (this.state.published) {
				// This submission is already published and cannot be republished
				validationButton = <button className='pull-right col-xs-3 us-da-disabled-button' disabled>File Published:<span className='plain'> {this.state.fabs_meta.valid_rows} rows published on {this.state.fabs_meta.publish_date}</span></button>;
			}
			else if (PermissionsHelper.checkFabsPermissions(this.props.session)) {
				// User has permissions to publish this unpublished submission
				validationButton = <button className='pull-right col-xs-3 us-da-button' onClick={this.openModal.bind(this)}>Publish</button>;
			}
			else {
				// User does not have permissions to publish
				validationButton = <button className='pull-right col-xs-3 us-da-disabled-button' disabled>You do not have permissions to publish</button>;
			}
		}
		
		return (
			<div>
				<div className="usa-da-content-teal">
					<div className="container">
						<div className="row usa-da-page-title">
							<div className="col-md-10 mt-40 mb-20">
								<div className="display-2">
									Upload FABS Data
								</div>
							</div>
							{headerDate}
						</div>
					</div>
				</div>
				<Banner type='fabs' />
				<div className='container'>
					<div className = 'col-xs-12 mt-60 mb-60'>
						<div className = 'validation-holder'>

							<ReactCSSTransitionGroup transitionName="usa-da-meta-fade" transitionEnterTimeout={600} transitionLeaveTimeout={200}>
								{validationBox}
							</ReactCSSTransitionGroup>

							<ReactCSSTransitionGroup transitionName="usa-da-meta-fade" transitionEnterTimeout={600} transitionLeaveTimeout={200}>
								{validationButton}
							</ReactCSSTransitionGroup>

							{errorMessage}
						</div>
					</div>
				</div>
				<PublishModal rows={this.state.fabs_meta} validate={this.submitFabs.bind(this)} submissionID={this.state.submissionID} closeModal={this.closeModal.bind(this)} isOpen={this.state.showPublish} />
			</div>
		);
	}
}

export default connect(
    state => ({ session: state.session })
)(UploadDetachedFileValidation)
