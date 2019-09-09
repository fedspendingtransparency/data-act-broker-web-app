/**
  * ValidateNotYours.jsx
  * Created by Kevin Li 4/25/2016
  */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    message: PropTypes.string
};

const defaultProps = {
    message: ''
};

export default class ValidateNotYours extends React.Component {
    render() {
        return (
            <div className="alert alert-danger text-center" role="alert">
                {this.props.message}
            </div>
        );
    }
}

ValidateNotYours.propTypes = propTypes;
ValidateNotYours.defaultProps = defaultProps;
