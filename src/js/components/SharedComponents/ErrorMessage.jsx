/**
* ErrorMessage.jsx
* Created by Kyle Fox 2/24/16
*/

import React, { PropTypes } from 'react';
import * as Icons from './icons/Icons';

const propTypes = {
    message: PropTypes.string.isRequired
};

export default class ErrorMessage extends React.Component {
    render() {
        return (
            <div className="alert alert-error mt-40 mb-0" role="alert">
                <span className="usa-da-icon"><Icons.ExclamationCircle /></span>
                <div className="alert-header-text">Error</div>
                <p data-testid="errormessage">{this.props.message}</p>
            </div>
        );
    }
}

ErrorMessage.propTypes = propTypes;
