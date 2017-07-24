/**
* GTASWarningBanner.jsx
* Created by Minahm Kim 07/07/17
**/

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import Moment from 'moment'

export default class Banner extends React.Component {
    constructor(props) {
        super(props)
    }

    parseDate(data){
        let date = Moment(data).format("dddd, MMMM D, YYYY")
        return date;
    }

    render() {
        // let date = this.parseDate(this.props.data.end_date)
        let message = this.props.data.message;
        return (
                <div className="published-submission-warning-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-1">
                                <i className="usa-da-icon"><Icons.ExclamationTriangle /> </i>
                            </div>
                            <div className="col-xs-11">
                                <p>{message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
