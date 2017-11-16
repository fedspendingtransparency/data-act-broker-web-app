/**
* CrossFileContentContainer.jsx
* Created by Kevin Li 6/14/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import _ from 'lodash';

import * as uploadActions from '../../redux/actions/uploadActions.js';
import { kGlobalConstants } from '../../GlobalConstants.js';
import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

import CrossFileContent from '../../components/crossFile/CrossFileContent.jsx';
import PublishedSubmissionWarningBanner from '../../components/SharedComponents/PublishedSubmissionWarningBanner.jsx';
import Banner from '../../components/SharedComponents/Banner.jsx';

const timerDuration = 10;

class CrossFileContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.dataTimer = null;
		this.isUnmounted = false;
		
		this.state = {
			agencyName: ""
		}
    }

    componentDidMount() {
        this.isUnmounted = false;
        this.loadData();
        this.startTimer();
    }

    componentWillUnmount() {
        this.isUnmounted = true;
        // stop the timer
        if (this.dataTimer) {
            window.clearInterval(this.dataTimer);
            this.dataTimer = null;
        }
    }

    uploadFiles() {
        if (kGlobalConstants.LOCAL === true) {
            UploadHelper.performLocalCorrectedUpload(this.props.submission)
                .then(() => {
                    this.props.resetSubmission();
                    // reload the data
                    this.loadData();
                    this.startTimer();
                });
        }
        else {
            UploadHelper.performRemoteCorrectedUpload(this.props.submission)
                .then(() => {
                    this.props.resetSubmission();
                    // reload the data
                    this.loadData();
                    this.startTimer();
                });
        }
    }

    prepareCrossFileReports(data) {
        // store the cross file report CSV URLs in Redux
        const reports = data.crossFile.reports;

        const updatedData = [];
        this.props.submission.crossFileOrder.forEach((pair) => {
            // create a new metadata object for each expected cross file pairing
            const reportUrls = {
                errorsReport: '#',
                warningsReport: '#'
            };

            if (reports.errors.hasOwnProperty(pair.key)) {
                reportUrls.errorsReport = reports.errors[pair.key];
            }
            if (reports.warnings.hasOwnProperty(pair.key)) {
                reportUrls.warningsReport = reports.warnings[pair.key];
            }

            const updatedPair = Object.assign({}, pair, reportUrls);

            updatedData.push(updatedPair);
        });

        this.props.setExpectedCrossPairs(updatedData);
    }

    crossFileComplete(data) {
        // check if the validations are complete
        let crossFileDone = false;

        // check if cross file is done
        if (data.crossFile.state.job === 'finished' || data.crossFile.state.job === 'invalid') {
            crossFileDone = true;
        }

        // check if cross file file status is done
        const completedStatuses = ['complete', 'header_error', 'unknown_error', 'single_row_error', 'job_error'];
        if (_.indexOf(completedStatuses, data.crossFile.state.file) === -1) {
            crossFileDone = false;
        }

        return crossFileDone;
    }

    individualPassedValidation(data) {
        let state = 'pending';

        // check if the individual files are done
        let allPassed = true;
        for (let key in data.file) {
            const jobStatus = data.file[key].job_status;
            const errorType = data.file[key].error_type;

            if (jobStatus === 'invalid' || (jobStatus === 'finished' && errorType !== 'none')) {
                state = 'errors';
                allPassed = false;
                break;
            }
            else if (jobStatus !== 'finished') {
                allPassed = false;

                if (jobStatus === 'waiting') {
                    // there are files that are still missing
                    state = 'errors';
                }
            }
        }

        if (state === 'pending' && allPassed) {
            state = 'passed';
        }

        return state;
    }

    loadData() {
        this.props.setSubmissionState('empty');
        ReviewHelper.validateSubmission(this.props.submissionID)
        .then((data) => {
			let done = false;
			this.setState({
				agencyName: data.agencyName
			});
            // check if invididual files have validation errors
            const individualState = this.individualPassedValidation(data);
            if (individualState === 'passed') {
                // everything finished and passed
                done = true;
            }
            else if (individualState === 'errors') {
                // there are individual errors, return to file validation screen
                // stop the timer
                if (this.dataTimer) {
                    window.clearInterval(this.dataTimer);
                    this.dataTimer = null;
                }

                // redirect
                hashHistory.push('/validateData/' + this.props.submissionID);
            }
            // individual files are done and valid
            if (done && this.crossFileComplete(data)) {
                // stop the timer once the validations are complete
                this.props.setSubmissionState('crossFile');
                this.props.setCrossFile(data.crossFile.data);
                this.prepareCrossFileReports(data);

                if (this.dataTimer) {
                    window.clearInterval(this.dataTimer);
                    this.dataTimer = null;
                }
            }
        })
        .catch((err) => {
            // check if the error has an associated user-displayable message
            if (err.hasOwnProperty('detail') && err.detail !== '') {
                if (!this.isUnmounted) {
                    this.props.showError(err.detail);
                }
            }
            else {
                console.log(err);
            }

            // stop the timer
            if (this.dataTimer) {
                window.clearInterval(this.dataTimer);
                this.dataTimer = null;
            }
        });
    }

    startTimer() {
        // keep checking the data every 5 seconds until it has finished loaded;
        this.dataTimer = window.setInterval(() => {
            this.loadData();
        }, timerDuration * 1000);
    }

    reloadData() {
        this.props.resetSubmission();
        this.loadData();
        this.startTimer();
    }

    render() {
        let warningMessage = null;
        if (this.props.submission.publishStatus !== "unpublished") {
            warningMessage = <PublishedSubmissionWarningBanner />;
        }

        return (
            <div>
                {warningMessage}
                <Banner type="dabs" />
                <CrossFileContent {...this.props} uploadFiles={this.uploadFiles.bind(this)}
                    reloadData={this.reloadData.bind(this)} agencyName={this.state.agencyName} />
            </div>
        );
    }
}

export default connect(
    (state) => ({ submission: state.submission,
    session: state.session }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(CrossFileContentContainer);
