/**
  * UserModal.jsx
  * Created by Kevin Li 5/24/16
  **/

import React from 'react';
import Modal from 'react-aria-modal';
import _ from 'lodash';

import * as Icons from '../../SharedComponents/icons/Icons.jsx';

import ModalStatus from './ModalStatus.jsx';

export default class UserModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			title: "",
			agency: "",
			status: "",
			is_active: true
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.user.id != this.props.user.id) {
			this.setUserState();
		}
	}

	setUserState() {
		this.setState({
			name: this.props.user.name,
			email: this.props.user.email,
			title: this.props.user.title,
			agency: this.props.user.agency_name,
			status: this.props.user.status,
			is_active: this.props.user.is_active
		});
	}

	changeStatus(e) {
		e.preventDefault();
		this.setState({
			status: e.target.value
		});
	}

	saveChanges() {
		
		const changes = {};

		// determine if state has changed
		if (this.props.user.status != this.state.status) {
			changes.status = this.state.status;
		}

		this.props.onChange(this.props.user, changes);

		this.props.closeModal();
	}

	disableUser() {
		this.props.onChange(this.props.user, {
			is_active: false
		});

		this.props.closeModal();
	}

	deleteUser(e) {
		e.preventDefault();

		const confirm = window.confirm('Are you sure you want to delete ' + this.props.user.name + ' (' + this.props.user.email + ') from the DATA Act Broker?');

		if (confirm) {
			this.props.deleteUser(this.props.user);
			this.props.closeModal();
		}
	}

	render() {

		return (
			<div>
				<Modal 
					mounted={this.props.modalActive}
					onExit={this.props.closeModal}
					titleId="usa-da-admin-modal"
					underlayClickExists={false}
					verticallyCenter={true}>
					<div className="usa-da-modal-page">
						<div id="usa-da-admin-modal" className="usa-da-admin-modal">
							
							<h6 className="modal-title">Modify User</h6>
							<hr />
							<div className="usa-da-admin-field">
								<div className="form-group">
									<label htmlFor="nameField">Name</label>
									<input type="text" disabled="disabled" className="form-control" id="nameField" value={this.state.name} />
								</div>

								<div className="form-group">
									<label htmlFor="titleField">Title</label>
									<input type="text" disabled="disabled" className="form-control" id="titleField" value={this.state.title} />
								</div>

								<div className="form-group">
									<label htmlFor="agnecyField">Agency</label>
									<input type="text" disabled="disabled" className="form-control" id="agencyField" value={this.state.agency} />
								</div>

								<div className="form-group">
									<label htmlFor="emailField">Email</label>
									<input type="text" disabled="disabled" className="form-control" id="emailField" value={this.state.email} />
								</div>

								<div className="form-group">
									<label htmlFor="statusField">Status</label>
									<ModalStatus value={this.state.status} onChange={this.changeStatus.bind(this)} />
								</div>

								<div className="form-group text-center">
									<button className="usa-da-button btn-danger" onClick={this.disableUser.bind(this)}>Disable User</button>
								</div>
							</div>

							<hr />

							<div className="modal-buttons row">
								<div className="col-md-6 text-left">
									<div className="delete-wrap">
										<div className="usa-da-icon">
											<Icons.ExclamationTriangle alt="Danger icon" />
										</div>
										<div className="delete-link">
											<a href="#" className="danger-delete" onClick={this.deleteUser.bind(this)}>
												Delete User
											</a>
										</div>
									</div>
								</div>
								<div className="col-md-6 text-right">
									<button className="usa-da-button btn-gray" onClick={this.props.closeModal}>
										Cancel
									</button>
									<button className="usa-da-button btn-primary" onClick={this.saveChanges.bind(this)}>
										Save
									</button>
								</div>
							</div>

						</div>
					</div>
				</Modal>
			</div>
		)
	}
}