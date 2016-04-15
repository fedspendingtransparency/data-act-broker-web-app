/**
* SuccessMessage.jsx
* Created by Kyle Fox 2/25/16
*
* A success alert using 18F's design standards
**/

import React, { PropTypes } from 'react';

const propTypes = {
    message: PropTypes.string.isRequired
};

export default class SuccessMessage extends React.Component {
    render() {
        return (
            <div className="col-md-12 usa-alert usa-alert-success" role="alert">
                <div className="usa-alert-body">
                    <h3 className="usa-alert-heading">Success</h3>
                    <p className="usa-alert-text">{this.props.message}</p>
                </div>
            </div>
        );
    }
}

SuccessMessage.propTypes = propTypes;
