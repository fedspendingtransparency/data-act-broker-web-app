/**
* LoginBannerMessage.jsx
* Created by Daniel Boos 12/9/21
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    header: PropTypes.string,
    message: PropTypes.string,
    banner_type: PropTypes.string
};

const defaultProps = {
    header: 'Note',
    message: 'Note',
    banner_type: 'info'
};

const iconMapping = {
    warning: 'exclamation-triangle',
    info: 'info-circle'
};

export default class LoginBannerMessage extends React.Component {
    render() {
        return (
            <div className={`alert alert-${this.props.banner_type} mt-40 mb-0`}>
                <span className="usa-da-icon"><FontAwesomeIcon icon={iconMapping[this.props.banner_type]} /></span>
                <div className="alert-header-text">{this.props.header}</div>
                <p data-testid="errormessage">
                    {this.props.message}
                </p>
            </div>
        );
    }
}

LoginBannerMessage.propTypes = propTypes;
LoginBannerMessage.defaultProps = defaultProps;
