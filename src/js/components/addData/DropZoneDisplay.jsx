import React, { PropTypes } from 'react';
import FileProgress from '../SharedComponents/FileProgress.jsx';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const propTypes = {
    displayMode: PropTypes.string,
    string: PropTypes.string,
    progress: PropTypes.number,
    showFile: PropTypes.bool
};

const defaultProps = {
    showFile: false,
    string: ''
};

export default class DropZoneDisplay extends React.Component {
    render() {
        let iconClass = "";
        if (this.props.displayMode === 'failure') {
            iconClass = 'fail';
        }
        if (this.props.displayMode === 'success') {
            iconClass = 'success';
        }

        let progress = "";
        if (this.props.displayMode === 'uploading') {
            progress = <FileProgress fileStatus={this.props.progress} />;
        }

        return (
            <div className="center-block">
                <div className={"text-center usa-da-icon " + iconClass}><Icons.CloudUpload /></div>
                <div dangerouslySetInnerHTML={{ __html: this.props.string }} />
                {progress}
            </div>
        );
    }
}

DropZoneDisplay.propTypes = propTypes;
DropZoneDisplay.defaultProps = defaultProps;
