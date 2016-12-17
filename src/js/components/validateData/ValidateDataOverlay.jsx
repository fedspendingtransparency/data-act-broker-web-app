/**
 * ValidateDataOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble.jsx';

export default class ValidateDataOverlay extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let header = "You must fix the Critical Errors found in " + this.props.errors.length + " of the .CSV files before moving on to the next step. View and download individual reports above.";
		let icon = <Icons.ExclamationCircle />;
		let iconClass = 'usa-da-errorRed';

		let buttonDisabled = true;
		let buttonClass = '-disabled';
		if (Object.keys(this.props.submission.files).length == this.props.errors.length) {
			buttonClass = ' btn-primary';
			buttonDisabled = false;
		}

		let buttonText = 'Upload Corrected CSV Files';
		if (this.props.submission.state == 'uploading') {
			buttonClass = '-disabled';
			buttonDisabled = true;
			buttonText = 'Uploading files...';
			iconClass = 'overlay-animation';
			icon = <LoadingBauble />;
		}
		else if (this.props.submission.state == 'prepare') {
			buttonClass = '-disabled';
			buttonDisabled = true;
			buttonText = 'Gathering data...';
			iconClass = 'overlay-animation';
			icon = <LoadingBauble />;
		}

		if (this.props.notAllowed) {
			header = "You are not authorized to perform the requested task. Please contact your administrator.";
			icon = <Icons.ExclamationCircle />;
			iconClass = 'usa-da-errorRed';
		}

		return (
			<CommonOverlay
				header={header}
				showButtons={true}
				icon={icon}
				iconClass={iconClass}
				showIcon={true}>
				<div className='usa-da-btn-bg'>
					<button className={"usa-da-button" + buttonClass} disabled={buttonDisabled} onClick={this.props.uploadFiles} data-testid="validate-overlay-upload-button">{buttonText}</button>
				</div>
			</CommonOverlay>
		);
	}
}
