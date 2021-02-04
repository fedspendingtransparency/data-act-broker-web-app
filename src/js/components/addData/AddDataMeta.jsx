/**
* AddDataMeta.jsx
* Created by Mike Bray 3/21/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Redirect } from 'react-router-dom';

import * as AgencyHelper from 'helpers/agencyHelper';
import * as UtilHelper from 'helpers/util';
import AgencyListContainer from 'containers/SharedContainers/AgencyListContainer';
import * as Icons from 'components/SharedComponents/icons/Icons';
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

        this.state = {
            agency: '',
            codeType: '',
            startDate: null,
            endDate: null,
            dateType: null,
            submissionType: null,
            showDateTypeField: false,
            showDateRangeField: false,
            showSubmissionTypeField: false,
            showSubmitButton: false,
            publishedSubmissions: [],
            testSubmission: false,
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateTypeChange = this.handleDateTypeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmissionTypeChange = this.handleSubmissionTypeChange.bind(this);
        this.submitMetadata = this.submitMetadata.bind(this);
        this.checkCertifiable = this.checkCertifiable.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
    }

    setRedirect() {
        this.setState({
            redirect: true
        });
    }

    handleChange(agency, codeType, isValid) {
        if (agency !== '' && isValid) {
            this.setState({
                agency,
                codeType
            }, () => {
                if (this.state.showSubmitButton) {
                    this.checkCertifiable();
                }
                else {
                    this.checkComplete();
                }
            });
        }
        else {
            this.setState({
                agency: '',
                codeType: ''
            }, this.checkComplete);
        }
    }

    handleDateChange(startDate, endDate) {
        this.setState({
            startDate,
            endDate
        }, this.checkCertifiable);
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
                showSubmissionTypeField: false
            });
        }

        if (this.state.submissionType !== null) {
            this.setState({
                showSubmitButton: true
            });
        }
    }

    submitMetadata() {
        this.props.updateMetaData(this.state);
    }

    checkCertifiable() {
        const agency = this.state.agency;
        const codeType = this.state.codeType;
        const endDate = this.state.endDate;
        const dateType = this.state.dateType;

        // Check to see if there are already published submissions for this period
        const dates = UtilHelper.getYearAndPeriod(endDate);

        const cgacCode = codeType === 'cgac_code' ? agency : null;
        const frecCode = codeType === 'frec_code' ? agency : null;
        const isQuarter = (dateType === 'quarter');

        // if year is 2022 or greater and it's a quarterly submission, default to test
        if (dates.year >= 2022 && isQuarter) {
            this.setState({
                testSubmission: true,
                submissionType: 'test',
                publishedSubmissions: []
            });
        }
        else {
            AgencyHelper.getPublishedSubmissions(cgacCode, frecCode, dates.year, dates.period, isQuarter)
                .then((publishedSubmissions) => {
                    if (publishedSubmissions.length > 0) {
                        this.setState({
                            testSubmission: true,
                            submissionType: 'test',
                            publishedSubmissions
                        }, this.checkComplete);
                    }
                    else {
                        this.setState({
                            testSubmission: false,
                            publishedSubmissions
                        }, this.checkComplete);
                    }
                });
        }
    }

    render() {
        if (this.state.redirect) {
            const singlePubSub = (this.state.publishedSubmissions.length === 1);

            const pubSublink = (
                singlePubSub ?
                    <Redirect to={`/submission/${this.state.publishedSubmissions[0].submission_id}/validateData`} />
                    :
                    <Redirect to="/submissionTable/" />
            );
            return pubSublink;
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
                value={this.state.submissionType}
                publishedSubmissions={this.state.publishedSubmissions}
                endDate={this.state.endDate}
                dateType={this.state.dateType} />);
        }

        let submissionComponent = null;
        if (this.state.showSubmitButton) {
            submissionComponent = (<SubmitComponent
                onSubmit={this.submitMetadata}
                publishedSubmissions={this.state.publishedSubmissions}
                setRedirect={this.setRedirect} />);
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
                                            onSelect={this.handleChange}
                                            detached={false} />
                                        <div className="usa-da-icon usa-da-form-icon">
                                            <Icons.Building />
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
            </div>
        );
    }
}

AddDataMeta.propTypes = propTypes;
AddDataMeta.defaultProps = defaultProps;
