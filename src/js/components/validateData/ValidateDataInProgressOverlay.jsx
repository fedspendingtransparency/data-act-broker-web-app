/**
 * ValidateDataInProgressOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';

const defaultProps = {
	hasFailed: false
};

class OverlayDetail extends React.Component {
	render() {
		<div>
			{this.props.description}
			<br />
			<a href={window.location.href}>{window.location.href}</a>
		</div>
	}
}

export default class ValidateDataInProgressOverlay extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {

		let title = 'Your files are being validated.';
		let description = 'You can return to this page at any time to check the validation status by using this link: ';

		if (this.props.hasFailed) {
			title = 'An error has occurred while validating your files.';
			description = 'Contact an administrator for assistance. Provide this URL when describing the issue: ';
		}

		const detail = <div>{description}<br /><a href={window.location.href}>{window.location.href}</a></div>;


		return (
			<CommonOverlay
				header={title}
				detail={detail} />
		);
	}
}

ValidateDataInProgressOverlay.defaultProps = defaultProps;
