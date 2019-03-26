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
                    If you encounter a bug, have a question, or need help,
                    please register for the
                    <a href="https://servicedesk.usaspending.gov" rel="noopener noreferrer" target="_blank">
                        USAspending Service Desk
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
                <strong className="usa-da-help-content__date">March 25, 2019</strong>

                <p className="usa-da-help-content__content">In this release of the Broker, we:</p>
                <ul className="usa-da-help-content__list">
                    <li>Made edits to File F generation to align with changes in DAIMS v1.3.1</li>
                    <li>Implemented the FABS38.2.2 validation rule from DAIMS v1.3.1.</li>
                    <li>Renamed FABS38.2 to FABS38.2.1 to accommodate the new FABS38.2.2 validation rule.</li>
                    <li>Implemented the FABS38.4.1 validation rule from DAIMS v1.3.1</li>
                    <li>Renamed FABS38.4 to FABS38.4.1 to accommodate the new FABS38.4.2 validation rule. </li>
                    <li>Updated B9 Validation Rule to be case-insensitive when checking the program activity name/program activity code combination for the corresponding funding TAS/TAF.</li>
                    <li>Fixed aberrant display box behavior that occasionally occurred when viewing with the visual summary information on errors or warnings for a submission.</li>
                </ul>

                <h2 className="usa-da-help-content__header">Technical Notes for this Release</h2>
                <strong className="usa-da-help-content__date">March 25, 2019</strong>

                <p className="usa-da-help-content__content">In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.</p>
                <ul className="usa-da-help-content__list">
                    <li>Updated certify_submission API endpoint documents to include new errors for standard quarterly revalidation thresholds and special revalidation thresholds. This rule checks the validation date and confirms the submission is certifiable.</li>
                    <li>Modified the TAS loader to prevent loading any possible duplicates.</li>
                    <li>Standardized unique award keys between Broker and USASpending.gov.</li>
                    <li>Optimized File F generation for performance in memory and speed.</li>
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
