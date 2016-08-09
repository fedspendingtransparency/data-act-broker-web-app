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
        return (
            <div className="usa-da-help-content">
                <p>Welcome to the DATA Act Broker – Beta Release. This release is a <a href="https://en.wikipedia.org/wiki/Minimum_viable_product" target="_blank">Minimum Viable Product</a> and represents just enough functionality so that we can gather critical user feedback to determine the direction and implementation of future features. This version of the Broker aligns with <a href={this.state.rssUrl} target="_blank" aria-label="Download the RSS specification as an Excel file">Reporting Submission Specification (RSS v1.0)</a>.</p>

                <h2>What&#39;s New in This Release</h2>
                
                <div dangerouslySetInnerHTML={{__html:this.props.changelog}} />
                <div dangerouslySetInnerHTML={{__html:this.props.history}} />

                <h4 name="resources">Resources</h4>
                <p>We identified several files that you may want to have readily available while using the Broker.</p>
                <ul>
                    <li>
                        File A: Appropriation Account data &nbsp;&nbsp;
                        <a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/appropValid.csv" target="_blank">Download sample file</a>
                    </li>
                    <li>
                        File B: Object Class and Program Activity data &nbsp;&nbsp;
                        <a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/programActivityValid.csv" target="_blank">Download sample file</a>
                    </li>
                    <li>
                        File C: Award Financial data &nbsp;&nbsp;
                        <a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardFinancialValid.csv" target="_blank">Download sample file</a>
                    </li>
                    <li>
                        Long Element Name to Short Element Name Crosswalk &nbsp;&nbsp;
                        <a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-submission/rss/AgencyLabel_to_TerseLabel.xlsx" target="_blank">Download file</a>
                    </li>
                    <li>
                        Validation Rules resource &nbsp;&nbsp;
                        <a href={this.state.validationRulesUrl} target="_blank">Download file</a>
                    </li>
                    <li>
                        Domain Values resource &nbsp;&nbsp;
                        <a href={this.state.domainValuesUrl} target="_blank">Download file</a>
                    </li>
                </ul>
                
                <h2 className="mt-50">Getting More Help</h2>

                <h4 name="filingIssue">Filing an Issue</h4>
                
                <p>If you encounter a bug, have a question, or need help, <a href="https://federal-spending-transparency.atlassian.net/projects/ABF/issues/ABF-2?filter=allopenissues" target="_blank">please file an issue in JIRA</a>, our issue tracker. You do not need an account to file an issue, but if you would like to be notified of updates, please put your email in the "Reporter Email" field. If you can&#39;t access JIRA, please email <a href='&#109;&#97;&#105;lt&#111;&#58;DAT&#65;&#37;42r%&#54;&#70;ke&#114;&#64;&#37;&#54;6%6&#57;&#115;%6&#51;a&#37;6&#67;%&#50;E&#37;&#55;4%72eas&#37;75ry%2&#69;go&#37;76'>DATAB&#114;oke&#114;&#64;f&#105;&#115;ca&#108;&#46;tre&#97;&#115;ury&#46;gov</a>.</p>

                <p>Information posted on JIRA is visible to the public.</p>

                <p>We can better resolve your issue if you provide us as much information as possible, including the exact steps to follow to replicate your issue. Below is a short demo on how to <a href="https://federal-spending-transparency.atlassian.net/projects/ABF/issues/ABF-2?filter=allopenissues" target="_blank">file an issue in JIRA</a>.</p>
                
                <p>
                    <img src={gifSrc}/>
                </p> 

                <p>If you need assistance using the Broker or if you would like to schedule a hands-on sandbox session with Treasury staff, please email <a href='&#109;&#97;&#105;lt&#111;&#58;DAT&#65;&#37;42r%&#54;&#70;ke&#114;&#64;&#37;&#54;6%6&#57;&#115;%6&#51;a&#37;6&#67;%&#50;E&#37;&#55;4%72eas&#37;75ry%2&#69;go&#37;76'>DATAB&#114;oke&#114;&#64;f&#105;&#115;ca&#108;&#46;tre&#97;&#115;ury&#46;gov</a>.</p>
            </div>
        );
    }
}