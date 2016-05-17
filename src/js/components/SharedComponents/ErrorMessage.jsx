/**
* ErrorMessage.jsx
* Created by Kyle Fox 2/24/16
**/

import React, { PropTypes } from 'react';
import * as Icons from './icons/Icons.jsx';

const propTypes = {
    message: PropTypes.string.isRequired
};

export default class ErrorMessage extends React.Component {
    render() {
        return (
                <div className="alert alert-error mt-40 mb-0" role="alert">
                    <span className="usa-da-icon"><Icons.ExclamationCircle /></span>
                    <h3>Error</h3>
                    <p data-testid="errormessage">{this.props.message}</p>
                </div>
        );
    }
}

ErrorMessage.propTypes = propTypes;
