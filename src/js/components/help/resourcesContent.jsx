/**
 * ResourcesContent.jsx
 * Created by Emily Gullo 9/27/16
 */

import React, { PropTypes } from 'react';
import $ from 'jquery';
import { generateProtectedUrls } from '../../helpers/util';
import DaimsMessage from './daimsMessage';

const propTypes = {
    section: PropTypes.object,
    type: PropTypes.string
};

const defaultProps = {
    section: null,
    type: ''
};

export default class ResourcesContent extends React.Component {
    constructor(props) {
        super(props);

        this.urlPromise = null;

        this.state = {
            faqFileC: '#',
            fabs_sample: '#'
        };
    }

    componentDidMount() {
        this.scrollToTop();
        // also load the remaining URLs
        this.urlPromise = generateProtectedUrls();
        this.urlPromise.promise
            .then((urls) => {
                this.setState({
                    faqFileC: urls['DATA_Act_PMO_FileC_TOA_FAQ_20160913.pdf'],
                    fabs_sample: urls['DAIMS_FABS_Sample_Submission_File_v1.2.csv']
                });

                this.urlPromise = null;
            });
    }

    componentDidUpdate() {
        this.scrollToSection();
    }

    componentWillUnmount() {
        // cancel in-flight S3 signing requests when the component unmounts
        if (this.urlPromise) {
            this.urlPromise.cancel();
        }
    }

    scrollToSection() {
        if (this.props.section && $(`[name=${this.props.section}]`).length > 0) {
            $('html, body').animate({
                scrollTop: $(`[name=${this.props.section}]`).offset().top
            }, 500);
        }
    }

    scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    }

    render() {
        const content = (
            <div>
                <h5>Additional Broker Resources</h5>
                <ul>
                    <li>
                        <a
                            href="https://fiscal.treasury.gov/files/data-transparency/DAIMS-Validation-Rules-v1.2.1.xlsx"
                            target="_blank"
                            rel="noopener noreferrer">
                            Validation Rules:
                        </a>
                        &nbsp;documents the business rules employed by the DATA Act Broker for field
                        and cross-file validations.
                    </li>
                    <li>
                        <a
                            href="https://github.com/fedspendingtransparency/data-act-broker-backend/
                            tree/master/dataactvalidator/config/sqlrules"
                            target="_blank"
                            rel="noopener noreferrer">SQL Validation Rules:
                        </a>
                        &nbsp;the actual machine logic used in FABS validations.
                        These SQL statements are based directly on the FABS validation rules.
                    </li>
                </ul>
            </div>
        );

        return (
            <div className="usa-da-help-content">
                <div className="resources-page">
                    <h2>Resources {this.props.type.toUpperCase()}</h2>
                    <span>
                        As part of Fiscal Service&#8217;s efforts to provide DAIMS documents in a
                        single location we have created a single DAIMS Resource page on the Broker.
                        This page provides links to agency-only documents (validation rules and SQL
                        validation rules) and a link to the public site for all other DAIMS documents.
                        This will ensure that links always point to the latest DAIMS documents.
                    </span>
                    <DaimsMessage type={this.props.type} />
                    <span>
                        The DATA Act information Model Schema (DAIMS) gives an overall view of the
                        hundreds of distinct data elements used to tell the story of how federal dollars are spent.
                        It includes artifacts that provide technical guidance for federal agencies about what data to
                        report to Treasury including the authoritative sources of the data elements and the submission
                        format. DAIMS information is available on the
                        <a
                            href="https://www.fiscal.treasury.gov/data-transparency/data-act-v1.2.html"
                            target="_blank"
                            rel="noopener noreferrer">
                            &nbsp;DAIMS
                        </a>
                        &nbsp;page of the Data Transparency site for the Bureau of the Fiscal Service.
                    </span>
                    {content}
                </div>
            </div>
        );
    }
}

ResourcesContent.propTypes = propTypes;
ResourcesContent.defaultProps = defaultProps;
