/**
* FileComponent.jsx
* Created by Kyle Fox 2/19/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import DropZoneContainer from '../../containers/addData/DropZoneContainer';

const propTypes = {
    fileTitle: PropTypes.string.isRequired,
    requestName: PropTypes.string.isRequired,
    interactive: PropTypes.bool,
};

const defaultProps = {
    interactive: true
};

export default class FileComponent extends React.Component {
    render() {
        return (
            <div className="usa-da-submission-item">
                <div className="center-block">
                    <div className="usa-da-submission-vertical-center">
                        <div className="usa-da-submission-item-drop-wrapper">
                            <DropZoneContainer
                                requestName={this.props.requestName}
                                fileTitle={this.props.fileTitle}
                                interactive={this.props.interactive} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FileComponent.propTypes = propTypes;
FileComponent.defaultProps = defaultProps;
