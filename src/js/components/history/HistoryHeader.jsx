/**
  * HistoryTable.jsx
  * Created by Minahm Kim 6/12/17
  */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import * as ReviewHelper from '../../helpers/reviewHelper';

const propTypes = {
    submissionID: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    submissionID: ''
};

export default class HistoryHeader extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            metadata: null
        };
    }

    componentDidMount() {
        ReviewHelper.fetchSubmissionMetadata(this.props.submissionID)
            .then((response) => {
                this.setState({ metadata: response.data });
            })
            .catch((err) => {
                console.error(err);
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
        const lastValidated = moment.utc(this.state.metadata.last_validated).local().format('MM/DD/YYYY h:mm a');
        const createdOn = moment.utc(this.state.metadata.created_on).local().format('MM/DD/YYYY');
        return (
            <div className="container">
                <div className="row header">
                    <div className="col-xs-6">
                        <p className="metadata">Agency: {this.state.metadata.agency_name}</p>
                        <p className="metadata">Reporting Period: {this.state.metadata.reporting_period}</p>
                    </div>
                    <div className="col-xs-6">
                        <p className="metadata">Created: {createdOn}</p>
                        <p className="metadata">Last Validated: {lastValidated}</p>
                    </div>
                    <div className="col-xs-12">
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}

HistoryHeader.propTypes = propTypes;
HistoryHeader.defaultProps = defaultProps;
