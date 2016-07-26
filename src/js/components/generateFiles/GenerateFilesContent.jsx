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

export default class GenerateFilesContent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			agency: '',
			startDate: null,
			endDate: null,
			agencyError: false,
			showDateRangeField: true
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

    handleDateChange(startDate, endDate) {

    	this.setState({
    		startDate: startDate,
    		endDate: endDate
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
			<div className="container center-block">
				<div className="row usa-da-submission-instructions">
						<div className="col-md-12">
							<p>Select the durations for the generated D1 and D2 files. By default, this range is set to the submission date range you selected in step one.</p>
						</div>
					</div>
				<div className="usa-da-generate-content">
                    <GenerateFileBox />
                </div>
            </div>
		)
	}
}