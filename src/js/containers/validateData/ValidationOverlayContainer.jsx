/**
* ValidationOverlayContainer.jsx
* Created by Kevin Li 3/29/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as uploadActions from '../../redux/actions/uploadActions';

import ValidationOverlay from '../../components/validateData/ValidationOverlay';
import { kGlobalConstants } from '../../GlobalConstants';

import * as UploadHelper from '../../helpers/uploadHelper';

const propTypes = {
    submission: PropTypes.object,
    submissionID: PropTypes.string,
    errors: PropTypes.array,
    resetProgress: PropTypes.func
};

const defaultProps = {
    submission: {},
    resetProgress: () => {}
};

class ValidationOverlayContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notAllowed: false,
            uploadApiCallError: ''
        };
    }

    uploadFiles() {
        this.props.resetProgress();
        if (kGlobalConstants.LOCAL === true) {
            UploadHelper.performLocalCorrectedUpload(this.props.submission)
                .catch((err) => {
                    if (err.httpStatus === 403) {
                        this.setState({
                            notAllowed: true
                        });
                    }
                    this.setState({
                        uploadApiCallError: err.message
                    });
                });
        }
        else {
            UploadHelper.performRemoteCorrectedUpload(this.props.submission)
                .catch((err) => {
                    console.error(err);
                    if (err.httpStatus === 403) {
                        this.setState({
                            notAllowed: true
                        });
                    }
                    this.setState({
                        uploadApiCallError: err.message
                    });
                });
        }
    }


    render() {
        // check if the critical error files are selected for re-upload
        const fileKeys = Object.keys(this.props.submission.files);
        const requiredKeys = [];
        for (const key in this.props.submission.validation) {
            if (Object.prototype.hasOwnProperty.call(this.props.submission.validation, key)) {
                const value = this.props.submission.validation[key];
                if (value.error_data.length > 0) {
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
                {...this.props}
                uploadFiles={this.uploadFiles.bind(this)}
                uploadApiCallError={this.state.uploadApiCallError}
                allowUpload={allowUpload}
                notAllowed={this.state.notAllowed} />
        );
    }
}

ValidationOverlayContainer.propTypes = propTypes;
ValidationOverlayContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ValidationOverlayContainer);
