/**
  * ModifyBlock.jsx
  * Created by Kevin Li 5/22/16
  **/

import React from 'react';
import AdminButton from './AdminButton.jsx';

export default class ModifyBlock extends React.Component {
	showModal() {
		this.props.showModal(this.props.user);
	}
	render() {
		return (
			<div className="usa-da-admin-action-block">
				<AdminButton cssClasses="usa-da-button btn-default" name="Modify" onClick={this.showModal.bind(this)} />
			</div>
		);
	}
}