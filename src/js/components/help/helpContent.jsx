/**
 * HelpContent.jsx
 * Created by Mike Bray 4/1/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import $ from 'jquery';

const propTypes = {
    changelog: PropTypes.string,
    section: PropTypes.string,
    technical: PropTypes.string,
    helpOnly: PropTypes.bool
};

const defaultProps = {
    changelog: '',
    section: '',
    technical: '',
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
                    please submit an email to the USAspending Service Desk (
                    <a href="mailto:usaspending.help@fiscal.treasury.gov">usaspending.help@fiscal.treasury.gov</a>).
                    We can better assist you if you provide us as much information as possible,
                    including the submission ID, the exact steps we should follow to replicate your issue,
                    and the page where you encountered it. The Service Desk Team will email you if more information
                    or clarification is needed.
                </p>
            );
        }

        return (
            <div className="usa-da-help-content">
                <h2 className="usa-da-help-content__header">What&#8217;s New in This Release</h2>
                <ReactMarkdown>{this.props.changelog}</ReactMarkdown>
                <h2 className="usa-da-help-content__header">Technical Notes for this Release</h2>
                <ReactMarkdown>{this.props.technical}</ReactMarkdown>
                <h2 className="usa-da-help-content-subheading">Getting More Help</h2>
                {membership}
                <p>
                    If you need assistance using the Broker, please email&nbsp;
                    <a href="mailto:DATAPMO@fiscal.treasury.gov">DATAPMO@fiscal.treasury.gov</a>.
                </p>
            </div>
        );
    }
}

HelpContent.propTypes = propTypes;
HelpContent.defaultProps = defaultProps;
