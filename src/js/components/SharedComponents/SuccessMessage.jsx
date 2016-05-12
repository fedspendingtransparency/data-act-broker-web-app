/**
* SuccessMessage.jsx
* Created by Kyle Fox 2/25/16
*
* A success alert using 18F's design standards
**/

import React, { PropTypes } from 'react';
import * as Icons from './icons/Icons.jsx';

const propTypes = {
    message: PropTypes.string.isRequired
};

export default class SuccessMessage extends React.Component {
    render() {
        return (
            <div className="col-md-12 alert alert-success" role="alert">
                <span className="usa-da-icon"><Icons.CheckCircle /></span>
                <h3>Success</h3>
                <p>{this.props.message}</p>
            </div>
        );
    }
}

SuccessMessage.propTypes = propTypes;
