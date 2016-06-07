/**
  * UserTable.jsx
  * Created by Kevin Li 5/22/16
  **/

import React from 'react';
import _ from 'lodash';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import FormattedTable from '../../SharedComponents/table/FormattedTable.jsx';
import AdminPageMessage from './AdminPageMessage.jsx';
import ApproveDenyBlock from './ApproveDenyBlock.jsx';
import ModifyBlock from './ModifyBlock.jsx';
import ReactivateBlock from './ReactivateBlock.jsx';

import UserModal from './UserModal.jsx';

import { UserStatus } from '../../../helpers/adminHelper.js';

export default class UserTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalActive: false,
			activeUser: {},
			rowClasses: [],
			headerClasses: [],
			tableData: [],
			sortColumn: 4,
			sortDirection: 'asc'
		};
	}

	componentDidMount() {
		this.generateTable();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.admin.users != prevProps.admin.users) {
			this.generateTable();
		}
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

	generateTable() {
		const headerClasses = ['row-20', 'row-15', 'row-15', 'row-15', 'row-15', 'row-20'];
		const rowTemplate = ['row-20', 'row-15', 'row-15', 'row-15 email-cell', 'row-15', 'row-20'];
		const rowClasses = [];

		const users = [];

		let i = 0;

		const sortKeys = ['name', 'title', 'agency', 'email', 'statusType'];

		// using two sort keys to prevent items that share the same primary key from randomly reshuffling
		const primaryKey = sortKeys[this.state.sortColumn];
		let secondKey = 'name';

		// by default the second sort key is name, but use status when that name is the primary sort key
		if (primaryKey == 'name') {
			secondKey = 'statusType';
		}

		const sortedList = _.orderBy(this.props.admin.users, [primaryKey, secondKey], [this.state.sortDirection, this.state.sortDirection]);

		sortedList.forEach((rawUser) => {
			let action = '';

			if (rawUser.statusType == UserStatus.AWAITING_APPROVAL) {
				action = <ApproveDenyBlock onChange={this.props.modifyUser} user={rawUser} />;
			}
			else if (rawUser.statusType == UserStatus.ACTIVE) {
				action = <ModifyBlock showModal={this.showModal.bind(this)} onChange={this.props.modifyUser} user={rawUser} />;
			}
			else if (rawUser.statusType == UserStatus.INACTIVE) {
				action = <ReactivateBlock onChange={this.props.modifyUser} user={rawUser} />;
			}

			const user = [
				rawUser.name,
				rawUser.title,
				rawUser.agency_name,
				rawUser.email,
				rawUser.statusString,
				action
			];

			users.push(user);
			rowClasses.push(rowTemplate);

			i++;
		});

		this.setState({
			headerClasses: headerClasses,
			rowClasses: rowClasses,
			tableData: users
		});

	}

	sortTable(direction, column) {
		this.setState({
			sortColumn: column,
			sortDirection: direction
		}, () => {
			this.generateTable();
		});
	}

	render() {
		const headers = ['Name', 'Title', 'Agency', 'Email', 'Status', 'Action'];

		let message = null;
		if (!this.props.message.hidden) {
			message = <AdminPageMessage data={this.props.message} />;
		}

		return (
			<div>
				<CSSTransitionGroup transitionName="usa-da-admin-message-fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {message}
		        </CSSTransitionGroup>
	            
	            <UserModal modalActive={this.state.modalActive} closeModal={this.closeModal.bind(this)} user={this.state.activeUser} onChange={this.props.modifyUser} />

	            <div className="row">
	                <div className="col-md-12">
	                    <FormattedTable data={this.state.tableData} headers={headers} sortable={true} onSort={this.sortTable.bind(this)} unsortable={[5]} headerClasses={this.state.headerClasses} cellClasses={this.state.rowClasses} extraClasses={['table-bordered']}/>
	                </div>
	            </div>
	        </div>
		);
	}
}
