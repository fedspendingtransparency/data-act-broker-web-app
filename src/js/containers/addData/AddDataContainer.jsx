/**
* AddDataContainer.jsx
* Created by Kevin Li 3/24/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import AddDataContent from '../../components/addData/AddDataContent.jsx';
import ErrorMessage from '../../components/SharedComponents/ErrorMessage.jsx';
import { fileTypes } from './fileTypes.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as GuideHelper from '../../helpers/submissionGuideHelper.js';

class AddDataContainer extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                notAllowed: false,
                errorMessage: ''
            };
        }

        componentDidUpdate(prevProps) {
            if (prevProps.submission.state === 'empty') {
                if (Object.keys(this.props.submission.files).length === fileTypes.length) {
                    this.props.setSubmissionState('ready');
                }
            }
        }

        uploadFileHelper(local, submission) {
            if (local) {
                return UploadHelper.performLocalUpload(submission);
            }
            return UploadHelper.performRemoteUpload(submission);
        }

        performUpload() {
            this.props.setSubmissionState('uploading');

            this.uploadFileHelper(kGlobalConstants.LOCAL, this.props.submission)
                .then((submissionID) => {
                    this.props.setSubmissionId(submissionID);
                    // Looping because we need to allow backend to catchup to front end and prevent
                    // incorrect 404
                    const count = 9;
                    for (let i = 0; i <= count; i++) {
                        GuideHelper.getSubmissionPage(submissionID)
                            .then((res) => {
                                hashHistory.push('/validateData/' + submissionID);
                            })
                            .catch((err) => {
                                if (i === count) {
                                    hashHistory.push('/404/');
                                }
                                else {
                                    setTimeout(() => {}, 500);
                                }
                            });
                    }
                })
                .catch((err) => {
                    if (!kGlobalConstants.LOCAL && err.submissionID !== null && err.submissionID !== 0) {
                        this.props.setSubmissionId(err.submissionID);
                    }
                    if (err.httpStatus === 403) {
                        this.setState({
                            notAllowed: true,
                            errorMessage: err.message
                        });
                    }
                });
        }

        render() {
            if (this.state.notAllowed) {
                return (
                    <ErrorMessage message={this.state.errorMessage} />
                );
            }

            return (
                <AddDataContent {...this.props} fileTypes={fileTypes}
                    performUpload={this.performUpload.bind(this)} />
            );
        }
}

export default connect(
    state => ({ submission: state.submission }),
    dispatch => bindActionCreators(uploadActions, dispatch)
)(AddDataContainer);
