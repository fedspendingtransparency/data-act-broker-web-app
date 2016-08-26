/**
  * GenerateFilesOverlay.jsx
  * Created by Kevin Li 7/26/16
  **/

import React from 'react';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';

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
			<CommonOverlay
				header={header}
				detail={detail}
				showButtons={true}>
				<div className="usa-da-btn-bg">
					<button className={"usa-da-button" + buttonClass} disabled={buttonDisabled} onClick={this.clickedGenerate.bind(this)}>Generate Files</button>
					<button className={"usa-da-button usa-da-validation-overlay-review " + nextClass} disabled={nextDisabled} onClick={this.clickedNext.bind(this)}>Next</button>
				</div>
			</CommonOverlay>
		)
	}
}

GenerateFilesOverlay.defaultProps = defaultProps;