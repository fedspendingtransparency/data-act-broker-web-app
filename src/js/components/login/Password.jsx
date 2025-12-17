/**
* Password.jsx
* Created by Kyle Fox 12/4/15
*/

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    handleChange: PropTypes.func.isRequired,
    fieldID: PropTypes.string,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.string,
    error: PropTypes.bool,
    isRequired: PropTypes.bool
};

const Password = ({
    fieldID = 'password', error = false, tabIndex = '2', placeholder = 'Password', isRequired = true, ...props
}) => {
    let className = '';
    if (error) {
        className = ' error';
    }
    return (
        <div className="usa-da-input-container usa-da-input-password">
            <label className="sr-only" htmlFor="password">Password</label>
            <input
                className={`usa-da-input-with-icon${className}`}
                id={fieldID}
                name={fieldID}
                type="password"
                placeholder={placeholder}
                aria-describedby="password"
                onChange={props.handleChange}
                tabIndex={tabIndex}
                aria-required={isRequired} />
            <span className="usa-da-icon">
                <FontAwesomeIcon icon="lock" />
            </span>
        </div>
    );
};

Password.propTypes = propTypes;
export default Password;
