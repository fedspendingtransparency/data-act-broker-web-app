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
    technical: PropTypes.string
};

const defaultProps = {
    changelog: '',
    section: '',
    technical: ''
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
        return (
            <div className="usa-da-help-content">
                <h2 className="usa-da-help-content__header">What&#8217;s New in This Release</h2>
                <ReactMarkdown>{this.props.changelog}</ReactMarkdown>
                <h2 className="usa-da-help-content__header">Technical Notes for this Release</h2>
                <ReactMarkdown>{this.props.technical}</ReactMarkdown>
                <h2 className="usa-da-help-content-subheading">Getting More Help</h2>
                <p name="membership">
                    If you encounter a bug, have a question, or need help,
                    please submit an email to the USAspending Service Desk (
                    <a href="mailto:usaspending.help@fiscal.treasury.gov">usaspending.help@fiscal.treasury.gov</a>).
                    We can better assist you if you provide us as much information as possible,
                    including the submission ID, the exact steps we should follow to replicate your issue,
                    and the page where you encountered it. The Service Desk Team will email you if more information
                    or clarification is needed.
                </p>
                <p>
                    If you need assistance using Data Broker, please email&nbsp;
                    <a href="mailto:DATAPMO@fiscal.treasury.gov">DATAPMO@fiscal.treasury.gov</a>.
                </p>
            </div>
        );
    }
}

HelpContent.propTypes = propTypes;
HelpContent.defaultProps = defaultProps;
