/**
  * TypeaheadWarning.jsx
  * Created by Kevin Li 7/14/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    description: PropTypes.string,
    header: PropTypes.string
};

const defaultProps = {
    header: 'Unknown Agency',
    description: 'You must select an agency from the list that is provided as you type.'
};

export default class TypeaheadWarning extends React.Component {
    render() {
        return (
            <div className="typeahead-warning alert alert-error text-left" role="alert">
                <div className="usa-da-icon error-icon">
                    <FontAwesomeIcon icon="circle-exclamation" />
                </div>
                <div className="alert-text">
                    <div className="alert-header-text">{this.props.header}</div>
                    <p>{this.props.description}</p>
                </div>
            </div>
        );
    }
}

TypeaheadWarning.propTypes = propTypes;
TypeaheadWarning.defaultProps = defaultProps;
