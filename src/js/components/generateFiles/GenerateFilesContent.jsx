/**
  * GenerateFilesPage.jsx
  * Created by Kevin Li 7/22/16
  */

import React, { PropTypes } from 'react';

import GenerateFileBox from './components/GenerateFileBox';
import GenerateFilesOverlay from './GenerateFilesOverlay';

const propTypes = {
    handleDateChange: PropTypes.func,
    updateError: PropTypes.func,
    d1: PropTypes.object,
    d2: PropTypes.object
};

const defaultProps = {
    handleDateChange: null,
    updateError: null,
    d1: null,
    d2: null
};

export default class GenerateFilesContent extends React.Component {
    handleDateChange(file, date, dateType) {
        this.props.handleDateChange(file, date, dateType);
    }

    updateError(file, header = '', description = '') {
        this.props.updateError(file, header, description);
    }

    render() {
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
                        <GenerateFileBox
                            label="File D1: Procurement Awards (FPDS data)"
                            datePlaceholder="Sign"
                            startingTab={1}
                            value={this.props.d1}
                            error={this.props.d1.error}
                            download={this.props.d1.download}
                            onDateChange={this.handleDateChange.bind(this, "d1")}
                            updateError={this.updateError.bind(this, "d1")} />

                        <GenerateFileBox
                            label="File D2: Financial Assistance"
                            datePlaceholder="Action"
                            startingTab={9}
                            value={this.props.d2}
                            error={this.props.d2.error}
                            download={this.props.d2.download}
                            onDateChange={this.handleDateChange.bind(this, "d2")}
                            updateError={this.updateError.bind(this, "d2")} />
                    </div>
                </div>
                <GenerateFilesOverlay {...this.props} />
            </div>
        );
    }
}

GenerateFilesContent.propTypes = propTypes;
GenerateFilesContent.defaultProps = defaultProps;
