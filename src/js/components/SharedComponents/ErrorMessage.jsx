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
            <div className="col-md-12 alert alert-error mt-40 mb-0" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign"></span>
                <h3>Error</h3>
                <p>{this.props.message}</p>
            </div>
        );
    }
}

ErrorMessage.propTypes = propTypes;
