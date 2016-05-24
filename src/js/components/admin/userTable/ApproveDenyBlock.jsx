/**
  * ApproveDenyBlock.jsx
  * Created by Kevin Li 5/22/16
  **/

import React from 'react';
import AdminButton from './AdminButton.jsx';

export default class ApproveDenyBlock extends React.Component {

	changeStatus(value) {
		this.props.onChange(this.props.user, {
			status: value
		});
	}

	render() {
		return (
			<div className="usa-da-admin-action-block">
				<AdminButton cssClasses="usa-da-button btn-primary two-count" name="Approve" value="approved" onClick={this.changeStatus.bind(this)} />
				<AdminButton cssClasses="usa-da-button btn-danger two-count" name="Deny" value="denied" onClick={this.changeStatus.bind(this)} />
			</div>
		);
	}
}