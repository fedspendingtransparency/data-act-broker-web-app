/**
  * GenerateFileBox.jsx
  * Created by Kevin Li 7/25/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import DatePicker from './DatePicker.jsx';

const defaultProps = {
	startingTab: 1,
	download: {
		show: false,
		url: ''
	}
};

export default class GenerateFileBox extends React.Component {
	constructor(props) {
		super(props);
	}

	downloadFile(e) {
		e.preventDefault();
		const url = this.props.download.url;
		window.open(url, '_blank');
	}

	render() {
		let errorClass = ' hide';
		if (this.props.error.show) {
			errorClass = '';
		}

		let showDownload = ' hide';
		if (this.props.download.show) {
			showDownload = '';
		}

		return (
			<div>
				<div className="usa-da-generate-item-wrap">
					<div className="usa-da-generate-item">
		                <div className="file-full-name">
		                	{this.props.label}
		                </div>
		                <div className="date-range-wrapper">
		                	<DatePicker type="startDate" title={this.props.datePlaceholder + " Start Date"} tabIndex={this.props.startingTab} onDateChange={this.props.onDateChange} value={this.props.value.startDate} opposite={this.props.value.endDate}  showError={this.props.showError} hideError={this.props.hideError} />
		                	<div className="through-text">
		                		through
		                	</div>
		                	<DatePicker type="endDate" title={this.props.datePlaceholder + " End Date"} tabIndex={this.props.startingTab + 4} onDateChange={this.props.onDateChange} value={this.props.value.endDate} opposite={this.props.value.startDate} showError={this.props.showError} hideError={this.props.hideError} />
		                </div>
		            </div>
		            <div className={"usa-da-generate-download" + showDownload}>
		            	<div className="row">
		            		<div className="col-sm-4 col-sm-offset-8">
				            	<div className="download-title text-right">
									Download {this.props.label}
								</div>
								<a href="#" className="usa-da-download pull-right" onClick={this.downloadFile.bind(this)}>
	            	                <span className="usa-da-icon usa-da-download-report"><Icons.CloudDownload /></span>Download File
	            	            </a>
							</div>
						</div>
		            </div>
		        </div>

                <div className={"alert alert-error text-left" + errorClass} role="alert">
	                <span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
					<div className="alert-header-text">{this.props.error.header}</div>
					<p>{this.props.error.description}</p>
				</div>
            </div>
		)
	}
}

GenerateFileBox.defaultProps = defaultProps;