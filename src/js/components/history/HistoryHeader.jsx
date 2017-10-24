/**
  * HistoryTable.jsx
  * Created by Minahm Kim 6/12/17
  **/

import React from 'react';

import * as FileHelper from '../../helpers/generateFilesHelper.js';

export default class HistoryTable extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            metadata: null
        };
    };

    componentDidMount() {
        FileHelper.fetchSubmissionMetadata(this.props.submissionID)
            .then((response) => {
                this.setState({ metadata: response });
            })
            .catch((err) => {
                console.log(err);
            });
        this.isUnmounted = false;
    }

    componentWillUnmount() {
        this.isUnmounted = false;
    }

    render() {
        if (!this.state.metadata) {
            return null;
        }
        return (
            <div className="container">
                <div className="row header">
                    <div className="col-xs-6">
                        <p className="metadata">Agency: {this.state.metadata.agency_name}</p>
                        <p className="metadata">
                            Reporting Period Start: {this.state.metadata.reporting_period_start_date}
                        </p>
                        <p className="metadata">
                            Reporting Period End: {this.state.metadata.reporting_period_end_date}
                        </p>
                    </div>
                    <div className="col-xs-6">
                        <p className="metadata">Created: {this.state.metadata.created_on}</p>
                        <p className="metadata">Last Validated: {this.state.metadata.last_validated}</p>
                    </div>
                    <div className="col-xs-12">
                        <hr/>
                    </div>
                </div>
            </div>
        );
    }
}
