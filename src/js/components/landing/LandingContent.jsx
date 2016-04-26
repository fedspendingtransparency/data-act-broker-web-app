/**
* LandingContent.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import { generateRSSUrl } from '../../helpers/util.js';

export default class LandingContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rssUrl: ''
        };
    }
    componentDidMount() {
        generateRSSUrl()
            .then((url) => {
                this.setState({
                    rssUrl: url
                });
            });
    }
    render() {
        return (
            <div className="site_content">
                <div className="usa-da-content-dark">
                    <div className="container">
                        <div className="row usa-da-content-landing usa-da-page-title">
                            <div className="col-md-7 mt-40 mb-50">
                                <div className="display-2">Welcome to the DATA Act Broker</div>
                                <p>This site enables you to upload your agency files and validate them against the latest
                                    version of the DATA Act Schema (draft version 1.0).</p>

                                <p>Details on how to format your data, including required and optional fields, can be
                                    found in the Reporting Submission Specification (Draft RSS 1.0). You can <a href={this.state.rssUrl} target="_blank">download the Reporting Submission Specification (Draft RSS 1.0)</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="row usa-da-landing-btns">
                            <div className="col-md-6">
                                <a className="usa-da-button btn-primary btn-lg btn-full" href="#/addData">
                                    <span className="usa-da-icon">
                                        <Icons.CloudUpload />
                                    </span>
                                    Add &#38; Validate New Data</a>
                            </div>
                            <div className="col-md-6">
                                <a className="usa-da-button btn-default-gray btn-disabled btn-lg btn-full" href="#">
                                    <span className="usa-da-icon usa-da-icon-Tachometer">
                                    <Icons.Tachometer />
                                    </span>
                                    Submission Dashboard <i>(Coming Soon)</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
