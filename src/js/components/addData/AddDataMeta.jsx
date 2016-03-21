/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React, { PropTypes } from 'react';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
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

    handleChange(e){
        this.setState({ agency: e.target.value }, this.checkComplete);
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

    render() {
        return (
            <div>
                <div className="container center-block">
                    <div className="row text-center usa-da-add-data-meta">
                        <div className="col-md-offset-2 col-md-8 mt-40">
                            <h4>Please provide the following information about report you will be creating.</h4>
                            <div className="row meta-holder mt-25">
                                <div className="col-sm-12 col-md-12 mb-25">
                                    <input id="agency" name="agency" placeholder="Name of reporting agency" type="text" onChange={this.handleChange.bind(this)} />
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange.bind(this)} />
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <DatePicker selected={this.state.endDate} onChange={this.handleEndDateChange.bind(this)} />
                                </div>
                                <div className="col-sm-12 text-right mt-25">
                                    <SubmitButton onClick={this.submitMetadata.bind(this)} buttonText="Submit" buttonDisabled={this.state.buttonDisabled} />
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