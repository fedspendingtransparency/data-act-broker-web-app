/**
  * ReactivateBlock.jsx
  * Created by Kevin Li 5/22/16
  **/

import React from 'react';
import AdminButton from './AdminButton.jsx';

export default class ReactivateBlock extends React.Component {
	reactivate() {
		this.props.onChange(this.props.user, {
			is_active: true
		});
	}

	render() {
		return (
			<div className="usa-da-admin-action-block">
				<AdminButton cssClasses="usa-da-button btn-default-gray" name="Set Active" onClick={this.reactivate.bind(this)} />
			</div>
		);
	}
}