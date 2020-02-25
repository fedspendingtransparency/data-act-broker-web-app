/**
* AddDataContainer.jsx
* Created by Kevin Li 3/24/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as uploadActions from 'redux/actions/uploadActions';
import * as UploadHelper from 'helpers/uploadHelper';
import * as GuideHelper from 'helpers/submissionGuideHelper';
import AddDataContent from 'components/addData/AddDataContent';
import ErrorMessage from 'components/SharedComponents/ErrorMessage';
import { fileTypes } from './fileTypes';
import { kGlobalConstants } from '../../GlobalConstants';


const propTypes = {
    setSubmissionId: PropTypes.func,
    setSubmissionState: PropTypes.func,
    submission: PropTypes.object
};

const defaultProps = {
    setSubmissionId: uploadActions.setSubmissionId(),
    setSubmissionState: uploadActions.setSubmissionId(),
    submission: {}
};

class AddDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notAllowed: false,
            errorMessage: '',
            toValidateData: false,
            to404: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.submission.state === 'empty') {
            if (Object.keys(this.props.submission.files).length === fileTypes.length) {
                this.props.setSubmissionState('ready');
            }
        }
    }

    getPage(submissionID, index) {
        const count = 9;
        GuideHelper.getSubmissionPage(submissionID)
            .then(() => {
                this.setState({
                    toValidateData: true
                });
            })
            .catch(() => {
                if (index === count) {
                    this.setState({
                        to404: true
                    });
                }
                else {
                    setTimeout(() => {
                        this.getPage(submissionID, index + 1);
                    }, 500);
                }
            });
    }

    performUpload() {
        this.props.setSubmissionState('uploading');

        this.uploadFileHelper(kGlobalConstants.LOCAL, this.props.submission)
            .then((submissionID) => {
                this.props.setSubmissionId(submissionID);
                // Looping because we need to allow backend to catchup to front end and prevent
                // incorrect 404
                this.getPage(submissionID, 0);
            })
            .catch((err) => {
                if (!kGlobalConstants.LOCAL && err.submissionID !== null && err.submissionID !== 0) {
                    this.props.setSubmissionId(err.submissionID);
                }
                if (err.httpStatus === 403) {
                    this.setState({
                        notAllowed: true
                    });
                }
                this.setState({
                    errorMessage: err.message
                });
            });
    }

    uploadFileHelper(local, submission) {
        if (local) {
            return UploadHelper.performLocalUpload(submission);
        }
        return UploadHelper.performRemoteUpload(submission);
    }

    render() {
        if (this.state.notAllowed) {
            return (
                <ErrorMessage message={this.state.errorMessage} />
            );
        }
        else if (this.state.toValidateData) {
            const submissionID = this.props.submission.id;
            return <Redirect to={`/submission/${submissionID}/validateData/`} />;
        }
        else if (this.state.to404) {
            return <Redirect to="/404/" />;
        }

        return (
            <AddDataContent
                {...this.props}
                errorMessage={this.state.errorMessage}
                fileTypes={fileTypes}
                performUpload={this.performUpload.bind(this)} />
        );
    }
}

AddDataContainer.propTypes = propTypes;
AddDataContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch),
)(AddDataContainer);
