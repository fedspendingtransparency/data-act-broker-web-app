/**
 * ValidateValuesOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';

export default class ValidateDataOverlay extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let buttonDisabled = ' disabled';
		// if (Object.keys(this.props.submission.files).length == this.props.errors.length) {
		// 	buttonDisabled = '';
		// }

		let buttonText = 'Upload Corrected CSV Files';
		if (this.props.submission.state == 'uploading') {
			buttonDisabled = ' disabled';
			buttonText = 'Uploading files...';
		}


		return (
			<div className="usa-da-validation-overlay">
				<div className="row">
					<div className="col-md-6 col-md-offset-2">
						You must fix the Critical Errors found in {this.props.errors.length} of the .CSV files before moving on to the next step. View and download individual reports above.
					</div>
					<div className="col-md-4 center-block">
						<button className={"btn btn-primary" + buttonDisabled} onClick={this.props.uploadFiles}>{buttonText}</button>
					</div>
				</div>
            </div>
		);
	}
}
