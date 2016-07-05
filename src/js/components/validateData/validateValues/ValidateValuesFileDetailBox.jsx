/**
  * ValidateValuesFileDetailBox.jsx
  * Created by Kevin Li 6/27/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const defaultProps = {
	styleClass: '',
	label: '',
	count: 0,
	expandedReport: false,
	onClick: null
}

export default class ValidateValuesFileDetailBox extends React.Component {
	render() {

		// handle CSS class for determining if the error/warning count should be color text or black
		let labelClass = 'usa-da-validate-item-message-count';
		if (this.props.count == 0) {
			labelClass += ' none';
		}

		// handle CSS for displaying the error/warning report button only when there are errors/warnings
		let showButton = ' hide';
		if (this.props.count > 0) {
			showButton = '';
		}

		// handle CSS class for expanding/collapsing the error/warning report
		let footerStatus = '';
		if (this.props.expandedReport) {
			footerStatus = ' active';
		}

		// toggle report button icon for open/close state
		let buttonIcon = <Icons.AngleDown />;
		if (this.props.expandedReport) {
			buttonIcon = <Icons.AngleUp />;
		}

		return (
			<div className={"col-md-6 " + this.props.styleClass}>
		        <div className="row usa-da-validate-item-body">
		            <div className='usa-da-validate-txt-wrap'>
		                <span className="usa-da-validate-item-message-label">{this.props.label}:&nbsp;</span>
		                <span className={labelClass}>{this.props.count}</span>
		            </div>
		        </div>
		        <div className="row usa-da-validate-item-footer-wrapper">
		            <div className={"usa-da-validate-item-footer usa-da-header-error" + showButton + footerStatus} onClick={this.props.onClick}>
		                <div>View &amp; Download {this.props.label} Report <span className={"usa-da-icon"}>{buttonIcon}</span></div>
		            </div>
		        </div>
		    </div>
		)
	}
}