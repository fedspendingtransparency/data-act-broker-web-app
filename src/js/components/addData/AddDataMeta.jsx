/**
* AddDataMeta.jsx
* Created by Mike Bray 3/21/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import AgencyListContainer from '../../containers/SharedContainers/AgencyListContainer';
import * as Icons from '../SharedComponents/icons/Icons';
import Modal from '../SharedComponents/Modal';
import DateTypeField from './metadata/DateTypeField';
import DateRangeField from './metadata/DateRangeField';
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
            agency: "",
            codeType: "",
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
    }

    closeModal() {
        this.setState({
            showModal: false,
            modalMessage: ''
        });
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
            message = "You need to provide a valid date range in order to continue.";
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

    handleDateTypeChange(dateType) {
        this.setState({
            dateType
        }, this.checkComplete);
    }

    checkComplete() {
        if (this.state.agency !== "") {
            this.setState({
                showDateTypeField: true
            });
        }

        if (this.state.dateType !== null) {
            this.setState({
                showDateRangeField: true,
                showSubmitButton: true
            });
        }

        if (this.state.startDate !== null && this.state.endDate !== null && this.state.agency !== '') {
            this.setState({
                buttonDisabled: false
            });
        }
        else if (this.state.agency === '') {
            this.setState({
                buttonDisabled: true,
                message: 'You need to provide a valid agency in order to continue.'
            });
        }
    }

    submitMetadata() {
        this.props.updateMetaData(this.state);
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
                onChange={this.handleDateTypeChange.bind(this)} />);
        }

        let dateRangeField = null;
        if (this.state.showDateRangeField) {
            dateRangeField = <DateRangeField onChange={this.handleDateChange.bind(this)} type={this.state.dateType} />;
        }

        let submissionComponent = null;
        if (this.state.showSubmitButton) {
            submissionComponent = (<SubmitComponent
                message={this.state.message}
                onSubmit={this.submitMetadata.bind(this)}
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
                    onClose={this.closeModal.bind(this)}
                    isOpen={this.state.showModal}
                    content={this.state.modalMessage} />
            </div>
        );
    }
}

AddDataMeta.propTypes = propTypes;
AddDataMeta.defaultProps = defaultProps;
