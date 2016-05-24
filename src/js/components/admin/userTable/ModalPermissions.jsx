/**
  * ModalPermissions.jsx
  * Created by Kevin Li 5/24/16
  **/

import React from 'react';
import _ from 'lodash';
import ModalPermissionItem from './ModalPermissionItem.jsx';

export default class ModalPermissions extends React.Component {


	render() {

		const permissionValues = ['agency_user', 'website_admin', 'agency_admin'];
		const permissionLabels = ['Agency User', 'Website Admin', 'Agency Admin'];

		let i = -1;
		const permissions = permissionValues.map((value, index) => {
			i++;
			let checked = this.props.value[value];
			
			return <ModalPermissionItem value={value} key={index} label={permissionLabels[i]} checked={checked} onChange={this.props.onChange} />
		});

		return (
			<ul className="usa-da-modal-permissions">
				{permissions}
			</ul>
		);
	}
}