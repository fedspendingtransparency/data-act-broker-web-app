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

    openWindow() {
        window.open(this.props.link, '_blank');
    }

    render() {
                
        let tables = '';

        if (this.props.data.length > 0) {
            tables = this.props.data.map((errorData, index) => {
                return <Table headers={[errorData.header]} data={[errorData.data]} key={index} />
            });
            
        }

        return (
            <div className="row usa-da-validate-item-bottom-section">
                <div className="row usa-da-validate-error-report">
                    <div className="row center-block">
                        <div className="col-md-10">
                            <h3>Header Error Report</h3>
                        </div>
                        <div className="col-md-2">
                            <button onClick={this.openWindow.bind(this)} className="usa-button-secondary">Download Error Report</button>
                        </div>
                        <div className="col-md-12">
                            {tables}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ValidateDataErrorReport.propTypes = propTypes;