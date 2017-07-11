/**
  * GenerateEFPage.jsx
  * Created by Kevin Li 8/23/16
  **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';

import * as ReviewHelper from '../../helpers/reviewHelper.js';

import GenerateEFContainer from '../../containers/generateEF/GenerateEFContainer.jsx';
import GenerateEFError from './GenerateEFError.jsx';

import GTASBanner from '../SharedComponents/GTASWarningBanner.jsx';

export default class GenerateEFPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            errorMessage: '',
            gtas: null
        };
    }

    componentDidMount() {
        this.isGtas();
    }

    showError(message) {
        this.setState({
            showError: true,
            errorMessage: message
        });
    }

    isGtas() {
        ReviewHelper.isGtasWindow()
            .then((res) => {
                if(res != this.state.gtas) {
                    this.setState({gtas: res})
                }
            })
            .catch((err) =>{
                console.log(err)
            })
    }

	render() {

        let pageContent = <GenerateEFContainer submissionID={this.props.params.submissionID} showError={this.showError.bind(this)} />;

        if (this.state.showError) {
           pageContent = <GenerateEFError message={this.state.errorMessage} />;
        }

        let gtasWarning = null;
        if(this.state.gtas && this.state.gtas.data) {
            gtasWarning = <GTASBanner data={this.state.gtas}/>
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
                {gtasWarning}
                {pageContent}
            </div>
            
		)
	}
}