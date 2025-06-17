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
        return (
            <div className="usa-da-help-content">
                <div className="resources-page">
                    <h2>Resources {this.props.type.toUpperCase()}</h2>
                    <p className="resources-page-content">
                        As part of Fiscal Service&#39;s efforts to provide GSDM and DAIMS documents in a single location
                        we have created a single GSDM/DAIMS Resource page on Data Broker. This page provides links to
                        agency-only documents (validation rules and SQL validation rules) and a link to the public site
                        for all other GSDM/DAIMS documents. This will ensure that links always point to the latest GSDM
                        documents.
                    </p>
                    <p className="resources-page-content">
                        The Governmentwide Spending Data Model (GSDM), formerly known as the DATA Act Information Model
                        Schema (DAIMS), gives an overall view of the hundreds of distinct data elements used to tell
                        the story of how federal dollars are spent. It includes artifacts that provide technical
                        guidance for federal agencies about what data to report to Treasury including the authoritative
                        sources of the data elements and the submission format. GSDM information is available on
                        the&nbsp;
                        <a
                            href="https://tfx.treasury.gov/data-transparency/gsdm"
                            target="_blank"
                            rel="noopener noreferrer">
                            GSDM page
                        </a>
                        &nbsp;of the Data Transparency site for the Bureau of the Fiscal Service.
                    </p>
                    <h5>Additional Data Broker Resources</h5>
                    <ul>
                        <li>
                            <a
                                href={`https://tfx.treasury.gov/data-transparency/resources`}
                                target="_blank"
                                rel="noopener noreferrer">
                                Resources for Federal Agencies
                            </a>
                            : quick links to the RSS, IDD, and Validation Rules.
                        </li>
                        <li>
                            <a
                                href={`https://github.com/fedspendingtransparency/data-act-broker-backend/tree/` +
                                    `master/dataactvalidator/config/sqlrules`}
                                target="_blank"
                                rel="noopener noreferrer">
                                Data Broker SQL Validation Rules
                            </a>
                            : the actual machine logic used in DABS and FABS validations. These SQL statements are based
                            directly on the DABS and FABS validation rules.
                        </li>
                        <li>
                            <a
                                href={`https://onevoicecrm.my.site.com/usaagencyresources/s/` +
                                    `gsdm-practice-and-procedures-files`}
                                target="_blank"
                                rel="noopener noreferrer">
                                The GSDM Practices & Procedures
                            </a>
                            &nbsp;contains agency best practices and special scenarios on how to submit, validate, and
                            understand the submission process to the Data Broker. This includes corrections and deletions,
                            validation rule source data, user management, technical procedures for formatting submission
                            files, etc.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

ResourcesContent.propTypes = propTypes;
ResourcesContent.defaultProps = defaultProps;
