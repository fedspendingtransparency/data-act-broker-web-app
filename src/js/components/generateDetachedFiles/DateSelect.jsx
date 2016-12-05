/**
* DateSelect.jsx
* Created by Alisa Burdeyny
**/

import React from 'react';
import GenerateFileBox from '../generateFiles/components/GenerateFileBox.jsx';
import moment from 'moment';

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
        );
    }
}