/**
* LoginCaiaErrorMessage.jsx
* Created by Nipun Monga 11/18/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    message: PropTypes.string.isRequired
};

export default class LoginCaiaErrorMessage extends React.Component {
    render() {
        return (
            <div className="alert alert-error mt-40 mb-0" role="alert">
                <FontAwesomeIcon icon="exclamation-circle" />
                <div className="alert-header-text">Error</div>
                <p data-testid="errormessage">
                    {this.props.message} Please work with your agency to request Broker access through CAIA.
                </p>
            </div>
        );
    }
}

LoginCaiaErrorMessage.propTypes = propTypes;
