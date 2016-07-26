/**
  * GenerateFilesOverlay.jsx
  * Created by Kevin Li 7/26/16
  **/

import React from 'react';

export default class GenerateFilesOverlay extends React.Component {
	render() {
		return (
			<div className="center-block usa-da-validation-overlay">
				<div className="container">
					<div className="row">
						<div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-0 usa-da-overlay-content-wrap">
							<div className="row">
								<div className="col-xs-12 col-md-11 col-md-offset-0">
									<h6>Click Next to generate the D1 and D2 files and begin cross-file validations.</h6>
									<div className="overlay-help-text">
										
									</div>
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-md-4">
							<div className={'usa-da-btn-bg'}>
								
							</div>
						</div>
					</div>
				</div>
            </div>
		)
	}
}