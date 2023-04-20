import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    displayMode: PropTypes.string,
    displayString: PropTypes.string
};

const defaultProps = {
    displayString: '',
    displayMode: ''
};

export default class DropZoneDisplay extends React.Component {
    render() {
        return (
            <div className="center-block">
                {(() => {
                    switch (this.props.displayMode) {
                        case 'invalid': return (
                            <div className="text-center usa-da-icon fail">
                                <Icons.ExclamationCircle />
                            </div>
                        );
                        case 'ready': return (
                            <div className="text-center usa-da-icon">
                                <Icons.CloudUpload />
                            </div>
                        );
                        case 'uploading': return (
                            <div className="text-center usa-da-icon-loading-spinner">
                                <Icons.LoadingSpinner />
                            </div>
                        );
                        case 'failed': return (
                            <div className="text-center usa-da-icon fail">
                                <Icons.CloudUpload />
                            </div>
                        );
                        case 'prepare': return (
                            <div className="text-center usa-da-icon success">
                                <Icons.CloudUpload />
                            </div>
                        );
                        default: return (
                            <div className="text-center usa-da-icon">
                                <Icons.CloudUpload />
                            </div>
                        );
                    }
                })()}
                <div>
                    <ReactMarkdown
                        disallowedTypes={['paragraph']}
                        unwrapDisallowed>
                        {this.props.displayString}
                    </ReactMarkdown>
                </div>
            </div>
        );
    }
}

DropZoneDisplay.propTypes = propTypes;
DropZoneDisplay.defaultProps = defaultProps;
