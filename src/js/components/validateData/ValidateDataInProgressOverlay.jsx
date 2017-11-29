/**
 * ValidateDataInProgressOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React, { PropTypes } from 'react';
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
    constructor(props) {
        super(props);
    }

    render() {
        let title = 'Your files are being validated.';
        let description = 'You can return to this page at any time to check the validation status by using this link: ';

        let icon = <LoadingBauble />;
        let iconClass = 'overlay-animation';

        if (this.props.hasFailed) {
            title = 'An error has occurred while validating your files.';
            description = 'Contact the Service Desk for assistance. Provide this URL when describing the issue: ';
            icon = <Icons.ExclamationCircle />;
            iconClass = 'usa-da-errorRed';
        }

        const detail = <div>{description}<br /><a href={window.location.href}>{window.location.href}</a></div>;


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
