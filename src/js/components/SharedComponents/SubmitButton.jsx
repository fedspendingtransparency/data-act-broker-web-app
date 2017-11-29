/**
* SubmitButton.jsx
* Created by Katie Rose 12/29/15
*/

import React, { PropTypes } from 'react';

const propTypes = {
    buttonDisabled: PropTypes.bool,
    buttonText: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    testId: PropTypes.string
};

const defaultProps = {
    buttonDisabled: true,
    buttonText: 'Submit',
    testId: ''
};

// A standard button for submission that we can further turn into a sharable component
export default class SubmitButton extends React.Component {
    render() {
        let newButtonClass = this.props.className;

        if (this.props.buttonDisabled) {
            newButtonClass = 'usa-button-disabled ' + this.props.className;
        }

        return (
            <div>
                <button
                    onClick={this.props.onClick}
                    className={newButtonClass}
                    type="submit"
                    value={this.props.buttonText}
                    disabled={this.props.buttonDisabled}
                    data-testid={this.props.testId}>
                    {this.props.buttonText}
                </button>
            </div>
        );
    }
}

SubmitButton.propTypes = propTypes;
SubmitButton.defaultProps = defaultProps;
