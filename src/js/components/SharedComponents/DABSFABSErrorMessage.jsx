/**
  * DABSFABSErrorMessage.jsx
  * Created by Jonathan Hill 08/08/219
  */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    message: PropTypes.string
};

const defaultProps = {
    message: ''
};

export default class DABSFABSErrorMessage extends React.Component {
    render() {
        return (
            <div className="alert alert-danger text-center" role="alert">
                <b>Error:</b> {this.props.message}
            </div>
        );
    }
}

DABSFABSErrorMessage.propTypes = propTypes;
DABSFABSErrorMessage.defaultProps = defaultProps;
