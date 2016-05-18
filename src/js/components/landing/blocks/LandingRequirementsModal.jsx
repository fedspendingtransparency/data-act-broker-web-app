/**
  * LandingRequirementsModal.jsx
  * Created by Kevin Li 5/17/16
  **/

import React from 'react';
import Modal from 'react-modal';

import * as Icons from '../../SharedComponents/icons/Icons.jsx';

export default class LandingRequirementsModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}

	componentDidMount() {
		Modal.setAppElement('#modalHolder');
	}

	openModal() {
		this.setState({
			isOpen: true
		});
	}

	closeModal(e) {
		e.preventDefault();

		this.setState({
			isOpen: false
		});
	}

	render() {
		return (
			<Modal isOpen={this.state.isOpen} overlayClassName="usa-da-landing-modal-overlay" className="usa-da-landing-modal">
				<div className="usa-da-landing-modal-close">
					<a href="#" onClick={this.closeModal.bind(this)}>
						Close
					</a>
				</div>

				<div className="usa-da-landing-modal-content">
					<div>
						You'll need the following files in order to complete your submission. During the Data Broker - Alpha Release period you may download and use sample data files if you don't have the required files on hand. The sample files can be downloaded below.
					</div>

					<hr />

					<ul>
						<li>
							File A: Appropriation Account data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/appropValid.csv" target="_blank">Download sample file</a>)
						</li>
						<li>
							File B: Object Class and Program Activity data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/programActivityValid.csv" target="_blank">Download sample file</a>)
						</li>
						<li>
							File C: Award Financial data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardFinancialValid.csv" target="_blank">Download sample file</a>)
						</li>
					</ul>

					<div>
						Files D1, D2, E, and F will be generated for you based on the reporting period you provide.
					</div>

					<ul>
						<li>
							File D1: Procurement Awards data (Award and Awardee Attributes)
						</li>
						<li>
							File D2: Financial Assistance data (Award and Awardee Attributes) (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardValid.csv" target="_blank">download sample file</a>)
						</li>
						<li>
							File E: Additional Awardee Attributes data
						</li>
						<li>
							File F: Sub-award Attributes data
						</li>
					</ul>

				</div>
			</Modal>
		)
	}
}