/**
 * HelpContent.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import $ from 'jquery';
import { fetchStaticAssetPath, generateRSSUrl } from '../../helpers/util.js';

let gifSrc = fetchStaticAssetPath() + 'graphics/reportabug.gif';

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
                <p>Welcome to the DATA Act Broker – Alpha release. This release is a <a href="https://en.wikipedia.org/wiki/Minimum_viable_product" target="_blank">Minimum Viable Product</a> and represents just enough functionality so that we can gather critical user feedback to determine the direction and implementation of future features. This version of the Broker is aligned to the <a href={this.state.rssUrl} target="_blank">Draft Reporting Submission Specification (Draft RSS v1.0)</a>.</p>

                <h2>Whats New in This Version</h2>

                <p>In this version of the Broker, you will be able to upload and run basic validations on your data, as many times as you want. All data will only be stored in a test database, and will not be released anywhere. Although you cannot save your submissions or submit finalized data yet, those features are coming in future versions.</p>

                <ul>
                    <li>
                        <a href="/#/help?section=dataElements">Updated Data Elements and Validations</a>
                    </li>
                    <li>
                        <a href="/#/help?section=accounts">Individual User Accounts</a>
                    </li>
                    <li>
                        <a href="/#/help?section=browser">Browser Requirements &amp; Known Issues</a>
                    </li>
                </ul>

                <h4 name="dataElements">Updated Data Elements and Validations</h4>
                <p>This version of the Broker is aligned with the <a href={this.state.rssUrl} target="_blank">Draft Reporting Submission Specification (RSS) v1.0</a>. This means that basic field validations, including type, required/optional, and field length will be validated. Additionally, conditional validations have been implemented, so fields that are only required if other conditions are met will be validated correctly. For example, if ParentAwardID is populated, ParentAwardAgencyID must also be populated.</p>

                <p>Validations that connect to external systems (such as GTAS), as well as calculated cross-file validations will be coming over the next few weeks.</p>

                <h4 name="accounts">Individual User Accounts</h4>

                <p>You can create your individual account based on your .gov email address. Once you submit your account request, you will receive an email with a link to confirm your account and set your password. After you confirm your account, your request will be reviewed by DATA Act PMO staff and granted access.</p>

                <p>In future iterations, we will be implementing hierarchical user roles by agency, so that each agency may have administrative accounts that can add and remove users for their own agency.</p>

                <h4 name="browser">Browser Requirements &amp; Known Issues</h4>

                <p>The Broker is currently tested with the following browsers:</p>

                <ul>
                    <li>Internet Explorer version 10 and higher</li>
                    <li>Firefox (current version)</li>
                    <li>Chrome (current version)</li>
                    <li>Safari (current version)</li>
                </ul>

                <p>Although you may use any browser/version combination you wish, we cannot support browsers and versions other than the ones stated above.</p>

                <h2>Getting More Help</h2>

                <h4 name="filingIssue">Filing an Issue</h4>
                
                <p>If you encounter a bug, have a question, or need help, <a href="https://federal-spending-transparency.atlassian.net/projects/ABF/issues/ABF-2?filter=allopenissues" target="_blank">please file an issue in JIRA</a>, our issue tracker. You do not need an account to file an issue, but if you would like to be notified of updates, please put your email in the "Reporter Email" field. If you can't access JIRA, please email <a href="ma&#105;l&#116;o&#58;da&#116;abroke%72%40fis%6&#51;a%6&#67;&#46;&#116;&#114;&#37;65%&#54;1sur%7&#57;%2&#69;gov">databroker@fiscal.treasury.gov</a>.</p>

                <p>Information posted on JIRA is visible to the public.</p>

                <p>We can better resolve your issue if you provide us as much information as possible, including the exact steps to follow to replicate your issue. Below is a short demo on how to <a href="https://federal-spending-transparency.atlassian.net/projects/ABF/issues/ABF-2?filter=allopenissues" target="_blank">file an issue in JIRA</a>.</p>
                
                <p>
                    <img src={gifSrc}/>
                </p> 


                <p>If you need assistance using the Broker, or would like to schedule a workshop, please contact the DATA Act Helpdesk: <a href="ma&#105;l&#116;o&#58;da&#116;abroke%72%40fis%6&#51;a%6&#67;&#46;&#116;&#114;&#37;65%&#54;1sur%7&#57;%2&#69;gov">databroker@fiscal.treasury.gov</a>.</p>
            </div>
        );
    }
}
