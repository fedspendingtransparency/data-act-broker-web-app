/**
* ValidateDataPage.jsx
* Created by Katie Rose 1/4/16
**/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';

import ValidateDataContainer from '../../containers/validateData/ValidateDataContainer.jsx';
import ValidateDataErrors from './ValidateDataErrors.jsx';

const propTypes = {
    params: PropTypes.object,
    route: PropTypes.object,
    submissionId: PropTypes.string,
    subID: PropTypes.string,
    csv_url: PropTypes.array,
    link_array: PropTypes.array
};

const defaultProps = {
    link_array: [null],
    subID: null
};

export default class ValidateDataPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentComponent;
        const submissionID = this.props.params.submissionID;

        if (!this.props.params.submissionID) {
            currentComponent = <ValidateDataErrors />;
        }
        else {
            currentComponent = <ValidateDataContainer submissionID={submissionID} />;
        }

        return (
            <div className="usa-da-validate-data-page">
                <Navbar activeTab="submissionGuide" type={this.props.route.type} />
                <AddDataHeader submissionID={submissionID} />
                <div className="usa-da-content-step-block" name="content-top">
                    <div className="container center-block">
                        <div className="row">
                            <Progress currentStep={1} id={this.props.params.submissionID} />
                        </div>
                    </div>
                </div>
                {currentComponent}
            </div>
        );
    }
}

ValidateDataPage.propTypes = propTypes;
ValidateDataPage.defaultProps = defaultProps;
