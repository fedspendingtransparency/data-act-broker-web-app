import React, { PropTypes } from 'react';
import FileProgress from '../SharedComponents/FileProgress.jsx';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const propTypes = {
    displayMode: PropTypes.string,
    string: PropTypes.string,
    progress: PropTypes.number
};

const defaultProps = {
    showFile: false,
    string: ''
};

export default class DropZoneDisplay extends React.Component {
    render() {
        let uploadIcon = <Icons.CloudUpload />;
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
                <div className={"text-center " + "usa-da-icon " + iconClass}>{uploadIcon}</div>
                <div dangerouslySetInnerHTML={{ __html: this.props.string }}></div>
                {progress}
            </div>
        );
    }
}

DropZoneDisplay.propTypes = propTypes;
DropZoneDisplay.defaultProps = defaultProps;
