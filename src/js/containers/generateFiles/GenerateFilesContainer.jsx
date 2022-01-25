/**
  * GenerateFilesContainer.jsx
  * Created by Kevin Li 7/22/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import { assign, findIndex, merge } from 'lodash';
import Q from 'q';

import GenerateFilesContent from 'components/generateFiles/GenerateFilesContent';

import * as uploadActions from 'redux/actions/uploadActions';

import * as GenerateFilesHelper from 'helpers/generateFilesHelper';
import * as ReviewHelper from 'helpers/reviewHelper';

const propTypes = {
    setSubmissionId: PropTypes.func,
    setSubmissionPublishStatus: PropTypes.func,
    submission: PropTypes.object,
    submissionID: PropTypes.string,
    errorFromStep: PropTypes.func
};

const defaultProps = {
    setSubmissionId: uploadActions.setSubmissionId(),
    setSubmissionPublishStatus: uploadActions.setSubmissionPublishStatus(),
    submission: {},
    submissionID: ''
};

const timerDuration = 10;

export class GenerateFilesContainer extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            state: 'loading',
            d1: {
                startDate: null,
                endDate: null,
                error: {
                    show: false,
                    header: '',
                    description: ''
                },
                showDownload: false,
                agencyType: 'awarding',
                fileFormat: 'csv',
                lastGenerated: null
            },
            d2: {
                startDate: null,
                endDate: null,
                error: {
                    show: false,
                    header: '',
                    description: ''
                },
                showDownload: false,
                agencyType: 'awarding',
                fileFormat: 'csv',
                lastGenerated: null
            },
            d1Status: 'waiting',
            d2Status: 'waiting',
            errorDetails: '',
            agency_name: ''
        };

        this.updateFileProperty = this.updateFileProperty.bind(this);
        this.clickedDownload = this.clickedDownload.bind(this);
        this.updateError = this.updateError.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.generateFiles = this.generateFiles.bind(this);
    }

    componentDidMount() {
        this.isUnmounted = false;
        this.setAgencyName(this.props);
        this.checkForPreviousFiles();
    }

    componentDidUpdate(prevProps) {
        if (this.props.submissionID !== prevProps.submissionID) {
            this.setAgencyName(this.props);
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    setAgencyName(givenProps) {
        if (givenProps.submissionID !== null) {
            ReviewHelper.fetchSubmissionMetadata(givenProps.submissionID, 'dabs')
                .then((data) => {
                    if (!this.isUnmounted) {
                        this.setState({ agency_name: data.agency_name });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.props.errorFromStep(error.body.message);
                });
        }
    }

    clickedDownload(fileType) {
        GenerateFilesHelper.fetchFile(fileType, this.props.submissionID)
            .then((result) => {
                window.open(result.url);
            })
            .catch((error) => {
                console.error(error);
                this.props.errorFromStep(error.message);
            });
    }

    checkForPreviousFiles() {
        // check if D1 and D2 files already exist for this submission
        Q.allSettled([
            GenerateFilesHelper.checkGenerationStatus('D1', this.props.submissionID),
            GenerateFilesHelper.checkGenerationStatus('D2', this.props.submissionID)
        ])
            .then((allResponses) => {
                if (this.isUnmounted) {
                    return;
                }

                // check if both files have been requested
                let allRequested = true;
                const combinedData = [];
                allResponses.forEach((response) => {
                    if (response.state !== 'fulfilled' || response.value.status === 'invalid') {
                        // no request has been made yet
                        allRequested = false;
                    }
                    else {
                        combinedData.push(response.value);
                    }
                });

                if (!allRequested) {
                    // files have not been requested before, prepopulate with the submission date
                    // it's possible that only one file was requested, but in that case treat it as though it wasn't
                    this.loadSubmissionData();
                }
                else {
                    // files have been requested before, load the dates
                    const d1Start = moment(allResponses[0].value.start, 'MM/DD/YYYY');
                    const d1End = moment(allResponses[0].value.end, 'MM/DD/YYYY');
                    const d2Start = moment(allResponses[1].value.start, 'MM/DD/YYYY');
                    const d2End = moment(allResponses[1].value.end, 'MM/DD/YYYY');

                    // load them into React state
                    const d1 = Object.assign({}, this.state.d1);
                    d1.startDate = d1Start;
                    d1.endDate = d1End;

                    const d2 = Object.assign({}, this.state.d2);
                    d2.startDate = d2Start;
                    d2.endDate = d2End;

                    this.setState({
                        d1,
                        d2
                    }, () => {
                        // now parse the data (in case the files were still in pending state)
                        this.parseFileStates(combinedData);
                    });
                }
            });
    }

    loadSubmissionData() {
        // prepopulate the fields with the submission metadata dates
        ReviewHelper.fetchSubmissionMetadata(this.props.submissionID, 'dabs')
            .then((data) => {
                this.props.setSubmissionId(this.props.submissionID);
                this.props.setSubmissionPublishStatus(data.publish_status);

                // check if quarter or month
                const defaultStart = moment(data.reporting_start_date, 'MM/DD/YYYY');
                const defaultEnd = moment(data.reporting_end_date, 'MM/DD/YYYY');

                const output = {
                    state: 'ready',
                    d1: {
                        startDate: defaultStart,
                        endDate: defaultEnd
                    },
                    d2: {
                        startDate: defaultStart,
                        endDate: defaultEnd
                    }
                };

                // object.assign doesn't merge correctly, so using lodash to merge
                const mergedState = merge({}, this.state, output);

                if (this.isUnmounted) {
                    return;
                }

                this.setState(mergedState, () => {
                    this.validateDates();
                });
            })
            .catch((err) => {
                console.error(' Error : ', err);
                this.props.errorFromStep(err.message);
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
            this.validateDates();
        });
    }

    validateDates() {
        // validate that dates are provided for both fields and the end dates don't come before the start dates
        let state = "incomplete";

        const types = ['d1', 'd2'];

        const d1 = Object.assign({}, this.state.d1);
        const d2 = Object.assign({}, this.state.d2);

        const output = {
            d1,
            d2
        };

        let allValid = true;
        types.forEach((type) => {
            // validate the date ranges
            const start = this.state[type].startDate;
            const end = this.state[type].endDate;
            if (start && end) {
                // both sets of dates exist
                if (!end.isSameOrAfter(start)) {
                    // end date comes before start date, invalid
                    allValid = false;
                    // show an error message
                    output[type].error = {
                        show: true,
                        header: 'Invalid Dates',
                        description: 'The end date cannot be earlier than the start date.'
                    };
                }
                else {
                    // valid!
                    output[type].error = {
                        show: false,
                        header: '',
                        description: ''
                    };
                }
            }
            else {
                // not all dates exist yet
                allValid = false;
                output[type].error = {
                    show: false,
                    header: '',
                    description: ''
                };
            }
        });

        if (allValid) {
            state = "ready";
        }

        output.state = state;

        this.setState(output);
    }

    updateError(file, header = '', description = '') {
        const state = Object.assign({}, this.state[file], {
            error: {
                show: header !== '' && description !== '',
                header,
                description
            }
        });

        this.setState({
            [file]: state
        });
    }

    updateFileProperty(fileType, property, value) {
        const newType = assign({}, this.state[fileType]);
        newType[property] = value;
        this.setState({
            [fileType]: newType
        });
    }

    generateFiles() {
        this.setState({
            state: 'generating'
        });

        // submit both D1 and D2 date ranges to the API
        Q.allSettled([
            GenerateFilesHelper.generateFile('D1', this.props.submissionID,
                this.state.d1.startDate.format('MM/DD/YYYY'),
                this.state.d1.endDate.format('MM/DD/YYYY'),
                this.state.d1.agencyType,
                this.state.d1.fileFormat),
            GenerateFilesHelper.generateFile('D2', this.props.submissionID,
                this.state.d2.startDate.format('MM/DD/YYYY'),
                this.state.d2.endDate.format('MM/DD/YYYY'),
                this.state.d2.agencyType,
                this.state.d2.fileFormat)
        ])
            .then((allResponses) => {
                if (this.isUnmounted) {
                    return;
                }

                const responses = [];
                allResponses.forEach((response) => {
                    if (response.state === 'fulfilled') {
                        responses.push(response.value);
                    }
                    else {
                        responses.push(response.reason);
                    }
                });

                this.parseFileStates(responses);
            });
    }

    checkFileStatus() {
        // check the status of both D1 and D2 files
        Q.allSettled([
            GenerateFilesHelper.checkGenerationStatus('D1', this.props.submissionID),
            GenerateFilesHelper.checkGenerationStatus('D2', this.props.submissionID)
        ])
            .then((allResponses) => {
                if (this.isUnmounted) {
                    return;
                }

                const responses = [];
                allResponses.forEach((response) => {
                    if (response.state === 'fulfilled') {
                        responses.push(response.value);
                    }
                    else {
                        responses.push(response.reason);
                    }
                });
                this.parseFileStates(responses);
            });
    }

    parseFileStates(data) {
        // check which files we're still waiting on
        const files = ['d1', 'd2'];

        const responses = {
            d1: data[0],
            d2: data[1]
        };

        const output = {};
        let allDone = true;
        const errors = [];
        let message = '';

        files.forEach((file) => {
            const fileData = responses[file];
            output[`${file}Status`] = fileData.status;

            if (fileData.httpStatus === 401) {
                errors.push(file);
                this.updateError(file, 'Permission Error', fileData.message);
            }
            else if (fileData.status === 'waiting') {
                allDone = false;
            }
            else if (fileData.status === 'failed' || fileData.status === 'invalid') {
                errors.push(file);

                message = `File ${fileData.file_type} could not be generated.`;

                if (fileData.message !== '') {
                    message = fileData.message;
                }

                this.updateError(file, `${fileData.file_type.toUpperCase()} File Error`, message);


                const item = Object.assign({}, this.state[file]);
                // ONLY IF FILEDATAURL EXISTRS

                if (fileData.url && fileData.size) {
                    // update the download properties
                    item.showDownload = true;
                    const header = `${fileData.file_type.toUpperCase()} File Error`;
                    item.error = {
                        show: header !== '' && message !== '',
                        header,
                        description: message
                    };
                    item.lastGenerated = fileData.generated_at;
                    output[file] = item;
                }
            }
            else if (fileData.status === 'finished') {
                this.updateError(file);
                // display dowload buttons
                // make a clone of the file's react state
                const item = Object.assign({}, this.state[file]);
                // update the download properties
                item.showDownload = true;
                const failCases = ['', '#', null];
                if (findIndex(failCases, fileData.url) !== -1) {
                    const header = `${fileData.file_type.toUpperCase()} File Error`;
                    item.error = {
                        show: true,
                        header,
                        description: 'No data found for the specified period'
                    };
                }
                item.lastGenerated = fileData.generated_at;
                // add this to the new state
                output[file] = item;
            }
            else {
                // something terrible has happened, show a failure
                errors.push(file);
                message = 'An error occurred while generating this file.';
                this.updateError(file, 'General Error', message);
            }
        });

        if (errors.length > 0) {
            // there are errors
            output.state = 'failed';
            output.errorDetails = '';
        }
        else if (errors.length === 0 && allDone) {
            output.state = 'done';
        }
        else {
            output.state = 'generating';
        }

        if (this.isUnmounted) {
            return;
        }

        this.setState(output);


        if (!allDone && !this.isUnmounted) {
            // wait 5 seconds and check the file status again
            window.setTimeout(() => {
                this.checkFileStatus();
            }, timerDuration * 1000);
        }
    }

    render() {
        return (
            <GenerateFilesContent
                {...this.props}
                {...this.state}
                handleDateChange={this.handleDateChange}
                updateError={this.updateError}
                generateFiles={this.generateFiles}
                updateFileProperty={this.updateFileProperty}
                clickedDownload={this.clickedDownload}
                publishStatus={this.props.submission.publishStatus} />
        );
    }
}

GenerateFilesContainer.propTypes = propTypes;
GenerateFilesContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(GenerateFilesContainer);
