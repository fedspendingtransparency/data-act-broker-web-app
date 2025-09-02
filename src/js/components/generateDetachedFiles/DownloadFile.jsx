/**
 * DownloadFile.jsx
 * Created by Lizzie Salita 11/9/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    clickedDownload: PropTypes.func,
    fileInfo: PropTypes.string,
    errorType: PropTypes.string,
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    showDownload: PropTypes.bool,
    status: PropTypes.string
};

const defaultProps = {
    clickedDownload: null,
    fileInfo: '',
    errorType: '',
    errorMessage: '',
    label: '',
    showDownload: false,
    status: ''
};

export default class DownloadFile extends React.Component {
    render() {
        let errorClass = ' hide';
        if (this.props.errorType) {
            errorClass = '';
        }

        let showDownload = ' hide';
        if (this.props.showDownload) {
            showDownload = '';
        }

        return (
            <div className="usa-da-generate-item-wrap">
                <div className="usa-da-generate-item">
                    <div className={`usa-da-generate-download${showDownload}`}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="download-title text-center">
                                    Download {this.props.label}
                                </div>
                                <div className="col-sm-12">
                                    {this.props.fileInfo}
                                </div>
                                <button
                                    disabled={this.props.status === 'generating'}
                                    onClick={this.props.clickedDownload}
                                    className="usa-da-download file-download-btn">
                                    <span className="usa-da-icon usa-da-download-report">
                                        <FontAwesomeIcon icon="cloud-arrow-down" />
                                    </span>
                                    Download File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`alert alert-error text-left${errorClass}`} role="alert">
                    <div className="usa-da-icon error-icon">
                        <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />
                    </div>
                    <div className="alert-text">
                        <div className="alert-header-text">{this.props.errorType}</div>
                        <p>{this.props.errorMessage}</p>
                    </div>
                </div>
            </div>
        );
    }
}

DownloadFile.propTypes = propTypes;
DownloadFile.defaultProps = defaultProps;
