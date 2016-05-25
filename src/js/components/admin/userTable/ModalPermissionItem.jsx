/**
  * ModalPermissions.jsx
  * Created by Kevin Li 5/24/16
  **/

import React from 'react';

export default class ModalPermissionItem extends React.Component {


	render() {

		return (
			<li>
				<label>
					<input type="checkbox" value={this.props.value} checked={this.props.checked} onChange={this.props.onChange} />
					<span>{this.props.label}</span>
				</label>
			</li>
		);
	}
}