/**
* Username.jsx
* Created by Kyle Fox 2/19/16
*/

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    handleChange: PropTypes.func.isRequired,
    tabIndex: PropTypes.string
};

const Username = ({tabIndex = '1', ...props}) => {
    return (
        <div className="usa-da-input-container">
            <label className="sr-only" htmlFor="username">Email address</label>
            <input
                className="usa-da-input-with-icon"
                id="username"
                name="username"
                type="text"
                placeholder="Email Address"
                aria-describedby="username"
                onChange={props.handleChange}
                tabIndex={tabIndex} />
            <span className="usa-da-icon">
                <FontAwesomeIcon icon="user" />
            </span>
        </div>
    );
};

Username.propTypes = propTypes;
export default Username;
