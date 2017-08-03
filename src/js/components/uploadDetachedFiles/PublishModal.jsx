/**
  * PublishModal.jsx
  * Created by Minahm Kim 8/3/17
  **/

import React from 'react';
import Modal from 'react-aria-modal';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as ReviewHelper from '../../helpers/reviewHelper.js';
import { hashHistory, Link } from 'react-router';

export default class PublishModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			certified: false,
			showProgress: false,
			publishComplete: false,
			closeable: true,
			errorMessage: ""
		};
	}

	closeModal(e) {
		if (e) {
			e.preventDefault();
		}

		if (!this.state.closeable) {
			return;
		}

		// reset the modal if closed
		this.setState({
			showProgress: false,
			certified: false,
			publishComplete: false,
			errorMessage: ''
		}, () => {
			this.props.closeModal();
		});
	}

	render() {
		let message = <p>This will publish only rows that have passed validation</p>;

		let action = <div className='row'>
						<div className='col-sm-6'>
							<button id='publish-button' onClick={this.props.validate.bind(this)}className='usa-da-button btn-primary btn-full'>Publish</button>
						</div>
						<div className='col-sm-6'>
							<button onClick={this.closeModal.bind(this)} className='usa-da-button btn-warning btn-full'>Cancel</button>
						</div>
					</div>;

		let hideClose = "";
		if (!this.state.closeable) {
			hideClose = " hide";
		}

		let error = '';
		if (this.state.errorMessage) {
			error = <div className="alert alert-danger text-center" role="alert">{this.state.errorMessage}</div>;
		}

		return (
			<Modal mounted={this.props.isOpen} onExit={this.closeModal.bind(this)} underlayClickExits={this.state.closeable}
				verticallyCenter={true} titleId="usa-da-certify-modal">
				<div className="usa-da-modal-page">
					<div id="usa-da-certify-modal" className="usa-da-certify-modal">
						<div className={"usa-da-certify-modal-close usa-da-icon usa-da-icon-times" + hideClose}>
							<a href="#" onClick={this.closeModal.bind(this)}> <Icons.Times /> </a>
						</div>

						<div className="usa-da-certify-modal-content">
							<div className="row">
								<div className="col-md-12 title-field">
									<h6>Are you sure you want to publish your data to <a href='http://www.usaspending.gov' target='_blank'>USAspending.gov</a>?</h6>
									{message}
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">

								</div>
							</div>

							{action}
							{error}
							
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}