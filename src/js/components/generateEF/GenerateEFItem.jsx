/**
  * GenerateEFItem.jsx
  * Created by Kevin Li 8/24/16
  */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    comingSoon: PropTypes.bool,
    publishStatus: PropTypes.string
};


const GenerateEFItem = ({
    comingSoon = false, type = '', title = '', description = '', publishStatus = '', ...props
}) => {
    const clickedDownload = (e) => {
        e.preventDefault();
        const download = window.open(props[type.toLowerCase()].url, '_target');
        download.opener = null;
    }

    let hideError = ' hide';
    let hideDownload = ' hide';
    let hideSpinner = '';
    let icon = null;
    const blockedStatuses = ['reverting', 'publishing'];
    const status = props[type.toLowerCase()].status;
    if (status === 'failed') {
        hideError = '';
        hideSpinner = ' hide';
        icon = <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />;
    }
    else if (status === 'invalid') {
        hideError = '';
        hideSpinner = ' hide';
        icon = <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />;
    }
    else if (status === 'finished') {
        hideDownload = '';
        hideSpinner = ' hide';
        icon = <FontAwesomeIcon icon="circle-check" className="check-circle-icon" />;
    }

    return (
        <div className="generate-ef-wrap">
            <div className={`generate-ef-item${comingSoon ? ' coming-soon' : ''}`}>
                <div className="generate-left">
                    <div className="generate-header">
                        <div className="generate-type">
                            File {type}
                        </div>
                        <div className="generate-title">
                            {title}
                        </div>
                    </div>
                    <div className="generate-description">
                        <p>{description}</p>
                    </div>
                </div>
                <div className="generate-right">
                    <div className="right-content">
                        <div className="icon-wrapper">
                            <div className="usa-da-icon">
                                {icon}
                            </div>
                        </div>
                        <div className="file-name">
                            File_{type}.csv
                        </div>
                        <div className={`spinner${hideSpinner}`}>
                            <div className="cssload-squares">
                                <span /><span /><span /><span /><span />
                            </div>
                        </div>
                        <button
                            className={`usa-da-button btn-primary btn-full${hideDownload}`}
                            onClick={clickedDownload}
                            disabled={blockedStatuses.indexOf(publishStatus) > -1}>
                            Download
                        </button>
                    </div>
                </div>
            </div>
            <div className={`alert alert-danger${hideError}`}>
                <div className="usa-da-icon error-icon">
                    <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />
                </div>
                <div className="alert-text">
                    <div className="alert-header-text">File {type} Error</div>
                    <p>{props[type.toLowerCase()].message}</p>
                </div>
            </div>
        </div>
    );
};

GenerateEFItem.propTypes = propTypes;
export default GenerateEFItem;
