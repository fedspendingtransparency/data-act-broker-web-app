/**
* ErrorMessageOverlay.jsx
* Created by Daniel Boos 11/25/19
*/

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

const propTypes = {
    errorTitle: PropTypes.string,
    errorMessage: PropTypes.string
};

const defaultProps = {
    errorTitle: 'An error occurred.',
    errorMessage: 'Something went wrong while gathering your data.'
};

const ErrorMessageOverlay = (props) => (
    <div className="results-table-content">
        <div className="results-table-message-container">
            <div className="results-table-error">
                <div className="icon">
                    <FontAwesomeIcon icon="circle-exclamation" />
                </div>
                <div className="title">
                    {props.errorTitle}
                </div>
                <div className="description">
                    {props.errorMessage}
                </div>
            </div>
        </div>
    </div>
);

ErrorMessageOverlay.propTypes = propTypes;
ErrorMessageOverlay.defaultProps = defaultProps;

export default ErrorMessageOverlay;
