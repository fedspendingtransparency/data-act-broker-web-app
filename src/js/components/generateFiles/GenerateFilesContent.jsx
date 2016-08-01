/**
  * GenerateFilesPage.jsx
  * Created by Kevin Li 7/22/16
  **/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import AgencyListContainer from '../../containers/SharedContainers/AgencyListContainer.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import GenerateFileBox from './components/GenerateFileBox.jsx';
import GenerateFilesOverlay from './GenerateFilesOverlay.jsx';

export default class GenerateFilesContent extends React.Component {

    handleDateChange(file, date, dateType) {
        this.props.handleDateChange(file, date, dateType);
    }

    showError(file, header, description) {
        this.props.showError(file, header, description);
    }

    hideError(file) {
        this.props.hideError(file);
    }


	render() {
		return (
			<div>
				<div className="container center-block with-overlay">
					<div className="row usa-da-submission-instructions">
						<div className="col-md-12">
							<p>Select the durations for the generated D1 and D2 files. By default, this range is set to the submission date range you selected in step one.</p>
						</div>
					</div>
					<div className="usa-da-generate-content">
	                    <GenerateFileBox 
                            label="File D1: Procurement Awards (FPDS data)"
                            datePlaceholder="Sign"
                            startingTab={1}
                            value={this.props.d1}
                            error={this.props.d1.error}
                            download={this.props.d1.download}
                            onDateChange={this.handleDateChange.bind(this, "d1")}
                            showError={this.showError.bind(this, "d1")}
                            hideError={this.hideError.bind(this, "d1")} />

                        <GenerateFileBox 
                            label="File D2: Financial Assistance" 
                            datePlaceholder="Action"
                            startingTab={9}
                            value={this.props.d2}
                            error={this.props.d2.error}
                            download={this.props.d2.download}
                            onDateChange={this.handleDateChange.bind(this, "d2")} 
                            showError={this.showError.bind(this, "d2")}
                            hideError={this.hideError.bind(this, "d2")} />
	                </div>
	            </div>
	            <GenerateFilesOverlay {...this.props} />
	        </div>
		)
	}
}