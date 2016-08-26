/**
 * ValidateDataOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';

export default class ValidateDataOverlay extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

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
		}
		else if (this.props.submission.state == 'prepare') {
			buttonClass = '-disabled';
			buttonDisabled = true;
			buttonText = 'Gathering data...';
		}

		return (
			<CommonOverlay
				header={"You must fix the Critical Errors found in " + this.props.errors.length + " of the .CSV files before moving on to the next step. View and download individual reports above."}
				showButtons={true}
				icon={<Icons.ExclamationCircle />}
				iconClass="usa-da-errorRed"
				showIcon={true}>
				<div className='usa-da-btn-bg'>
					<button className={"usa-da-button" + buttonClass} disabled={buttonDisabled} onClick={this.props.uploadFiles} data-testid="validate-overlay-upload-button">{buttonText}</button>
				</div>
			</CommonOverlay>
		);
	}
}
