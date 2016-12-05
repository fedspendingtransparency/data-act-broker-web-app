/**
* GenerateDetachedFilesPage.jsx
* Created by Alisa Burdeyny
**/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React from 'react'
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
            startDate: null,
            endDate: null,
            dateType: null,
            startDateError: false,
            endDateError: false,
            agencyError: false,
            showDateSelect: false,
            showDateRangeField: false,
            showSubmitButton: false,
            buttonDisabled: true,
            message: this.successMessage
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
            dateSelect = <DateSelect />;
        }
        
        return (
            <div className="usa-da-generate-detached-files-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide" />
                        <div className="usa-da-content-dark">
                            <div className="container">
                                <div className="row usa-da-page-title">
                                    <div className="col-md-12 mt-40 mb-20">
                                        <div className="display-2">Generate and Download Files D1 & D2</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container center-block">
                            <div className="row text-center usa-da-select-agency">
                                <div className="col-md-offset-2 col-md-8 mt-60 mb-60">
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