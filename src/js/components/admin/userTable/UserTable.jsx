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

export default class UserTable extends React.Component {

	transformData() {
		const users = [];

		this.props.admin.users.forEach((rawUser) => {

			let action = '';
			let status = 'Awaiting Confirmation';

			if (rawUser.status == 'email_confirmed') {
				status = 'Email Confirmed';
			}
			else if (rawUser.status == 'awaiting_approval') {
				action = <ApproveDenyBlock {...this.props} />;
				status = 'Awaiting Approval';
			}
			else if (rawUser.status == 'approved') {
				action = <ModifyBlock {...this.props} />;
				status = 'Active';
			}
			else if (rawUser.status == 'Denied') {
				status = 'Denied';
			}

			if (rawUser.status == 'approved' && rawUser.is_active != true) {
				action = <ReactivateBlock {...this.props} />;
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

		});

		return users;
	}

	render() {
		const headers = ['Name', 'Title', 'Agency', 'Email', 'Status', 'Action'];
		return (
			<div>
				<div className="row">
	                <div className="col-md-12 usa-da-admin-message">
	                    <AdminPageMessage />
	                </div>
	            </div>
	                
	            <div className="row">
	                <div className="col-md-12">
	                    <Table data={this.transformData()} headers={headers} extraClasses={['table-bordered']}/>
	                </div>
	            </div>
	        </div>
		);
	}
}