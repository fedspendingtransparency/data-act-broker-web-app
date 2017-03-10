/**
* UploadDetachedFileValidation.jsx
* Created by Minahm Kim
**/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React from 'react';
import moment from 'moment';

import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import SubTierAgencyListContainer from '../../containers/SharedContainers/SubTierAgencyListContainer.jsx';
import ValidateValuesFileContainer from '../../containers/validateData/ValidateValuesFileContainer.jsx';
import ValidateDataFileContainer from '../../containers/validateData/ValidateDataFileContainer.jsx';

import UploadDetachedFilesError from './UploadDetachedFilesError.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as GenerateFilesHelper from '../../helpers/generateFilesHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

const timerDuration = 5;

export default class UploadDetachedFileValidation extends React.Component {
	constructor(props) {
		super(props);

		this.isUnmounted = false;

		this.state = {
			agency: "",
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
			jobResults: {detached_award: {}},
			headerErrors: false,
			validationFinished: false,
			error: 0,
			rep_start: '',
			rep_end: '',
			published: false,
			submit: true
		};

		this.checkFileStatus(this.props.submission.id);
	}

	componentDidMount() {
		this.isUnmounted = false;
	}

	componentWillUnmount() {
		this.isUnmounted = true;
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
					submit: submission
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

	validateSubmission(item, publishDate=undefined){
		ReviewHelper.validateDetachedSubmission(this.props.submission.id)
				.then((response) => {
					this.setState({
						detachedAward: item,
						validationFinished: true,
						headerErrors: false,
						jobResults: response,
						published: publishDate
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

			if(data.jobs[0].error_type === "header_errors") {
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
			this.validateSubmission(item, data.publish_status);
		}

		if (this.isUnmounted) {
			return;
		}

		if (runCheck && !this.isUnmounted) {
			// wait 5 seconds and check the file status again
			window.setTimeout(() => {
				this.checkFileStatus(this.props.submission.id);
			}, timerDuration * 1000);
		}
	}

	submitFabs(){
		UploadHelper.submitFabs({'submission_id': this.props.submission.id})
			.then((response)=>{
				this.setState({submit: false})
			})
			.catch((error)=>{
				if(error.httpStatus === 400){
					this.setState({error: 1, submit: false});
				}else if(error.httpStatus === 500){
					this.setState({error: 3, submit: false});
				}
			})
	}

	// ERRORS
	// 1: Submission is already published
	// 2: Fetching file metadata failed
	// 3: File already has been submitted in another submission

	render() {
		let validationButton = null;
		let validationBox = null;
		let headerDate = null;
		
		if(this.state.agency !== '' && this.state.rep_start !== '' && this.state.rep_end !== ''){
			headerDate = <div className="col-md-2 ">
										<div className = 'header-box'>
												<span>
												Agency: {this.state.agency}
												</span>
												<br/>
												<span>
												Date: {this.state.rep_start} - {this.state.rep_end}
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
		
		validationBox = <ValidateDataFileContainer type={type} data={this.state.jobResults}/>;
		if(!this.state.headerErrors && this.state.validationFinished) {
			validationBox = <ValidateValuesFileContainer type={type} data={this.state.jobResults} />;
			if(this.state.jobResults.detached_award.error_type === "none" && this.state.error === 0) {
				validationButton = <button className='pull-right col-xs-3 us-da-button' onClick={this.submitFabs.bind(this)}>Publish</button>;
				if(this.state.published === 'published'){
					validationButton = <button className='pull-right col-xs-3 us-da-disabled-button' onClick={this.submitFabs.bind(this)} disabled>File Already Published</button>;
				}
			}
		}

		let errorMessage = null;
		if (this.state.error !== 0) {
			errorMessage = <UploadDetachedFilesError errorCode={this.state.error} />
		}
		
		return (
			<div>
				<div className="usa-da-content-dark">
					<div className="container">
						<div className="row usa-da-page-title">
							<div className="col-md-10 mt-40 mb-20">
								<div className="display-2">
									Upload Bi-Monthly Financial Assistance Data
								</div>
							</div>
							{headerDate}
						</div>
					</div>
				</div>
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
			</div>
		);
	}
}
