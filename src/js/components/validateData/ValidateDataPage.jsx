/**
* ValidateDataPage.jsx
* Created by Katie Rose 1/4/16
*/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import AddDataHeader from './../addData/AddDataHeader';
import Progress from '../SharedComponents/ProgressComponent';

import ValidateDataContainer from '../../containers/validateData/ValidateDataContainer';
import ValidateDataErrors from './ValidateDataErrors';

const propTypes = {
    params: PropTypes.object,
    route: PropTypes.object,
    submissionId: PropTypes.string,
    subID: PropTypes.string,
    csv_url: PropTypes.array,
    link_array: PropTypes.array
};

const defaultProps = {
    params: {},
    route: {},
    submissionId: '',
    csv_url: [],
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
