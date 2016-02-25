/**
* SubmitButton.jsx
* Created by Kyle Fox 12/11/15
**/

import React, { PropTypes } from 'react';

const propTypes = {
    buttonDisabled: PropTypes.bool.isRequired,
    route: PropTypes.string.isRequired
};

const defaultProps = {
    buttonDisabled: true,
    route: '#'
};

// A standard button for submission that we can further turn into a sharable component
export default class SubmitEmailButton extends React.Component {
    buttonClicked() {
        // Route to given route
        location.href = this.props.route;
    }

    render() {
        let newButtonClass;

        if (this.props.buttonDisabled) {
            newButtonClass = 'usa-button-disabled';
        } else {
            newButtonClass = 'usa-button';
        }

        return (
            <button
              className={newButtonClass}
              type="submit"
              value="Verify this email address"
              disabled={this.props.buttonDisabled}
              onClick={this.buttonClicked.bind(this)}
            >
                Verify this email address
            </button>
        );
    }
}

SubmitEmailButton.propTypes = propTypes;
SubmitEmailButton.defaultProps = defaultProps;
