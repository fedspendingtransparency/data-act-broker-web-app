/**
 * ValidateDataInProgressOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class ValidateDataInProgressOverlay extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {

		return (
			<div className="center-block usa-da-validation-overlay">
				<div className="container">
					<div className="row">
						<div className="col-md-12 usa-da-overlay-content-wrap">
							<div className="overlay-loading">
								<h6>Your files are being validated.</h6>
								<div className="overlay-help-text">
									You can return to this page at any time to check the validation status by using this link:<br />
									<a href={window.location.href}>{window.location.href}</a>
								</div>
							</div>
						</div>
					</div>
            	</div>
            </div>
		);
	}
}
