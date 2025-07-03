/**
* AddDataContainer.jsx
* Created by Kevin Li 3/24/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';

import * as uploadActions from 'redux/actions/uploadActions';
import * as UploadHelper from 'helpers/uploadHelper';
import * as GuideHelper from 'helpers/submissionGuideHelper';
import AddDataContent from 'components/addData/AddDataContent';
import ErrorMessage from 'components/SharedComponents/ErrorMessage';
import { fileTypes } from './fileTypes';
import { kGlobalConstants } from '../../GlobalConstants';
import { checkValidFileList } from '../../helpers/util';


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
        if (prevProps.submission.files !== this.props.submission.files) {
            // We're checking for length - 1 because File A cannot be uploaded so we'll only ever have 2 files uploaded
            if (Object.keys(this.props.submission.files).length === (fileTypes.length - 1)) {
                if (!checkValidFileList(this.props.submission.files)) {
                    this.props.setSubmissionState('empty');
                }
                else {
                    this.props.setSubmissionState('ready');
                }
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

        UploadHelper.performDabsUpload(this.props.submission)
            .then((res) => {
                const submissionID = res.data.submission_id;
                this.props.setSubmissionId(submissionID);
                // Looping because we need to allow backend to catchup to front end and prevent
                // incorrect 404
                this.getPage(submissionID, 0);
            })
            .catch((err) => {
                const submissionID = err.response.data.submission_id;
                if (!kGlobalConstants.LOCAL && submissionID !== null && submissionID !== 0) {
                    this.props.setSubmissionId(submissionID);
                }
                if (err.status === 403) {
                    this.setState({
                        notAllowed: true
                    });
                }
                this.setState({
                    errorMessage: err.response.data.message
                });
            });
    }

    render() {
        if (this.state.notAllowed) {
            return (
                <ErrorMessage message={this.state.errorMessage} />
            );
        }
        else if (this.state.toValidateData) {
            const submissionID = this.props.submission.id;
            return <Navigate to={`/submission/${submissionID}/validateData/`} />;
        }
        else if (this.state.to404) {
            return <Navigate to="/404/" />;
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
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(AddDataContainer);
