/**
  * GenerateFileBox.jsx
  * Created by Kevin Li 7/25/16
  */

import React, { PropTypes } from 'react';
import * as Icons from '../../SharedComponents/icons/Icons';
import DatePicker from './DatePicker';

const propTypes = {
    onDateChange: PropTypes.func,
    updateError: PropTypes.func,
    showDownload: PropTypes.bool,
    error: PropTypes.object,
    value: PropTypes.object,
    datePlaceholder: PropTypes.string,
    label: PropTypes.string,
    startingTab: PropTypes.number
};

const defaultProps = {
    startingTab: 1,
    showDownload: false,
    onDateChange: null,
    updateError: null,
    error: null,
    value: null,
    datePlaceholder: '',
    label: ''
};

export default class GenerateFileBox extends React.Component {
    render() {
        let errorClass = ' hide';
        if (this.props.error.show) {
            errorClass = '';
        }

        let downloadClass = ' hide';
        if (this.props.showDownload) {
            downloadClass = '';
        }

        return (
            <div>
                <div className="usa-da-generate-item-wrap">
                    <div className="usa-da-generate-item">
                        <div className="file-full-name">
                            {this.props.label}
                        </div>
                        <div className="date-range-wrapper">
                            <DatePicker
                                type="startDate"
                                title={`${this.props.datePlaceholder} Start Date`}
                                tabIndex={this.props.startingTab}
                                onDateChange={this.props.onDateChange}
                                value={this.props.value.startDate}
                                opposite={this.props.value.endDate}
                                updateError={this.props.updateError} />
                            <div className="through-text">
                                through
                            </div>
                            <DatePicker
                                type="endDate"
                                title={`${this.props.datePlaceholder} End Date`}
                                tabIndex={this.props.startingTab + 4}
                                onDateChange={this.props.onDateChange}
                                value={this.props.value.endDate}
                                opposite={this.props.value.startDate}
                                updateError={this.props.updateError} />
                        </div>
                    </div>
                    <div className={`usa-da-generate-download${downloadClass}`}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="download-title text-right">
                                    Download {this.props.label}
                                </div>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={this.props.clickedDownload}
                                    className="usa-da-download pull-right">
                                    <span className="usa-da-icon usa-da-download-report"><Icons.CloudDownload />
                                    </span>Download File
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`alert alert-error text-left${errorClass}`} role="alert">
                    <span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
                    <div className="alert-header-text">{this.props.error.header}</div>
                    <p>{this.props.error.description}</p>
                </div>
            </div>
        );
    }
}

GenerateFileBox.propTypes = propTypes;
GenerateFileBox.defaultProps = defaultProps;
