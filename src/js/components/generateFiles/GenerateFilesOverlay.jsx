/**
  * GenerateFilesOverlay.jsx
  * Created by Kevin Li 7/26/16
  **/

import React from 'react';

const defaultProps = {
	state: 'incomplete'
};

export default class GenerateFilesOverlay extends React.Component {

	clickedGenerate(e) {
		e.preventDefault();
		console.log("GENERATE");
	}

	render() {
		let buttonClass = '-disabled';
		let buttonDisabled = true;
		let buttonText = "Gathering data...";

		if (this.props.state == "generating") {
			buttonText = "Generating...";
		}

		else if (this.props.state == "incomplete") {
			buttonText = "Generate Files";
		}
		else if (this.props.state == "ready") {
			buttonClass = ' btn-primary';
			buttonDisabled = false;
			buttonText = "Generate Files";
		}

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
							<div className="usa-da-btn-bg">
								<button className={"usa-button" + buttonClass} disabled={buttonDisabled} onClick={this.clickedGenerate.bind(this)}>{buttonText}</button>
							</div>
						</div>
					</div>
				</div>
            </div>
		)
	}
}

GenerateFilesOverlay.defaultProps = defaultProps;