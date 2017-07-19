/**
  * GenerateFilesOverlay.jsx
  * Created by Kevin Li 7/26/16
  **/

import React from 'react';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble.jsx';
import * as ReviewHelper from '../../helpers/reviewHelper.js';
import * as PermissionHelper from '../../helpers/permissionsHelper.js';

const defaultProps = {
	state: 'incomplete'
};

export default class GenerateFilesOverlay extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			agency_name: ''
		}
	}

	componentDidMount(){
		if (this.props.submissionID !== null) {
			ReviewHelper.fetchStatus(this.props.submissionID)
				.then((data) => {
					data.ready = true;
					this.setState({'agency_name':data.agency_name})
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

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

		let icon = <LoadingBauble />;
		let iconClass = 'overlay-animation';
		let showIcon = true;

		if (this.props.state == "generating") {
			header = "Creating your D1 and D2 files from ASP and FPDS. This may take a few minutes.";
		}
		else if (this.props.state == "failed") {
			buttonClass = ' btn-primary';
			buttonDisabled = false;

			header = "An error occurred while generating your files.";
			detail = this.props.errorDetails;

			icon = <Icons.ExclamationCircle />;
			iconClass = 'usa-da-errorRed';

		}
		else if (this.props.state == 'incomplete') {
			header = "There are errors with your date ranges.";
			detail = "Fix these errors before continuing.";

			icon = <Icons.ExclamationCircle />;
			iconClass = 'usa-da-errorRed';
		}
		else if (this.props.state == "ready") {
			buttonClass = ' btn-primary';
			buttonDisabled = false;
			header = "Click Generate Files to generate your D1 and D2 files.";

			showIcon = false;

		}
		else if (this.props.state == "done") {
			nextClass = ' btn-primary';
			nextDisabled = false;
			buttonClass = ' btn-primary';
			buttonDisabled = false;

			icon = <Icons.CheckCircle />;
			iconClass = 'usa-da-successGreen';

			header = "Your files have been generated. Click Next to begin cross-file validations.";
		}

		if (!buttonDisabled) {
			buttonDisabled = !PermissionHelper.checkAgencyPermissions(this.props.session, this.state.agency_name);
		}

		return (
			<CommonOverlay
				header={header}
				detail={detail}
				showIcon={showIcon}
				icon={icon}
				iconClass={iconClass}
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