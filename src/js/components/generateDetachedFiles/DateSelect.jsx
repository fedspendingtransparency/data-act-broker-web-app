/**
* DateSelect.jsx
* Created by Alisa Burdeyny
*/

import React from 'react';
import PropTypes from 'prop-types';

import GenerateFileBox from '../generateFiles/components/GenerateFileBox';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';
import RadioSection from './RadioSection';

const propTypes = {
    clickedDownload: PropTypes.func,
    generateFile: PropTypes.func,
    handleDateChange: PropTypes.func,
    updateError: PropTypes.func,
    d1: PropTypes.object,
    d2: PropTypes.object,
    updateFileProperty: PropTypes.func,
    clickedElementNumbersCheckbox: PropTypes.func
};

const defaultProps = {
    clickedDownload: null,
    generateFile: null,
    handleDateChange: null,
    updateError: null,
    d1: null,
    d2: null,
    updateFileProperty: null,
    clickedElementNumbersCheckbox: null
};

export default class DateSelect extends React.Component {
    clickedDownload(fileType) {
        this.props.clickedDownload(fileType);
    }

    handleDateChange(file, date, dateType) {
        this.props.handleDateChange(file, date, dateType);
    }

    updateError(file, header = '', description = '') {
        this.props.updateError(file, header, description);
    }

    render() {
        const { d1, d2 } = this.props;
        let d1Text = "Generate D1 File";
        let loadingD1 = null;
        if (d1.status === "generating") {
            d1Text = "Generating";
            loadingD1 = <LoadingBauble />;
        }
        else if (d1.status === "done") {
            d1Text = "Regenerate D1 File";
        }

        let d2Text = "Generate D2 File";
        let loadingD2 = null;
        if (d2.status === "generating") {
            d2Text = "Generating";
            loadingD2 = <LoadingBauble />;
        }
        else if (d2.status === "done") {
            d2Text = "Regenerate D2 File";
        }

        return (
            <div className="usa-da-date-select dashed-border-top">
                <div className="radio-sections-wrapper">
                    <RadioSection
                        onChange={this.props.updateFileProperty}
                        active={this.props.d1.agencyType}
                        label="Generate File D1 from records where my agency is the:"
                        fileType="d1"
                        sectionType="agencyType" />
                    <RadioSection
                        onChange={this.props.updateFileProperty}
                        active={this.props.d1.fileFormat}
                        label="Determine the file format for your File D1 generation:"
                        fileType="d1"
                        sectionType="fileFormat" />
                </div>
                <div className="checkbox-wrapper">
                    <label htmlFor="fpds-element-check">
                        Include FPDS Element Numbers
                    </label>
                    <input
                        type="checkbox"
                        id="fpds-element-check"
                        checked={this.props.d1.elementNumbers}
                        onChange={this.props.clickedElementNumbersCheckbox} />
                </div>
                <GenerateFileBox
                    label="File D1: Procurement Awards (FPDS data)"
                    datePlaceholder="Action"
                    value={d1}
                    error={d1.error}
                    showDownload={this.props.d1.showDownload}
                    onDateChange={this.handleDateChange.bind(this, "d1")}
                    updateError={this.updateError.bind(this, "d1")}
                    clickedDownload={this.clickedDownload.bind(this, "d1")} />
                <div className="right-align-box">
                    <button
                        className="usa-da-button btn-default"
                        disabled={!d1.valid || d1.status === "generating"}
                        onClick={this.props.generateFile.bind(this, "d1")}>
                        {loadingD1}{d1Text}
                    </button>
                </div>
                <div className="radio-sections-wrapper">
                    <RadioSection
                        onChange={this.props.updateFileProperty}
                        active={this.props.d2.agencyType}
                        label="Generate File D2 from records where my agency is the:"
                        fileType="d2"
                        sectionType="agencyType" />
                    <RadioSection
                        onChange={this.props.updateFileProperty}
                        active={this.props.d2.fileFormat}
                        label="Determine the file format for your File D2 generation:"
                        fileType="d2"
                        sectionType="fileFormat" />
                </div>
                <GenerateFileBox
                    label="File D2: Financial Assistance"
                    datePlaceholder="Action"
                    value={d2}
                    error={d2.error}
                    showDownload={d2.showDownload}
                    onDateChange={this.handleDateChange.bind(this, "d2")}
                    updateError={this.updateError.bind(this, "d2")}
                    clickedDownload={this.clickedDownload.bind(this, "d2")} />

                <div className="right-align-box">
                    <button
                        className="usa-da-button btn-default"
                        disabled={!d2.valid || d2.status === "generating"}
                        onClick={this.props.generateFile.bind(this, "d2")}>
                        {loadingD2}{d2Text}
                    </button>
                </div>

                <div className="loading-animation">
                    <LoadingBauble />
                </div>
            </div>
        );
    }
}

DateSelect.propTypes = propTypes;
DateSelect.defaultProps = defaultProps;
