/**
  * ValidateNotYours.jsx
  * Created by Kevin Li 4/25/2016
  */

import React, { PropTypes } from 'react';

const propTypes = {
    message: PropTypes.string
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
