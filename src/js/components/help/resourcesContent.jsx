/**
 * ResourcesContent.jsx
 * Created by Emily Gullo 9/27/16
 **/

import React from 'react';
import $ from 'jquery';
import { generateRSSUrl, generateProtectedUrls, rssFileKey } from '../../helpers/util.js';


let gifSrc = 'graphics/reportabug.gif';

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
                    validationRulesUrl: urls['Validation_Rules_v1.08_20170413.xlsx'],
                    domainValuesUrl: urls['Domain_Values.xlsx'],
				    agencyLabelUrl: urls['AgencyLabel_to_TerseLabel_v1.0.1.xlsx'],
				    daimsErrataUrl: urls['DAIMS_Errata.xlsx'],
				    iDDUrl: urls['IDD_v1.01_20161221.xlsx'],
				    pmoWebCastUrl: urls['DATA_Act_PMO_ASP_Webcast_Deck_20160712.pdf'],
				    schemaFileAUrl: urls['DATA_Act_Schema_v1_0_File_A_20160622.pdf'],
				    schemaFileBUrl: urls['DATA_Act_Schema_v1_0_File_B_20160622.pdf'],
				    schemaFileCUrl: urls['DATA_Act_Schema_v1_0_File_C_20160622.pdf'],
                    faqFileC: urls['DATA_Act_PMO_FileC_TOA_FAQ_20160913.pdf']
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

	scrollToTop() {
            $('html, body').animate({
                scrollTop: 0
            }, 500);

    }

    render() {
        return (
            <div className="usa-da-help-content">
				<div className="resources-page">
				<h2>Resources - DAIMS</h2>
					<p>The DATA Act information Model Schema (DAIMS) gives an overall view of the hundreds of distinct data elements used to tell the story of how federal dollars are spent. It includes artifacts that provide technical guidance for federal agencies about what data to report to Treasury including the authoritative sources of the data elements and the submission format.</p>
					<p>Click these links to download or open a file.</p>

					<h5>Reporting Submission Specification (RSS) Resources</h5>
					<p>The RSS is a listing of the data elements with specific instructions for submitting content in the appropriate format.</p>
					 <ul>
					                    <li>
										<a href={this.state.rssUrl}>RSS v1.0</a>
										</li>
										<li><a href={this.state.daimsErrataUrl}>Errata</a>
										</li>
                                        <li><a href={this.state.faqFileC}>TransactionObligatedAmount FAQs</a>
										</li>
					</ul>
					<h6>DAIMS Diagrams for RSS</h6>
					<p>These are visual representations of how the different data elements are related. They show the groupings of elements and attributes.</p>
					<ul>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_RSS_Diagram_File_A_v1.0_04292016.pdf" target="_blank" rel="noopener noreferrer">File A - Appropriation Account Detail</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_RSS_Diagram_File_B_v1.0_04292016.pdf" target="_blank" rel="noopener noreferrer">File B - Object Class and Program Activity Detail</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_RSS_Diagram_File_C_v1.0_04292016.pdf" target="_blank" rel="noopener noreferrer">File C - Award Financial Detail</a>
					</li>
					</ul>
					<h5>Interface Definition Document (IDD) Resources</h5>
					<p>The IDD is listing of the data elements that will be extracted from government-wide procurement and financial assistance systems.</p>
					<ul>
					                    <li>
										<a href={this.state.iDDUrl}>IDD v1.01 (12/21/2016)</a>
										</li>
					</ul>
					<h6>DAIMS Diagrams for IDD</h6>
					<p>These are visual representations of how the different data elements are related. They show the groupings of elements and attributes.</p>
					<ul>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_IDD_Diagram_File_D1_v1.0.1.pdf" target="_blank" rel="noopener noreferrer">File D1 - Award and Awardee Attributes (Procurement)</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_IDD_Diagram_File_D2_v1.0.1.pdf" target="_blank" rel="noopener noreferrer">File D2 - Award and Awardee Attributes (Financial Assistance)</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_IDD_Diagram_File_E_v1.0.1.pdf" target="_blank" rel="noopener noreferrer">File E - Additional Awardee Attributes</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_IDD_Diagram_File_F_v1.0.1.pdf" target="_blank" rel="noopener noreferrer">File F - Sub-Award Attributes</a>
					</li>
					</ul>
					<h5>Overall DAIMS Resources</h5>
					<ul>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/img/informationflow.png" target="_blank" rel="noopener noreferrer">Information Flow Diagram</a> - An overview of the reporting cadences and sources of data included in the DAIMS.
					</li>
					<li>
					<a href="/#/practices" target="_blank" rel="noopener noreferrer">Practices and Procedures page</a>
					</li>
					<li>
					<a href="/#/validations" target="_blank" rel="noopener noreferrer">Validation Rules page</a>
					</li>
					<li>
					<a href={this.state.domainValuesUrl}>Domain Values</a> - A listing of the specific set of allowed values for a data element.
					</li>
					<li>
					<a href={this.state.agencyLabelUrl}>Long Element Name to Short Element Name Crosswalk</a> - A listing of the shortened column names for the data elements in the RSS and IDD.
					</li>
					</ul>
			</div>
            </div>
        );
    }
}
