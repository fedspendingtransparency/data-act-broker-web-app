/**
* AddDataMeta.jsx
* Created by Mike Bray 3/21/16
**/

import React, { PropTypes } from 'react';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Typeahead from '../SharedComponents/Typeahead.jsx';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as AgencyHelper from '../../helpers/agencyHelper.js';

const propTypes = {
    updateMetaData: PropTypes.func
};

export default class AddDataMeta extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: true,
            agency: "",
            startDate: null,
            endDate: null,
            startDateError: false,
            endDateError: false,
            agencyError: false
        };
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

    handleStartDateChange(date) {
        this.setState({ startDate: date }, this.checkComplete);
    }

    handleEndDateChange(date) {
        this.setState({ endDate: date }, this.checkComplete);
    }

    checkComplete(){
        if (this.state.agency !== "" && this.state.startDate !== null && this.state.endDate !== null){
            this.setState({ buttonDisabled: false });
        } else {
            this.setState({ buttonDisabled: true });
        }
    }

    submitMetadata(){
        this.props.updateMetaData(this.state);
    }

    validateDate(field) {
        if (this.state[field] == null) {
            this.setState({
                [field + 'Error']: true
            });
        }
        else {
            this.setState({
                [field + 'Error']: false
            });
        }

        // validate endDate comes after startDate
        if (field == 'endDate' && !this.state.startDateError && this.state.endDate) {
            if (this.state.endDate.unix() - this.state.startDate.unix() < 0) {
                this.setState({
                    endDateError: true,
                    buttonDisabled: true
                });
            }
            else {
                this.setState({
                    endDateError: false,
                    buttonDisabled: false
                });
            }

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

        let startDateClass = '';
        let startDateIcon = <Icons.Calendar />;
        if (this.state.startDateError) {
            startDateClass = 'error';
            startDateIcon = <Icons.Calendar  />;
        }

        let endDateClass = '';
        let endDateIcon = <Icons.Calendar />;
        if (this.state.endDateError) {
            endDateClass = 'error';
            endDateIcon = <Icons.Calendar />;
        }

        let agencyIcon = <Icons.Building />;
        let agencyClass = '';
        if (this.state.agencyError) {
            agencyIcon = <Icons.Building />;
            agencyClass = 'error';
        }

        return (
                <div>
                    <div className="container center-block">
                        <div className="row text-center usa-da-add-data-meta">
                            <div className="col-md-offset-2 col-md-8 mt-60 mb-60">
                                <h6 className="mb-20">Please provide the following information about the report you will be creating.</h6>
                                <div className="meta-holder">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 typeahead-holder" data-testid="agencytypeahead">
                                            <Typeahead values={AgencyHelper.agencies} placeholder="Enter the name of the reporting agency" onSelect={this.handleChange.bind(this)} customClass={agencyClass} />
                                                <div className={"usa-da-icon " + agencyClass}>
                                                    {agencyIcon}
                                                </div>
                                        </div>
                                    </div>
                                
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 mt-20 pos-rel usa-da-startDate">
                                            <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange.bind(this)} placeholderText="Reporting period start date" onBlur={this.validateDate.bind(this, 'startDate')} className={startDateClass} />
                                             <div className={"usa-da-icon " + startDateClass}>
                                                {startDateIcon}
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-6 mt-20 usa-da-endDate">
                                            <DatePicker selected={this.state.endDate} onChange={this.handleEndDateChange.bind(this)} placeholderText="Reporting period end date" onBlur={this.validateDate.bind(this, 'endDate')} className={endDateClass} />
                                            <div className={"usa-da-icon " + endDateClass}>
                                                {endDateIcon}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12 text-right mt-20" data-testid="submitbutton">
                                            <SubmitButton onClick={this.submitMetadata.bind(this)} className="usa-da-button btn-primary btn-lg" buttonText="Submit" buttonDisabled={this.state.buttonDisabled} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

AddDataMeta.propTypes = propTypes;