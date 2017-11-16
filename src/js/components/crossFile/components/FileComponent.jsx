/**
  * FileComponent.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import ReplacementButton from './ReplacementButton.jsx';
import * as PermissionsHelper from '../../../helpers/permissionsHelper.js';

const defaultProps = {
    fileType: '',
    name: '',
    fileKey: ''
};

export default class FileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    render() {
        let replaceButton = null;
        if (this.props.status === 'success' && PermissionsHelper.checkAgencyPermissions(this.props.session,
            this.props.agencyName)) {
            replaceButton = <ReplacementButton buttonClicked={this.props.toggleUploadBox} {...this.props} />;
        }

        return (
            <div className="file-box">
                <div className="file-type">
                    <div>File {this.props.fileType}</div>
                </div>
                <div className="file-name">
                    {this.props.name}
                </div>
                {replaceButton}
            </div>
        );
    }
}

FileComponent.defaultProps = defaultProps;
