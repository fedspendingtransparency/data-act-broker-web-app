import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                                <FontAwesomeIcon icon="exclamation-circle" />
                            </div>
                        );
                        case 'ready': return (
                            <div className="text-center usa-da-icon">
                                <FontAwesomeIcon icon="cloud-upload-alt" />
                            </div>
                        );
                        case 'uploading': return (
                            <div className="text-center usa-da-icon-loading-spinner">
                                <Icons.LoadingSpinner />
                            </div>
                        );
                        case 'failed': return (
                            <div className="text-center usa-da-icon fail">
                                <FontAwesomeIcon icon="cloud-upload-alt" />
                            </div>
                        );
                        case 'prepare': return (
                            <div className="text-center usa-da-icon success">
                                <FontAwesomeIcon icon="cloud-upload-alt" />
                            </div>
                        );
                        default: return (
                            <div className="text-center usa-da-icon">
                                <FontAwesomeIcon icon="cloud-upload-alt" />
                            </div>
                        );
                    }
                })()}
                <div>
                    <Markdown
                        disallowedElements={['p']}
                        unwrapDisallowed>
                        {this.props.displayString}
                    </Markdown>
                </div>
            </div>
        );
    }
}

DropZoneDisplay.propTypes = propTypes;
DropZoneDisplay.defaultProps = defaultProps;
