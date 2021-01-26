/**
  * GenerateFilesPage.jsx
  * Created by Kevin Li 7/22/16
  */

import React from 'react';
import PropTypes from 'prop-types';

import GenerateFileBox from './components/GenerateFileBox';
import GenerateFilesOverlay from './GenerateFilesOverlay';
import RadioSection from '../generateDetachedFiles/RadioSection';

const propTypes = {
    clickedDownload: PropTypes.func,
    handleDateChange: PropTypes.func,
    updateError: PropTypes.func,
    d1: PropTypes.object,
    d2: PropTypes.object,
    updateFileProperty: PropTypes.func,
    submissionID: PropTypes.string,
    publishStatus: PropTypes.string
};

const defaultProps = {
    clickedDownload: null,
    handleDateChange: null,
    updateError: null,
    d1: null,
    d2: null,
    updateFileProperty: null,
    publishStatus: ''
};

export default class GenerateFilesContent extends React.Component {
    constructor(props) {
        super(props);

        this.updateD1Error = this.updateD1Error.bind(this);
        this.updateD2Error = this.updateD2Error.bind(this);
    }
    clickedDownload(fileType) {
        this.props.clickedDownload(fileType);
    }

    handleDateChange(file, date, dateType) {
        this.props.handleDateChange(file, date, dateType);
    }

    updateD1Error(header = '', description = '') {
        this.props.updateError('d1', header, description);
    }

    updateD2Error(header = '', description = '') {
        this.props.updateError('d2', header, description);
    }

    render() {
        const { d1, d2 } = this.props;
        const blockedStatuses = ['reverting', 'publishing'];

        return (
            <div className="generate-files-page">
                <div className="container center-block with-overlay">
                    <div className="row usa-da-submission-instructions">
                        <div className="col-md-12">
                            <p>
                                Select the durations for the generated D1 and D2 files. By default, this range is set to
                                the submission date range you selected in step one.
                            </p>
                        </div>
                    </div>

                    <div className="usa-da-generate-content">
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
                        <GenerateFileBox
                            label="File D1: Procurement Awards (FPDS data)"
                            datePlaceholder="Action"
                            startingTab={1}
                            value={d1}
                            error={d1.error}
                            showDownload={d1.showDownload && blockedStatuses.indexOf(this.props.publishStatus) === -1}
                            onDateChange={this.handleDateChange.bind(this, "d1")}
                            updateError={this.updateD1Error}
                            clickedDownload={this.clickedDownload.bind(this, "D1")} />
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
                            startingTab={9}
                            value={d2}
                            error={d2.error}
                            showDownload={d2.showDownload && blockedStatuses.indexOf(this.props.publishStatus) === -1}
                            onDateChange={this.handleDateChange.bind(this, "d2")}
                            updateError={this.updateD2Error}
                            clickedDownload={this.clickedDownload.bind(this, "D2")} />
                    </div>
                </div>
                <GenerateFilesOverlay {...this.props} />
            </div>
        );
    }
}

GenerateFilesContent.propTypes = propTypes;
GenerateFilesContent.defaultProps = defaultProps;
