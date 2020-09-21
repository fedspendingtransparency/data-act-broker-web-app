/**
  * GenerateFilesOverlay.jsx
  * Created by Kevin Li 7/26/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay';
import * as Icons from '../SharedComponents/icons/Icons';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';
import * as PermissionHelper from '../../helpers/permissionsHelper';
import NextButton from '../submission/NextButton';

const propTypes = {
    generateFiles: PropTypes.func,
    session: PropTypes.object,
    errorDetails: PropTypes.string,
    state: PropTypes.string,
    agency_name: PropTypes.string,
    submissionID: PropTypes.string,
    publishStatus: PropTypes.string
};

const defaultProps = {
    state: 'incomplete',
    generateFiles: null,
    session: null,
    errorDetails: '',
    agency_name: '',
    publishStatus: ''
};

export default class GenerateFilesOverlay extends React.Component {
    clickedGenerate(e) {
        e.preventDefault();
        this.props.generateFiles();
    }

    render() {
        let buttonClass = '-disabled';
        let buttonDisabled = true;
        let nextClass = '-disabled';
        let nextDisabled = true;

        let header = 'Gathering data...';
        let detail = '';

        let icon = <LoadingBauble />;
        let iconClass = 'overlay-animation';
        let showIcon = true;

        if (this.props.state === "generating") {
            header = "Creating your D1 and D2 files from FABS and FPDS. This may take a few minutes.";
        }
        else if (this.props.state === "failed") {
            buttonClass = ' btn-primary';
            buttonDisabled = false;

            header = "An error occurred while generating your files.";
            detail = this.props.errorDetails;

            icon = <Icons.ExclamationCircle />;
            iconClass = 'usa-da-errorRed';
        }
        else if (this.props.state === 'incomplete') {
            header = "There are errors with your date ranges.";
            detail = "Fix these errors before continuing.";

            icon = <Icons.ExclamationCircle />;
            iconClass = 'usa-da-errorRed';
        }
        else if (this.props.state === "ready") {
            buttonClass = ' btn-primary';
            buttonDisabled = false;
            header = "Click Generate Files to generate your D1 and D2 files.";

            showIcon = false;
        }
        else if (this.props.state === "done") {
            nextClass = ' btn-primary';
            nextDisabled = false;
            buttonClass = ' btn-primary';
            buttonDisabled = false;

            icon = <Icons.CheckCircle />;
            iconClass = 'usa-da-successGreen';

            header = "Your files have been generated. Click Next to begin cross-file validations.";
        }

        if (!PermissionHelper.checkAgencyPermissions(this.props.session, this.props.agency_name)) {
            buttonClass = '-disabled';
            buttonDisabled = true;
        }

        if (this.props.publishStatus === 'reverting') {
            buttonClass = '-disabled';
            buttonDisabled = true;
        }

        return (
            <CommonOverlay
                header={header}
                detail={detail}
                showIcon={showIcon}
                icon={icon}
                iconClass={iconClass}>
                <div className="usa-da-btn-bg">
                    <button
                        className={`usa-da-button${buttonClass}`}
                        disabled={buttonDisabled}
                        onClick={this.clickedGenerate.bind(this)}>
                        Generate Files
                    </button>
                    <NextButton
                        disabled={nextDisabled}
                        nextButtonClass={nextClass}
                        submissionID={this.props.submissionID}
                        step="validateCrossFile" />
                </div>
            </CommonOverlay>
        );
    }
}

GenerateFilesOverlay.propTypes = propTypes;
GenerateFilesOverlay.defaultProps = defaultProps;
