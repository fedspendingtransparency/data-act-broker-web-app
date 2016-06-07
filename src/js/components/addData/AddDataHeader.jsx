/**
* AddDataHeader.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';
import moment from 'moment';

import * as ReviewHelper from '../../helpers/reviewHelper.js';

class LastUpdated extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className="col-md-5 mt-40 mb-50 last-updated">
                <p>Last Saved: {this.props.last_updated}</p>
            </div>
        );
    }
}

export default class AddDataHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submissionID: null,
            last_updated: null,
            ready: false
        };
    }

    componentDidMount() {
        if (this.props.submissionID != null) {
            ReviewHelper.fetchStatus(this.props.submissionID)
                .then((data) => {
                    data.ready = true;
                    this.setState(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        let lastUpdated = null;
        if (this.state.ready && this.state.last_updated){
            let formattedTime = moment.utc(this.state.last_updated).local().format('h:mm a');
            lastUpdated = <LastUpdated last_updated={formattedTime} />
        }

        return (
            <div className="usa-da-content-dark">
                <div className="container">
                    <div className="row usa-da-content-add-data usa-da-page-title">
                        <div className="col-md-7 mt-40 mb-20">
                            <div className="display-2">Add New Data</div>
                            <p>The current DATA Act Broker allows agencies to upload and test their data as it is required under the DATA Act. It is not connected to USAspending.</p>
                        </div>
                        {lastUpdated}
                    </div>
                </div>
            </div>
        );
    }
}
