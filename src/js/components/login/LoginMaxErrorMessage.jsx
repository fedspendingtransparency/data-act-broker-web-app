/**
* LoginMaxErrorMessage.jsx
* Created by Nipun Monga 11/18/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    message: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default class LoginMaxErrorMessage extends React.Component {
    render() {
        return (
            <div className="alert alert-error mt-40 mb-0" role="alert">
                <span className="usa-da-icon"><Icons.ExclamationCircle /></span>
                <div className="alert-header-text">Error</div>
                <p data-testid="errormessage">
                    {this.props.message} Please go to&nbsp;
                    <a href={this.props.url}>DATA Act Broker Registration</a>
                    &nbsp;to request access.
                </p>
            </div>
        );
    }
}

LoginMaxErrorMessage.propTypes = propTypes;
