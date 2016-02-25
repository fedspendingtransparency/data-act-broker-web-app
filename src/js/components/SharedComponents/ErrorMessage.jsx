/**
* ErrorMessage.jsx
* Created by Kyle Fox 2/24/16
**/

import React, { PropTypes } from 'react';

const propTypes = {
    message: PropTypes.string.isRequired
};

export default class ErrorMessage extends React.Component {
    render() {
        return (
            <div className="col-md-12 usa-alert usa-alert-error" role="alert">
                <div className="usa-alert-body">
                    <h3 className="usa-alert-heading">Error</h3>
                    <p className="usa-alert-text">{this.props.message}</p>
                </div>
            </div>
        );
    }
}

ErrorMessage.propTypes = propTypes;
