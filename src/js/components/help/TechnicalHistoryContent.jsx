/**
 * TechnicalHistoryContent.jsx
 * Created by Jonathan Hill 04/02/19
 */

import React from "react";

export default class TechnicalHistoryContent extends React.Component {
    render() {
        const releaseStatement = (
            <p>
            In this release, here is a list of technical changes that may require
            infrastructure or database updates, or represents additional
            functionality.
            </p>
        );
        return (
            <div className="usa-da-help-content">
                <h2>Technical Notes Archive</h2>
                <h4 name="technical">March 11, 2019</h4>

                {releaseStatement}

                <ul>
                    <li>
                    Established quarterly revalidation thresholds to re-enforce user
                    submission windows.
                    </li>
                    <li>
                    Generated unique award key values to help group award data and sync
                    with USASpending.gov
                    </li>
                </ul>
                <h4 name="technical">February 25, 2019</h4>

                {releaseStatement}
                <ul>
                    <li>
                    Optimized how downloadable files are generated for performance.
                    </li>
                    <li>
                    Optimized USPS loader script to use temporary tables to not halt
                    other operations.
                    </li>
                    <li>Improved performance of FABS 21 and FABS 23 validations.</li>
                </ul>
                <h4 name="technical">February 7, 2019</h4>

                {releaseStatement}
                <ul>
                    <li>
                    Script and database migrations to store federal hierarchy office
                    codes.
                    </li>
                    <li>
                    Database migrations creating separate tables for certified DABS
                    data.
                    </li>
                    <li>
                    Refactors and database migrations improving the file generation
                    workflow.
                    </li>
                    <li>
                    Database migration updating job file size from Integer to Big
                    Integer for larger files.
                    </li>
                    <li>Enforce 1-minute timeout for generated downloads.</li>
                </ul>
                <h4 name="technical">November 30, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>
                    A file added to the <code>generate_detached_file</code>
                    endpoint, dates currently must be in quarter format.
                    </li>
                    <li>
                    All scripts previously using camelCase format have been switched to
                    under_score.
                    </li>
                    <li>
                    Update permissions check to allow for users with no permissions to
                    access the Help pages.
                    </li>
                </ul>
                <h4 name="technical">November 1, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>
                    Database migration to include unique_award_key in the FPDS and FABS
                    staging tables.
                    </li>
                    <li>Upgrade boto to boto3 and remove boto from the requirements.</li>
                    <li>Move file type validation to before file upload.</li>
                    <li>Enforce 30-minute session timeout.</li>
                    <li>Update documentation and error handling.</li>
                </ul>
                <h4 name="technical">October 11, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>
                    Replaced all download links with file.usaspending.gov proxy links.
                    </li>
                    <li>
                    Script created to populate historical fields in the tas_lookup
                    table.
                    </li>
                    <li>
                    Updated Flask from 0.11 to 1.0.2 and Werkzeug from 0.11.11 to
                    0.14.1.
                    </li>
                    <li>
                    Begin migration from boto to boto3.
                        <ul>
                            <li>
                            NOTE: boto and smart_open will no longer be used by the Broker
                            after the next production deploy, all AWS interaction will be
                            handled by boto3.
                            </li>
                        </ul>
                    </li>
                </ul>
                <h4 name="technical">September 25, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>Enforce uniqueness in the CFDA database table.</li>
                    <li>
                    Begin making code changes for a refactor of D generation file
                    caching.
                        <ul>
                            <li>
                            D file generations now check the cache before sending a message
                            to the SQS queue.
                            </li>
                        </ul>
                    </li>
                    <li>
                    Update the fields required to make an IDV record unique. Script
                    created to update the database contents to remove duplicated IDV
                    records and those that should have been deleted historically.
                    </li>
                </ul>
                <h4 name="technical">August 22, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>
                    Added a filter to the <code>/v1/list_submissions/</code> endpoint.
                    Allows filtering by:
                        <ul>
                            <li>Submission IDs</li>
                            <li>Agency codes</li>
                            <li>File names</li>
                            <li>Last modified date range</li>
                        </ul>
                    </li>
                    <li>
                    Made an update to the DUNS loader to not replace data if the
                    retrieved column is empty.
                    </li>
                </ul>
                <h4 name="technical">August 2, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>Updates to the API documentation and README.</li>
                    <li>
                    Rename routes for clarity:
                        <ul>
                            <li>Replaced submit_files/ with upload_dabs_files/</li>
                            <li>Replaced upload_detached_file/ with upload_fabs_file/</li>
                        </ul>
                    </li>
                    <li>
                    File uploads are directed through the API instead of using temporary
                    credentials on the front end.
                    </li>
                </ul>
                <h4 name="technical">July 18, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>Upgraded from boto to boto3.</li>
                    <li>
                    DB (alembic) migrations required for the ExternalDataLoadDate table.
                    </li>
                    <li>
                    Made updates to the Program Activity loader to validate file
                    contents.
                    </li>
                    <li>
                    Made updates to the FPDS nightly loader to check for changes to the
                    data as the load occurs.
                    </li>
                </ul>

                <h4 name="technical">July 5, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>
                    Limited permissions for Service Accounts to facilitate logging in
                    via the inbound API
                        <ul>
                            <li>
                            A service account will be capped at Edit only permissions for
                            DABS and FABS. Service accounts will not be able to certify DABS
                            or publish FABS submissions.
                            </li>
                        </ul>
                    </li>
                    <li>
                    Updated the check_status endpoint to limit functionality to only
                    what is necessary to evaluate the status of the submission.
                    </li>
                </ul>

                <h4 name="technical">June 19, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>
                    Setup the local developer environment to use Docker containers
                    </li>
                    <li>
                    New API endpoints
                        <ul>
                            <li>/v1/revalidation_threshold/</li>
                            <li>/v1/submission_data/</li>
                        </ul>
                    </li>
                    <li>
                    USPS download script exits with status code of 3 and does not update
                    the date when no data is found.
                    </li>
                    <li>
                    Updated initialize.py to separate out the country codes from the
                    “domain data” load.
                    </li>
                    <li>Always update a user’s name on login.</li>
                </ul>

                <h4 name="technical">June 6, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>
                    SQL validations updates corresponding with DAIMS v1.2 mop-up tasks
                    </li>
                    <li>
                    Updates to configuration files to support DAIMS v1.2 mop-up tasks
                    </li>
                    <li>
                    Alembic Migration for <code>SQSMockQueue</code> to include a file
                    generation agency code
                    </li>
                    <li>Updated Validator application to handle file generation</li>
                    <li>
                    Updated <code>initialize.py</code>. Adding additional argument to
                    make a separate CFDA loading process for improve tracking data loads
                    </li>
                </ul>

                <h4 name="technical">May 18, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>SQL rule updates corresponding with DAIMS v1.2</li>
                    <li>Updated Configuration Files for FABS</li>
                    <li>New alembic migrations to support DAIMS v1.2 changes.</li>
                    <li>
                    Changes to the FPDS Loader to include new data and description
                    columns per DAIMS v1.2
                    </li>
                    <li>
                    Updates to <code>initialize.py</code> to load additional
                    congressional districts from census 2000 within our load zip codes
                    process per DAIMS v1.2 rules change.
                    </li>
                    <li>
                    Updated file E and F loaders to include additional fields per DAIMS
                    v1.2.
                    </li>
                    <li>
                    Adding additional parent DUNS loader to populate parent DUNS
                    information to the DUNS table for and initial load and to the daily
                    DUNS loader. Aids in adding parent DUNS information for FABS
                    derivations per DAIMS v1.2.
                    </li>
                    <li>
                    Renaming FABS file types to be consistent. Updated, lookup contents
                    loaded in <code>initialize.py</code> under the <code>-db</code>{" "}
                    flag.
                    </li>
                </ul>

                <h4 name="technical">April 26, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>SQL rule updates</li>
                    <li>
                    New alembic migrations to support compilation of business categories
                    </li>
                    <li>
                    Technical Improvements
                        <ul>
                            <li>Removed unused job types</li>
                            <li>Removed unused submission error/warning report endpoints</li>
                            <li>Config CSVs updated to only include relevant columns</li>
                            <li>
                            Updated file_type values for D2 files to referend FABS instead
                            of detached_award
                            </li>
                            <li>Cleaned up sqlRules.csv to reduce redundancy</li>
                            <li>Removed unused pages from the frontend</li>
                        </ul>
                    </li>
                </ul>

                <h4 name="technical">January 10, 2018</h4>

                {releaseStatement}
                <ul>
                    <li>Changes to the FPDS loader</li>
                    <li>Alembic migrations</li>
                    <li>New content in config.yml file</li>
                    <li>SQL rule updates</li>
                    <li>
                    Submission-related functions from function_bag.py have been
                    separated out to a submission_handler.py file
                    </li>
                    <li>Front end linter added to confirm code quality</li>
                    <li>
                    NPM update required to work with newer version of ES-lint. Newer
                    ES-lint requires additional libraries which were added to the
                    package.json. Jenkins params were updated (NPM 4 support removed)
                    and added the command <code>npm update</code>
                    to make sure the environment is as expected
                    </li>
                </ul>

                <h4 name="technical">November 30, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>SQL rule changes to improve performance</li>
                    <li>Increased logging</li>
                    <li>
                    Modified D1 file caching to only clear after latest FPDS load Note:
                    there were no database migrations
                    </li>
                </ul>

                <h4 name="technical">September 28, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>Updated DUNS loader to include original registration date</li>
                    <li>
                    Updated FABS validations to use DUNS original registration date
                    </li>
                    <li>Updated FABS to include FREC permissions</li>
                </ul>

                <h4 name="technical">August 31, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    Alembic migrations:
                        <ul>
                            <li>
                            Modified frec, cgac and sub_tier_agency tables to accomodate
                            FREC data
                            </li>
                            <li>Added columns to detached_award_procurement</li>
                        </ul>
                    </li>
                    <li>Updated error messages for FABS validations</li>
                    <li>
                    Updated SQL rules, including renaming &lsquo;D&rsquo; validations to &lsquo;FABS&rsquo;
                    validations
                    </li>
                    <li>Added new error types (rowCountError and fileTypeError)</li>
                    <li>
                    Updated FABS derivations and FPDS script to accommodate FREC
                    agencies
                    </li>
                    <li>Updated FPDS loader script to pull csv extracts</li>
                </ul>

                <h4 name="technical">August 17, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    New alembic migrations:
                        <ul>
                            <li>
                            Added legal entity location fields to
                            published_award_financial_assistance
                            </li>
                            <li>
                            Added fields to detached_award_financial_assistance and
                            published_award_financial_assistance to support historical FABS
                            data
                            </li>
                            <li>Added application type to submission_window</li>
                            <li>Added DUNS table</li>
                        </ul>
                    </li>
                    <li>Updated FABS data and loader to store historical changes</li>
                    <li>Added DUNS historical data loader</li>
                    <li>
                    Created new frontend routes (home, landing, and help) to accommodate
                    FABS submissions.
                    </li>
                </ul>

                <h4 name="technical">August 2, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    New alembic migrations:
                        <ul>
                            <li>
                            Added city, county, and state fields to
                            published_award_financial_assistance
                            </li>
                            <li>Created zip_city and states lookup tables</li>
                            <li>
                            Created submission_window table and dropped
                            gtas_submission_window
                            </li>
                            <li>
                            Removed legal_entity_congressional from
                            detached_award_financial_assistance
                            </li>
                            <li>
                            Allowed submission.reporting_start_date and
                            submission.reporting_end_date to be null
                            </li>
                        </ul>
                    </li>
                    <li>Added FABS permissions</li>
                    <li>
                    Created new frontend routes (home, landing, and help) to accommodate
                    FABS submissions.
                    </li>
                </ul>

                <h4 name="technical">July 19, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    New alembic migrations:
                        <ul>
                            <li>Created frec table</li>
                            <li>Added frec to user_affiliation and submission models</li>
                            <li>
                            Removed awarding_agency_code from
                            detached_award_financial_assistance
                            </li>
                            <li>
                            Allowed submission.reporting_start_date and
                            submission.reporting_end_date to be null
                            </li>
                            <li>Created gtas_submission_window table</li>
                            <li>
                            Added activation and expiration dates to excutive_compensation
                            table
                            </li>
                        </ul>
                    </li>
                    <li>
                    Changed list_agencies and list_all_agencies routes to include FRECs
                    </li>
                    <li>Created get_frecs route to return a list of FRECs</li>
                    <li>Created gtas_window route</li>
                    <li>
                    Added FREC permissions and allowing submission by FREC instead of
                    cgac
                    </li>
                    <li>Added executive_compensation data load script</li>
                </ul>

                <h4 name="technical">July 5, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    New alembic migrations:
                        <ul>
                            <li>Added country_code table</li>
                            <li>Added city_code table</li>
                        </ul>
                    </li>
                    <li>Added zip loader to initialize.py</li>
                    <li>Added SQL rules related to PrimaryPlaceOfPerformance</li>
                    <li>Modified csvReader to allow for newlines within fields</li>
                </ul>

                <h4 name="technical">June 21, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    New alembic migrations:
                        <ul>
                            <li>Added certify_files_history table</li>
                            <li>
                            Added fr_entity_type and fr_entity_description fields to
                            tas_lookup table
                            </li>
                        </ul>
                    </li>
                    <li>Added list_certifications route for certification history</li>
                    <li>
                    Added get_certified_file route to generate link to download file
                    from certification history
                    </li>
                    <li>
                    Moved certified files to a subfolder named as certify_history_id
                    </li>
                    <li>
                    Now copying warning files to certified-submission bucket on
                    certification
                    </li>
                    <li>Added script to load historical FABS data</li>
                </ul>

                <h4 name="technical">June 9, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    New alembic migrations:
                        <ul>
                            <li>
                            Added is_historical to published_award_financial_assistance
                            table
                            </li>
                            <li>
                            Added awarding_agency_name, awarding_sub_tier_agency_n,
                            funding_agency_name, and funding_sub_tier_agency_na to
                            published_award_financial_assistance table
                            </li>
                            <li>Created detached_award_procurement and fpds_update tables</li>
                            <li>Added cfda_title to published_award_financial_assistance</li>
                        </ul>
                    </li>
                    <li>Added check_current_page route</li>
                    <li>
                    Restricted front-end views and layout based on user permissions and
                    response from check_current_page route
                    </li>
                    <li>Added logging within validations</li>
                </ul>

                <h4 name="technical">May 24, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    New alembic migrations:
                        <ul>
                            <li>Added cfda_program table</li>
                            <li>Added submission_updated_at_view view</li>
                        </ul>
                    </li>
                    <li>Added load_cfda.py to load CFDA data via FTP</li>
                    <li>New SQL rules added</li>
                </ul>

                <h4 name="technical">May 10, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    New alembic migrations:
                        <ul>
                            <li>Updated published_award_financial_assistance table</li>
                            <li>Added zips table</li>
                            <li>Updated detached_award_financial_assistance table</li>
                            <li>Updated published_award_financial_assistance table</li>
                        </ul>
                    </li>
                    <li>Added script to retrieve Zip Code data: readZips.py</li>
                    <li>New SQL rules added</li>
                    <li>Removed dependency on Celery & RabbitMQ</li>
                </ul>

                <h4 name="technical">April 24, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>New alembic migration: added executive_compensation table</li>
                    <li>
                    Updated config key from <code>awardee_attributes_file_name</code> to
                        <code>executive_compensation_file_name</code>
                    </li>
                    <li>
                    Updated <code>requirements.txt</code> to upgrade SQLAlchemy version
                    from 1.0.9 to 1.1.9
                    </li>
                </ul>

                <h4 name="technical">April 12, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>Updates to SQL program activity validation rule</li>
                    <li>Updates to the domain values for program activity</li>
                    <li>
                    Adding a column to sub-tier agency table -- will need to upgrade
                    alembic head
                    </li>
                </ul>

                <h4 name="technical">March 15, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>Added check to restrict deleting a certified submission</li>
                    <li>
                    Added new route:{" "}
                        <a href="https://github.com/fedspendingtransparency/data-act-broker-backend/tree/development/dataactbroker#post-v1certify_submission">
                            /v1/certify_submission
                        </a>
                    </li>
                    <li>
                    Added new route:{" "}
                        <a href="https://github.com/fedspendingtransparency/data-act-broker-backend/tree/development/dataactbroker#post-v1restart_validation">
                            /v1/restart_validation
                        </a>
                    </li>
                    <li>Updates to several sql rules</li>
                </ul>

                <h4 name="technical">March 1, 2017</h4>

                {releaseStatement}
                <ul>
                    <li>
                    file_column table updates, will need to reinitialize the table
                    </li>
                    <li>
                    New alembic migration revision added to include cascading on delete
                    for all models associated with a submission (must run alembic
                    upgrade head)
                    </li>
                    <li>Updates to several sql rules</li>
                    <li>
                    New API route: POST{" "}
                        <a href="https://github.com/fedspendingtransparency/data-act-broker-backend/tree/development/dataactbroker#post-v1delete_submission">
                            /v1/delete_submission
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
