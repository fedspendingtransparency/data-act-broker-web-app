/**
  * UserTable.jsx
  * Created by Kevin Li 5/22/16
  **/

import React from 'react';
import Table from '../../SharedComponents/table/TableComponent.jsx';
import AdminPageMessage from './AdminPageMessage.jsx';
import ApproveDenyBlock from './ApproveDenyBlock.jsx';
import ModifyBlock from './ModifyBlock.jsx';
import ReactivateBlock from './ReactivateBlock.jsx';

import UserModal from './UserModal.jsx';

export default class UserTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalActive: false,
			activeUser: {}
		};
	}
	
	showModal(user) {
		this.setState({
			activeUser: user,
			modalActive: true
		});
	}
	
	closeModal() {
		this.setState({
			activeUser: {},
			modalActive: false
		});
	}

	transformData() {
		const users = [];

		let i = 0;
		this.props.admin.users.forEach((rawUser) => {
			let action = '';
			let status = 'Awaiting Confirmation';

			if (rawUser.status == 'email_confirmed') {
				status = 'Email Confirmed';
			}
			else if (rawUser.status == 'awaiting_approval') {
				action = <ApproveDenyBlock onChange={this.props.modifyUser} user={this.props.admin.users[i]} />;
				status = 'Awaiting Approval';
			}
			else if (rawUser.status == 'approved') {
				action = <ModifyBlock showModal={this.showModal.bind(this)} onChange={this.props.modifyUser} user={this.props.admin.users[i]} />;
				status = 'Active';
			}
			else if (rawUser.status == 'denied') {
				status = 'Denied';
			}

			if (rawUser.status == 'approved' && rawUser.is_active != true) {
				action = <ReactivateBlock onChange={this.props.modifyUser} user={this.props.admin.users[i]} />;
				status = 'Inactive';
			}

			const user = [
				rawUser.name,
				rawUser.title,
				rawUser.agency,
				rawUser.email,
				status,
				action
			];

			users.push(user);

			i++;
		});

		return users;
	}

	render() {
		const headers = ['Name', 'Title', 'Agency', 'Email', 'Status', 'Action'];
		return (
			<div>
				<div className="row">
	                <div className="col-md-12 usa-da-admin-message">
	                    <AdminPageMessage data={this.props.message} />
	                </div>
	            </div>
	            
	            <UserModal modalActive={this.state.modalActive} closeModal={this.closeModal.bind(this)} user={this.state.activeUser} onChange={this.props.modifyUser} />

	            <div className="row">
	                <div className="col-md-12">
	                    <Table data={this.transformData()} headers={headers} extraClasses={['table-bordered']}/>
	                </div>
	            </div>
	        </div>
		);
	}
}
