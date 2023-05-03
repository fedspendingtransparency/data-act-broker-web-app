/**
* Password.jsx
* Created by Kyle Fox 12/4/15
*/

import React from 'react';
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

const defaultProps = {
    fieldID: "password",
    error: false,
    tabIndex: "2",
    placeholder: "Password",
    isRequired: true
};

export default class Password extends React.Component {
    render() {
        let className = '';
        if (this.props.error) {
            className = ' error';
        }
        return (
            <div className="usa-da-input-container usa-da-input-password">
                <label className="sr-only" htmlFor="password">Password</label>
                <input
                    className={`usa-da-input-with-icon${className}`}
                    id={this.props.fieldID}
                    name={this.props.fieldID}
                    type="password"
                    placeholder={this.props.placeholder}
                    aria-describedby="password"
                    onChange={this.props.handleChange}
                    tabIndex={this.props.tabIndex}
                    aria-required={this.props.isRequired} />
                <span className="usa-da-icon">
                    <FontAwesomeIcon icon="lock" />
                </span>
            </div>
        );
    }
}

Password.propTypes = propTypes;
Password.defaultProps = defaultProps;
