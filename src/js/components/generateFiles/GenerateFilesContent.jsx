/**
  * GenerateFilesPage.jsx
  * Created by Kevin Li 7/22/16
  */

import React, { PropTypes } from 'react';

import GenerateFileBox from './components/GenerateFileBox';
import GenerateFilesOverlay from './GenerateFilesOverlay';
import AgencyToggle from '../generateDetachedFiles/AgencyToggle';

const propTypes = {
    clickedDownload: PropTypes.func,
    handleDateChange: PropTypes.func,
    updateError: PropTypes.func,
    d1: PropTypes.object,
    d2: PropTypes.object,
    toggleAgencyType: PropTypes.func
};

const defaultProps = {
    clickedDownload: null,
    handleDateChange: null,
    updateError: null,
    d1: null,
    d2: null,
    toggleAgencyType: null
};

export default class GenerateFilesContent extends React.Component {
    toggleAgencyType(type) {
        this.props.toggleAgencyType(type);
    }

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

        return (
            <div>
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
                        <AgencyToggle
                            funding={d1.isFundingAgency}
                            toggleAgencyType={this.toggleAgencyType.bind(this, "d1")}
                            fileName="D1"
                            fileType="d1" />
                        <GenerateFileBox
                            label="File D1: Procurement Awards (FPDS data)"
                            datePlaceholder="Sign"
                            startingTab={1}
                            value={d1}
                            error={d1.error}
                            showDownload={d1.showDownload}
                            onDateChange={this.handleDateChange.bind(this, "d1")}
                            updateError={this.updateError.bind(this, "d1")}
                            clickedDownload={this.clickedDownload.bind(this, "D1")} />

                        <AgencyToggle
                            funding={d2.isFundingAgency}
                            toggleAgencyType={this.toggleAgencyType.bind(this, "d2")}
                            fileName="D2"
                            fileType="d2" />
                        <GenerateFileBox
                            label="File D2: Financial Assistance"
                            datePlaceholder="Action"
                            startingTab={9}
                            value={d2}
                            error={d2.error}
                            showDownload={d2.showDownload}
                            onDateChange={this.handleDateChange.bind(this, "d2")}
                            updateError={this.updateError.bind(this, "d2")}
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
