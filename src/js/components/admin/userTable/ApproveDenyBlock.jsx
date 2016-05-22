/**
  * ApproveDenyBlock.jsx
  * Created by Kevin Li 5/22/16
  **/

import React from 'react';
import AdminButton from './AdminButton.jsx';

export default class ApproveDenyBlock extends React.Component {
	render() {
		return (
			<div className="usa-da-admin-action-block">
				<AdminButton cssClasses="usa-da-button btn-primary two-count" name="Approve" />
				<AdminButton cssClasses="usa-da-button btn-danger two-count" name="Deny" />
			</div>
		);
	}
}