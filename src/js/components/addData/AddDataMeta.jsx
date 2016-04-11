/**
* AddDataMeta.jsx
* Created by Mike Bray 3/21/16
**/

import React, { PropTypes } from 'react';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import ReactTypeahead from 'react-typeahead';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const propTypes = {
    updateMetaData: PropTypes.func
};

export default class AddDataMeta extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: true,
            agency: "",
            startDate: null,
            endDate: null
        };
    }

    handleChange(agency){
        this.setState({ agency: agency }, this.checkComplete);
    }

    handleStartDateChange(date) {
        this.setState({ startDate: date }, this.checkComplete);
    }

    handleEndDateChange(date) {
        this.setState({ endDate: date }, this.checkComplete);
    }

    checkComplete(){
        if (this.state.agency !== "" && this.state.startDate !== null && this.state.endDate !== null){
            this.setState({ buttonDisabled: false });
        } else {
            this.setState({ buttonDisabled: true });
        }
    }

    submitMetadata(){
        this.props.updateMetaData(this.state);
    }

    getAgencies(){
        return [
            "Appalachian Regional Commission",
            "Broadcasting Board of Governors",
            "Bureau of Safety and Environmental Enforcement",
            "Commerce - Economic Development Administration",
            "Commerce - International Trade Administration",
            "Commerce - Minority Business Development Agency",
            "Commerce - National Institute of Standards and Technology",
            "Commerce - National Oceanic and Atmospheric Administration",
            "Commerce - Office of the Secretary",
            "Commission on Civil Rights",
            "Consumer Product Safety Commission",
            "Corporation for National and Community Service",
            "Defense Nuclear Facilities Safety Board",
            "Delta Regional Authority",
            "Denali Commission",
            "Department of Agriculture",
            "Department of Defense (except military departments)",
            "Department of Education",
            "Department of Energy",
            "Department of Health and Human Services",
            "Department of Homeland Security",
            "Department of Housing and Urban Development",
            "Department of Justice",
            "Department of Labor",
            "Department of State",
            "Department of the Interior ",
            "Department of the Treasury",
            "Department of Veterans Affairs",
            "DOT - Department of Transportation",
            "DOT - Federal Aviation Administration",
            "DOT - Federal Highway Administration",
            "DOT - Federal Motor Carrier Safety Administration",
            "DOT - Federal Railroad Administration",
            "DOT - Federal Transit Administration",
            "DOT - Immediate Office of the Secretary of Transportation",
            "DOT - Maritime Administration",
            "DOT - National Highway Traffic Safety Administration",
            "DOT - Pipeline and Hazardous Materials Safety Administration",
            "Election Assistance Commission",
            "Environmental Protection Agency",
            "Export-Import Bank of the U.S.",
            "Federal Communications Commission",
            "Federal Energy Regulatory Commission",
            "Federal Mediation and Conciliation Service",
            "Federal Trade Commission",
            "General Services Administration",
            "Gulf Coast Ecosystem Restoration Council",
            "Institute of Museum Services",
            "Inter-American Foundation",
            "Japan-U.S. Friendship Commission",
            "Millennium Challenge Corporation",
            "National Aeronautics and Space Administration",
            "National Archives and Records Administration",
            "National Credit Union Administration",
            "National Endowment for the Arts",
            "National Endowment for the Humanities",
            "National Labor Relations Board",
            "National Science Foundation",
            "Nuclear Regulatory Commission",
            "Office of Personnel Management",
            "Office of the National Drug Control Policy",
            "Open World Leadership Center",
            "Overseas Private Investment Corporation",
            "Pension Benefit Guaranty Corporation",
            "Railroad Retirement Board",
            "Small Business Administration",
            "Social Security Administration",
            "U.S. Agency for International Development",
            "U.S. Coast Guard",
            "United States Institute of Peace"
        ];
    }

    render() {
        return (
                <div>
                    <div className="container center-block">
                        <div className="row text-center usa-da-add-data-meta">
                            <div className="col-md-offset-2 col-md-8 mt-60">
                                <h6 className="mb-20">Please provide the following information about the report you will be creating.</h6>
                                <div className="meta-holder">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 typeahead-holder">
                                            <ReactTypeahead.Typeahead options={this.getAgencies()} maxVisible={5} placeholder="Enter the name of the reporting agency" onOptionSelected={this.handleChange.bind(this)} />
                                        </div>
                                    </div>
                                
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 mt-20 pos-rel">
                                            <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange.bind(this)} placeholderText="Reporting period start date"/>
                                            <div className="usa-da-startDate-icon"></div>
                                        </div>

                                        <div className="col-sm-12 col-md-6 mt-20 usa-da-endDate">
                                            <DatePicker selected={this.state.endDate} onChange={this.handleEndDateChange.bind(this)} placeholderText="Reporting period end date" />
                                            <div className="usa-da-endDate-icon"></div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12 text-right mt-20">
                                            <SubmitButton onClick={this.submitMetadata.bind(this)} buttonText="Submit" buttonDisabled={this.state.buttonDisabled} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

AddDataMeta.propTypes = propTypes;