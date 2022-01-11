/**
  * CrossFileOverlay.jsx
  * Created by Kevin Li 6/16/16
  */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RevalidateContainer from 'containers/SharedContainers/RevalidateContainer';
import * as Icons from '../SharedComponents/icons/Icons';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

import * as PermissionsHelper from '../../helpers/permissionsHelper';
import NextButton from '../submission/NextButton';
import { checkValidFileList } from '../../helpers/util';

const propTypes = {
    uploadFiles: PropTypes.func,
    session: PropTypes.object,
    submission: PropTypes.object,
    agencyName: PropTypes.string,
    mode: PropTypes.string,
    loading: PropTypes.bool,
    nextStep: PropTypes.func,
    submissionID: PropTypes.string
};

const defaultProps = {
    loading: true,
    uploadFiles: null,
    session: null,
    submission: null,
    agencyName: '',
    mode: ''
};

export default class CrossFileOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.defaultOverlay = {
            icon: <Icons.ExclamationCircle />,
            iconClass: 'usa-da-errorRed',
            uploadButtonClass: '-disabled',
            uploadButtonDisabled: true,
            nextButtonClass: ' hide',
            nextButtonDisabled: true,
            revalidateButtonDisabled: false,
            hideButtons: false,
            message: 'You must correct the cross-file validation errors listed above.',
            detail: null,
            buttonText: 'Upload Corrected Files'
        };

        this.state = {
            allowUpload: false,
            overlay: this.defaultOverlay
        };
    }

    componentDidMount() {
        this.isUnmounted = false;
        this.prepareOverlayContents();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.submission.files, this.props.submission.files) ||
            !_.isEqual(prevProps.submission.crossFileStaging, this.props.submission.crossFileStaging)) {
            this.setAllowUpload();
        }
        else if (prevProps.loading !== this.props.loading || prevProps.mode !== this.props.mode) {
            this.prepareOverlayContents();
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    setAllowUpload() {
        this.setState({
            allowUpload: this.isReadyForUpload()
        }, () => {
            this.prepareOverlayContents();
        });
    }

    pressedNext(e) {
        e.preventDefault();
        this.props.nextStep();
    }

    hasStagedFiles() {
        if (Object.keys(this.props.submission.files).length > 0) {
            return true;
        }
        return false;
    }

    isReadyForUpload() {
        const expectedPairs = [];
        for (const pair of this.props.submission.crossFileOrder) {
            expectedPairs.push(pair.key);
        }

        for (const key in this.props.submission.crossFileStaging) {
            // check if this is a valid cross-file pair
            if (_.indexOf(expectedPairs, key) === -1) {
                continue;
            }

            const firstKey = key.split('-')[0];
            const secondKey = key.split('-')[1];

            if (Object.prototype.hasOwnProperty.call(!this.props.submission.files, firstKey) &&
                Object.prototype.hasOwnProperty.call(!this.props.submission.files, secondKey)) {
                // neither file in the pair is staged for upload, submission isn't ready for re-upload
                return false;
            }
        }

        if (!checkValidFileList(this.props.submission.files)) {
            return false;
        }

        // if we hit this point, the files are ready
        return true;
    }

    prepareOverlayContents() {
        // prepare the props to send down the common overlay component
        // create a clone of the default state
        const overlay = Object.assign({}, this.defaultOverlay);

        if (this.props.loading) {
            // still loading data
            overlay.uploadButtonDisabled = true;
            overlay.uploadButtonClass = ' hide';
            overlay.nextButtonClass = ' hide';
            overlay.nextButtonDisabled = true;
            overlay.icon = <LoadingBauble />;
            overlay.iconClass = 'overlay-animation';
            overlay.message = 'Your files are being validated.';
            overlay.hideButtons = true;
            overlay.detail = (
                <div>
                    You can return to this URL at any time to check the validation status.
                </div>
            );
        }
        else if (this.props.mode === 'success') {
            // loading finished, show success (default state is to show errors)
            overlay.icon = <Icons.CheckCircle />;
            overlay.iconClass = 'usa-da-successGreen';
            overlay.message = 'Your files have been successfully cross-validated.';
            overlay.detail = 'Click Next to generate Files E and F.';
            overlay.uploadButtonDisabled = true;
            overlay.uploadButtonClass = '-disabled';
            overlay.nextButtonClass = ' btn-primary';
            overlay.nextButtonDisabled = false;
        }
        else if (this.props.mode === 'warnings') {
            // loading finished, show warnings
            overlay.icon = <Icons.ExclamationCircle />;
            overlay.iconClass = 'usa-da-warningYellow';
            overlay.message = 'Some cross-file pairs have validation warnings.';
            overlay.detail = 'You can correct your files or click Next to generate Files E and F.';
            overlay.uploadButtonDisabled = true;
            overlay.uploadButtonClass = '-disabled';
            overlay.nextButtonClass = ' btn-primary';
            overlay.nextButtonDisabled = false;
        }
        else if (this.props.mode === 'failed') {
            // loading finished, show warnings
            overlay.icon = <Icons.ExclamationCircle />;
            overlay.iconClass = 'usa-da-errorRed';
            overlay.message = 'An error has occurred while cross-validating your files.';
            overlay.detail = 'Contact the Service Desk for assistance. Provide this URL when describing the issue.';
            overlay.uploadButtonDisabled = true;
            overlay.uploadButtonClass = '-disabled';
            overlay.nextButtonClass = '-disabled';
            overlay.nextButtonDisabled = true;
        }

        // handle uploading events
        if (this.props.submission.state === 'uploading') {
            overlay.uploadButtonDisabled = true;
            overlay.uploadButtonClass = '-disabled';
            overlay.nextButtonDisabled = true;
            overlay.nextButtonClass = '-disabled';
            overlay.buttonText = 'Uploading files...';
            overlay.revalidateButtonDisabled = true;
        }
        else if (this.props.submission.state === 'prepare') {
            // new files uploaded, page is now reloading
            overlay.uploadButtonDisabled = true;
            overlay.uploadButtonDisabled = '-disabled';
            overlay.nextButtonDisabled = true;
            overlay.nextButtonClass = '-disabled';
            overlay.buttonText = 'Gathering data...';
        }

        // enable the upload button if the correct files have been staged for upload
        if ((this.state.allowUpload && this.hasStagedFiles()) && PermissionsHelper
            .checkAgencyPermissions(this.props.session, this.props.agencyName)) {
            overlay.uploadButtonDisabled = false;
            overlay.uploadButtonClass = ' btn-primary';
        }
        else {
            overlay.uploadButtonDisabled = true;
            overlay.uploadButtonClass = '-disabled';
        }

        this.setState({
            overlay
        });
    }

    render() {
        return (
            <CommonOverlay
                header={this.state.overlay.message}
                detail={this.state.overlay.detail}
                icon={this.state.overlay.icon}
                iconClass={this.state.overlay.iconClass}
                showButtons={!this.state.overlay.hideButtons}>
                <div className="usa-da-btn-bg">
                    <RevalidateContainer />
                    <button
                        className={`usa-da-button${this.state.overlay.uploadButtonClass}`}
                        disabled={this.state.overlay.uploadButtonDisabled}
                        onClick={this.props.uploadFiles}>
                        {this.state.overlay.buttonText}
                    </button>
                    <NextButton
                        disabled={this.state.overlay.nextButtonDisabled}
                        nextButtonClass={this.state.overlay.nextButtonClass}
                        submissionID={this.props.submissionID}
                        step="generateEF" />
                </div>
            </CommonOverlay>
        );
    }
}

CrossFileOverlay.propTypes = propTypes;
CrossFileOverlay.defaultProps = defaultProps;
