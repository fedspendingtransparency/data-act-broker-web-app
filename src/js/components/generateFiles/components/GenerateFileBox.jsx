/**
  * GenerateFileBox.jsx
  * Created by Kevin Li 7/25/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarDatePicker from './CalendarDatePicker';
import { createOnKeyDownHandler, convertToLocalDate } from '../../../helpers/util';

const propTypes = {
    clickedDownload: PropTypes.func,
    onDateChange: PropTypes.func,
    updateError: PropTypes.func,
    showDownload: PropTypes.bool,
    error: PropTypes.object,
    value: PropTypes.object,
    datePlaceholder: PropTypes.string,
    label: PropTypes.string
};

const defaultProps = {
    clickedDownload: null,
    onDateChange: null,
    updateError: null,
    showDownload: false,
    error: null,
    value: null,
    datePlaceholder: '',
    label: ''
};

export default class GenerateFileBox extends React.Component {
    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.props.clickedDownload);

        let errorClass = ' hide';
        if (this.props.error.show) {
            errorClass = '';
        }

        let downloadClass = ' hide';
        if (this.props.showDownload) {
            downloadClass = '';
        }

        let lastGenerated = null;
        if (this.props.value.lastGenerated !== undefined && this.props.value.lastGenerated !== null) {
            lastGenerated = (
                <div className="last-generated">
                    Last Generated: {convertToLocalDate(this.props.value.lastGenerated, true, '/')}
                </div>
            );
        }

        return (
            <div>
                <div className="usa-da-generate-item-wrap">
                    <div className="usa-da-generate-item">
                        <div className="file-full-name">
                            <div className="file-name">
                                {this.props.label}
                            </div>
                            {lastGenerated}
                        </div>
                        <div className="date-range-wrapper">
                            <CalendarDatePicker
                                type="startDate"
                                title={`${this.props.datePlaceholder} Start Date`}
                                onDateChange={this.props.onDateChange}
                                value={this.props.value.startDate}
                                opposite={this.props.value.endDate}
                                updateError={this.props.updateError} />
                            <div className="through-text">
                                through
                            </div>
                            <CalendarDatePicker
                                type="endDate"
                                title={`${this.props.datePlaceholder} End Date`}
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
                                    onKeyDown={onKeyDownHandler}
                                    className="usa-da-download pull-right">
                                    <span className="usa-da-icon usa-da-download-report">
                                        <FontAwesomeIcon icon="cloud-arrow-down" />
                                    </span>Download File
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`alert alert-error text-left${errorClass}`} role="alert">
                    <div className="usa-da-icon error-icon">
                        <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />
                    </div>
                    <div className="alert-text">
                        <div className="alert-header-text">{this.props.error.header}</div>
                        <p>{this.props.error.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

GenerateFileBox.propTypes = propTypes;
GenerateFileBox.defaultProps = defaultProps;
