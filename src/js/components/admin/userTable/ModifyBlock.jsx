/**
  * ModifyBlock.jsx
  * Created by Kevin Li 5/22/16
  **/

import React from 'react';
import AdminButton from './AdminButton.jsx';

export default class ModifyBlock extends React.Component {
	render() {
		return (
			<div className="usa-da-admin-action-block">
				<AdminButton cssClasses="usa-da-button btn-primary" name="Modify" />
			</div>
		);
	}
}