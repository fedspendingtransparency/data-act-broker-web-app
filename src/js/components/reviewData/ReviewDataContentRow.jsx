/**
 * ReviewDataContentRow.jsx
 * Created by Mike Bray 4/5/16
 **/

import React, { PropTypes } from 'react';
import moment from 'moment';

const propTypes = {
    label: PropTypes.string
};

export default class ReviewDataContentRow extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-4">{this.props.label}</div>
                <div className="col-xs-8">{this.props.data}</div>
            </div>
        );
    }
}

ReviewDataContentRow.propTypes = propTypes;