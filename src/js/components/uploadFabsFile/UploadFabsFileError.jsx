/**
* UploadFabsFileError.jsx
* Created by Minahm Kim
*/
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    error: PropTypes.object,
    message: PropTypes.string,
    type: PropTypes.string,
    errorCode: PropTypes.number
};

const defaultProps = {
    error: {},
    message: '',
    type: '',
    errorCode: 0
};

export default class UploadFabsFileError extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            header: '',
            message: ''
        };
    }

    componentDidMount() {
        this.loadContent();
    }

    loadContent() {
        let header = '';
        let message = '';

        if (this.props.type === 'success') {
            header = 'Your submission has been successfully published';
        }
        else if (this.props.error.header || this.props.error.description) {
            header = this.props.error.header;
            message = this.props.error.description;
        }
        else if (this.props.message) {
            header = 'Upload Error';
            message = this.props.message;
        }
        else {
            switch (this.props.errorCode) {
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

        this.setState({
            header,
            message
        });
    }

    render() {
        let icon = <FontAwesomeIcon icon="circle-exclamation" />;
        let className = 'error';

        if (this.props.type === 'success') {
            icon = <FontAwesomeIcon icon="circle-check" />;
            className = 'success';
        }

        return (
            <div className={`alert alert-${className} text-left`} role="alert">
                <div className="usa-da-icon error-icon">
                    {icon}
                </div>
                <div className="alert-text">
                    <div className="alert-header-text">{this.state.header}</div>
                    <p>{this.state.message}</p>
                </div>
            </div>);
    }
}

UploadFabsFileError.propTypes = propTypes;
UploadFabsFileError.defaultProps = defaultProps;
