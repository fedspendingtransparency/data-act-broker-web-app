/**
* SignInButton.jsx
* Created by Kyle Fox 2/19/16
*
* This button needs to be given a function to run when it is clicked.
* Pass this function through props, calling it onClick
**/

import React, { PropTypes } from 'react';

const propTypes = {
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired
};

export default class SignInButton extends React.Component {
    render() {
        return (
            <div className="col-md-4 usa-da-login-button-holder">
                <div className="align-right">
                    <button className="usa-button-big" type="button" onClick={this.props.onClick}>{this.props.buttonText}</button>
                </div>
            </div>
        );
    }
}

SignInButton.propTypes = propTypes;
