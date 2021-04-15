/**
* GenerateEFContainer.jsx
* Created by Kevin Li 8/23/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Q from 'q';

import * as uploadActions from 'redux/actions/uploadActions';
import * as GenerateHelper from 'helpers/generateFilesHelper';
import * as ReviewHelper from 'helpers/reviewHelper';

import GenerateEFContent from 'components/generateEF/GenerateEFContent';
import GenerateEFError from 'components/generateEF/GenerateEFError';

const propTypes = {
    submission: PropTypes.object,
    submissionID: PropTypes.string,
    errorFromStep: PropTypes.func
};

const defaultProps = {
    submission: {},
    submissionID: ""
};

const timerDuration = 10;

class GenerateEFContainer extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            fullPageError: false,
            fullPageMessage: '',
            isReady: false,
            hasErrors: false,
            e: {},
            f: {},
            generated: false,
            agency_name: ''
        };
    }

    componentDidMount() {
        this.isUnmounted = false;
        this.setAgencyName(this.props);
        this.checkFileStatus();
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

    handleResponse(allResponses) {
        if (this.isUnmounted) {
            return;
        }

        const keys = ['e', 'f'];
        const newState = {};
        for (let i = 0; i < keys.length; i++) {
            const response = allResponses[i];
            let data;
            if (response.state === 'fulfilled') {
                data = response.value;

                if (data.status === 'invalid') {
                    if (!this.state.generated) {
                        this.setState({ generated: true });
                        this.generateFiles();
                        return;
                    }
                    data.message = 'Prerequisites required to generate this file are incomplete.';
                }
            }
            else {
                data = response.reason;
            }

            newState[keys[i]] = data;
        }

        this.setState(newState, this.parseState);
    }

    generateFiles() {
        Q
            .allSettled([
                GenerateHelper.generateFile('E', this.props.submissionID, '', ''),
                GenerateHelper.generateFile('F', this.props.submissionID, '', '')
            ])
            .then((allResponses) => {
                this.handleResponse(allResponses);
            });
    }

    checkFileStatus() {
        Q
            .allSettled([
                GenerateHelper.checkGenerationStatus('E', this.props.submissionID),
                GenerateHelper.checkGenerationStatus('F', this.props.submissionID)
            ])
            .then((allResponses) => {
                this.handleResponse(allResponses);
            });
    }

    parseState() {
        const files = [this.state.e, this.state.f];
        let hasErrors = false;
        let isReady = true;
        let showFullPageError = false;
        let fullPageMessage = '';
        files.forEach((file) => {
            if (file.httpStatus === 403 || file.httpStatus === 401) {
                // permissions error, reject
                showFullPageError = true;
                fullPageMessage = 'You are not authorized to perform the requested task. ' +
                    'Please contact your administrator.';
            }
            else if (file.status === 'failed') {
                hasErrors = true;
            }
            else if (file.status === 'waiting') {
                isReady = false;
            }
            else if (file.status === 'invalid') {
                isReady = true;
                hasErrors = true;
            }
        });

        this.setState({
            fullPageError: showFullPageError,
            fullPageMessage,
            hasErrors,
            isReady
        });

        if (!isReady && !this.isUnmounted) {
            // files aren't ready yet, keep checking
            window.setTimeout(() => {
                this.checkFileStatus();
            }, timerDuration * 1000);
        }
    }

    render() {
        let content = (<GenerateEFContent
            {...this.props}
            {...this.state}
            publishStatus={this.props.submission.publishStatus}
            generateFiles={this.generateFiles.bind(this)} />);

        if (this.state.fullPageError) {
            content = <GenerateEFError message={this.state.fullPageMessage} />;
        }

        return (
            <div className="generate-ef-page">
                {content}
            </div>
        );
    }
}

GenerateEFContainer.propTypes = propTypes;
GenerateEFContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(GenerateEFContainer);
