/**
  * FileComponent.jsx
  * Created by Kevin Li 6/14/16
  */

import React, { PropTypes } from 'react';
import ReplacementButton from './ReplacementButton';
import * as PermissionsHelper from '../../../helpers/permissionsHelper';

const propTypes = {
    toggleUploadBox: PropTypes.func,
    session: PropTypes.object,
    agencyName: PropTypes.string,
    fileType: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    fileKey: PropTypes.string
};

const defaultProps = {
    fileType: '',
    name: '',
    fileKey: '',
    status: '',
    toggleUploadBox: null,
    session: null,
    agencyName: ''
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

FileComponent.propTypes = propTypes;
FileComponent.defaultProps = defaultProps;
