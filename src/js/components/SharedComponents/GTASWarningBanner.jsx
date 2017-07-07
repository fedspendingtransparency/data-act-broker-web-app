/**
* PublishedSubmissionWarningBanner.jsx
* Created by Alisa Burdeyny 3/10/17
**/

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class PublishedSubmissionWarningBanner extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <div className="published-submission-warning-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-1">
                                <i className="usa-da-icon"><Icons.ExclamationTriangle /> </i>
                            </div>
                            <div className="col-xs-11">
                                <p>The GTAS Submission Window is currently open. You cannot certify or re-certify until the window closes on {this.props.data.data.end_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
