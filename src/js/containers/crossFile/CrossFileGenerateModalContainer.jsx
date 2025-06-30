/**
  * CrossFileGenerateModalContainer.jsx
  * Created by Kevin Li 7/28/16
  */

import React from 'react';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';

import * as GenerateFilesHelper from 'helpers/generateFilesHelper';
import GenerateFileBox from 'components/generateFiles/components/GenerateFileBox';

const propTypes = {
    disableButton: PropTypes.func,
    enableButton: PropTypes.func,
    finishedGenerating: PropTypes.func,
    setButtonText: PropTypes.func,
    setMessage: PropTypes.func,
    label: PropTypes.string,
    submissionID: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    disableButton: () => {},
    enableButton: () => {},
    finishedGenerating: () => {},
    setButtonText: () => {},
    setMessage: () => {},
    label: '',
    submissionID: '',
    type: ''
};

export default class CrossFileGenerateModalContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: 'loading',
            file: {
                startDate: null,
                endDate: null,
                error: {
                    show: false,
                    header: '',
                    description: ''
                },
                download: {
                    show: false,
                    url: ''
                }
            },
            status: 'waiting',
            errorDetails: '',
            toGenerateFiles: false,
            toValidateCrossFile: false
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.showError = this.showError.bind(this);
        this.hideError = this.hideError.bind(this);
        this.validateDates = this.validateDates.bind(this);
    }

    componentDidMount() {
        // disable the submit button while we load the initial data
        this.props.setMessage('Gathering data...');
        this.props.disableButton();

        this.checkForPreviousFiles();
    }

    checkForPreviousFiles() {
        // check if the file already exists for this submission
        GenerateFilesHelper.checkGenerationStatus(this.props.type, this.props.submissionID)
            .then((response) => {
                // check if both files have been requested
                let requested = true;
                if (response.data.status === 'invalid') {
                    // no request has been made yet
                    requested = false;
                }

                if (!requested) {
                    // file has not been requested before
                    // toss back to the generate screen
                    this.setState({
                        toGenerateFiles: true
                    });
                }
                else {
                    // files have been requested before, load the dates
                    const start = moment(response.data.start, 'MM/DD/YYYY');
                    const end = moment(response.data.end, 'MM/DD/YYYY');

                    // load them into React state
                    const fileData = Object.assign({}, this.state.file);
                    fileData.startDate = start;
                    fileData.endDate = end;

                    this.setState({
                        file: fileData
                    }, () => {
                        // now parse the data (in case the files were still in pending state)
                        this.parseFileStates(response.data, true);
                    });
                }
            });
    }

    handleDateChange(date, dateType) {
        // merge the new date into the file's state without affecting the other keys
        const newState = Object.assign(this.state.file, {
            [dateType]: moment(date)
        });

        this.setState({
            file: newState
        }, () => {
            this.validateDates();
        });
    }

    validateDates() {
        // validate that dates are provided for both fields and the end dates don't come before the start dates

        const file = Object.assign({}, this.state.file);

        const output = {
            file
        };

        let isValid = true;

        // validate the date ranges
        const start = this.state.file.startDate;
        const end = this.state.file.endDate;
        if (start && end) {
            // both sets of dates exist
            if (!end.isSameOrAfter(start)) {
                // end date comes before start date, invalid
                isValid = false;
                // show an error message
                output.file.error = {
                    show: true,
                    header: 'Invalid Dates',
                    description: 'The end date cannot be earlier than the start date.'
                };
            }
            else {
                // valid!
                output.file.error = {
                    show: false,
                    header: '',
                    description: ''
                };
            }
        }
        else {
            // not all dates exist yet
            isValid = false;
            output.file.error = {
                show: false,
                header: '',
                description: ''
            };
        }

        if (isValid) {
            this.props.enableButton();
        }
        else {
            this.props.disableButton();
        }

        this.setState(output);
    }

    showError(header, description) {
        this.setState({
            file: Object.assign(this.state.file, {
                error: {
                    show: true,
                    header,
                    description
                }
            })
        });
    }

    hideError() {
        this.setState({
            file: Object.assign(this.state.file, {
                error: {
                    show: false,
                    header: '',
                    description: ''
                }
            })
        });
    }


    generateFile() {
        // submit both D1 and D2 date ranges to the API
        this.props.setButtonText('Generating file...');
        this.props.disableButton();
        this.props.setMessage('');
        GenerateFilesHelper
            .generateFile(this.props.type, this.props.submissionID,
                this.state.file.startDate.format('MM/DD/YYYY'), this.state.file.endDate.format('MM/DD/YYYY'))
            .then((response) => {
                this.parseFileStates(response);
            })
            .catch((err) => {
                let errorMessage = 'An error occurred while contacting the server.';
                if (err && err.body) {
                    errorMessage = err.body.message;
                }

                this.setState({
                    file: Object.assign(this.state.file, {
                        error: {
                            show: true,
                            header: 'An error occurred.',
                            description: errorMessage
                        }
                    })
                });
            });
    }

    checkFileStatus() {
        // check the status of the file
        GenerateFilesHelper
            .checkGenerationStatus(this.props.type, this.props.submissionID)
            .then((res) => {
                this.parseFileStates(res.data);
            })
            .catch(() => {
                this.props.setButtonText('Generate File');
                this.props.enableButton();
            });
    }

    parseFileStates(data, isInitial = false) {
        const output = {};
        let allDone = true;
        const errors = [];
        let message = '';
        const fileData = data;
        output.status = fileData.status;

        if (fileData.status === 'loading') {
            this.props.disableButton();
            this.props.setButtonText('Gathering data...');
        }
        else if (fileData.status === 'waiting') {
            allDone = false;
            this.props.disableButton();
        }
        else if (fileData.status === 'failed' || fileData.status === 'invalid') {
            if (fileData.message !== '') {
                message = `File ${fileData.file.toUpperCase()}: ${fileData.message}`;
            }
            else {
                message = `File ${fileData.file.toUpperCase()} could not be generated.`;
            }
            this.props.enableButton();
            this.props.setButtonText('Generate File');
            this.props.setMessage(message);
        }
        else if (fileData.status === 'finished') {
            // display dowload buttons
            // make a clone of the file's react state
            const item = Object.assign({}, this.state.file);
            // update the download properties
            item.download = {
                show: true,
                url: fileData.url
            };
            // add this to the new state
            output.file = item;
            this.props.enableButton();
            this.props.setButtonText('Generate File');
            this.props.setMessage('');

            if (!isInitial) {
                // we generated a new file, this automatically kicks off the cross file validation process again
                this.props.finishedGenerating();
                return;
            }
        }

        if (errors.length > 0) {
            // there are errors
            output.state = 'failed';
            output.errorDetails = message;
        }
        else if (errors.length === 0 && allDone) {
            output.state = 'done';
        }

        this.setState(output);

        if (!allDone) {
            // wait 5 seconds and check the file status again
            window.setTimeout(() => {
                this.checkFileStatus();
            }, 5000);
        }
    }

    nextPage() {
        this.setState({
            toValidateCrossFile: true
        });
    }

    render() {
        if (this.state.toGenerateFiles) {
            return <Navigate to={`/submission/${this.props.submissionID}/generateFiles/`} />;
        }
        else if (this.state.toValidateCrossFile) {
            return <Navigate to={`/submission/${this.props.submissionID}/validateCrossFile/`} />;
        }
        return (
            <GenerateFileBox
                label={this.props.label}
                datePlaceholder=""
                value={this.state.file}
                error={this.state.file.error}
                download={this.state.file.download}
                onDateChange={this.handleDateChange}
                showError={this.showError}
                hideError={this.hideError}
                updateError={this.validateDates} />
        );
    }
}

CrossFileGenerateModalContainer.propTypes = propTypes;
CrossFileGenerateModalContainer.defaultProps = defaultProps;
