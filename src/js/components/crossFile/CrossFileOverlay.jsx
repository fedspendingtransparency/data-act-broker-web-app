/**
  * CrossFileOverlay.jsx
  * Created by Kevin Li 6/16/16
  **/
import React from 'react';
import _ from 'lodash';
import { hashHistory } from 'react-router';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble.jsx';

import * as PermissionsHelper from '../../helpers/permissionsHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

const defaultProps = {
	errors: ['error'],
	loading: true
};

class CrossFileLoadingDetail extends React.Component {
	render() {
		return (
			<div>
				You can return to this page at any time to check the validation status by using this link:
				<br />
				<a href={window.location.href}>{window.location.href}</a>
			</div>
		)
	}
}

export default class CrossFileOverlay extends React.Component {

	constructor(props) {
		super(props);

		this.isUnmounted = false;

		this.defaultOverlay = {
			icon: <Icons.ExclamationCircle />,
			iconClass: 'usa-da-errorRed',
			uploadButtonClass: '-disabled',
			uploadButtonDisabled: true,
			nextButtonClass: ' hide',
			nextButtonDisabled: true,
			hideButtons: false,
			message: 'You must correct the cross-file validation errors listed above.',
			detail: null,
			buttonText: 'Upload Corrected CSV Files'
		};

		this.state = {
			allowUpload: false,
			overlay: this.defaultOverlay
		};
	}

	componentDidMount() {
		this.isUnmounted = false;
		this.prepareOverlayContents();
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

	componentWillUnmount(){
		this.isUnmounted = true;
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(prevProps.submission.files, this.props.submission.files) || !_.isEqual(prevProps.submission.crossFile, this.props.submission.crossFile)) {
			this.setState({
				allowUpload: this.isReadyForUpload()
			}, () => {
				this.prepareOverlayContents();
			});
		}
		else if (prevProps.loading != this.props.loading || prevProps.mode != this.props.mode) {
			this.prepareOverlayContents();
		}
	}

	pressedNext(e) {
		e.preventDefault();
		hashHistory.push('/generateEF/' + this.props.submission.id);
	}

	isUploadingFiles() {
		if (Object.keys(this.props.submission.files).length > 0) {
			return true;
		}
		return false;
	}

	isReadyForUpload() {

		const expectedPairs = [];
		for (let pair of this.props.submission.crossFileOrder) {
			expectedPairs.push(pair.key);
		}

		for (let key in this.props.submission.crossFile) {

			// check if this is a valid cross-file pair
			if (_.indexOf(expectedPairs, key) == -1) {
				continue;
			}

			const firstKey = key.split('-')[0];
			const secondKey = key.split('-')[1];

			if (!this.props.submission.files.hasOwnProperty(firstKey) && !this.props.submission.files.hasOwnProperty(secondKey)) {
				// neither file in the pair is staged for upload, submission isn't ready for re-upload
				return false;
			}
		}

		// if we hit this point, the files are ready
		return true;
	}

	prepareOverlayContents() {
		// prepare the props to send down the common overlay component
		// create a clone of the default state
		const overlay = Object.assign({}, this.defaultOverlay);

		if (this.props.loading) {
			// still loading data
			overlay.uploadButtonDisabled = true;
			overlay.uploadButtonClass = ' hide';
			overlay.nextButtonClass = ' hide';
			overlay.nextButtonDisabled = true;
			overlay.icon = <LoadingBauble />;
			overlay.iconClass = 'overlay-animation';
			overlay.message = 'Your files are being validated.';
			overlay.hideButtons = true;
			overlay.detail = <CrossFileLoadingDetail />;
		}
		else if (this.props.mode == 'success') {
			// loading finished, show success (default state is to show errors)
			overlay.icon = <Icons.CheckCircle />;
			overlay.iconClass = 'usa-da-successGreen';
			overlay.message = 'Your files have been successfully cross-validated.';
			overlay.detail = 'Click Next to generate Files E and F.';
			overlay.uploadButtonDisabled = true;
			overlay.uploadButtonClass = '-disabled';
			overlay.nextButtonClass = ' btn-primary';
			overlay.nextButtonDisabled = false;
		}
		else if (this.props.mode == 'warnings') {
			// loading finished, show warnings
			overlay.icon = <Icons.ExclamationCircle />;
			overlay.iconClass = 'usa-da-warningYellow';
			overlay.message = 'Some cross-file pairs have validation warnings.';
			overlay.detail = 'You can correct your files or click Next to generate Files E and F.';
			overlay.uploadButtonDisabled = true;
			overlay.uploadButtonClass = '-disabled';
			overlay.nextButtonClass = ' btn-primary';
			overlay.nextButtonDisabled = false;
		}

		// handle uploading events
		if (this.props.submission.state == 'uploading') {
			overlay.uploadButtonDisabled = true;
			overlay.uploadButtonClass = '-disabled';
			overlay.nextButtonDisabled = true;
			overlay.nextButtonClass = '-disabled';
			overlay.buttonText = 'Uploading files...';
		}
		else if (this.props.submission.state == 'prepare') {
			// new files uploaded, page is now reloading
			overlay.uploadButtonDisabled = true;
			overlay.uploadButtonDisabled = '-disabled';
			overlay.nextButtonDisabled = true;
			overlay.nextButtonClass = '-disabled';
			overlay.buttonText = 'Gathering data...';
		}

		// enable the upload button if the correct files have been staged for upload
		if ((this.state.allowUpload || this.isUploadingFiles()) && PermissionsHelper.checkDabsAgencyPermissions(this.props.session, this.state.agency_name)) {
			overlay.uploadButtonDisabled = false;
			overlay.uploadButtonClass = ' btn-primary';
		} else {
			overlay.uploadButtonDisabled = true;
			overlay.uploadButtonDisabled = '-disabled';
		}

		this.setState({
			overlay: overlay
		});
	}

	render() {



		return (
			<CommonOverlay
				header={this.state.overlay.message}
				detail={this.state.overlay.detail}
				showIcon={true}
				icon={this.state.overlay.icon}
				iconClass={this.state.overlay.iconClass}
				showButtons={!this.state.overlay.hideButtons}>
				<div className="usa-da-btn-bg">
					<button className={"usa-da-button" + this.state.overlay.uploadButtonClass} disabled={this.state.overlay.uploadButtonDisabled} onClick={this.props.uploadFiles}>{this.state.overlay.buttonText}</button>
					<button className={"usa-da-validation-overlay-review usa-da-button" + this.state.overlay.nextButtonClass} disabled={this.state.overlay.nextButtonDisabled} onClick={this.pressedNext.bind(this)}>Next</button>
				</div>
			</CommonOverlay>
		);
	}
}

CrossFileOverlay.defaultProps = defaultProps;
