/**
  * GenerateEFPage.jsx
  * Created by Kevin Li 8/23/16
  **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';

import GenerateEFContainer from '../../containers/generateEF/GenerateEFContainer.jsx';
import GenerateEFError from './GenerateEFError.jsx';

export default class GenerateEFPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            errorMessage: ''
        };
    }

    showError(message) {
        this.setState({
            showError: true,
            errorMessage: message
        });
    }

	render() {

        let pageContent = <GenerateEFContainer submissionID={this.props.params.submissionID} showError={this.showError.bind(this)} />;

        if (this.state.showError) {
           pageContent = <GenerateEFError message={this.state.errorMessage} />;
        }

		return (
			<div className="usa-da-generate-ef-page">
                <Navbar activeTab="submissionGuide"/>
                <AddDataHeader submissionID={this.props.params.submissionID} />
                <div className="usa-da-content-step-block" name="content-top">
                    <div className="container center-block">
                        <div className="row">
                            <Progress currentStep={4} id={this.props.params.submissionID} />
                        </div>
                    </div>
                </div>

                {pageContent}
            </div>
            
		)
	}
}