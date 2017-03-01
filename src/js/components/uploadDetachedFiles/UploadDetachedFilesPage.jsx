/**
* UploadDetachedFilesPage.jsx
* Created by MichaelHess
**/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React from 'react';
import moment from 'moment';

import Footer from '../SharedComponents/FooterComponent.jsx';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';

import UploadDetachedFileMeta from './uploadDetachedFileMeta.jsx';
import UploadDetachedFileValidation from './uploadDetachedFileValidation.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';


export default class UploadDetachedFilesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showMeta: true
		};
	}

	componentDidMount(){
		if(this.props.params.submissionID){
			this.props.setSubmissionId(this.props.params.submissionID);
			this.setState({
				showMeta: false
			});
		}
	}

	validate(){
		this.setState({
			showMeta: false
		})
	}

	render() {
		let content = null;
		if(!this.state.showMeta){
			content = <UploadDetachedFileValidation submission={this.props.submission} setSubmissionId={this.props.setSubmissionId.bind(this)} />
		}else{
			content = <UploadDetachedFileMeta setSubmissionState={this.props.setSubmissionState} setSubmissionId={this.props.setSubmissionId.bind(this)} 
				history={this.props.history} submission={this.props.submission} validate={this.validate.bind(this)} />;
		}

		return (
			<div className="usa-da-upload-detached-files-page">
				<div className="usa-da-site_wrap">
					<div className="usa-da-page-content">
						<Navbar activeTab="submissionGuide" />
						<div className="usa-da-upload-detached-files-page">
							<div className="usa-da-site_wrap">
								{content}
							</div>
							<Footer />
						</div>
					</div>
				</div>
			</div>
		);
	}
}