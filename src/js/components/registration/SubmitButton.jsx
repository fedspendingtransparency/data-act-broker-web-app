/**
* SubmitButton.jsx
* Created by Kyle Fox 12/11/15
*
* This button needs to be given a function to run when it is clicked.
* Pass this function through props, calling it onClick
**/

import React, { PropTypes } from 'react';

const propTypes = {
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
    className: PropTypes.string
};
const defaultProps = {
    buttonDisabled: true,
    buttonText: "Submit",
    className: "usa-da-button btn-lg pull-right"
};
export default class SubmitEmailButton extends React.Component {
    render() {
        let newButtonClass;

        if (this.props.buttonDisabled) {
            newButtonClass = 'usa-da-button btn-disabled ' + this.props.className;
        } else {
            newButtonClass = 'usa-button ' + this.props.className;
        }
        return (
            <div>
                    <button
                      className={newButtonClass} 
                      type="button"
                      onClick={this.props.onClick}
                      disabled={this.props.buttonDisabled}
                    >
                        {this.props.buttonText}
                    </button>
            </div>
        );
    }
}

SubmitEmailButton.propTypes = propTypes;
SubmitEmailButton.defaultProps = defaultProps;
