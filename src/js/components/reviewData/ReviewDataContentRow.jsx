/**
 * ReviewDataContentRow.jsx
 * Created by Mike Bray 4/5/16
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.string,
    label: PropTypes.string
};

const defaultProps = {
    data: '',
    label: ''
};

export default class ReviewDataContentRow extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-5 text-left">{this.props.label}</div>
                <div className="col-xs-7"><strong>{this.props.data}</strong></div>
            </div>
        );
    }
}

ReviewDataContentRow.propTypes = propTypes;
ReviewDataContentRow.defaultProps = defaultProps;
