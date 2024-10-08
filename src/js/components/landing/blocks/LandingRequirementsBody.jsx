/**
 * LandingRequirementsBody.jsx
 * Created by Minahm Kim 7/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const propTypes = {
    window: PropTypes.array,
    type: PropTypes.string
};

const defaultProps = {
    window: [],
    type: ''
};

export default class LandingRequirementsBody extends React.Component {
    windowBlocked() {
        if (!this.props.window) {
            return false;
        }
        for (let i = 0; i < this.props.window.length; i++) {
            if (this.props.window[i].notice_block) {
                return this.props.window[i];
            }
        }
        return false;
    }

    render() {
        let windowWarning = null;
        const windowBlock = this.windowBlocked();
        if (windowBlock) {
            windowWarning = (
                <strong>
                    {`Note: You cannot certify until ${Moment(windowBlock.end_date).format('dddd, MMMM D, YYYY')}`}
                </strong>
            );
        }
        let header = "You'll need the following files in order to complete your submission";
        let body = (
            <div>
                <ul>
                    <li>File A: Appropriation Account data</li>
                    <li>File B: Object Class and Program Activity data</li>
                    <li>File C: Award Financial data</li>
                </ul>

                <p>
                    <strong>
                    You will need to prepare File B &amp; C internally to complete your submission. Data Broker will
                    generate File A. You can upload a custom File A after the initial submission. Data Broker supports
                    comma-separated .csv or pipe-delimited .txt UTF-8 file formats.
                    </strong>
                </p>

                <p>
                    <strong>
                        Files D1, D2, E, and F will be generated for you by Data Broker.
                    </strong>
                </p>

                <ul>
                    <li>File D1: Procurement Awards data (Award and Awardee Attributes)</li>
                    <li>File D2: Financial Assistance data (Award and Awardee Attributes)</li>
                    <li>File E: Additional Awardee Attributes data</li>
                    <li>File F: Sub-award Attributes data</li>
                </ul>
                <p>
                    Submission information is available on the&nbsp;
                    <a
                        href="https://fiscal.treasury.gov/data-transparency/GSDM-current.html"
                        target="_blank"
                        rel="noopener noreferrer">
                        GSDM
                    </a>
                    &nbsp;page of the Data Transparency site for the Bureau of the Fiscal Service.
                </p>
            </div>
        );

        if (this.props.type === 'fabs') {
            header = "You'll need the following files in order to complete your FABS submission";
            body = (
                <div>
                    <ul>
                        <li>FABS File: Financial Assistance data</li>
                    </ul>
                    <p>
                        Submission information is available on the&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://fiscal.treasury.gov/data-transparency/GSDM-current.html">
                            GSDM
                        </a>
                        &nbsp;page of the Data Transparency site for the Bureau of the Fiscal Service.
                    </p>
                </div>
            );
        }

        return (
            <div className="usa-da-landing-modal-content">
                <h4>{header}</h4>
                {body}
                {windowWarning}
            </div>
        );
    }
}

LandingRequirementsBody.propTypes = propTypes;
LandingRequirementsBody.defaultProps = defaultProps;
