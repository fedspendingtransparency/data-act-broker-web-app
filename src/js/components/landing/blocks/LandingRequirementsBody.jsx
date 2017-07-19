/**
  * LandingRequirementsBody.jsx
  * Created by Minahm Kim 7/17/17
  **/

import React from 'react';
import Modal from 'react-aria-modal';
import Moment from 'moment'

export default class LandingRequirementsBody extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let gtas = null;
		if(this.props.gtas){
			let date = Moment(this.props.gtas.end_date).format("dddd, MMMM D, YYYY");
			gtas = <strong>*Note: The GTAS Submission Window is currently open. You cannot certify or re-certify until after the window closes on {date}.</strong>
		}

		let header = "You'll need the following files in order to complete your submission";
		let body = <div>
				<p>
					You may download and use the following sample data files if you don't have the required files on hand. The sample files can be downloaded below.
				</p>

				<ul>
					<li>
						File A: Appropriation Account data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/appropValid.csv" target="_blank" rel="noopener noreferrer">Download sample file</a>)
					</li>
					<li>
						File B: Object Class and Program Activity data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/programActivityValid.csv" target="_blank" rel="noopener noreferrer">Download sample file</a>)
					</li>
					<li>
						File C: Award Financial data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardFinancialValid.csv" target="_blank" rel="noopener noreferrer">Download sample file</a>)
					</li>
				</ul>

					<p className="mt-30"><strong>Files D1, D2, E, and F will be generated for you based on the reporting period you provide.</strong></p>

				<ul>
					<li>
						File D1: Procurement Awards data (Award and Awardee Attributes)
					</li>
					<li>
						File D2: Financial Assistance data (Award and Awardee Attributes) (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardValid.csv" target="_blank" rel="noopener noreferrer">download sample file</a>)
					</li>
					<li>
						File E: Additional Awardee Attributes data
					</li>
					<li>
						File F: Sub-award Attributes data
					</li>
				</ul>
			</div>;

		if(this.props.type == 'fabs') {
			header = "You'll need the following files in order to complete your FABS submission";
			body = <div>
					<p>
						You may download and use the following sample file to help prepare your submission if you don’t have any previous submission files on hand
					</p>
					<ul>
						<li>Financial Assistance data (Award and Awardee Attributes) (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/FABSSampleSubmissionFile.csv" target="_blank" rel="noopener noreferrer">download sample file</a>)</li>
					</ul>
					<p>
						Here are some additional resources to assist you with your submission:
					</p>
					<ul>
						<li>Validation Checklist</li>
						<li>Error Codes and Messages</li>
						<li><a href="#/resources" target="_blank" rel="noopener noreferrer">DATA Act Information Model Schema (DAIMS)</a> resources related to FABS. See:
							<ul>
								<li><a href="#/practices" target="_blank" rel="noopener noreferrer">DAIMS Practices &amp; Procedures</a></li>
								<li>DAIMS IDD (D2 tab)</li>
								<li>DAIMS Domain Values</li>
							</ul>
						</li>
					</ul>

				</div>
		}

		return (
			<div className="usa-da-landing-modal-content">
				<h4>{header}</h4>
				{body}
				{gtas}
			</div>
		)
	}
}