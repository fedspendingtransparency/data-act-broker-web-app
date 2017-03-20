/**
  * DeleteModal.jsx
  * Created by Minahm Kim 03/10/17
  **/

import React from 'react';
import Modal from 'react-aria-modal';
import { hashHistory } from 'react-router';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

import * as ReviewHelper from '../../../helpers/reviewHelper.js';

export default class DeleteModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			errorMessage: "",
			disable: false
		};
	}

	clickedDeleteButton() {
		ReviewHelper.deleteSubmission(this.props.id)
			.then((data) =>{
				if(data.message == 'Success'){
					this.props.delete();

					// reset the modal if closed
					this.setState({
						errorMessage: ''
					}, () => {
						this.props.closeModal();
					});
				}
			})
			.catch((error) => {
				let errorMessage = "default error messsage"
				if (error.message && error.message !== "") {
    					errorMessage = error.message
				}
				this.setState({errorMessage: errorMessage});
				this.setState({disable: true});
			});

	}

	closeModal(e) {
		if (e) {
			e.preventDefault();
		}

		// reset the modal if closed
		this.setState({
			errorMessage: ''
		}, () => {
			this.props.closeModal();
		});
	}

	render() {
		let error = '';
		if (this.state.errorMessage) {
			error = <div className="alert alert-danger text-center" role="alert">{this.state.errorMessage}</div>;
		}

		return (
			<Modal mounted={this.props.isOpen} onExit={this.closeModal.bind(this)} underlayClickExits={true}
				verticallyCenter={true} initialFocus="#delete-button" titleId="usa-da-certify-modal">
				<div className="usa-da-modal-page">
					<div id="usa-da-certify-modal" className="usa-da-certify-modal">
						<div className="usa-da-certify-modal-close usa-da-icon usa-da-icon-times">
							<a href="#" onClick={this.closeModal.bind(this)}> <Icons.Times /> </a>
						</div>

						<div className="usa-da-certify-modal-content delete-modal-content">

							Warning: This will delete the submission for the <strong>entire agency.</strong> Are you sure?

						</div>
						{error}
						<div className="pull-right">
							<br/>
							<button id="delete-button" className="btn btn-danger delete-button" onClick={this.clickedDeleteButton.bind(this)} disabled={this.state.disable}>Delete</button>
							<button className='btn btn-default' onClick={this.closeModal.bind(this)}>Cancel</button>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}