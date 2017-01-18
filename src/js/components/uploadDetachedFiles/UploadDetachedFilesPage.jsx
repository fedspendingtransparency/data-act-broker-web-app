/**
* UploadDetachedFilesPage.jsx
* Created by MichaelHess
**/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React from 'react';
import moment from 'moment';

import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import SubTierAgencyListContainer from '../../containers/SharedContainers/SubTierAgencyListContainer.jsx';
import UploadDetachedFilesBox from './UploadDetachedFilesBox.jsx';
import DateRangeWrapper from './DateRangeWrapper.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as UploadHelper from '../../helpers/UploadHelper.js';
import * as UploadActions from '../../redux/actions/UploadActions.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

export default class UploadDetachedFilesPage extends React.Component {
	constructor(props) {
		super(props);

		this.isUnmounted = false;

		this.state = {
			agency: "",
			agencyError: false,
			showDatePicker: false,
			showUploadFilesBox: false,
			award: {
				startDate: null,
				endDate: null,
				error: {
					show: false,
					header: '',
					description: ''
				},
				valid: false,
				status: ""
			}
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
		if (agency != '' && isValid) {
			this.setState({
				agency: agency,
				agencyError: false
			 }, this.agencyChangeComplete);
		}
		else {
			this.setState({
				agency: '',
				agencyError: true
			}, this.agencyChangeComplete);
		}
	}

	agencyChangeComplete() {
		// Display or hide the file upload box
		if (this.state.agency !== '') {
			this.setState({
				showDatePicker: true
			});
		} else {
			this.setState({
				showDatePicker: false,
				showUploadFilesBox: false
			});
		}
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
		if (start && end) {
			// both sets of dates exist
			if (!end.isSameOrAfter(start)) {
				// end date comes before start date, invalid
				// show an error message
				dFile.error = {
					show: true,
					header: 'Invalid Dates',
					description: 'The end date cannot be earlier than the start date.'
				};
				dFile.valid = false;
			}
			else {
				// valid!
				dFile.error = {
					show: false,
					header: '',
					description: ''
				};
				dFile.valid = true;
			}
		}
		else {
			// not all dates exist yet
			dFile.error = {
				show: false,
				header: '',
				description: ''
			};
			dFile.valid = false;
		}

		this.setState({[file]:dFile});
	}

	showError(file, header, description) {
		// Show any error that occurs at any point during file upload
		const state = Object.assign({}, this.state[file], {
			error: {
				show: true,
				header: header,
				description: description
			}
		});
		
		this.setState({
			[file]: state
		});
	}

	hideError(file) {
		// Stop displaying the error for the given file
		const state = Object.assign({}, this.state[file], {
			error: {
				show: false,
				header: '',
				description: ''
			}
		});

		this.setState({
			[file]: state
		});
	}

	uploadFile() {
		// upload specified file
		this.props.setSubmissionState('uploading');
		this.props.submission.meta['startDate'] = this.state.award.startDate.format('DD/MM/YYYY');
		this.props.submission.meta['endDate'] = this.state.award.endDate.format('DD/MM/YYYY');
		this.props.submission.meta['subTierAgency'] = this.state.agency;
		
		if (kGlobalConstants.LOCAL == true) {
			UploadHelper.performDetachedLocalUpload(this.props.submission)
                .then((submissionID) => {
                    // TODO: Remove this when this is eventually tied to user accounts
                    this.props.setSubmissionId(submissionID);
                    hashHistory.push('/validateData/' + submissionID);

                });
		}
		else {
			UploadHelper.performDetachedFileUpload(this.props.submission)
				.then((submissionID) => {
					// TODO: Remove this when this is eventually tied to user accounts
					this.props.setSubmissionId(submissionID);
					hashHistory.push('/validateData/' + submissionID);
				})
				.catch((err) => {
					if (err.httpStatus == 403) {
						this.setState({
							notAllowed: true,
							errorMessage: err.message
						});
					}
				});
		}
	}

	// checkFileStatus(job_id) {
	// 	// callback to check file status
	// 	UploadHelper.fetchDetachedFile(job_id)
	// 		.then((response) => {
	// 			if (this.isUnmounted) {
	// 				return;
	// 			}
	// 			// this.parseFileState(response);
	// 		});
	// }

	// parseFileState(data) {
	// 	// parse response and see what state the generation is in
	// 	const fileType = data.file_type.toLowerCase();

	// 	let runCheck = true;

	// 	if (data.httpStatus == 401) {
	// 		// don't run the check again if it failed
	// 		runCheck = false;

	// 		this.showError(fileType, 'Permission Error', response.message);
	// 	}
	// 	else if (data.status == 'failed' || data.status == 'invalid') {
	// 		// don't run the check again if it failed
	// 		runCheck = false;

	// 		let message = 'File ' + data.file_type + ' could not be uploaded.';

	// 		if (data.message != '') {
	// 			message = data.message;
	// 		}

	// 		// make a clone of the file's react state
	// 		const item = Object.assign({}, this.state[fileType]);
	// 		item.status = "";
	// 		this.setState({[fileType]: item});

	// 		this.showError(fileType, data.file_type + ' File Error', message);
	// 	}
	// 	else if (data.status == 'finished') {
	// 		// don't run the check again if it's done
	// 		runCheck = false;

	// 		this.hideError(fileType);

	// 		// display dowload buttons
	// 		// make a clone of the file's react state
	// 		const item = Object.assign({}, this.state[fileType]);

	// 		// update the download properties
	// 		item.download = {
	// 			show: true,
	// 			url: data.url
	// 		};
	// 		item.status = "done";

	// 		this.setState({[fileType]: item});
	// 	}

	// 	if (this.isUnmounted) {
	// 		return;
	// 	}

	// 	if (runCheck && !this.isUnmounted) {
	// 		// wait 5 seconds and check the file status again
	// 		window.setTimeout(() => {
	// 			this.checkFileStatus(data.job_id);
	// 		}, timerDuration * 1000);
	// 	}
	// }

	render() {
		let subTierAgencyIcon = <Icons.Building />;
		let subTierAgencyClass = '';
		if (this.state.agencyError) {
			subTierAgencyIcon = <Icons.Building />;
			subTierAgencyClass = ' error usa-da-form-icon';
		}

		let datePicker = null;
		if (this.state.showDatePicker) {
			let value = {
				datePlaceholder: "Action",
				endDate: this.state.award.endDate, 
				label: "File D2: Financial Assistance",
				startDate: this.state.award.startDate
			}
			datePicker = <DateRangeWrapper {...this.state} 
								handleDateChange={this.handleDateChange.bind(this, "award")} 
								hideError={this.hideError.bind(this)} 
								showError={this.showError.bind(this)} 
								value={value} />;
		}

		let uploadFilesBox = null;
		if (this.state.award.valid) {
			uploadFilesBox = <UploadDetachedFilesBox {...this.state} 
								hideError={this.hideError.bind(this)}
								showError={this.showError.bind(this)}
								submission={this.props.submission}  
								uploadFile={this.uploadFile.bind(this)} />;
		}

		let errorMessage = null;
		if (this.state.award.error.show) {
			errorMessage = <div className="alert alert-error text-left" role="alert">
								<span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
								<div className="alert-header-text">{this.state.award.error.header}</div>
								<p>{this.state.award.error.description}</p>
							</div>;
		}
		
		return (
			<div className="usa-da-upload-detached-files-page">
				<div className="usa-da-site_wrap">
					<div className="usa-da-page-content">
						<Navbar activeTab="submissionGuide" />
						<div className="usa-da-content-dark">
							<div className="container">
								<div className="row usa-da-page-title">
									<div className="col-lg-12 mt-40 mb-20">
										<div className="display-2">
											Upload File D2: Financial Assistance
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="container center-block">
							<div className="row text-center usa-da-select-agency">
								<div className="col-lg-offset-2 col-lg-8 mt-60 mb-60">
									<h5>Please begin by telling us about files you would like to upload</h5>
									<div className="select-agency-holder">
										<div className="row usa-da-select-agency-label">
											The files will be used when submitting data for...
										</div>

										<div className="row">
											<div className="col-sm-12 col-md-12 typeahead-holder" data-testid="agencytypeahead">
												<SubTierAgencyListContainer placeholder="Enter the name of the reporting sub-tier agency" onSelect={this.handleChange.bind(this)} customClass={subTierAgencyClass} internalValue='agency_code' />
												<div className={"usa-da-icon usa-da-form-icon" + subTierAgencyClass}>
													{subTierAgencyIcon}
												</div>
											</div>
										</div>

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
				</div>
				<Footer />
			</div>
		);
	}
}