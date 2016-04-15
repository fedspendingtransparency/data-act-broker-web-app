/**
* AddDataMetaDisplay.jsx
* Created by Mike Bray 3/22/16
**/

import React, { PropTypes } from 'react';
import moment from 'moment';

const propTypes = {
    data: PropTypes.object
};

export default class MetaData extends React.Component {
    render() {
        return (
            <div className="col-md-offset-1 col-md-10 mt-10 mb-10">
                <span>Agency Name: </span>
                <span><strong>{this.props.data.agency}</strong></span>
                <span> | Period Start Date: </span>
                <span><strong>{moment(this.props.data.startDate).format('YYYY-MM-DD')}</strong></span>
                <span> | Period End Date: </span>
                <span><strong>{moment(this.props.data.endDate).format('YYYY-MM-DD')}</strong></span>
            </div>
        );
    }
}

MetaData.propTypes = propTypes;