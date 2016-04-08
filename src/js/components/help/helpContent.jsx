/**
 * HelpContent.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import $ from 'jquery';

export default class HelpContent extends React.Component {

    componentDidMount() {
        this.scrollToSection();
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollToSection();
    }

    scrollToSection() {
        if (this.props.section && $('[name=' + this.props.section + ']').length > 0) {
            $('body').animate({
                scrollTop: $('[name=' + this.props.section + ']').offset().top
            }, 500);
        }
    }

    render() {
        return (
            <div className="usa-da-help-content">
                <p>Welcome to the DATA Act Broker – Alpha release. This release is a <a href="https://en.wikipedia.org/wiki/Minimum_viable_product" target="_blank">Minimum Viable Product</a> and represents just enough functionality so that we can gather critical user feedback to determine the direction and implementation of future features. This version of the Broker is aligned to the <a href="http://prod-data-act-web-static-files.s3-website-us-gov-west-1.amazonaws.com/RSS-spec/RSS_DRAFT_v1.0_03292016.xlsx" target="_blank">Reporting Submission Specification(RSS) Draft v1.0</a>.</p>

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
                <p>This version of the Broker is aligned with the <a href="http://prod-data-act-web-static-files.s3-website-us-gov-west-1.amazonaws.com/RSS-spec/RSS_DRAFT_v1.0_03292016.xlsx" target="_blank">Reporting Submission Specification(RSS) Draft v1.0</a>. This means that basic field validations, including type, required/optional, and field length will be validated. Additionally, conditional validations have been implemented, so fields that are only required if other conditions are met will be validated correctly. For example, if ParentAwardID is populated, ParentAwardAgencyID must also be populated.</p>

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

                <h4>Getting More Help</h4>

                <p>If you encounter a bug, please file an issue
                    in <a href="#" target="_blank">JIRA</a>, our issue tracker. If you need assistance using the Broker, or would like to schedule a workshop, please contact the DATA Act PMO office: <a href='mailto&#58;DATA%5&#48;&#77;O&#64;&#102;%69sc%&#54;1l&#37;&#50;Etr%65asury&#46;go%76'>DAT&#65;PMO&#64;f&#105;sca&#108;&#46;treasur&#121;&#46;g&#111;v</a>.</p>
            </div>
        );
    }
}
