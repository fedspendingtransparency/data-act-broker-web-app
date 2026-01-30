/**
* UploadFabsFileError.jsx
* Created by Minahm Kim
*/
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    error: PropTypes.object,
    message: PropTypes.string,
    type: PropTypes.string,
    errorCode: PropTypes.number
};

const UploadFabsFileError = ({error = {}, message = '', type = '', errorCode = 0}) => {
    const [currentHeader, setCurrentHeader] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = () => {
        let header = '';
        let tmpMessage = '';

        if (type === 'success') {
            header = 'Your submission has been successfully published';
        }
        else if (error.header || error.description) {
            header = error.header;
            tmpMessage = error.description;
        }
        else if (message) {
            header = 'Upload Error';
            tmpMessage = message;
        }
        else {
            switch (errorCode) {
                case 1:
                    header = 'This submission has already been published';
                    break;
                case 2:
                    header = 'This file has already been submitted';
                    break;
                case 3:
                    header = 'This file has already been submitted in another submission';
                    break;
                default:
                    header = 'There was an error with your submission. Please contact the Service Desk';
                    break;
            }
        }

        setCurrentHeader(header);
        setCurrentMessage(tmpMessage);
    };

    let icon = <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />;
    let className = 'error';

    if (type === 'success') {
        icon = <FontAwesomeIcon icon="circle-check" className="check-circle-icon" />;
        className = 'success';
    }

    return (
        <div className={`alert alert-${className} text-left`} role="alert">
            <div className="usa-da-icon error-icon">
                {icon}
            </div>
            <div className="alert-text">
                <div className="alert-header-text">{currentHeader}</div>
                <p>{currentMessage}</p>
            </div>
        </div>);
};

UploadFabsFileError.propTypes = propTypes;
export default UploadFabsFileError;
