/**
 * ValidateDataOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';

export default class ValidateDataOverlay extends React.Component {
	render() {

		let disabled = '';
		if (this.props.disabled) {
			disabled = ' disabled';
		}

		return (
			<div className="usa-da-validation-overlay">
				<div className="row">
					<div className="col-md-6 col-md-offset-2">
						{this.props.message}
					</div>
					<div className="col-md-4 center-block">
						<button className={"btn btn-primary" + disabled}>Upload Corrected CSV Files</button>
					</div>
				</div>
            </div>
		);
	}
}
