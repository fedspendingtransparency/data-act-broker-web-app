/**
* SubmitButton.jsx
* Created by Katie Rose 12/29/15
**/

import React, { PropTypes } from 'react';

const propTypes = {
    buttonDisabled: PropTypes.bool,
    buttonText: PropTypes.String
};

const defaultProps = {
    buttonDisabled: false,
    buttonText: "Submit"
};

// A standard button for submission that we can further turn into a sharable component
export default class SubmitButton extends React.Component {
    render() {
        var newButtonClass;

        if (this.props.buttonDisabled) {
            newButtonClass = 'usa-button-disabled';
        } else {
            newButtonClass = 'usa-button';
        }

        return (
            <button className={newButtonClass} type="submit" value={this.props.buttonText} disabled={this.props.buttonDisabled}>{this.props.buttonText} </button>
        );
    }
}

SubmitButton.propTypes = propTypes;
SubmitButton.defaultProps = defaultProps;
