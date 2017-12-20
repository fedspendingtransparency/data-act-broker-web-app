/**
  * GenerateFilesPage.jsx
  * Created by Kevin Li 7/22/16
  */

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import AddDataHeader from './../addData/AddDataHeader';
import Progress from '../SharedComponents/ProgressComponent';

import GenerateFilesContainer from '../../containers/generateFiles/GenerateFilesContainer';
import GenerateFilesError from './GenerateFilesError';

const propTypes = {
    params: PropTypes.object,
    route: PropTypes.object
};

const defaultProps = {
    params: null,
    route: null
};

export default class GenerateFilesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            errorMessage: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.submissionID !== prevProps.params.submissionID) {
            // new submission ID, reload
            if (this.state.showError) {
                this.hideError();
            }
        }
    }

    showError(errorMessage) {
        this.setState({
            showError: true,
            errorMessage
        });
    }
    hideError() {
        this.setState({
            showError: false,
            errorMessage: ''
        });
    }

    render() {
        let pageContent = (<GenerateFilesContainer
            submissionID={this.props.params.submissionID}
            showError={this.showError.bind(this)} />);

        if (this.state.showError) {
            pageContent = <GenerateFilesError message={this.state.errorMessage} />;
        }

        return (
            <div className="usa-da-generate-files-page">
                <Navbar activeTab="submissionGuide" type={this.props.route.type} />
                <AddDataHeader submissionID={this.props.params.submissionID} />
                <div className="usa-da-content-step-block" name="content-top">
                    <div className="container center-block">
                        <div className="row">
                            <Progress currentStep={2} id={this.props.params.submissionID} />
                        </div>
                    </div>
                </div>
                {pageContent}
            </div>
        );
    }
}

GenerateFilesPage.propTypes = propTypes;
GenerateFilesPage.defaultProps = defaultProps;
