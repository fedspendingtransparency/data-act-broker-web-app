/**
  * UserModal.jsx
  * Created by Kevin Li 5/24/16
  **/

import React from 'react';
import Modal from 'react-aria-modal';
import _ from 'lodash';

import ModalStatus from './ModalStatus.jsx';
import ModalPermissions from './ModalPermissions.jsx';

export default class UserModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			title: "",
			agency: "",
			status: "",
			is_active: true,
			permissions: {
				agency_user: false,
				website_admin: false,
				agency_admin: false
			},
			originalPermissions: {
				agency_user: false,
				website_admin: false,
				agency_admin: false
			}
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.user.id != this.props.user.id) {
			this.setUserState();
		}
	}

	setUserState() {
		const permissionValues = ['agency_user', 'website_admin', 'agency_admin'];
		const permissions = {};

		permissionValues.forEach((permission) => {
			if (_.indexOf(this.props.user.permissions, permission) > -1) {
				permissions[permission] = true;
			}
			else {
				permissions[permission] = false;
			}
		});

		this.setState({
			name: this.props.user.name,
			email: this.props.user.email,
			title: this.props.user.title,
			agency: this.props.user.agency_name,
			status: this.props.user.status,
			is_active: this.props.user.is_active,
			permissions: permissions,
			originalPermissions: permissions
		});
	}

	changePermission(e) {
		const permissions = Object.assign({}, this.state.permissions);
		const oldValue = this.state.originalPermissions[e.target.value];

		permissions[e.target.value] = !oldValue;

		this.setState({
			permissions: permissions
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

		// determine if permissions have changed
		let permString = "";
		let permissionChanged = false;
		Object.keys(this.state.permissions).forEach((permission) => {
			if (this.state.permissions[permission] != this.state.originalPermissions[permission]) {
				permissionChanged = true;
			}

			if (this.state.permissions[permission] == true) {
				if (permString != "") {
					permString += "," + permission;
				}
				else {
					permString = permission;
				}
			}

		});

		if (permissionChanged) {
			changes.permissions = permString;
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

								<div className="form-group">
									<label>Permissions</label>
									<ModalPermissions value={this.state.permissions} onChange={this.changePermission.bind(this)} />
								</div>

								<div className="form-group text-center">
									<button className="usa-da-button btn-danger" onClick={this.disableUser.bind(this)}>Disable User</button>
								</div>
							</div>

							<hr />

							<div className="modal-buttons text-right">
								<button className="usa-da-button btn-gray" onClick={this.props.closeModal}>
									Cancel
								</button>
								<button className="usa-da-button btn-primary" onClick={this.saveChanges.bind(this)}>
									Save
								</button>
							</div>

						</div>
					</div>
				</Modal>
			</div>
		)
	}
}