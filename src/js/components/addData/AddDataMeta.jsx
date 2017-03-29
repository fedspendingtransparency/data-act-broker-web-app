/**
* AddDataMeta.jsx
* Created by Mike Bray 3/21/16
**/

import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import AgencyListContainer from '../../containers/SharedContainers/AgencyListContainer.jsx';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

import Progress from '../SharedComponents/ProgressComponent.jsx';
import Modal from '../SharedComponents/Modal.jsx';
import DateTypeField from './metadata/DateTypeField.jsx';
import DateRangeField from './metadata/DateRangeField.jsx';

import SubmitComponent from './metadata/SubmitComponent.jsx';

import * as AgencyHelper from '../../helpers/agencyHelper.js';
import { Link } from 'react-router';
const propTypes = {
    updateMetaData: PropTypes.func
};

export default class AddDataMeta extends React.Component {
    constructor(props) {
        super(props);

        this.successMessage = 'Everything looks good. Now let\'s work on uploading your .CSV files.';

        this.state = {
            agency: "",
            startDate: null,
            endDate: null,
            dateType: null,
            startDateError: false,
            endDateError: false,
            agencyError: false,
            showDateTypeField: false,
            showDateRangeField: false,
            showSubmitButton: false,
            buttonDisabled: true,
            modalMessage: '',
            showModal: false, 
            message: this.successMessage
        };
        this.closeModal = () =>{
            

            this.setState({
                showModal: false,
                modalMessage:  ''
            })        
        }
    }

    handleChange(agency, isValid){
        if (agency != '' && isValid) {
            this.setState({
                agency: agency,
                agencyError: false
             }, this.checkComplete);
        }
        else {
            this.setState({
                agency: '',
                agencyError: true
            }, this.checkComplete);
        }
    }


    handleDateChange(startDate, endDate, dateError) {

        let message = this.successMessage;
        let buttonDisabled = false;
        if (dateError == true) {
            message = "You need to provide a valid date range in order to continue.";
            buttonDisabled = true;
        }

        this.setState({
            startDate: startDate,
            endDate: endDate,
            message: message,
            buttonDisabled: buttonDisabled
        }, () => {
            if (dateError != true) {
                this.checkComplete();
            }
        });
    }

    handleDateTypeChange(dateType) {
        this.setState({
            dateType: dateType
        }, this.checkComplete);
    }


    checkComplete() {

        if (this.state.agency !== "") {
            this.setState({
                showDateTypeField: true
            });
        }

        if (this.state.dateType != null) {
            this.setState({
                showDateRangeField: true,
                showSubmitButton: true
            });
        }

        if (this.state.startDate != null && this.state.endDate != null && this.state.agency != '') {
            this.setState({
                buttonDisabled: false
            });
        }
        else if (this.state.agency == '') {
            this.setState({
                buttonDisabled: true,
                message: 'You need to provide a valid agency in order to continue.'
            });
        }
    }

    submitMetadata(e){
        let agency = this.state.agency, 
            endDate = this.state.endDate,
            dateType = this.state.dateType,
            year = endDate.substr(3),
            quarter = endDate.substr(0, 2);  
        switch (quarter) {
            case '12': quarter = '3';
                // First quarter (Oct-Dec) has end-year of the previous year. Add 1 to make it the same FYE.
                year = parseInt(year) + 1;
                break;
            case '03': quarter = '6';
                break;
            case '06': quarter = '9';
                break;
            case '09': quarter = '12';
                break;
            default: quarter = '0';
            }
        // Only make a request to check certified submission for quarterly submission. 
        if (dateType == 'quarter') {
            AgencyHelper.checkYearQuarter(agency,year,quarter).then(()=>{
                this.props.updateMetaData(this.state);
            }).catch(err => {
                let modalMessage = "An error occurred while attempting to create a submission. Please contact your administrator for assistance.";
                
                this.setState({
                    showModal : true,
                    modalMessage : <div>{err.message} You can update the certified submission <Link to={`/validateData/${err.submissionId}`}>here</Link>.</div>});
            });
        } else {
            this.props.updateMetaData(this.state);
        }
    }    
    validateAgency() {
        if (this.state.agency == '') {
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
            if (this.state.agency == '') {
                warnings.push('A valid reporting agency is required.');
            }
            if (this.state.startDate == null) {
                warnings.push('A valid start date is required.');
            }
            if (this.state.endDate == null) {
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
            dateTypeField = <DateTypeField value={this.state.dateType} onChange={this.handleDateTypeChange.bind(this)} />;
        }

        let dateRangeField = null;
        if (this.state.showDateRangeField) {
            dateRangeField = <DateRangeField onChange={this.handleDateChange.bind(this)} type={this.state.dateType} />;
        }

        let submissionComponent = null;
        if (this.state.showSubmitButton) {
            submissionComponent = <SubmitComponent message={this.state.message} onSubmit={this.submitMetadata.bind(this)} disabled={this.state.buttonDisabled} />
        }

        return (
                <div>
                    <div className="usa-da-content-step-block" name="content-top">
                        <div className="container center-block">
                            <div className="row">
                                <Progress totalSteps={4} currentStep={1} />
                            </div>
                        </div>
                    </div>
                    <div className="container center-block">
                        <div className="row text-center usa-da-add-data-meta">
                            <div className="col-md-offset-2 col-md-8 mt-60 mb-60">
                                <h5>Please begin by telling us about the submission you are creating</h5>
                                <div className="meta-holder">
                                    <div className="row usa-da-add-data-meta-label">
                                        Which agency is this submission for?
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 typeahead-holder" data-testid="agencytypeahead">
                                            <AgencyListContainer placeholder="Enter the name of the reporting agency" onSelect={this.handleChange.bind(this)} customClass={agencyClass} />
                                                <div className={"usa-da-icon usa-da-form-icon" + agencyClass}>
                                                    {agencyIcon}
                                                </div>
                                            </div>
                                        </div>

                                        <ReactCSSTransitionGroup transitionName="usa-da-meta-fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                            {dateTypeField}
                                        </ReactCSSTransitionGroup>

                                        <ReactCSSTransitionGroup transitionName="usa-da-meta-fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                            {dateRangeField}
                                        </ReactCSSTransitionGroup>

                                        <ReactCSSTransitionGroup transitionName="usa-da-meta-fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                            {submissionComponent}
                                        </ReactCSSTransitionGroup>
                                    </div>
                                    <div className="usa-da-guide-link">
                                        <a href="#/submissionGuide?force=true">View Submission Guide</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal onClose={this.closeModal} isOpen={this.state.showModal} buttons={
                            <div>
                                <button id="modal-button" className="btn btn-primary" onClick={this.closeModal}>OK</button>
                            </div>
                        } 
                        content={this.state.modalMessage}/>  
                    </div>
            );
        }
    }

AddDataMeta.propTypes = propTypes;
