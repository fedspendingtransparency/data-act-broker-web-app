/**
  * CrossFilePage.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';

import CrossFileContentContainer from '../../containers/crossFile/CrossFileContentContainer.jsx';
import CrossFileError from './CrossFileError.jsx';

export default class CrossFilePage extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               showError: false,
               errorMessage: ''
          };

     }

     componentDidUpdate(prevProps, prevState) {
          if (this.props.params.submissionID != prevProps.params.submissionID) {
               // new submission ID, reload
               if (this.state.showError) {
                    this.hideError();
               }
          }
     }

     showError(errorMessage) {
          this.setState({
               showError: true,
               errorMessage: errorMessage
          });
     }
     hideError() {
          this.setState({
               showError: false,
               errorMessage: ''
          });
     }

	render() {

          let pageContent = <CrossFileContentContainer submissionID={this.props.params.submissionID} showError={this.showError.bind(this)} />;

          if (this.state.showError) {
               pageContent = <CrossFileError message={this.state.errorMessage} />;
          }

		return (
               <div className="usa-da-cross-file-page">
                    <Navbar activeTab="submissionGuide"/>
                    <AddDataHeader submissionID={this.props.params.submissionID} />
                    <div className="usa-da-content-step-block" name="content-top">
                         <div className="container center-block">
                              <div className="row">
                                 <Progress totalSteps={4} currentStep={3} />
                              </div>
                         </div>
                    </div>

                    {pageContent}

               </div>
		)
	}
}