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
                <div className="col-xs-4">{this.props.label}</div>
                <div className="col-xs-8 data">{this.props.data}</div>
            </div>
        );
    }
}

ReviewDataContentRow.propTypes = propTypes;
ReviewDataContentRow.defaultProps = defaultProps;
