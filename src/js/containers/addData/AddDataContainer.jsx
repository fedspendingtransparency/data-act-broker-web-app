/**
* AddDataContainer.jsx
* Created by Kevin Li 3/24/16
*/

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as uploadActions from '../../redux/actions/uploadActions';

import AddDataContent from '../../components/addData/AddDataContent';
import ErrorMessage from '../../components/SharedComponents/ErrorMessage';
import { fileTypes } from './fileTypes';
import { kGlobalConstants } from '../../GlobalConstants';

import * as UploadHelper from '../../helpers/uploadHelper';
import * as GuideHelper from '../../helpers/submissionGuideHelper';

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

  getPage(submissionID, index) {
    const count = 9;
    GuideHelper.getSubmissionPage(submissionID)
      .then(() => {
        hashHistory.push(`/validateData/${submissionID}`);
      })
      .catch(() => {
        if (index === count) {
          hashHistory.push('/404/');
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
            notAllowed: true,
            errorMessage: err.message
          });
        }
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

    return (
        <AddDataContent
            {...this.props}
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
