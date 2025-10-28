/**
  * GenerateEFOverlay.jsx
  * Created by Kevin Li 8/24/16
  */

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

const GenerateEFOverlay = ({
    generateFiles = null, session = null, hasErrors = false, isReady = false, agency_name = '', ...props
}) => {
    const clickedGenerate = (e) => {
        e.preventDefault();
        generateFiles();
    }

        let buttonClass = '-disabled';
        let buttonDisabled = true;
        let nextClass = '-disabled';
        let nextDisabled = true;

        let header = 'Generating files...';
        let detail = '';

        let icon = <LoadingBauble />;
        let iconClass = 'overlay-animation';

        if (isReady && !hasErrors) {
            header = 'Files E and F have been successfully generated.';
            detail = 'Click Next to review and publish your submission.';

            buttonClass = ' btn-primary';
            buttonDisabled = false;
            nextClass = ' btn-primary';
            nextDisabled = false;

            icon = <Icons.CheckCircle />;
            iconClass = 'usa-da-successGreen';
        }
        else if (isReady && hasErrors) {
            header = 'Errors occurred while generating Files E and F.';
            detail = 'Refer to the error messages above for more details.';

            icon = <Icons.ExclamationCircle />;
            iconClass = 'usa-da-errorRed';

            buttonClass = ' btn-primary';
            buttonDisabled = false;
            nextClass = '-disabled';
            nextDisabled = true;
        }

        const blockedStatuses = ['reverting', 'publishing'];
        if (!PermissionsHelper.checkAgencyPermissions(session, agency_name)
            || blockedStatuses.indexOf(props.publishStatus) > -1) {
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
                        onClick={clickedGenerate}>
                        Regenerate Files
                    </button>
                    <NextButton
                        disabled={nextDisabled}
                        nextButtonClass={nextClass}
                        submissionID={props.submissionID}
                        step="reviewData" />
                </div>
            </CommonOverlay>
        );
};

GenerateEFOverlay.propTypes = propTypes;
export default GenerateEFOverlay;
