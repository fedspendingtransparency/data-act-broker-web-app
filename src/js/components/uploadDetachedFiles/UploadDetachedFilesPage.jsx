/**
* UploadDetachedFilesPage.jsx
* Created by MichaelHess
**/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React from 'react';
import moment from 'moment';

import Footer from '../SharedComponents/FooterComponent.jsx';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';

import UploadDetachedFileMeta from './UploadDetachedFileMeta.jsx';
import UploadDetachedFileValidation from './UploadDetachedFileValidation.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import { hashHistory } from 'react-router';


export default class UploadDetachedFilesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showMeta: true
		};
	}

	componentDidMount(){
		let showMeta = true;
		if(this.props.params.submissionID){
			this.props.setSubmissionId(this.props.params.submissionID);
			showMeta = false;
		}
		if(this.state.showMeta !== showMeta){
			this.setState({
				showMeta: showMeta
			})
		}
	}

	validate(submissionID){
		this.props.setSubmissionId(submissionID);
		hashHistory.push('/FABSaddData/'+submissionID);
		this.setState({
			showMeta: false
		})

	}

	componentWillReceiveProps(nextProps){
		let showMeta = false;
		if(nextProps.params.submissionID && this.state.showMeta){
			this.props.setSubmissionId(this.props.params.submissionID);
		}else if(!nextProps.params.submissionID){
			showMeta = true;
		}
		if(this.state.showMeta !== showMeta){
			this.setState({
				showMeta: showMeta
			})
		}
	}

	render() {
		let content = null;
		if(!this.state.showMeta){
			content = <UploadDetachedFileValidation {...this.props} submission={this.props.submission} setSubmissionId={this.props.setSubmissionId.bind(this)} />
		}else{
			content = <UploadDetachedFileMeta setSubmissionState={this.props.setSubmissionState} setSubmissionId={this.props.setSubmissionId.bind(this)} 
				history={this.props.history} submission={this.props.submission} validate={this.validate.bind(this)} />;
		}

		return (
			<div className="usa-da-upload-detached-files-page">
				<div className="usa-da-site_wrap">
					<div className="usa-da-page-content">
						<Navbar activeTab="FABSAddData" type={this.props.route.type} />
						<div className="usa-da-upload-detached-files-page">
							<div className="usa-da-site_wrap">
								{content}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}