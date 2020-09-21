/**
  * GenerateEFOverlay.jsx
  * Created by Kevin Li 8/24/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../SharedComponents/icons/Icons';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

import * as PermissionsHelper from '../../helpers/permissionsHelper';
import NextButton from '../submission/NextButton';

const propTypes = {
    generateFiles: PropTypes.func,
    session: PropTypes.object,
    hasErrors: PropTypes.bool,
    isReady: PropTypes.bool,
    agency_name: PropTypes.string,
    submissionID: PropTypes.string,
    publishStatus: PropTypes.string
};

const defaultProps = {
    generateFiles: null,
    session: null,
    hasErrors: false,
    isReady: false,
    agency_name: '',
    publishStatus: ''
};

export default class GenerateEFOverlay extends React.Component {
    clickedGenerate(e) {
        e.preventDefault();
        this.props.generateFiles();
    }

    render() {
        let buttonClass = '-disabled';
        let buttonDisabled = true;
        let nextClass = '-disabled';
        let nextDisabled = true;

        let header = 'Generating files...';
        let detail = '';

        let icon = <LoadingBauble />;
        let iconClass = 'overlay-animation';

        if (this.props.isReady && !this.props.hasErrors) {
            header = 'Files E and F have been successfully generated.';
            detail = 'Click Next to review and publish your submission.';

            buttonClass = ' btn-primary';
            buttonDisabled = false;
            nextClass = ' btn-primary';
            nextDisabled = false;

            icon = <Icons.CheckCircle />;
            iconClass = 'usa-da-successGreen';
        }
        else if (this.props.isReady && this.props.hasErrors) {
            header = 'Errors occurred while generating Files E and F.';
            detail = 'Refer to the error messages above for more details.';

            icon = <Icons.ExclamationCircle />;
            iconClass = 'usa-da-errorRed';

            buttonClass = ' btn-primary';
            buttonDisabled = false;
            nextClass = '-disabled';
            nextDisabled = true;
        }

        if (!PermissionsHelper.checkAgencyPermissions(this.props.session, this.props.agency_name)
            || this.props.publishStatus === 'reverting') {
            buttonClass = '-disabled';
            buttonDisabled = true;
        }

        return (
            <CommonOverlay
                header={header}
                detail={detail}
                icon={icon}
                iconClass={iconClass}>
                <div className="usa-da-btn-bg">
                    <button
                        className={`usa-da-button${buttonClass}`}
                        disabled={buttonDisabled}
                        onClick={this.clickedGenerate.bind(this)}>
                        Regenerate Files
                    </button>
                    <NextButton
                        disabled={nextDisabled}
                        nextButtonClass={nextClass}
                        submissionID={this.props.submissionID}
                        step="reviewData" />
                </div>
            </CommonOverlay>
        );
    }
}

GenerateEFOverlay.propTypes = propTypes;
GenerateEFOverlay.defaultProps = defaultProps;
