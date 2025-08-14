/**
 * Warning.jsx
 * Created by Lizzie Salita 11/1/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const defaultProps = {
    header: '',
    description: ''
};

const propTypes = {
    header: PropTypes.string,
    description: PropTypes.string
};

export default class Warning extends React.Component {
    render() {
        return (
            <div className="autocomplete-error" role="alert">
                <div className="autocomplete-error__title">
                    <FontAwesomeIcon icon="cirlce-exclamation" />
                    <div className="autocomplete-error__heading">{this.props.header}</div>
                </div>
                <p className="autocomplete-error__message">{this.props.description}</p>
            </div>
        );
    }
}

Warning.defaultProps = defaultProps;
Warning.propTypes = propTypes;
