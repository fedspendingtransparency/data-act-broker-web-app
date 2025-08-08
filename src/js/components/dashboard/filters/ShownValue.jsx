/**
 * ShownValue.jsx
 * Created by Lizzie Salita 11/1/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    removeValue: PropTypes.func,
    label: PropTypes.string
};

export default class ShownValue extends React.Component {
    render() {
        const shownVal = (this.props.removeValue !== null) ? (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.removeValue}
                title="Click to remove filter."
                aria-label={`Applied filter: ${this.props.label}`}>
                {this.props.label}
                <span className="close">
                    <FontAwesomeIcon icon="xmark" />
                </span>
            </button>
        ) : (
            <div className="shown-filter-button no-click">
                <span>{this.props.label}</span>
            </div>
        );
        return (
            shownVal
        );
    }
}
ShownValue.propTypes = propTypes;
