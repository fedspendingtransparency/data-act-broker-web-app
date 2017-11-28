/**
* ValidationOverlayContainer.jsx
* Created by Kevin Li 3/29/16
*/

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import ValidationOverlay from '../../components/validateData/ValidationOverlay.jsx';
import { kGlobalConstants } from '../../GlobalConstants.js';

import * as UploadHelper from '../../helpers/uploadHelper.js';

const propTypes = {
    submission: PropTypes.object
};

class ValidationOverlayContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notAllowed: false
        };
    }

    uploadFiles() {
        if (kGlobalConstants.LOCAL === true) {
            UploadHelper.performLocalCorrectedUpload(this.props.submission);
        }
        else {
            UploadHelper.performRemoteCorrectedUpload(this.props.submission)
                .catch((err) => {
                    if (err.httpStatus === 403) {
                        console.error(err.message);
                        this.setState({
                            notAllowed: true
                        });
                    }
                });
        }
    }


    render() {
        // check if the critical error files are selected for re-upload
        const fileKeys = Object.keys(this.props.submission.files);
        const requiredKeys = [];
        for (const key in this.props.submission.validation) {
            if (this.props.submission.validation.hasOwnProperty(key)) {
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
            <ValidationOverlay {...this.props} uploadFiles={this.uploadFiles.bind(this)}
                allowUpload={allowUpload} notAllowed={this.state.notAllowed} />
        );
    }
}

ValidationOverlayContainer.propTypes = propTypes;

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ValidationOverlayContainer);
