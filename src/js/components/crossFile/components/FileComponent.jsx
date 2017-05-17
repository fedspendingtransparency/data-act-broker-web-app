/**
  * FileComponent.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import ReplacementButton from './ReplacementButton.jsx';
import * as PermissionsHelper from '../../../helpers/permissionsHelper.js';
import * as ReviewHelper from '../../../helpers/reviewHelper.js';

const defaultProps = {
	fileType: '',
	name: '',
	fileKey: ''
};

export default class FileComponent extends React.Component {
	constructor(props){
		super(props)
		this.isUnmounted = false;
	}

	componentDidMount(){
		if (this.props.submissionID != null) {
            ReviewHelper.fetchStatus(this.props.submissionID)
                .then((data) => {
                    data.ready = true;
                    if (!this.isUnmounted) {
                        this.setState(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
	}

	componentDidUnmount(){
		this.isUnmounted = true;
	}

	render() {
		let replaceButton = null;

		if (this.props.status == 'success' && PermissionsHelper.checkAgencyPermissions(this.props.session, this.state.agency_name)) {
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
		)
	}
}

FileComponent.defaultProps = defaultProps;