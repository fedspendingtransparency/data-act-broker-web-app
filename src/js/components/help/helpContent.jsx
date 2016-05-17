/**
 * HelpContent.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import $ from 'jquery';
import { generateRSSUrl } from '../../helpers/util.js';

let gifSrc = 'graphics/reportabug.gif';

export default class HelpContent extends React.Component {

    constructor(props) {
        super(props);

        this.rssPromise = null;

        this.state = {
            rssUrl: ''
        };
    }

    componentDidMount() {
        this.scrollToSection();
        this.rssPromise = generateRSSUrl();
        this.rssPromise.promise
            .then((url) => {
                this.setState({
                    rssUrl: url
                });

                this.rssPromise = null;
            });
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollToSection();
    }

    componentWillUnmount() {
        if (this.rssPromise) {
            this.rssPromise.cancel();
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
                <p>Welcome to the DATA Act Broker – Alpha Release. This release is a <a href="https://en.wikipedia.org/wiki/Minimum_viable_product" target="_blank">Minimum Viable Product</a> and represents just enough functionality so that we can gather critical user feedback to determine the direction and implementation of future features. This version of the Broker aligns with <a href={this.state.rssUrl} target="_blank">Reporting Submission Specification (RSS v1.0)</a>.</p>

                <h2>What's New in This Release</h2>
        
                <p>In this version of the broker, we have made a change if you are logging in with Internet Explorer, added funtionality for the Broker to recognize files with the pipe symbol as a delimiter, and updated some of the validations.
                
                <ul>
                    <li>
                        <a href="/#/help?section=brokerIE">Logging into the Broker with Internet Explorer</a>
                    </li>
                    <li>
                        <a href="/#/help?section=pipe">Submit Files with Pipe Symbol</a>
                    </li>
                    <li>
                        <a href="/#/help?section=fileValv1">File Validations per RSS v1.0</a>
                    </li>
                     <li>
                        <a href="/#/help?section=crossFileValv1">Cross File Validations</a>
                    </li>
              
                    <li>
                        <a href="/#/help?section=browser">Browser Requirements &amp; Known Issues</a>
                    </li>
                </ul>

                <h4 name="brokerIE">Logging into the Broker with Internet Explorer</h4>
                <p>During user testing, some Internet Explorer users were unable to log into the Broker and upload files. We implemented a workaround so users with Internet Explorer on <b>medium security settings</b> can log in and upload files. See Known Issues below.</p>

                <h4 name="pipe">Submit File with Pipe Symbol</h4>
                <p>Based on user feedback, we changed the Broker to automatically detect whether a file is using a comma or pipe symbol as a delimiter, based on the format of the header row.</p>

                <h4 name="fileValv1">File Validations per RSS v1.0</h4>
                <p>Submitted files will be validated per RSS v1.0. Specifically:
                <ul>
                <li>Field names match the RSS v1.0
                </li>
                <li>Maximum field length does not exceed the value in RSS v1.0
                </li>
                <li>Required fields are present per RSS v1.0
                </li>
                <li>Records in File C have a PIID, FAIN, or URI
                </li>
                </ul>
                </p>
                
                <h4 name="crossFileValv1">Cross File Validations</h4>
                <p>We started work on cross file validations, beginning with cross validation of the FAIN, URI or PIID between sample files for Files C and D2.</p>

                <h4 name="browser">Browser Requirements &amp; Known Issues</h4>

                <p>The Broker is currently tested with the following browsers:</p>

                <ul>
                    <li>Internet Explorer version 10 and higher</li>
                    <li>Firefox (current version)</li>
                    <li>Chrome (current version)</li>
                    <li>Safari (current version)</li>
                </ul>

                <p>Although you may use any browser/version combination you wish, we cannot support browsers and versions other than the ones stated above.</p>
                <p>Known Issues
                <ul>
                <li>The Broker will not work when using Internet Explorer under medium pricavy settings or high security settings.
                </li>
                </ul>
                </p>
                <h2>Getting More Help</h2>

                <h4 name="filingIssue">Filing an Issue</h4>
                
                <p>If you encounter a bug, have a question, or need help, <a href="https://federal-spending-transparency.atlassian.net/projects/ABF/issues/ABF-2?filter=allopenissues" target="_blank">please file an issue in JIRA</a>, our issue tracker. You do not need an account to file an issue, but if you would like to be notified of updates, please put your email in the "Reporter Email" field. If you can't access JIRA, please email <a href="ma&#105;l&#116;o&#58;da&#116;abroke%72%40fis%6&#51;a%6&#67;&#46;&#116;&#114;&#37;65%&#54;1sur%7&#57;%2&#69;gov">databroker@fiscal.treasury.gov</a>.</p>

                <p>Information posted on JIRA is visible to the public.</p>

                <p>We can better resolve your issue if you provide us as much information as possible, including the exact steps to follow to replicate your issue. Below is a short demo on how to <a href="https://federal-spending-transparency.atlassian.net/projects/ABF/issues/ABF-2?filter=allopenissues" target="_blank">file an issue in JIRA</a>.</p>
                
                <p>
                    <img src={gifSrc}/>
                </p> 


                <p>If you need assistance using the Broker  or if you would like to schedule a hands-on sandbox session with Treasury staff, please email <a href="ma&#105;l&#116;o&#58;da&#116;abroke%72%40fis%6&#51;a%6&#67;&#46;&#116;&#114;&#37;65%&#54;1sur%7&#57;%2&#69;gov">databroker@fiscal.treasury.gov</a>.</p>
            </div>
        );
    }
}
