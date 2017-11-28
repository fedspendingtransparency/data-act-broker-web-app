/**
 * validationRulesTableContent.jsx
 * Created by Emily Gullo 9/15/2016
 */

import React, { PropTypes } from 'react';
import $ from 'jquery';
import Reactable from 'reactable';
import Papa from 'papaparse';
import { generateProtectedUrls } from '../../helpers/util.js';
import DaimsMessage from './daimsMessage.jsx';

const propTypes = {
    type: PropTypes.string
};

export default class ValidationRulesTableContent extends React.Component {
    constructor(props) {
        super(props);

        this.urlPromise = null;

        this.state = {
            data: [],
            validationRulesUrl: '#',
            domainValuesUrl: '#',
            type: this.props.type
        };
    }

    componentDidMount() {
        this.loadData(this.state.type);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.state.type) {
            this.loadData(nextProps.type);
            this.setState({
                type: nextProps.type
            });
        }
    }

    componentDidUpdate() {
        this.scrollToTop();
    }

    componentWillUnmount() {
        // cancel in-flight S3 signing requests when the component unmounts
        if (this.urlPromise) {
            this.urlPromise.cancel();
        }
    }

    loadData(type = 'fabs') {
        this.scrollToTop();

        // also load the remaining URLs
        this.urlPromise = generateProtectedUrls();
        this.urlPromise.promise
            .then((urls) => {
                this.setState({
                    validationRulesUrl: urls['DAIMS_Validation_Rules_v1.1.2.xlsx'],
                    checkList: urls['DAIMS_FABS_Validation_Checklist_v1.1.pdf']
                });
                this.urlPromise = null;
            });

        const fileName = type === 'fabs' ? './help/fabs_validations.csv' : './help/validations.csv';

        Papa.parse(fileName, {
            download: true,
            header: true,
            encoding: "UTF-8",
            complete: (results) => {
                // logic
                this.setState({
                    data: results.data
                });
            }
        });
    }

    scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    }

    render() {
        let message = (
            <p>
                Below is a cumulative table of validations in the RSS and IDD. The status column indicates
                whether they are currently implemented in the Broker. The table has been revised to match the latest
                Validations Rules spreadsheet, except for FABS. FABS validations are available in the downloadable file.
                The Validations Rules spreadsheet, with change log, is available for download.
                <a href={this.state.validationRulesUrl} target="_blank" rel="noopener noreferrer">Download file</a>;
            </p>
        );

        if (this.props.type === 'fabs') {
            message = (
                <div>
                    <p>
                        Here are validation resources for the Reporting Submission Specification - Financial Assistance
                        Broker Submission (RSS-FABS)
                    </p>
                    <ul>
                        <li>
                            <a href={this.state.checkList} target="_blank">Validation Checklist:</a> contains file-wide
                            practices, data element-level validation rule explanations, technical procedures for
                            formatting submission files, and a change log
                        </li>
                        <li>
                            <a href={this.state.validationRulesUrl} target="_blank">DAIMS Validations Rules:</a>
                            contains the validations rules for the RSS and IDD, along with a change log
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <div className="usa-da-help-content">
                <div className="validation-table">
                    <h2>Validations</h2>
                    <DaimsMessage type="validations" />
                    {message}
                    <Reactable.Table className="table usa-da-table table-bordered"
                        data={this.state.data} filterable={['Rule Detail']}
                        sortable={[
                            {
                                column: 'Rule Name',
                                sortFunction: (a, b) => {
                                    const reA = /[^a-zA-Z]/g;
                                    const reN = /[^0-9]/g;
                                    const aA = a.replace(reA, "");
                                    const bA = b.replace(reA, "");
                                    if (aA === bA) {
                                        const aN = parseInt(a.replace(reN, ""), 10);
                                        const bN = parseInt(b.replace(reN, ""), 10);
                                        if (aN === bN) {
                                            return 0;
                                        }
                                        return aN > bN ? 1 : -1;
                                    }
                                    return aA > bA ? 1 : -1;
                                }
                            }
                        ]}
                        filterPlaceholder="Rule Detail Search..." noDataText="No matching records found." />
                </div>
            </div>
        );
    }
}

ValidationRulesTableContent.propTypes = propTypes;
