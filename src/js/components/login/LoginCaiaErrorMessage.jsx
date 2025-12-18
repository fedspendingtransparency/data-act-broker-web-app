/**
* LoginCaiaErrorMessage.jsx
* Created by Nipun Monga 11/18/16
*/

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    message: PropTypes.string.isRequired
};

const LoginCaiaErrorMessage = (props) => {
    return (
        <div className="alert alert-error mt-40 mb-0" role="alert">
            <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />
            <div className="alert-header-text">Error</div>
            <p data-testid="errormessage">
                {props.message} Please work with your agency to request Data Broker access through CAIA.
            </p>
        </div>
    );
};

LoginCaiaErrorMessage.propTypes = propTypes;
export default LoginCaiaErrorMessage;
