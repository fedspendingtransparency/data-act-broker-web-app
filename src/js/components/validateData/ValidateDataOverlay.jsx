/**
 * ValidateDataOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class ValidateDataOverlay extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let buttonDisabled = '-disabled';
		if (Object.keys(this.props.submission.files).length == this.props.errors.length) {
			buttonDisabled = '';
		}

		let buttonText = 'Upload Corrected CSV Files';
		if (this.props.submission.state == 'uploading') {
			buttonDisabled = '-disabled';
			buttonText = 'Uploading files...';
		}


		return (
			<div className="center-block usa-da-validation-overlay">
				<div className="container">
					<div className="row">
						<div className="col-md-9 usa-da-overlay-content-wrap">
							<div className="row">
								<div className="col-xs-2 col-sm-1 col-md-1 usa-da-icon">
									<Icons.ExclamationCircle />
								</div>
								<div className="col-xs-10 col-sm-11 col-md-10">
									<h6>You must fix the Critical Errors found in {this.props.errors.length} of the .CSV files before moving on to the next step. View and download individual reports above.</h6>
								</div>
							</div>
						</div>
						<div className="col-md-3">
							<div className='usa-da-btn-bg'>
								<button className={"usa-button" + buttonDisabled} disabled={false} onClick={this.props.uploadFiles}>{buttonText}</button>
							</div>
						</div>
					</div>
            	</div>
            </div>
		);
	}
}
