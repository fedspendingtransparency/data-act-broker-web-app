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
                <p>Welcome to the DATA Act Broker – Beta Release. This release is a <a href="https://en.wikipedia.org/wiki/Minimum_viable_product" target="_blank">Minimum Viable Product</a> and represents just enough functionality so that we can gather critical user feedback to determine the direction and implementation of future features. This version of the Broker aligns with <a href={this.state.rssUrl} target="_blank" aria-label="Download the RSS specification as an Excel file">Reporting Submission Specification (RSS v1.0)</a>.</p>

                <h2>What&#39;s New in This Release</h2>
                
                <div dangerouslySetInnerHTML={{__html:this.props.changelog}} />
                <div dangerouslySetInnerHTML={{__html:this.props.history}} />
                
                <h2 className="mt-50">Getting More Help</h2>

                <h4 name="filingIssue">Filing an Issue</h4>
                
                <p>If you encounter a bug, have a question, or need help, <a href="https://federal-spending-transparency.atlassian.net/projects/ABF/issues/ABF-2?filter=allopenissues" target="_blank">please file an issue in JIRA</a>, our issue tracker. You do not need an account to file an issue, but if you would like to be notified of updates, please put your email in the "Reporter Email" field. If you can&#39;t access JIRA, please email <a href="ma&#105;l&#116;o&#58;da&#116;abroke%72%40fis%6&#51;a%6&#67;&#46;&#116;&#114;&#37;65%&#54;1sur%7&#57;%2&#69;gov">databroker@fiscal.treasury.gov</a>.</p>

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