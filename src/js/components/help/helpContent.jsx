/**
 * HelpContent.jsx
 * Created by Mike Bray 4/1/16
 */

import React, { PropTypes } from 'react';
import $ from 'jquery';

const propTypes = {
    section: PropTypes.string,
    helpOnly: PropTypes.bool
};

const defaultProps = {
    section: '',
    helpOnly: false
};

export default class HelpContent extends React.Component {
    componentDidUpdate() {
        this.scrollToSection();
    }

    scrollToSection() {
        if (this.props.section && $(`[name=${this.props.section}]`).length > 0) {
            $('html, body').animate({
                scrollTop: $(`[name=${this.props.section}]`).offset().top
            }, 500);
        }
    }

    render() {
        let membership = null;
        if (this.props.helpOnly) {
            membership = (
                <div>
                    <h4 name="agencyAccess">Request Agency Access</h4>
                    <p>
                        The DATA Act Broker leverages MAX.gov for user accounts and password authentication.
                        To request a Broker account, you will first need a MAX.gov account.
                        If you do not have a MAX.gov account, you may register for one
                        <a
                            href="https://max.gov/maxportal/registrationForm.action"
                            rel="noopener noreferrer"
                            target="_blank">
                            here
                        </a>.
                    </p>
                    <p>
                        Once you have a MAX.gov account, navigate
                        <a href="https://community.max.gov/x/fJwuRQ" rel="noopener noreferrer" target="_blank">
                            here
                        </a>
                        , and follow the directions on
                        the page to request access to the DATA Act Broker through your agency.
                    </p>
                    <p>
                        If you have questions about Broker access, or if your agency is not listed on the MAX page
                        linked above, email
                        <a
                            href="mailto:DATAPMO@fiscal.treasury.gov?subject=Broker%20Access%20Information"
                            target="_top">
                            DATAPMO@fiscal.treasury.gov
                        </a>.
                    </p>
                </div>
            );
        }
        else {
            membership = (
                <p name="membership">
                    If you encounter a bug, have a question, or need help, please register for the
                    <a
                        href="https://servicedesk.usaspending.gov"
                        rel="noopener noreferrer"
                        target="_blank"> USAspending Service Desk
                    </a> and submit a ticket.
                    We can better resolve your issue if you provide us as much information as possible,
                    including the exact steps we should follow to replicate your issue and the page where you
                    encountered it. The Service Desk will email you if more information or clarification is needed.
                </p>
            );
        }

        return (
            <div className="usa-da-help-content">

                <h2 className="usa-da-help-content__header">What&#8217;s New in This Release</h2>
                <strong className="usa-da-help-content__date">April 5, 2019</strong>

                <p className="usa-da-help-content__content">In this release of the Broker, we:</p>
                <ul className="usa-da-help-content__list">
                    <li>Updated Broker Resource page to reference DAIMS v1.3.1 documents.</li>
                    <li>Implemented DAIMS v1.3.1 changes to elements in File D1 and D2. Users who have scripts based on D1/D2 files should update them to match the D1/D2 elements and names in DAIMS v1.3.1.</li>
                    <li>Updated Submission Dashboard to notify user if there are no submissions to display.</li>
                    <li>Fixed edge-case issue with email sent after the creation of the DABS submission. These errors only occurred for agencies associated with a FREC. </li>
                    <li>Fixed small issue with line count inaccuracies in File A that occurred when extra carriage returns were present in the submission file.</li>
                    <li>Fixed validation rule A34 to correctly generate a critical error when the BudgetAuthorityUnobligatedBalanceBroughtForward value is empty.</li>
                    <li>Fixed download URL expiration issue for File A/D1/D2. Links are now generated upon click.</li>
                    <li>Various backend changes and improvements surrounding job handling and memory management.</li>
                </ul>

                <h2 className="usa-da-help-content__header">Technical Notes for this Release</h2>
                <strong className="usa-da-help-content__date">April 5, 2019</strong>

                <p className="usa-da-help-content__content">In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.</p>
                <ul className="usa-da-help-content__list">
                    <li>Updated unique award keys in transaction data to be consistent with USAspending.gov.</li>
                    <li>Updated the CFDA loader to pull from a common source shared with USAspending.gov.</li>
                    <li>Removed deprecated submit_detached_file endpoint from the API. This should not affect Broker Inbound API users given that they do not use this endpoint.</li>
                    <li>Fixed the logic of providing current fiscal quarter on the frontend.</li>
                </ul>
                <h2 className="usa-da-help-content-subheading">Getting More Help</h2>

                {membership}

                <p>
                    If you need assistance using the Broker or if you would like to schedule a hands-on sandbox session
                    with Treasury staff, please email
                    <a href="mailto:DATAPMO@fiscal.treasury.gov"> DATAPMO@fiscal.treasury.gov</a>.
                </p>
            </div>
        );
    }
}

HelpContent.propTypes = propTypes;
HelpContent.defaultProps = defaultProps;
