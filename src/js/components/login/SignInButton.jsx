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
            <button className="usa-db-btn-lg btn-primary pull-right" type="button" onClick={this.props.onClick}>
                {this.props.buttonText}
            </button>
        );
    }
}

SignInButton.propTypes = propTypes;
