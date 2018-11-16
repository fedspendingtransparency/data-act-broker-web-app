import React, { PropTypes } from 'react';
import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
  displayMode: PropTypes.string,
  string: PropTypes.string
};

const defaultProps = {
  string: '',
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
            <div dangerouslySetInnerHTML={{ __html: this.props.string }} />
        </div>
    );
  }
}

DropZoneDisplay.propTypes = propTypes;
DropZoneDisplay.defaultProps = defaultProps;
