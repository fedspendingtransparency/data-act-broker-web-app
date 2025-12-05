/**
* SignInButton.jsx
* Created by Kyle Fox 2/19/16
*
* This button needs to be given a function to run when it is clicked.
* Pass this function through props, calling it onClick
*/

import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

const SignInButton = ({disabled = false, ...props}) => {
    let disabledCSS = '';
    if (disabled) {
        disabledCSS = ' usa-da-btn-disabled';
    }
    return (
        <button
            className={`usa-da-button btn-primary btn-lg pull-right${disabledCSS}`}
            disabled={disabled}
            type="submit"
            onClick={props.onClick}
            data-testid="signin">
            {props.buttonText}
        </button>
    );
};

SignInButton.propTypes = propTypes;
export default SignInButton;
