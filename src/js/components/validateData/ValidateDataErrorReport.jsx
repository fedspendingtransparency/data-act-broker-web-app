/**
 * ValidateDataContent.jsx
 * Created by Mike Bray 3/28/16
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import Table from '../SharedComponents/table/TableComponent.jsx';
import Request from 'superagent';

const propTypes = {

};

export default class ValidateDataErrorReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="col-md-12 usa-da-validate-error-report">
                <div className="row center-block">
                    <div className="col-md-10">
                        <h3>Header Error Report</h3>
                    </div>
                    <div className="col-md-2">
                        <button className="usa-button-secondary">Download Error Report</button>
                    </div>
                    <div className="col-md-12">
                        <Table />
                    </div>
                </div>
            </div>
        );
    }
}

ValidateDataErrorReport.propTypes = propTypes;