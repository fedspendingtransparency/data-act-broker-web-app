/**
* GenerateDetachedFilesPage.jsx
* Created by Alisa Burdeyny
**/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React from 'react';
import moment from 'moment';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import AgencyListContainer from '../../containers/SharedContainers/AgencyListContainer.jsx';
import DateSelect from './DateSelect.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class GenerateDetachedFilesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agency: "",
            agencyError: false,
            showDateSelect: false,
            showSubmitButton: false,
            buttonDisabled: true,
            d1: {
				startDate: null,
				endDate: null,
				error: {
					show: false,
					header: '',
					description: ''
				},
				download: {
					show: false,
					url: ''
				},
                valid: false,
                status: ""
			},
			d2: {
				startDate: null,
				endDate: null,
				error: {
					show: false,
					header: '',
					description: ''
				},
				download: {
					show: false,
					url: ''
				},
                valid: false,
                status: ""
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
                agencyError: true
            }, this.checkComplete);
        }
    }

    checkComplete() {

        if (this.state.agency !== "") {
            this.setState({
                showDateSelect: true
            });
        }
        else {
            this.setState({
                showDateSelect: false
            });
        }
    }

    handleDateChange(file, date, dateType) {
    	// merge the new date into the file's state without affecting the other keys
    	const newState = Object.assign(this.state[file], {
    		[dateType]: moment(date)
    	});

    	this.setState({
    		[file]: newState
    	}, () => {
    		this.validateDates(file);
    	});
	}

    validateDates(file) {
        // validate that dates are provided for both fields and the end dates don't come before the start dates
		let state = "incomplete";

    	const dFile = Object.assign({}, this.state[file]);

        // validate the date ranges
        const start = this.state[file].startDate;
        const end = this.state[file].endDate;
        if (start && end) {
            // both sets of dates exist
            if (!end.isSameOrAfter(start)) {
                // end date comes before start date, invalid
                // show an error message
                dFile.error = {
                    show: true,
                    header: 'Invalid Dates',
                    description: 'The end date cannot be earlier than the start date.'
                };
                dFile.valid = false;
            }
            else {
                // valid!
                dFile.error = {
                    show: false,
                    header: '',
                    description: ''
                };
                dFile.valid = true;
            }
        }
        else {
            // not all dates exist yet
            dFile.error = {
                show: false,
                header: '',
                description: ''
            };
            dFile.valid = false;
        }

        this.setState({[file]:dFile});
    }

    showError(file, header, description) {
		const state = Object.assign({}, this.state[file], {
			error: {
				show: true,
				header: header,
				description: description
			}
		});
		
		this.setState({
			[file]: state
		});
	}

    hideError(file) {
		const state = Object.assign({}, this.state[file], {
			error: {
				show: false,
				header: '',
				description: ''
			}
		});

		this.setState({
			[file]: state
		});
	}

    generateFile(file) {
        const tmpFile = Object.assign({}, this.state[file]);
        tmpFile.status = "generating";
        this.setState({[file]: tmpFile});
        console.log(file);
    }

    render() {
        let agencyIcon = <Icons.Building />;
        let agencyClass = '';
        if (this.state.agencyError) {
            agencyIcon = <Icons.Building />;
            agencyClass = ' error usa-da-form-icon';
        }

        let dateSelect = null;
        if (this.state.showDateSelect) {
            dateSelect = <DateSelect {...this.state} 
                            handleDateChange={this.handleDateChange.bind(this)} 
                            showError={this.showError.bind(this)} hideError={this.hideError.bind(this)} 
                            generateFile={this.generateFile.bind(this)} />;
        }
        
        return (
            <div className="usa-da-generate-detached-files-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide" />
                        <div className="usa-da-content-dark">
                            <div className="container">
                                <div className="row usa-da-page-title">
                                    <div className="col-lg-12 mt-40 mb-20">
                                        <div className="display-2">Generate and Download Files D1 & D2</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container center-block">
                            <div className="row text-center usa-da-select-agency">
                                <div className="col-lg-offset-2 col-lg-8 mt-60 mb-60">
                                    <h5>Please begin by telling us about files you would like to generate</h5>
                                    <div className="select-agency-holder">
                                        <div className="row usa-da-select-agency-label">
                                            The generated files will be used when submiting data for...
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 typeahead-holder" data-testid="agencytypeahead">
                                                <AgencyListContainer placeholder="Enter the name of the reporting agency" onSelect={this.handleChange.bind(this)} customClass={agencyClass} />
                                                <div className={"usa-da-icon usa-da-form-icon" + agencyClass}>
                                                    {agencyIcon}
                                                </div>
                                            </div>
                                        </div>

                                        <ReactCSSTransitionGroup transitionName="usa-da-meta-fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                            {dateSelect}
                                        </ReactCSSTransitionGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}