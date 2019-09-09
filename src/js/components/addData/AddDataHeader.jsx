/**
* AddDataHeader.jsx
* Created by Kyle Fox 2/19/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import * as ReviewHelper from '../../helpers/reviewHelper';

const propTypes = {
    submissionID: PropTypes.string
};

const defaultProps = {
    submissionID: ''
};

export default class AddDataHeader extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            submissionID: this.props.submissionID ? this.props.submissionID : null,
            last_updated: null,
            ready: false
        };
    }

    componentDidMount() {
        this.isUnmounted = false;
        if (this.props.submissionID !== null) {
            this.loadData(this.props.submissionID);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submissionID !== nextProps.submissionID) {
            this.setState({ submissionID: nextProps.submissionID });
            this.loadData(nextProps.submissionID);
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    loadData(submissionID) {
        if (submissionID === null || submissionID === '') {
            return;
        }
        ReviewHelper.fetchSubmissionMetadata(submissionID, 'dabs')
            .then((data) => {
                const tmpData = data;
                tmpData.ready = true;
                if (!this.isUnmounted) {
                    this.setState(tmpData);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let submissionContext = null;
        if (this.state.ready) {
            const formattedTime = moment.utc(this.state.last_updated).local().format('MM/DD/YYYY h:mm a');
            submissionContext = (
                <div className="last-updated">
                    Last Saved: {formattedTime}
                    <br />
                    {this.state.agency_name}
                    <br />
                    Reporting Period: {this.state.reporting_period}
                </div>
            );
        }

        return (
            <div className="usa-da-content-dark">
                <div className="container">
                    <div className="row usa-da-content-add-data usa-da-page-title flex-center-content-only-height">
                        <div className="col-md-10 mt-40 mb-20">
                            <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                Upload & Validate a New Submission
                            </div>
                        </div>
                        <div className="col-md-2">
                            {submissionContext}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddDataHeader.propTypes = propTypes;
AddDataHeader.defaultProps = defaultProps;
