/**
  * ModalStatus.jsx
  * Created by Kevin Li 5/24/16
  **/

import React from 'react';

export default class ModalStatus extends React.Component {

	render() {

		const statusValues = ['awaiting_confirmation', 'email_confirmed', 'awaiting_approval', 'approved', 'denied'];
		const statusLabel = ['Awaiting Confirmation', 'Email Confirmed', 'Awaiting Approval', 'Approved', 'Denied'];

		let i = -1;

		const statuses = statusValues.map((value, index) => {
			i++;
			return <option value={value} key={index}>{statusLabel[i]}</option>
		});

		return (
			<select id="statusField" value={this.props.value} onChange={this.props.onChange}>
				{statuses}
			</select>
		);
	}
}