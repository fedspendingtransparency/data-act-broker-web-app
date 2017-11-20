/**
  * GenerateEFError.jsx
  * Created by Kevin Li 8/24/2016
  */

import React, { PropTypes } from 'react';

const propTypes = {
    message: PropTypes.string
};

export default class GenerateEFError extends React.Component {
    render() {
        return (
            <div className="alert alert-danger text-center" role="alert">
                <b>Error:</b> {this.props.message}
            </div>
        );
    }
}

GenerateEFError.propTypes = propTypes;
