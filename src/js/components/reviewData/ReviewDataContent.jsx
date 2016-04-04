/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import Request from 'superagent';

const propTypes = {
    submissionID: PropTypes.string
};

export default class ReviewDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        if (1 > 0) {
            const errorHeaders = ['File', 'Upload Status', 'CSV Validations'];
            return (
                <div className="container">
                    <div className="row center-block">
                        <div className="col-md-12 text-center">
                            <h3>Congratulations your data has been successfully validated! Now, what would you like to do with it?</h3>
                        </div>
                    </div>
                    <div className="row center-block usa-da-review-data-content-holder">
                        <div className="col-md-5">
                            <div className="usa-da-review-data-button-holder">
                                <button className="usa-button-big"><i className="glyphicon glyphicon-globe"></i> Publish this data to USASpending.gov</button>
                            </div>
                            <div className="usa-da-review-data-button-holder">
                                <button className="usa-button-big"><i className="glyphicon glyphicon-share"></i> Send this data to another Data Broker user</button>
                            </div>
                            <div className="usa-da-review-data-button-holder">
                                <button className="usa-button-big"><i className="glyphicon glyphicon-save"></i> Download this data to your computer</button>
                            </div>
                            <div className="usa-da-review-data-button-holder">
                                <button className="usa-button-big"><i className="glyphicon glyphicon-trash"></i> Delete this data from the Data Broker</button>
                            </div>
                        </div>
                        <div className="col-md-offset-1 col-md-6 usa-da-review-data-alternating-rows">
                            <div className="row">
                                <div className="col-md-5">Report Name:</div>
                                <div className="col-md-7">AgencyName04012016_061516</div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Period Start Date:</div>
                                <div className="col-md-7">01/15/2016</div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Period End Date:</div>
                                <div className="col-md-7">04/01/2016</div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Total File Size:</div>
                                <div className="col-md-7">72.4 MB</div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Created On:</div>
                                <div className="col-md-7">04/15/2016</div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Total Critical Errors:</div>
                                <div className="col-md-7">0</div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Total Warnings:</div>
                                <div className="col-md-7">234</div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">Total Rows:</div>
                                <div className="col-md-7">22,559</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>Gathering data...</h4>
                </div>
            );
        }
    }
}

ReviewDataContent.propTypes = propTypes;
