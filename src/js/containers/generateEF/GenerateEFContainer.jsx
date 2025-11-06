/**
* GenerateEFContainer.jsx
* Created by Kevin Li 8/23/16
*/

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

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

const timerDuration = 10;

const GenerateEFContainer = ({submission = {}, submissionID = '', ...props}) => {
    const [fullPageError, setFullPageError] = useState(false);
    const [fullPageMessage, setFullPageMessage] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [hasErrors, setHasErrors] = useState(false);
    const [fileE, setFileE] = useState({});
    const [fileF, setFileF] = useState({});
    const [generated, setGenerated] = useState(false);
    const [agency_name, setAgencyName] = useState('');
    const [isUnmounted, setIsUnmounted] = useState(false);

    useEffect(() => {
        setIsUnmounted(false);
        updateAgencyName();
        checkFileStatus();

        return () => {
            setIsUnmounted(true);
        };
    }, []);

    useEffect(() => {
        updateAgencyName();
    }, [submissionID]);

    // We only parse state after files E and F have been updated, just checking for file F for simplicity
    useEffect(() => {
        parseState();
    }, [fileF]);

    const updateAgencyName = () => {
        if (submissionID !== null) {
            ReviewHelper.fetchSubmissionMetadata(submissionID)
                .then((res) => {
                    if (!isUnmounted) {
                        props.setSubmissionPublishStatus(res.data.publish_status);
                        setAgencyName(res.data.agency_name);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    props.errorFromStep(error.response.data.message);
                });
        }
    };

    const handleResponse = (allResponses) => {
        if (isUnmounted) {
            return;
        }

        const keys = ['e', 'f'];
        const newState = {};
        for (let i = 0; i < keys.length; i++) {
            const response = allResponses[i];
            let data;
            if (response.status === 'fulfilled') {
                data = response.value.data;

                if (data.status === 'invalid') {
                    if (!generated) {
                        setGenerated(true);
                        generateFiles();
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
        setFileE(newState['e']);
        setFileF(newState['f']);
    };

    const generateFiles = () => {
        Promise.allSettled([
            GenerateHelper.generateFile('E', submissionID, '', ''),
            GenerateHelper.generateFile('F', submissionID, '', '')
        ]).then((allResponses) => {
            handleResponse(allResponses);
        });
    };

    const checkFileStatus = () => {
        Promise.allSettled([
            GenerateHelper.checkGenerationStatus('E', submissionID),
            GenerateHelper.checkGenerationStatus('F', submissionID)
        ]).then((allResponses) => {
            handleResponse(allResponses);
        });
    };

    const parseState = () => {
        const files = [fileE, fileF];
        let tmpHasErrors = false;
        let tmpIsReady = true;
        let showFullPageError = false;
        let tmpFullPageMessage = '';
        files.forEach((file) => {
            if (file.httpStatus === 403 || file.httpStatus === 401) {
                // permissions error, reject
                showFullPageError = true;
                tmpFullPageMessage = 'You are not authorized to perform the requested task. ' +
                    'Please contact your administrator.';
            }
            else if (file.status === 'failed' || file.status === 'invalid') {
                tmpHasErrors = true;
            }
            else if (file.status === 'waiting') {
                tmpIsReady = false;
            }
        });

        setFullPageError(showFullPageError);
        setFullPageMessage(tmpFullPageMessage);
        setHasErrors(tmpHasErrors);
        setIsReady(tmpIsReady);

        if (!tmpIsReady && !isUnmounted) {
            // files aren't ready yet, keep checking
            window.setTimeout(() => {
                checkFileStatus();
            }, timerDuration * 1000);
        }
    };

    let content = (<GenerateEFContent
        submissionID={submissionID}
        {...props}
        isReady={isReady}
        hasErrors={hasErrors}
        e={fileE}
        f={fileF}
        agency_name={agency_name}
        publishStatus={submission.publishStatus}
        generateFiles={generateFiles} />);

    if (fullPageError) {
        content = <GenerateEFError message={fullPageMessage} />;
    }

    return (
        <div className="generate-ef-page">
            {content}
        </div>
    );
};

GenerateEFContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(GenerateEFContainer);
