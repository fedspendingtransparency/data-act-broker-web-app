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
						You'll need the following files in order to complete your submission. During the Data Broker Alpha period you may download and use sample data files incase you don’t have the required files on hand. The sample files can be downloaded below.
					</div>

					<hr />

					<ul>
						<li>
							File A: Appropriation Data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/appropValid.csv" target="_blank">Download Sample File</a>)
						</li>
						<li>
							File B: Program Activity and Object Class Data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/programActivityValid.csv" target="_blank">Download Sample File</a>)
						</li>
						<li>
							File C: Financial Data (<a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardFinancialValid.csv" target="_blank">Download Sample File</a>)
						</li>
					</ul>

					<div>
						Files D1 and D2 will be generated for you based off of the submission duration you choose.
					</div>

					<ul>
						<li>File D1: Procurement Award (FPDS data)</li>
						<li>File D2: Financial Assistance Award File</li>
					</ul>

				</div>
			</Modal>
		)
	}
}