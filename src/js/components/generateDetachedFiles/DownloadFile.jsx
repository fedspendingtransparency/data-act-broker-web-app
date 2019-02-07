/**
 * DownloadFile.jsx
 * Created by Lizzie Salita 11/9/18
 */

import React, { PropTypes } from 'react';
import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    fileInfo: PropTypes.string,
    errorType: PropTypes.string,
    errorMessage: PropTypes.string,
    url: PropTypes.string,
    label: PropTypes.string
};

const defaultProps = {
    fileInfo: '',
    url: '',
    errorType: '',
    errorMessage: '',
    label: ''
};

export default class DownloadFile extends React.Component {
    render() {
        let errorClass = ' hide';
        if (this.props.errorType) {
            errorClass = '';
        }

        let showDownload = ' hide';
        if (this.props.url) {
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
                                <a
                                    href={this.props.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="usa-da-download file-download-btn">
                                    <span className="usa-da-icon usa-da-download-report">
                                        <Icons.CloudDownload />
                                    </span>
                                    Download File
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`alert alert-error text-left${errorClass}`} role="alert">
                    <span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
                    <div className="alert-header-text">{this.props.errorType}</div>
                    <p>{this.props.errorMessage}</p>
                </div>
            </div>
        );
    }
}

DownloadFile.propTypes = propTypes;
DownloadFile.defaultProps = defaultProps;
