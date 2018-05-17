/**
* UploadFabsFileError.jsx
* Created by Minahm Kim
*/
import React, { PropTypes } from 'react';

import * as Icons from '../SharedComponents/icons/Icons';

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
            message: '',
            type: this.props.type
        };
    }

    componentDidMount() {
        this.loadContent();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.state.type) {
            this.setState({
                type: this.state.type
            });
        }
    }

    loadContent() {
        let header = '';
        let message = '';

        if (this.state.type === 'success') {
            header = 'Your submission has been succesfully published';
        }
        else if (this.props.error) {
            header = this.props.error.header;
            message = this.props.error.description;
        }
        else if (this.props.message) {
            header = this.props.message;
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
        let icon = <Icons.ExclamationCircle />;
        let className = 'error';

        if (this.state.type === 'success') {
            icon = <Icons.CheckCircle />;
            className = 'success';
        }

        return (
            <div className={"alert alert-" + className + " text-left"} role="alert">
                <span className="usa-da-icon error-icon">{icon}</span>
                <div className="alert-header-text">{this.state.header}</div>
                <p>{this.state.message}</p>
            </div>);
    }
}

UploadFabsFileError.propTypes = propTypes;
UploadFabsFileError.defaultProps = defaultProps;
