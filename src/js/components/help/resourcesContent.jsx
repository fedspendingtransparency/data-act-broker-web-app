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
		    schemaFileCUrl: '#'
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
                    validationRulesUrl: urls['Validation_Rules.xlsx'],
                    domainValuesUrl: urls['Domain_Values.xlsx'],
				    agencyLabelUrl: urls['AgencyLabel_to_TerseLabel.xlsx'],
				    daimsErrataUrl: urls['DAIMS_Errata.xlsx'],
				    iDDUrl: urls['IDD_v1.0.xlsx'],
				    pmoWebCastUrl: urls['DATA_Act_PMO_ASP_Webcast_Deck_20160712.pdf'],
				    schemaFileAUrl: urls['DATA_Act_Schema_v1_0_File_A_20160622.pdf'],
				    schemaFileBUrl: urls['DATA_Act_Schema_v1_0_File_B_20160622.pdf'],
				    schemaFileCUrl: urls['DATA_Act_Schema_v1_0_File_C_20160622.pdf']
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
					<p>The DATA Act information Model Schema (DAIMS) v1.0 gives an overall view of the hundreds of distinct data elements used to tell the story of how federal dollars are spent. It includes artifacts that provide technical guidance for federal agencies about what data to report to Treasury including the authoritative sources of the data elements and the submission format.</p>
					<p>Click these links to download or open a file.</p>

					<h5>Reporting Submission Specification (RSS) Resources</h5>
					<p>The RSS is a listing of the data elements with specific instructions for submitting content in the appropriate format.</p>
					 <ul>
					                    <li>
										<a href={this.state.rssUrl}>RSS v1.0</a>
										</li>
										<li><a href={this.state.daimsErrataUrl}>Errata</a>
										</li>
					</ul>
					<p><b>RSS Sample Files</b></p>
					<ul>
										<li>
					                        File A: Appropriation Account data&nbsp;
					                        <a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/appropValid.csv" target="_blank">Download sample file</a>
					                    </li>
					                    <li>
					                        File B: Object Class and Program Activity data&nbsp;
					                        <a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/programActivityValid.csv" target="_blank">Download sample file</a>
					                    </li>
					                    <li>
					                        File C: Award Financial data&nbsp;
					                        <a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardFinancialValid.csv" target="_blank">Download sample file</a>
					                    </li>
					</ul>
					<p><b>RSS Webinars</b></p>
					<ul>
										<li>
										Webinar on File A: Appropriations Account&nbsp;
										<a href="http://www.yorkcast.com/treasury/events/2016/06/24/data-act/clip-1/" target="_blank">Webcast</a>&nbsp;&nbsp;
										<a href={this.state.schemaFileAUrl} target="_blank">Slide deck</a>
										</li>
										<li>
										Webinar on File B: Object Class and Program Activity&nbsp;
										<a href="http://www.yorkcast.com/treasury/events/2016/06/24/data-act/clip-2/" target="_blank">Webcast</a>&nbsp;&nbsp;
										<a href={this.state.schemaFileBUrl} target="_blank">Slide deck</a>
										</li>
										<li>
										Webinar on File C: Award Financial&nbsp;
										<a href="http://www.yorkcast.com/treasury/events/2016/06/24/data-act/clip-3/" target="_blank">Webcast</a>&nbsp;&nbsp;
										<a href={this.state.schemaFileCUrl} target="_blank">Slide deck</a>
										</li>
					</ul>
					<p><b>DAIMS Diagrams for RSS</b></p>
					<p>These are visual representations of how the different data elements are related. They show the groupings of elements and attributes.</p>
					<ul>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_RSS_Diagram_File_A_v1.0_04292016.pdf" target="_blank">File A - Appropriation Account Detail</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_RSS_Diagram_File_B_v1.0_04292016.pdf" target="_blank">File B - Object Class and Program Activity Detail</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_RSS_Diagram_File_C_v1.0_04292016.pdf" target="_blank">File C - Award Financial Detail</a>
					</li>
					</ul>
					<h5>Interface Definition Document (IDD) Resources</h5>
					<p>The IDD is listing of the data elements that will be extracted from government-wide procurement and financial assistance systems.</p>
					<ul>
					                    <li>
										<a href={this.state.iDDUrl}>IDD v1.0</a>
										</li>
										<li><a href={this.state.daimsErrataUrl}>Errata</a>
										</li>
					</ul>
					<p><b>IDD Webinar</b></p>
					<ul>
										<li>
										Financial Assistance Data Submission Format&nbsp;
										<a href="http://www.yorkcast.com/treasury/events/2016/07/20/data-act/" target="_blank">Webcast</a>&nbsp;&nbsp;
										<a href={this.state.pmoWebCastUrl} target="_blank">Slide deck</a>
										</li>
					</ul>
					<p><b>DAIMS Diagrams for IDD</b></p>
					<p>These are visual representations of how the different data elements are related. They show the groupings of elements and attributes.</p>
					<ul>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_IDD_Diagram_File_D1_v1.0_04292016.pdf" target="_blank">File D1 - Award and Awardee Attributes (Procurement)</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_IDD_Diagram_File_D2_v1.0_04292016.pdf" target="_blank">File D2 - Award and Awardee Attributes (Financial Assistance)</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_IDD_Diagram_File_E_v1.0_04292016.pdf" target="_blank">File E - Additional Awardee Attributes</a>
					</li>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/docs/DAIMS_IDD_Diagram_File_F_v1.0_04292016.pdf" target="_blank">File F - Sub-Award Attributes</a>
					</li>
					</ul>
					<h5>Overall DAIMS Resources</h5>
					<ul>
					<li>
					<a href="http://fedspendingtransparency.github.io/assets/img/informationflow.png" target="_blank">Information Flow Diagram</a> - An overview of the reporting cadences and sources of data included in the DAIMS.
					</li>
					<li>
					<a href="/#/practices" target="_blank">Practices and Procedures page</a>
					</li>
					<li>
					<a href="/#/validations" target="_blank">Validation Rules page</a>
					</li>
					<li>
					<a href={this.state.domainValuesUrl}>Domain Values</a> - A listing of the specific set of allowed values for a data element.
					</li>
					<li>
					<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-submission/rss/AgencyLabel_to_TerseLabel.xlsx">Long Element Name to Short Element Name Crosswalk</a> - A listing of the shortened column names for the data elements in the RSS and IDD.
					</li>
					</ul>
			</div>
            </div>
        );
    }
}
