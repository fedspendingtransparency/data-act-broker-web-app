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
		this.props.generateFiles();
	}

	clickedNext(e) {
		e.preventDefault();
		this.props.nextPage();
	}

	render() {
		let buttonClass = '-disabled';
		let buttonDisabled = true;
		let nextClass = '-disabled';
		let nextDisabled = true;

		let header = 'Gathering data...';
		let detail = '';

		if (this.props.state == "generating") {
			header = "Generating your files...";
		}
		else if (this.props.state == "failed") {
			buttonClass = ' btn-primary';
			buttonDisabled = false;

			header = "An error occurred while generating your files.";
			detail = this.props.errorDetails;

		}
		else if (this.props.state == 'incomplete') {
			header = "There are errors with your date ranges.";
			detail = "Fix these errors before continuing.";
		}
		else if (this.props.state == "ready") {
			buttonClass = ' btn-primary';
			buttonDisabled = false;
			header = "Click Generate Files to generate your D1 and D2 files.";

		}
		else if (this.props.state == "done") {
			nextClass = ' btn-primary';
			nextDisabled = false;
			buttonClass = ' btn-primary';
			buttonDisabled = false;

			header = "Your files have been generated. Click Next to begin cross-file validations.";
		}

		return (
			<div className="center-block usa-da-validation-overlay">
				<div className="container">
					<div className="row">
						<div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-0 usa-da-overlay-content-wrap">
							<div className="row">
								<div className="col-xs-12">
									<h6>{header}</h6>
									<div className="overlay-help-text">
										{detail}
									</div>
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-md-4">
							<div className="usa-da-btn-bg">
								<button className={"usa-button" + buttonClass} disabled={buttonDisabled} onClick={this.clickedGenerate.bind(this)}>Generate Files</button>
								<button className={"usa-button usa-da-validation-overlay-review " + nextClass} disabled={nextDisabled} onClick={this.clickedNext.bind(this)}>Next</button>
							</div>
						</div>
					</div>
				</div>
            </div>
		)
	}
}

GenerateFilesOverlay.defaultProps = defaultProps;