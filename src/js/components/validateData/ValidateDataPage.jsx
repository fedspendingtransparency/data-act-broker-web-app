/**
* ValidateDataPage.jsx
* Created by Katie Rose 1/4/16
*/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import AddDataHeader from './../addData/AddDataHeader';
import Progress from '../SharedComponents/ProgressComponent';

import ValidateDataContainer from '../../containers/validateData/ValidateDataContainer';

const propTypes = {
    params: PropTypes.object,
    route: PropTypes.object
};

const defaultProps = {
    params: {},
    route: {}
};

export default class ValidateDataPage extends React.Component {
    render() {
        const submissionID = this.props.params.submissionID;

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
                <ValidateDataContainer submissionID={submissionID} />
            </div>
        );
    }
}

ValidateDataPage.propTypes = propTypes;
ValidateDataPage.defaultProps = defaultProps;
