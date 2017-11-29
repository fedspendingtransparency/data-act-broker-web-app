/**
* ValidateDataErrors.jsx
* Created by Minahm Kim= 11/22/17
*/

import React, { PropTypes } from 'react';
import * as ReviewHelper from '../../helpers/reviewHelper';

const propTypes = {
    params: PropTypes.object,
    route: PropTypes.object,
    submissionId: PropTypes.string,
    subID: PropTypes.string,
    csv_url: PropTypes.array,
    link_array: PropTypes.array
};

export default class GetErrors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: false
        };
    }

    // onClick function for submit button
    onClick() {
        this.sendRequest(this.state.submissionId);
    }

    // Set submission id from text input
    setSubmissionId(element) {
        this.setState({ submissionId: element.target.value });
    }

    sendRequest(submissionID) {
        ReviewHelper.fetchErrorReports(submissionID)
            .then((data) => {
                this.setState({ response: true, csv_url: data });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        let hasLink = null;

        if (this.state.response === true) {
            const dlLinks = [];

            for (const key in this.state.csv_url) {
                if (this.props.link_array.hasOwnProperty(key)) {
                    dlLinks.push(<a href={this.props.link_array[key]} >Download Errors</a>);
                }
            }

            hasLink = <div>{dlLinks}</div>;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-table-holder">
                        <h2>Enter the Submission ID to download validation errors.</h2>
                        <form className="form-inline">
                            <div className="form-group">
                                <label
                                    htmlFor="submission-id"
                                    className="sr-only">
                                    Submission ID
                                </label>
                                <input
                                    className="form-control"
                                    id="submission-id"
                                    name="submission-id"
                                    placeholder="Submission ID"
                                    onChange={this.setSubmissionId.bind(this)} />
                                <a
                                    className="btn btn-default"
                                    onClick={this.onClick.bind(this, this.props.submissionId)}>
                                    Review Data
                                </a>
                                {hasLink}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

GetErrors.propTypes = propTypes;
