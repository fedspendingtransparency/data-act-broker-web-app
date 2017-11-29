/**
 * ResourcesContent.jsx
 * Created by Emily Gullo 9/27/16
 */

import React, { PropTypes } from 'react';
import $ from 'jquery';
import { generateProtectedUrls, rssFileKey } from '../../helpers/util';
import DaimsMessage from './daimsMessage';

const propTypes = {
    section: PropTypes.object,
    type: PropTypes.string
};

export default class ResourcesContent extends React.Component {
    constructor(props) {
        super(props);

        this.rssPromise = null;
        this.urlPromise = null;

        this.state = {
            rssUrl: '',
            validationRulesUrl: '#',
            domainValuesUrl: '#',
            agencyLabelUrl: '#',
            daimsErrataUrl: '#',
            iDDUrl: '#',
            pmoWebCastUrl: '#',
            schemaFileAUrl: '#',
            schemaFileBUrl: '#',
            schemaFileCUrl: '#',
            faqFileC: '#'
        };
    }

    componentDidMount() {
        this.scrollToTop();
        // also load the remaining URLs
        this.urlPromise = generateProtectedUrls();
        this.urlPromise.promise
            .then((urls) => {
                this.setState({
                    rssUrl: urls[rssFileKey()],
                    validationRulesUrl: urls['Validation_Rules_v1.1.1.xlsx'],
                    domainValuesUrl: urls['Domain_Values.xlsx'],
                    agencyLabelUrl: urls['AgencyLabel_to_TerseLabel_v1.0.1.xlsx'],
                    daimsErrataUrl: urls['DAIMS_Errata.xlsx'],
                    iDDUrl: urls['IDD_v1.01_20161221.xlsx'],
                    pmoWebCastUrl: urls['DATA_Act_PMO_ASP_Webcast_Deck_20160712.pdf'],
                    schemaFileAUrl: urls['DATA_Act_Schema_v1_0_File_A_20160622.pdf'],
                    schemaFileBUrl: urls['DATA_Act_Schema_v1_0_File_B_20160622.pdf'],
                    schemaFileCUrl: urls['DATA_Act_Schema_v1_0_File_C_20160622.pdf'],
                    faqFileC: urls['DATA_Act_PMO_FileC_TOA_FAQ_20160913.pdf'],
                    fabs_sample: urls['DAIMS_FABS_Sample_Submission_File_v1.1.csv']
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
        if (this.props.section && $('[name=' + this.props.section + ']').length > 0) {
            $('html, body').animate({
                scrollTop: $('[name=' + this.props.section + ']').offset().top
            }, 500);
        }
    }

    scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    }

    render() {
        const github = 'http://fedspendingtransparency.github.io/assets/docs/';
        const community = 'https://community.max.gov/download/attachments/';
        const aws = 'https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/';

        let content = (
            <div>
                <h5>Here are some resources to assist with your submission to FABS</h5>
                <ul>
                    <li>
                        FABS File: Financial Assistance data (Award and Awardee Attributes)
                        <a href={this.state.fabs_sample} target="_blank">Download sample file</a>
                    </li>
                </ul>
                <h5>Additional Resources</h5>
                <ul>
                    <li>
                        <a href="/#/FABSvalidations">FABS Validations page</a>
                    </li>
                    <li>
                        <a href="/#/resources">DATA Act Information Model Schema (DAIMS)</a> resources related to
                        FABS including:
                        <ul>
                            <li>
                                <a href={community + "1286474850/DAIMS_Practices_Procedures_v1.1.pdf?api=v2"}>
                                    DAIMS Practices and Procedures v1.1
                                </a>
                            </li>
                            <li>
                                <a href={github + "DAIMS_IDD_v1.1.xlsx"}>DAIMS IDD v1.1 (D2 tab)</a>
                            </li>
                            <li>
                                <a href={github + "DAIMS_Domain_Values_v1.1.xlsx"}>IMS Domain Values v1.1</a>
                            </li>
                            <li>
                                <a href={github + "DAIMS_Information_Flow_Diagram_v1.1.png"}>
                                    Information Flow Diagram
                                </a>
                                - An overview of the reporting cadences and sources of data included in the DAIMS.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
        if (this.props.type === 'dabs') {
            content = (
                <div><h5>Reporting Submission Specification (RSS) Resources</h5>
                    <p>
                        The RSS is a listing of the data elements with specific instructions for submitting content in
                        the appropriate format.
                    </p>
                    <ul>
                        <li>
                            <a href={github + "DAIMS_RSS_v1.1.xlsx"}>RSS v1.1</a>
                        </li>
                        <li>
                            <a href={this.state.faqFileC}>TransactionObligatedAmount FAQs</a>
                        </li>
                    </ul>
                    <h6>RSS Sample Files</h6>
                    <ul>
                        <li>
                            File A: Appropriation Account data&nbsp;
                            <a href={aws + "appropValid.csv"} target="_blank" rel="noopener noreferrer">
                                Download sample file
                            </a>
                        </li>
                        <li>
                            File B: Object Class and Program Activity data&nbsp;
                            <a href={aws + "programActivityValid.csv"} target="_blank" rel="noopener noreferrer">
                                Download sample file
                            </a>
                        </li>
                        <li>
                            File C: Award Financial data&nbsp;
                            <a href={aws + "awardFinancialValid.csv"} target="_blank" rel="noopener noreferrer">
                                Download sample file
                            </a>
                        </li>
                    </ul>
                    <h6>DAIMS Diagrams for RSS</h6>
                    <p>
                        These are visual representations of how the different data elements are related. They show the
                        groupings of elements and attributes.
                    </p>
                    <ul>
                        <li>
                            <a
                                href={github + "DAIMS_RSS_Diagram_File_A_v1.1.pdf"}
                                target="_blank"
                                rel="noopener noreferrer">
                                File A - Appropriation Account Detail
                            </a>
                        </li>
                        <li>
                            <a
                                href={github + "DAIMS_RSS_Diagram_File_B_v1.1.pdf"}
                                target="_blank"
                                rel="noopener noreferrer">
                                File B - Object Class and Program Activity Detail
                            </a>
                        </li>
                        <li>
                            <a
                                href={github + "DAIMS_RSS_Diagram_File_C_v1.1.pdf"}
                                target="_blank"
                                rel="noopener noreferrer">
                                File C - Award Financial Detail
                            </a>
                        </li>
                    </ul>
                    <h5>Interface Definition Document (IDD) Resources</h5>
                    <p>
                        The IDD is listing of the data elements that will be extracted from government-wide procurement
                        and financial assistance systems.
                    </p>
                    <ul>
                        <li>
                            <a href={github + "DAIMS_IDD_v1.1.xlsx"}>IDD v1.1</a>
                        </li>
                    </ul>
                    <h6>DAIMS Diagrams for IDD</h6>
                    <p>
                        These are visual representations of how the different data elements are related. They show the
                        groupings of elements and attributes.
                    </p>
                    <ul>
                        <li>
                            <a
                                href={github + "DAIMS_IDD_Diagram_File_D1_v1.1.pdf"}
                                target="_blank"
                                rel="noopener noreferrer">
                                File D1 - Award and Awardee Attributes (Procurement)
                            </a>
                        </li>
                        <li>
                            <a
                                href={github + "DAIMS_IDD_Diagram_File_D2_v1.1.pdf"}
                                target="_blank"
                                rel="noopener noreferrer">
                                File D2 - Award and Awardee Attributes (Financial Assistance)
                            </a>
                        </li>
                        <li>
                            <a
                                href={github + "DAIMS_IDD_Diagram_File_E_v1.1.pdf"}
                                target="_blank"
                                rel="noopener noreferrer">
                                File E - Additional Awardee Attributes
                            </a>
                        </li>
                        <li>
                            <a
                                href={github + "DAIMS_IDD_Diagram_File_F_v1.1.pdf"}
                                target="_blank"
                                rel="noopener noreferrer">
                                File F - Sub-Award Attributes
                            </a>
                        </li>
                    </ul>
                    <h5>Overall DAIMS Resources</h5>
                    <ul>
                        <li>
                            <a
                                href={github + "DAIMS_Information_Flow_Diagram_v1.1.png"}
                                target="_blank"
                                rel="noopener noreferrer">
                                Information Flow Diagram
                            </a>
                            - An overview of the reporting cadences and sources of data included in the DAIMS.
                        </li>
                        <li>
                            <a
                                href={community + "1286474850/DAIMS_Practices_Procedures_v1.1.pdf?api=v2"}
                                target="_blank"
                                rel="noopener noreferrer">
                                Practices and Procedures
                            </a>
                        </li>
                        <li>
                            <a href="/#/FABSValidations" target="_blank" rel="noopener noreferrer">
                                FABS Validation Rules page
                            </a>
                        </li>
                        <li>
                            <a href="/#/FABSresources" target="_blank" rel="noopener noreferrer">
                                FABS Resources Page
                            </a>
                        </li>
                        <li>
                            <a href={github + "DAIMS_Domain_Values_v1.1.xlsx"}>Domain Values</a>
                            - A listing of the specific set of allowed values for a data element.
                        </li>
                        <li>
                            <a href={github + "DAIMS_Agency_Label_To_Terse_Label_v1.1.xlsx"}>
                                Long Element Name to Short Element Name Crosswalk
                            </a> - A listing of the shortened column names for the data elements
                            in the RSS and IDD.
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <div className="usa-da-help-content">
                <div className="resources-page">
                    <h2>Resources {this.props.type.toUpperCase()}</h2>
                    <DaimsMessage type="resources" />
                    <span>
                        The DATA Act information Model Schema (DAIMS) gives an overall view of the hundreds of distinct
                        data elements used to tell the story of how federal dollars are spent.
                        It includes artifacts that provide technical guidance for federal agencies about what data to
                        report to Treasury including the authoritative sources of the data elements and the submission
                        format.
                    </span>
                    <p>Click these links to download or open a file.</p>
                    {content}
                </div>
            </div>
        );
    }
}

ResourcesContent.propTypes = propTypes;
