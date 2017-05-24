/**
 * HelpContent.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import $ from 'jquery';
import { generateRSSUrl, generateProtectedUrls, rssFileKey } from '../../helpers/util.js';


let gifSrc = 'graphics/reportabug.gif';

export default class HelpContent extends React.Component {

    constructor(props) {
        super(props);

        this.rssPromise = null;
        this.urlPromise = null;

        this.state = {
            rssUrl: '',
            validationRulesUrl: '#',
            domainValuesUrl: '#'
        };
    }

    componentDidMount() {

        // also load the remaining URLs
        this.urlPromise = generateProtectedUrls();
        this.urlPromise.promise
            .then((urls) => {
                this.setState({
                    rssUrl: urls[rssFileKey()],
                    validationRulesUrl: urls['Validation_Rules.xlsx'],
                    domainValuesUrl: urls['Domain_Values.xlsx'],
                });

                this.urlPromise = null;
            });

    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollToSection();
    }

    componentWillUnmount() {
        // cancel in-flight S3 signing requests when the component unmounts
        if (this.urlPromise) {
            this.urlPromise.cancel();
        }
    }

    scrollToSection() {
        if (this.props.section && $('[name=' + this.props.section + ']').length > 0) {
            $('html, body').animate({
                scrollTop: $('[name=' + this.props.section + ']').offset().top
            }, 500);
        }
    }

    render() {
        let membership = null;
        if (this.props.helpOnly) {
            membership = <div>
            <h4 name='agencyAccess'>Request Agency Access</h4>
            <p>
                The DATA Act Broker leverages MAX.gov for user accounts and password authentication. 
                To request a Broker account, you will first need a MAX.gov account. 
                If you do not have a MAX.gov account, you may register for one <a href='https://max.gov/maxportal/registrationForm.action' target='_blank'>here</a>.
            </p>
            <p>
                Once you have a MAX.gov account, navigate <a href='https://community.max.gov/x/fJwuRQ' target="_blank">here</a>, and follow the directions on the page to request access to the DATA Act Broker through your agency.             
            </p>
            <p>
                If you have questions about Broker access, or if your agency is not listed on the MAX page linked above, email <a href='mailto:DATAPMO@fiscal.treasury.gov?subject=Broker%20Access%20Information' target='_top'>DATAPMO@fiscal.treasury.gov</a>.
            </p>
            </div>;
        }
        else {
            membership = <p name='membership'>
                If you encounter a bug, have a question, or need help, 
                please register for the <a href='https://servicedesk.usaspending.gov' target='_blank'>USAspending Service Desk</a> and submit a ticket. 
                We can better resolve your issue if you provide us as much information as possible, 
                including the exact steps we should follow to replicate your issue and the page where you encountered it. 
                The Service Desk will email you if more information or clarification is needed. 
            </p>
        }

        return (
            <div className="usa-da-help-content">

                <h2>What&#39;s New in This Release</h2>

                <div dangerouslySetInnerHTML={{__html:this.props.changelog}} />

                <h2>This Release&#39;s Technical Notes</h2>

                <div dangerouslySetInnerHTML={{__html:this.props.technical}} />

                <h2 className="mt-50">Getting More Help</h2>

                {membership}

                <h4 name="filingIssue">Filing an Issue</h4>

                <p>If you encounter a bug, have a question, or need help, <a href="https://federal-spending-transparency.atlassian.net/projects/ABF/issues/ABF-2?filter=allopenissues" target="_blank"  rel="noopener noreferrer">please file an issue in JIRA</a>, our issue tracker. You do not need an account to file an issue, but if you would like to be notified of updates, please put your email in the "Reporter Email" field. If you can&#39;t access JIRA, please email <a href="mailto:DATAPMO@fiscal.treasury.gov">DATAPMO@fiscal.treasury.gov</a>.</p>

                <p>Information posted on JIRA is visible to the public.</p>

                <p>We can better resolve your issue if you provide us as much information as possible, including the exact steps to follow to replicate your issue. Below is a short demo on how to <a href="https://federal-spending-transparency.atlassian.net/projects/ABF/issues/ABF-2?filter=allopenissues" target="_blank"  rel="noopener noreferrer">file an issue in JIRA</a>.</p>

                <p>
                    <img src={gifSrc}/>
                </p>

                <p>If you need assistance using the Broker or if you would like to schedule a hands-on sandbox session with Treasury staff, please email <a href="mailto:DATAPMO@fiscal.treasury.gov">DATAPMO@fiscal.treasury.gov</a>.</p>
	    </div>
        );
    }
}
