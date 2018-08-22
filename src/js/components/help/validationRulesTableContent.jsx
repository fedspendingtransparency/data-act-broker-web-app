/**
 * validationRulesTableContent.jsx
 * Created by Emily Gullo 9/15/2016
 */

import React, { PropTypes } from 'react';
import $ from 'jquery';
import Reactable from 'reactable';
import Papa from 'papaparse';
import { generateProtectedUrls } from '../../helpers/util';
import DaimsMessage from './daimsMessage';

const propTypes = {
    type: PropTypes.string
};

const defaultProps = {
    type: ''
};

export default class ValidationRulesTableContent extends React.Component {
    constructor(props) {
        super(props);

        this.urlPromise = null;

        this.state = {
            data: [],
            validationRulesUrl: '#',
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
                    validationRulesUrl: urls['DAIMS_Validation_Rules_v1.2.1.xlsx']
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
        let message = <p>Here are validation resources for the DATA Act Broker Quarterly Submissions:</p>;
        let submissionProcess = 'information on the submission process';
        let type = 'DABS';

        if (this.props.type === 'fabs') {
            message = (
                <p>
                    Here are validation resources for the Reporting Submission Specification - Financial Assistance
                    Broker Submission (RSS-FABS)
                </p>
            );

            submissionProcess = 'explanations of how elements are derived based on FABS data, and information on the ' +
                'submission process (including corrections and deletions)';

            type = 'FABS';
        }

        return (
            <div className="usa-da-help-content">
                <div className="validation-table">
                    <h2>Validations</h2>
                    <DaimsMessage type={this.props.type} />
                    {message}
                    <ul>
                        <li>
                            <a
                                href={"https://community.max.gov/download/attachments/1324878095/" +
                                "DAIMS_Practices_Procedures_v1.2.pdf"}
                                target="_blank"
                                rel="noopener noreferrer">
                                DAIMS Practices & Procedures v1.2
                            </a>: contains file-wide practices, {submissionProcess},
                            validation rule source data, user management, technical procedures for formatting submission
                            files, etc.
                        </li>
                        <li>
                            <a
                                href={"https://github.com/fedspendingtransparency/data-act-broker-backend/tree/" +
                                "master/dataactvalidator/config/sqlrules"}
                                target="_blank"
                                rel="noopener noreferrer">
                                Broker SQL Validation Rules
                            </a>: the actual machine logic used in {type} validations. These SQL statements are based
                            directly on the {type} validation rules.
                        </li>
                        <li>
                            <a
                                href={this.state.validationRulesUrl}
                                target="_blank"
                                rel="noopener noreferrer">
                                DAIMS Validations Rules
                            </a>
                            : contains the validations rules for the RSS, along with a change log
                        </li>
                    </ul>
                    <Reactable.Table
                        className="table usa-da-table table-bordered"
                        data={this.state.data}
                        filterable={['Rule Detail']}
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
                        filterPlaceholder="Rule Detail Search..."
                        noDataText="No matching records found." />
                </div>
            </div>
        );
    }
}

ValidationRulesTableContent.propTypes = propTypes;
ValidationRulesTableContent.defaultProps = defaultProps;
