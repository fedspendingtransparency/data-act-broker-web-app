/**
* UploadDetachedFileMeta.jsx
* Created by Minahm Kim
**/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React from 'react';
import moment from 'moment';

import SubTierAgencyListContainer from '../../containers/SharedContainers/SubTierAgencyListContainer.jsx';
import ValidateValuesFileContainer from '../../containers/validateData/ValidateValuesFileContainer.jsx';
import ValidateDataFileContainer from '../../containers/validateData/ValidateDataFileContainer.jsx';
import UploadDetachedFilesBox from './UploadDetachedFilesBox.jsx';
import UploadDetachedFilesError from './UploadDetachedFilesError.jsx';
import DateRangeWrapper from './DateRangeWrapper.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as GenerateFilesHelper from '../../helpers/generateFilesHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

const timerDuration = 5;

export default class UploadDetachedFileMeta extends React.Component {
	constructor(props) {
		super(props);

		this.isUnmounted = false;

		this.state = {
			agency: "",
			agencyError: false,
			showDatePicker: false,
			showUploadFilesBox: false,
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
			notAllowed: false,
			errorMessage: "",
			headerErrors: false,
			validationFinished: false,
			published: false
		};
	}

	componentDidMount() {
		this.isUnmounted = false;
	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	handleChange(agency, isValid){
		// set Sub-Tier Agency and update validity
		this.setState({
				agency: agency,
				agencyError: !isValid,
				showUploadFilesBox: isValid && this.state.showDatePicker,
				showDatePicker: isValid
			 });
	}

	handleDateChange(file, date, dateType) {
		// merge the new date into the file's state without affecting the other keys
		const newState = Object.assign(this.state[file], {
			[dateType]: moment(date)
		});

		this.setState({
			[file]: newState
		}, () => {
			this.validateDates(file);
		});
	}

	validateDates(file) {
		// validate that dates are provided for both fields and the end dates don't come before the start dates
		let state = "incomplete";

		const dFile = Object.assign({}, this.state[file]);

		// validate the date ranges
		const start = this.state[file].startDate;
		const end = this.state[file].endDate;

		// ((start && end) && end.isSameOrAfter(start))
		dFile.error = {
				show: ((start && end) && !end.isSameOrAfter(start)) ? true : false,
				header: ((start && end) && !end.isSameOrAfter(start)) ? 'Invalid Dates' : '',
				description: ((start && end) && !end.isSameOrAfter(start)) ? 'The end date cannot be earlier than the start date.' : ''
			}
			dFile.valid = ((start && end) && end.isSameOrAfter(start)) ? true : false;

		this.setState({
			[file]:dFile,
			showUploadFilesBox: dFile.valid
		});
	}

	updateError(file, header='', description='') {
		// Show any error that occurs at any point during file upload
		const state = Object.assign({}, this.state[file], {
			error: {
				show: header !='' && description !='',
				header: header,
				description: description
			}
		});
		
		this.setState({
			[file]: state
		});
	}

	uploadFileHelper(local, submission){
		if(local){
			return UploadHelper.performDetachedLocalUpload(submission);
		}
		return UploadHelper.performDetachedFileUpload(submission);
	}

	uploadFile() {
		// upload specified file
		this.props.setSubmissionState('uploading');
		let submission = this.props.submission;
		submission.meta['startDate'] = this.state.detachedAward.startDate.format('DD/MM/YYYY');
		submission.meta['endDate'] = this.state.detachedAward.endDate.format('DD/MM/YYYY');
		submission.meta['subTierAgency'] = this.state.agency;

		this.uploadFileHelper(kGlobalConstants.LOCAL === true && !this.isUnmounted, submission)
			.then((submissionID) => {
                    // TODO: Remove this when this is eventually tied to user accounts
                    this.props.setSubmissionId(submissionID);
					this.checkFileStatus(submissionID);
					this.props.history.push('/uploaddetachedfiles/'+submissionID);
					this.props.validate();
                })
				.catch((err) => {
					this.setState({
						notAllowed: err.httpStatus === 403,
						errorMessage: err.httpStatus === 403 ? err.message : err.body.message
					});
				});
	}

	checkFileStatus(submissionID) {
		// callback to check file status
		GenerateFilesHelper.fetchSubmissionMetadata(submissionID)
			.then((response) => {
				if (this.isUnmounted) {
					return;
				}
				const job = Object.assign({}, this.state.jobResults);
				job.detached_award = response.jobs[0];
				this.setState({
					showUploadFilesBox: false,
					showValidationBox: true,
					showDatePicker: false,
					jobResults: job
				}, () => {
					this.parseJobStates(response);
				});				
			})
			.catch((err)=>{
				if(err.status === 400){
					this.setState({error: 2, submit: false});
				}
			});
	}

	validateSubmission(submissionID){
		ReviewHelper.validateDetachedSubmission(submissionID)
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

			if(data.jobs[0].error_type === "header_errors") {
				this.setState({
					detachedAward: item,
					validationFinished: true,
					headerErrors: true
				});
			}
			else {
				this.validateSubmission(this.props.submission.id);
			}
		}
		else if (data.jobs[0].job_status === 'finished') {
			// don't run the check again if it's done
			runCheck = false;

			// display dowload buttons
			// make a clone of the file's react state
			const item = Object.assign({}, this.state.detachedAward);
			item.status = "done";

			this.validateSubmission(this.props.submission.id);
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

	// ERRORS
	// 1: Submission is already published
	// 2: Fetching file metadata failed
	// 3: File already has been submitted in another submission

	render() {
		let subTierAgencyClass = '';
		let datePicker = null;
		let uploadFilesBox = null;

		if (this.state.agencyError) {
			subTierAgencyClass = ' error usa-da-form-icon';
		}

		if (this.state.showDatePicker) {
			let value = {
				datePlaceholder: "Action",
				endDate: this.state.detachedAward.endDate, 
				label: "File D2: Financial Assistance",
				startDate: this.state.detachedAward.startDate
			}
			datePicker = <DateRangeWrapper {...this.state} 
								handleDateChange={this.handleDateChange.bind(this, "detachedAward")} 
								updateError={this.updateError.bind(this)} 
								value={value}
								disabled={this.state.showValidationBox} />;
		}

		
		if (this.state.detachedAward.valid && this.state.showUploadFilesBox) {
			uploadFilesBox = <UploadDetachedFilesBox {...this.state} 
								submission={this.props.submission}
								uploadFile={this.uploadFile.bind(this)} />;  
		}

		let errorMessage = null;

		if (this.state.detachedAward.error.show) {
			errorMessage = <UploadDetachedFilesError error={this.state.detachedAward.error} />
		}

		let subtierAgency = null;

		if(!this.state.showValidationBox){
			subtierAgency = <div>
				<div className="row usa-da-select-agency-label">
					The files will be used when submitting data for...
				</div>

				<div className="row">
					<div className="col-sm-12 col-md-12 typeahead-holder" data-testid="agencytypeahead">
						<SubTierAgencyListContainer placeholder="Enter the name of the reporting sub-tier agency" onSelect={this.handleChange.bind(this)} customClass={subTierAgencyClass} internalValue='agency_code' disabled={this.state.showValidationBox} />
						<div className={"usa-da-icon usa-da-form-icon" + subTierAgencyClass}>
							<Icons.Building />
						</div>
					</div>
				</div>
			</div>;
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
						</div>
					</div>
				</div>
				<div className="container center-block">
					<div className="row usa-da-select-agency">
						<div className='col-lg-offset-2 col-lg-8 mt-60 mb-60'>
							<h5>Please begin by telling us about files you would like to upload</h5>
							<div className='select-agency-holder'>
								
								{subtierAgency}

								<ReactCSSTransitionGroup transitionName="usa-da-meta-fade" transitionEnterTimeout={600} transitionLeaveTimeout={200}>
									{datePicker}
								</ReactCSSTransitionGroup>

								<ReactCSSTransitionGroup transitionName="usa-da-meta-fade" transitionEnterTimeout={600} transitionLeaveTimeout={200}>
									{uploadFilesBox}
								</ReactCSSTransitionGroup>
								{errorMessage}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}