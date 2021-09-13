/**
 * ResourcesContent.jsx
 * Created by Emily Gullo 9/27/16
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.string
};

const defaultProps = {
    type: ''
};

export default class ResourcesContent extends React.Component {
    render() {
        const content = (
            <div>
                <h5>Additional Broker Resources</h5>
                <ul>
                    <li>
                        <a
                            href={`https://www.fiscal.treasury.gov/files/data-transparency/` +
                                `daims-validation-rules-v2.0.xlsx`}
                            target="_blank"
                            rel="noopener noreferrer">
                  DAIMS Validation Rules
                        </a>
                : documents the business rules employed by the DATA Act
                Broker for field and cross-file validations.
                    </li>
                    <li>
                        <a
                            href={`https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/` +
                                `dataactvalidator/config/sqlrules`}
                            target="_blank"
                            rel="noopener noreferrer">
                  Broker SQL Validation Rules
                        </a>
                : the actual machine logic used in FABS validations.
                These SQL statements are based directly on the FABS
                validation rules.
                    </li>
                    <li>
                        <a
                            href={`https://community.max.gov/download/attachments/754091528/` +
                                `Practices-and-Procedures-v2.0.pdf?api=v2`}
                            target="_blank"
                            rel="noopener noreferrer">
                  DAIMS Practices &#38; Procedures
                        </a>
                : contains file-wide practices, explanations of how
                elements are derived based on FABS data, and information
                on the submission process (including corrections and
                deletions), validation rule source data, user
                management, technical procedures for formatting
                submission files, etc.
                    </li>
                </ul>
            </div>
        );

        return (
            <div className="usa-da-help-content">
                <div className="resources-page">
                    <h2>Resources {this.props.type.toUpperCase()}</h2>
                    <p className="resources-page-content">
                As part of Fiscal Service&#8217;s efforts to provide
                DAIMS documents in a single location we have created a
                single DAIMS Resource page on the Broker. This page
                provides links to agency-only documents (validation
                rules and SQL validation rules) and a link to the public
                site for all other DAIMS documents. This will ensure
                that links always point to the latest DAIMS documents.
                    </p>
                    <p className="resources-page-content">
                The DATA Act information Model Schema (DAIMS) gives an
                overall view of the hundreds of distinct data elements
                used to tell the story of how federal dollars are spent.
                It includes artifacts that provide technical guidance
                for federal agencies about what data to report to
                Treasury including the authoritative sources of the data
                elements and the submission format. DAIMS information is
                available on the&nbsp;
                        <a
                            href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html"
                            target="_blank"
                            rel="noopener noreferrer">
                  DAIMS page
                        </a>
                &nbsp;of the Data Transparency site for the Bureau of
                the Fiscal Service.
                    </p>
                    {content}
                </div>
            </div>
        );
    }
}

ResourcesContent.propTypes = propTypes;
ResourcesContent.defaultProps = defaultProps;
