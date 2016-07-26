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

	constructor(props) {
		super(props);

		this.state = {
			d1: {
				startDate: null,
				endDate: null
			},
			d2: {
				startDate: null,
				endDate: null
			}
		};
	}

	handleChange(agency, isValid){
        if (agency != '' && isValid) {
            this.setState({ 
                agency: agency,
                agencyError: false
             }, this.checkComplete);
        }
        else {
            this.setState({
                agency: '',
                agencyError: true,
                showDateRangeField: false
            }, this.checkComplete);
        }
    }

    handleDateChange(file, date, dateType) {

    	// merge the new date into the file's state without affecting the other keys
    	const newState = Object.assign(this.state[file], {
    		[dateType]: moment(date)
    	});

    	this.setState({
    		[file]: newState
    	});
    }

    checkComplete() {

        if (this.state.agency !== "") {
            this.setState({
                showDateRangeField: true
            });
        }

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
	                    <GenerateFileBox onDateChange={this.handleDateChange.bind(this, "d1")} value={this.state.d1} label="File D1: Procurement Awards (FPDS data)" datePlaceholder="Sign" />
	                    <GenerateFileBox onDateChange={this.handleDateChange.bind(this, "d2")} value={this.state.d2} label="File D2: Financial Assistance" datePlaceholder="Action" />
	                </div>
	            </div>
	            <GenerateFilesOverlay {...this.props} />
	        </div>
		)
	}
}