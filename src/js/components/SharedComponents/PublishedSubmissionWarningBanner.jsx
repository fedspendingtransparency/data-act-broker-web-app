/**
* PublishedSubmissionWarningBanner.jsx
* Created by Alisa Burdeyny 3/10/17
**/

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class PublishedSubmissionWarningBanner extends React.Component {
    render() {
        return (
            <div className="published-submission-warning-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-1">
                            <i className="usa-da-icon"><Icons.ExclamationTriangle /> </i>
                        </div>
                        <div className="col-xs-11">
                            <p>This submission has already been certified. Any changes made will not be reflected on
                            usaspending until it is re-certified.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
