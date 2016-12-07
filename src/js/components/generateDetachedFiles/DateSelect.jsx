/**
* DateSelect.jsx
* Created by Alisa Burdeyny
**/

import React from 'react';
import GenerateFileBox from '../generateFiles/components/GenerateFileBox.jsx';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble.jsx';

export default class DateSelect extends React.Component {
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
        let d1Text = "Generate D1 File";
        let loadingD1 = null;
        if(this.props.d1.status == "generating") {
            d1Text = "Generating";
            loadingD1 = <LoadingBauble />
        }
        else if(this.props.d1.status == "done") {
            d1Text = "Regenerate D1 File";
        }

        let d2Text = "Generate D2 File";
        let loadingD2 = null;
        if(this.props.d2.status == "generating") {
            d2Text = "Generating";
            loadingD2 = <LoadingBauble />
        }
        else if(this.props.d2.status == "done") {
            d1Text = "Regenerate D2 File";
        }
        return (
            <div className="usa-da-date-select dashed-border-top">
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

                <div className="right-align-box">
                    <button className="usa-da-button btn-default" disabled={!this.props.d1.valid || this.props.d1.status == "generating"} onClick={this.props.generateFile.bind(this, "d1")}>{loadingD1}{d1Text}</button>
                </div>

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

                <div className="right-align-box">
                    <button className="usa-da-button btn-default" disabled={!this.props.d2.valid || this.props.d2.status == "generating"} onClick={this.props.generateFile.bind(this, "d2")}>{loadingD2}{d2Text}</button>
                </div>

                <div className="loading-animation">
                    <LoadingBauble />
                </div>
            </div>
        );
    }
}