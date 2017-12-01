/**
* GenerateDetachedFilesPage.jsx
* Created by Alisa Burdeyny
*/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React, { PropTypes } from 'react';
import moment from 'moment';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import Footer from '../SharedComponents/FooterComponent';
import AgencyListContainer from '../../containers/SharedContainers/AgencyListContainer';
import DateSelect from './DateSelect';

import * as GenerateFilesHelper from '../../helpers/generateFilesHelper';

import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    route: PropTypes.object
};

const defaultProps = {
    route: null
};

const timerDuration = 10;

export default class GenerateDetachedFilesPage extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            agency: "",
            codeType: 'cgac',
            agencyError: false,
            showDateSelect: false,
            showSubmitButton: false,
            buttonDisabled: true,
            d1: {
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
                },
                valid: false,
                status: ""
            },
            d2: {
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

    handleChange(agency, codeType, isValid) {
        // display or hide file generation based on agency validity and set agency
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
                codeType: null,
                agencyError: true
            }, this.checkComplete);
        }
    }

    checkComplete() {
        // actually display/hide the file generation
        if (this.state.agency !== "") {
            this.setState({
                showDateSelect: true
            });
        }
        else {
            this.setState({
                showDateSelect: false
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

        this.setState({ [file]: dFile });
    }

    updateError(file, header = '', description = '') {
        // Show any error that occurs at any point during file upload
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

    generateFile(file) {
        // generate specified file
        const cgacCode = this.state.codeType !== 'frec_code' ? this.state.agency : '';
        const frecCode = this.state.codeType === 'frec_code' ? this.state.agency : '';

        const tmpFile = Object.assign({}, this.state[file]);
        tmpFile.status = "generating";
        this.setState({ [file]: tmpFile });

        GenerateFilesHelper.generateDetachedFile(file.toUpperCase(), tmpFile.startDate.format('MM/DD/YYYY'),
            tmpFile.endDate.format('MM/DD/YYYY'), cgacCode, frecCode)
            .then((response) => {
                if (this.isUnmounted) {
                    return;
                }

                this.parseFileState(response);
            });
    }

    checkFileStatus(jobId) {
        // callback to check file status
        GenerateFilesHelper.fetchDetachedFile(jobId)
            .then((response) => {
                if (this.isUnmounted) {
                    return;
                }

                this.parseFileState(response);
            });
    }

    parseFileState(data) {
        // parse response and see what state the generation is in
        const fileType = data.file_type.toLowerCase();

        let runCheck = true;

        if (data.httpStatus === 401) {
            // don't run the check again if it failed
            runCheck = false;

            this.showError(fileType, 'Permission Error', data.message);
        }
        else if (data.status === 'failed' || data.status === 'invalid') {
            // don't run the check again if it failed
            runCheck = false;

            let message = 'File ' + data.file_type + ' could not be generated.';

            if (data.message !== '') {
                message = data.message;
            }

            // make a clone of the file's react state
            const item = Object.assign({}, this.state[fileType]);
            item.status = "";
            this.setState({ [fileType]: item });

            this.showError(fileType, data.file_type + ' File Error', message);
        }
        else if (data.status === 'finished') {
            // don't run the check again if it's done
            runCheck = false;

            this.updateError(fileType);

            // display dowload buttons
            // make a clone of the file's react state
            const item = Object.assign({}, this.state[fileType]);

            // update the download properties
            item.download = {
                show: true,
                url: data.url
            };
            item.status = "done";

            this.setState({ [fileType]: item });
        }

        if (this.isUnmounted) {
            return;
        }

        if (runCheck && !this.isUnmounted) {
            // wait 5 seconds and check the file status again
            window.setTimeout(() => {
                this.checkFileStatus(data.job_id);
            }, timerDuration * 1000);
        }
    }

    render() {
        let agencyIcon = <Icons.Building />;
        let agencyClass = '';
        if (this.state.agencyError) {
            agencyIcon = <Icons.Building />;
            agencyClass = ' error usa-da-form-icon';
        }

        let dateSelect = null;
        if (this.state.showDateSelect) {
            dateSelect = (<DateSelect
                {...this.state}
                handleDateChange={this.handleDateChange.bind(this)}
                updateError={this.updateError.bind(this)}
                generateFile={this.generateFile.bind(this)} />);
        }

        return (
            <div className="usa-da-generate-detached-files-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide" type={this.props.route.type} />
                        <div className="usa-da-content-dark">
                            <div className="container">
                                <div className="row usa-da-page-title">
                                    <div className="col-lg-12 mt-40 mb-20">
                                        <div className="display-2">Generate and Download Files D1 & D2</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container center-block">
                            <div className="row text-center usa-da-select-agency">
                                <div className="col-lg-offset-2 col-lg-8 mt-60 mb-60">
                                    <h5>Please begin by telling us about files you would like to generate</h5>
                                    <div className="select-agency-holder">
                                        <div className="row usa-da-select-agency-label">
                                            The generated files will be used when submiting data for...
                                        </div>

                                        <div className="row">
                                            <div
                                                className="col-sm-12 col-md-12 typeahead-holder"
                                                data-testid="agencytypeahead">
                                                <AgencyListContainer
                                                    placeholder="Enter the name of the reporting agency"
                                                    onSelect={this.handleChange.bind(this)}
                                                    customClass={agencyClass} />
                                                <div className={"usa-da-icon usa-da-form-icon" + agencyClass}>
                                                    {agencyIcon}
                                                </div>
                                            </div>
                                        </div>

                                        <ReactCSSTransitionGroup
                                            transitionName="usa-da-meta-fade"
                                            transitionEnterTimeout={500}
                                            transitionLeaveTimeout={300}>
                                            {dateSelect}
                                        </ReactCSSTransitionGroup>
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

GenerateDetachedFilesPage.propTypes = propTypes;
GenerateDetachedFilesPage.defaultProps = defaultProps;
