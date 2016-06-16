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
								<h6>Validation in progress...</h6>
							</div>
						</div>
					</div>
            	</div>
            </div>
		);
	}
}
