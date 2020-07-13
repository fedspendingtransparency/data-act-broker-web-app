/**
* AddDataMeta.jsx
* Created by Mike Bray 3/21/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as AgencyHelper from 'helpers/agencyHelper';
import AgencyListContainer from 'containers/SharedContainers/AgencyListContainer';
import * as Icons from 'components/SharedComponents/icons/Icons';
import Modal from 'components/SharedComponents/Modal';
import DateTypeField from './metadata/DateTypeField';
import DateRangeField from './metadata/DateRangeField';
import SubmissionTypeField from './metadata/SubmissionTypeField';
import SubmitComponent from './metadata/SubmitComponent';

const propTypes = {
    updateMetaData: PropTypes.func
};

const defaultProps = {
    updateMetaData: null
};

export default class AddDataMeta extends React.Component {
    constructor(props) {
        super(props);

        this.successMessage = 'Everything looks good. Now let\'s work on uploading your files.';

        this.state = {
            agency: '',
            codeType: '',
            startDate: null,
            endDate: null,
            dateType: null,
            submissionType: null,
            startDateError: false,
            endDateError: false,
            agencyError: false,
            showDateTypeField: false,
            showDateRangeField: false,
            showSubmissionTypeField: false,
            showSubmitButton: false,
            buttonDisabled: true,
            modalMessage: '',
            showModal: false,
            message: this.successMessage,
            publishedSubmissions: [],
            testSubmission: false
        };

        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.handleDateTypeChange = this.handleDateTypeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmissionTypeChange = this.handleSubmissionTypeChange.bind(this);
        this.submitMetadata = this.submitMetadata.bind(this);
    }

    onCancel() {
        this.setState({
            showModal: false,
            modalMessage: '',
            testSubmission: false,
            publishedSubmissions: []
        });
    }

    onConfirm() {
        this.setState({
            showModal: false,
            modalMessage: ''
        });
        this.props.updateMetaData(this.state);
    }

    handleChange(agency, codeType, isValid) {
        if (agency !== '' && isValid) {
            this.setState({
                agency,
                codeType,
                agencyError: false
            }, this.checkComplete);
        }
        else {
            this.setState({
                agency: '',
                codeType: '',
                agencyError: true
            }, this.checkComplete);
        }
    }

    handleDateChange(startDate, endDate, dateError) {
        let message = this.successMessage;
        let buttonDisabled = false;
        if (dateError === true) {
            message = 'You need to provide a valid date range in order to continue.';
            buttonDisabled = true;
        }

        this.setState({
            startDate,
            endDate,
            message,
            buttonDisabled
        }, () => {
            if (dateError !== true) {
                this.checkComplete();
            }
        });
    }

    handleSubmissionTypeChange(submissionType) {
        this.setState({
            submissionType,
            testSubmission: (submissionType === 'test')
        }, this.checkComplete);
    }

    handleDateTypeChange(dateType) {
        this.setState({
            dateType
        }, this.checkComplete);
    }

    checkComplete() {
        if (this.state.agency !== '') {
            this.setState({
                showDateTypeField: true
            });
        }

        if (this.state.dateType !== null) {
            this.setState({
                showDateRangeField: true
            });
        }

        if (this.state.startDate !== null && this.state.endDate !== null && this.state.agency !== '') {
            this.setState({
                showSubmissionTypeField: true
            });
        }
        else if (this.state.agency === '') {
            this.setState({
                showSubmissionTypeField: false,
                message: 'You need to provide a valid agency in order to continue.'
            });
        }

        if (this.state.submissionType !== null) {
            this.setState({
                showSubmitButton: true
            });
        }
    }

    submitMetadata() {
        const agency = this.state.agency;
        const codeType = this.state.codeType;
        const endDate = this.state.endDate;
        const dateType = this.state.dateType;

        // Check to see if there are already published submissions for this period
        const month = endDate.substr(0, 2);
        let period = parseInt(month, 10) + 3;
        let year = parseInt(endDate.substr(3), 10);
        if (period > 12) {
            period %= 12;
            year += 1;
        }

        const cgacCode = codeType === 'cgac_code' ? agency : null;
        const frecCode = codeType === 'frec_code' ? agency : null;
        const isQuarter = (dateType === 'quarter');

        if (!this.state.testSubmission) {
            AgencyHelper.getPublishedSubmissions(cgacCode, frecCode, year, period, isQuarter)
                .then((publishedSubmissions) => {
                    if (publishedSubmissions.length > 0) {
                        const pubIsQuarter = publishedSubmissions[0].is_quarter;
                        const singlePubSub = (publishedSubmissions.length === 1);

                        const title = pubIsQuarter ? 'Quarterly submission already published' : 'Monthly submission already published';
                        let reason = null;
                        let viewSubMessage = null;
                        if (singlePubSub && pubIsQuarter) {
                            reason = 'a quarterly submission has already been published for this time period';
                            viewSubMessage = 'published quarterly submission,';
                        }
                        else if (singlePubSub && !pubIsQuarter) {
                            reason = 'a monthly submission has already been published for this time period';
                            viewSubMessage = 'published monthly submission,';
                        }
                        else {
                            reason = 'at least one monthly submission has already been published for this quarter';
                            viewSubMessage = 'published monthly submissions(s), visit the';
                        }
                        const pubSublink = (
                            singlePubSub ?
                                <Link to={`/submission/${publishedSubmissions[0].submission_id}/validateData`}>click here</Link>
                                :
                                <Link to="/submissionTable/">Submission Table</Link>
                        );
                        this.setState({
                            showModal: true,
                            testSubmission: true,
                            publishedSubmissions,
                            modalMessage: (
                                <div className="alert-warning alert-warning_test-submission">
                                    <FontAwesomeIcon icon="exclamation-triangle" />
                                    <h3>
                                        {title}
                                    </h3>
                                    <p>{`You can only create a test submission because ${reason}.`}</p>
                                    <p>Test submissions cannot be published or certified, but they can be used to validate your data.</p>
                                    <p>{`To view the ${viewSubMessage} `}{pubSublink}.</p>
                                </div>
                            )
                        });
                    }
                    else {
                        this.props.updateMetaData(this.state);
                    }
                });
        }
        else {
            this.props.updateMetaData(this.state);
        }
    }

    validateAgency() {
        if (this.state.agency === '') {
            this.setState({
                agencyError: true
            });
        }
        else {
            this.setState({
                agencyError: false
            });
        }
    }

    showWarnings() {
        const warnings = [];
        if (this.state.buttonDisabled && this.state.formModified) {
            if (this.state.agency === '') {
                warnings.push('A valid reporting agency is required.');
            }
            if (this.state.startDate === null) {
                warnings.push('A valid start date is required.');
            }
            if (this.state.endDate === null) {
                warnings.push('A valid end date is required.');
            }
        }
        return warnings;
    }

    render() {
        let agencyIcon = <Icons.Building />;
        let agencyClass = '';
        if (this.state.agencyError) {
            agencyIcon = <Icons.Building />;
            agencyClass = ' error usa-da-form-icon';
        }

        let dateTypeField = null;
        if (this.state.showDateTypeField) {
            dateTypeField = (<DateTypeField
                value={this.state.dateType}
                onChange={this.handleDateTypeChange} />);
        }

        let dateRangeField = null;
        if (this.state.showDateRangeField) {
            dateRangeField = <DateRangeField onChange={this.handleDateChange} type={this.state.dateType} />;
        }

        let submissionTypeField = null;
        if (this.state.showSubmissionTypeField) {
            submissionTypeField = (<SubmissionTypeField
                onChange={this.handleSubmissionTypeChange}
                value={this.state.submissionType} />);
        }

        let submissionComponent = null;
        if (this.state.showSubmitButton) {
            submissionComponent = (<SubmitComponent
                message={this.state.message}
                onSubmit={this.submitMetadata}
                disabled={this.state.buttonDisabled} />);
        }

        return (
            <div>
                <div className="container center-block">
                    <div className="row text-center usa-da-add-data-meta">
                        <div className="col-md-offset-2 col-md-8 mt-60 mb-60">
                            <h5>Please begin by telling us about the submission you are creating</h5>
                            <div className="meta-holder">
                                <div className="row usa-da-add-data-meta-label">
                                    Which agency is this submission for?
                                </div>

                                <div className="row">
                                    <div
                                        className="col-sm-12 col-md-12 typeahead-holder"
                                        data-testid="agencytypeahead">
                                        <AgencyListContainer
                                            placeholder="Enter the name of the reporting agency"
                                            onSelect={this.handleChange.bind(this)}
                                            customClass={agencyClass}
                                            detached={false} />
                                        <div className={`usa-da-icon usa-da-form-icon${agencyClass}`}>
                                            {agencyIcon}
                                        </div>
                                    </div>
                                </div>

                                <CSSTransitionGroup
                                    transitionName="usa-da-meta-fade"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={300}>
                                    {dateTypeField}
                                </CSSTransitionGroup>

                                <CSSTransitionGroup
                                    transitionName="usa-da-meta-fade"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={300}>
                                    {dateRangeField}
                                </CSSTransitionGroup>

                                <CSSTransitionGroup
                                    transitionName="usa-da-meta-fade"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={300}>
                                    {submissionTypeField}
                                </CSSTransitionGroup>

                                <CSSTransitionGroup
                                    transitionName="usa-da-meta-fade"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={300}>
                                    {submissionComponent}
                                </CSSTransitionGroup>
                            </div>
                            <div className="usa-da-guide-link">
                                <a href="#/submissionGuide?force=true">View Submission Guide</a>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                    confirmText="Create test submission"
                    isOpen={this.state.showModal}
                    content={this.state.modalMessage}
                    cancel />
            </div>
        );
    }
}

AddDataMeta.propTypes = propTypes;
AddDataMeta.defaultProps = defaultProps;
