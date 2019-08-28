/**
 * DownloadFile.jsx
 * Created by Lizzie Salita 11/9/18
 */

import React from 'react'; 
import PropTypes from 'prop-types';
import * as Icons from '../SharedComponents/icons/Icons';
import { createOnKeyDownHandler } from '../../helpers/util';

const propTypes = {
    clickedDownload: PropTypes.func,
    fileInfo: PropTypes.string,
    errorType: PropTypes.string,
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    showDownload: PropTypes.bool
};

const defaultProps = {
    clickedDownload: null,
    fileInfo: '',
    errorType: '',
    errorMessage: '',
    label: '',
    showDownload: false
};

export default class DownloadFile extends React.Component {
    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.props.clickedDownload);

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
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={this.props.clickedDownload}
                                    onKeyDown={onKeyDownHandler}
                                    className="usa-da-download file-download-btn">
                                    <span className="usa-da-icon usa-da-download-report">
                                        <Icons.CloudDownload />
                                    </span>
                                    Download File
                                </div>
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
