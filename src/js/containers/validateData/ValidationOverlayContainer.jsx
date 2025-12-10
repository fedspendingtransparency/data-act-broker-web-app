/**
* ValidationOverlayContainer.jsx
* Created by Kevin Li 3/29/16
*/

import { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as uploadActions from '../../redux/actions/uploadActions';

import ValidationOverlay from '../../components/validateData/ValidationOverlay';

import * as UploadHelper from '../../helpers/uploadHelper';

const propTypes = {
    submission: PropTypes.object,
    submissionID: PropTypes.string,
    errors: PropTypes.array,
    resetProgress: PropTypes.func
};

const ValidationOverlayContainer = ({ submission = {}, resetProgress = () => {}, ...props }) => {
    const [notAllowed, setNotAllowed] = useState(false);
    const [uploadApiCallError, setUploadApiCallError] = useState('');

    const uploadFiles = () => {
        resetProgress();
        UploadHelper.performDabsCorrectedUpload(submission)
            .then(() => {
                UploadHelper.prepareFileValidationStates(submission.files);
                props.setSubmissionState('prepare');
            })
            .catch((err) => {
                props.setSubmissionState('failed');
                if (err.status === 403) {
                    setNotAllowed(true);
                }
                setUploadApiCallError(err.response.data.message);
            });
    };

    // check if the critical error files are selected for re-upload
    const fileKeys = Object.keys(submission.files);
    const requiredKeys = [];
    for (const key in submission.validation) {
        if (Object.prototype.hasOwnProperty.call(submission.validation, key)) {
            const value = submission.validation[key];
            // checking if error_data even exists because of the file upload props reset
            if (value.error_data && value.error_data.length > 0) {
                requiredKeys.push(key);
            }
        }
    }

    let allowUpload = false;
    const missingKeys = [];
    requiredKeys.forEach((key) => {
        if (_.indexOf(fileKeys, key) === -1) {
            missingKeys.push(key);
        }
    });
    if (missingKeys.length === 0) {
        allowUpload = true;
    }

    return (
        <ValidationOverlay
            {...props}
            submission={submission}
            uploadFiles={uploadFiles}
            uploadApiCallError={uploadApiCallError}
            allowUpload={allowUpload}
            notAllowed={notAllowed} />
    );
};

ValidationOverlayContainer.propTypes = propTypes;

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ValidationOverlayContainer);
