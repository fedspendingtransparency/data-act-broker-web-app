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
    buttonText: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

const defaultProps = {
	disabled: false
}

export default class SignInButton extends React.Component {
    render() {
    	let disabled = '';
    	if (this.props.disabled) {
    		disabled = ' usa-btn-disabled';
    	}
        return (
            <button className={"usa-da-button btn-primary btn-lg" + disabled} disabled={this.props.disabled} type="button" onClick={this.props.onClick}>
                {this.props.buttonText}
            </button>
        );
    }
}

SignInButton.propTypes = propTypes;
SignInButton.defaultProps = defaultProps;
