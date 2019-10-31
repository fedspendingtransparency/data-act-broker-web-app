/**
 * ValidateDataInProgressOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../SharedComponents/icons/Icons';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

const propTypes = {
    hasFailed: PropTypes.bool
};

const defaultProps = {
    hasFailed: false
};

export default class ValidateDataInProgressOverlay extends React.Component {
    render() {
        let title = 'Your files are being validated.';
        let description = 'You can return to this URL at any time to check the validation status.';

        let icon = <LoadingBauble />;
        let iconClass = 'overlay-animation';

        if (this.props.hasFailed) {
            title = 'An error has occurred while validating your files.';
            description = 'Contact the Service Desk for assistance. Provide this URL when describing the issue.';
            icon = <Icons.ExclamationCircle />;
            iconClass = 'usa-da-errorRed';
        }
        
        const detail = <div>{description}</div>;

        return (
            <CommonOverlay
                header={title}
                detail={detail}
                icon={icon}
                iconClass={iconClass}
                showButtons={false} />
        );
    }
}

ValidateDataInProgressOverlay.propTypes = propTypes;
ValidateDataInProgressOverlay.defaultProps = defaultProps;
