### August 2, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updates to the API documentation and README.
* Rename routes for clarity:
  * Replaced submit_files/ with upload_dabs_files/
  * Replaced upload_detached_file/ with upload_fabs_file/
* File uploads are directed through the API instead of using temporary credentials on the front end.

#### July 18, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Upgraded from boto to boto3.
* DB (alembic) migrations required for the ExternalDataLoadDate table.
* Made updates to the Program Activity loader to validate file contents.
* Made updates to the FPDS nightly loader to check for changes to the data as the load occurs.

#### July 5, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Limited permissions for Service Accounts to facilitate logging in via the inbound API
  * A service account will be capped at Edit only permissions for DABS and FABS. Service accounts will not be able to certify DABS or publish FABS submissions.
* Updated the check_status endpoint to limit functionality to only what is necessary to evaluate the status of the submission.

#### June 19, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Setup the local developer environment to use Docker containers
* New API endpoints
  * /v1/revalidation_threshold/ 
  * /v1/submission_data/
* USPS download script exits with status code of 3 and does not update the date when no data is found.
* Updated initialize.py to separate out the country codes from the “domain data” load.
* Always update a user’s name on login.

#### June 6, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* SQL validations updates corresponding with DAIMS v1.2 mop-up tasks
* Updates to configuration files to support DAIMS v1.2 mop-up tasks
* Alembic Migration for `SQSMockQueue` to include a file generation agency code
* Updated Validator application to handle file generation
* Updated `initialize.py`. Adding additional argument  to make a separate CFDA loading process for improve tracking data loads

#### May 18, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* SQL rule updates corresponding with DAIMS v1.2
* Updated Configuration Files for FABS
* New alembic migrations to support DAIMS v1.2 changes.
* Changes to the FPDS Loader to include new data and description columns per DAIMS v1.2
* Updates to `initialize.py` to load additional congressional districts from census 2000 within our load zip codes process per DAIMS v1.2 rules change.
* Updated file E and F loaders to include additional fields per DAIMS v1.2. 
* Adding additional parent DUNS loader to populate parent DUNS information to the DUNS table for and initial load and to the daily DUNS loader. Aids in adding parent DUNS information for FABS derivations per DAIMS v1.2.
* Renaming FABS file types to be consistent. Updated, lookup contents loaded in `initialize.py`  under the `-db` flag.

#### April 26, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* SQL rule updates
* New alembic migrations to support compilation of business categories
* Technical Improvements
    * Removed unused job types
    * Removed unused submission error/warning report endpoints
    * Config CSVs updated to only include relevant columns
    * Updated file_type values for D2 files to referend FABS instead of detached_award
    * Cleaned up sqlRules.csv to reduce redundancy
    * Removed unused pages from the frontend


#### January 10, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Changes to the FPDS loader
* Alembic migrations
* New content in config.yml file
* SQL rule updates
* Submission-related functions from function_bag.py have been separated out to a submission_handler.py file
* Front end linter added to confirm code quality
* NPM update required to work with newer version of ES-lint. Newer ES-lint requires additional libraries which were added to the package.json. Jenkins params were updated (NPM 4 support removed) and added the command `npm update` to make sure the environment is as expected

#### November 30, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* SQL rule changes to improve performance
* Increased logging
* Modified D1 file caching to only clear after latest FPDS load
Note: there were no database migrations

#### September 28, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated DUNS loader to include original registration date
* Updated FABS validations to use DUNS original registration date
* Updated FABS to include FREC permissions

#### August 31, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Alembic migrations:
  * Modified frec, cgac and sub_tier_agency tables to accomodate FREC data
  * Added columns to detached_award_procurement
* Updated error messages for FABS validations
* Updated SQL rules, including renaming 'D' validations to 'FABS' validations
* Added new error types (rowCountError and fileTypeError)
* Updated FABS derivations and FPDS script to accommodate FREC agencies
* Updated FPDS loader script to pull csv extracts

#### August 17, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added legal entity location fields to published_award_financial_assistance
  * Added fields to detached_award_financial_assistance and published_award_financial_assistance to support historical FABS data
  * Added application type to submission_window
  * Added DUNS table
* Updated FABS data and loader to store historical changes
* Added DUNS historical data loader
* Created new frontend routes (home, landing, and help) to accommodate FABS submissions.


#### August 2, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added city, county, and state fields to published_award_financial_assistance
  * Created zip_city and states lookup tables
  * Created submission_window table and dropped gtas_submission_window
  * Removed legal_entity_congressional from detached_award_financial_assistance
  * Allowed submission.reporting_start_date and submission.reporting_end_date to be null
* Added FABS permissions
* Created new frontend routes (home, landing, and help) to accommodate FABS submissions.


#### July 19, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Created frec table
  * Added frec to user_affiliation and submission models
  * Removed awarding_agency_code from detached_award_financial_assistance
  * Allowed submission.reporting_start_date and submission.reporting_end_date to be null
  * Created gtas_submission_window table
  * Added activation and expiration dates to excutive_compensation table
* Changed list_agencies and list_all_agencies routes to include FRECs
* Created get_frecs route to return a list of FRECs
* Created gtas_window route
* Added FREC permissions and allowing submission by FREC instead of cgac
* Added executive_compensation data load script


#### July 5, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added country_code table
  * Added city_code table
* Added zip loader to initialize.py
* Added SQL rules related to PrimaryPlaceOfPerformance
* Modified csvReader to allow for newlines within fields


#### June 21, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added certify_files_history table
  * Added fr_entity_type and fr_entity_description fields to tas_lookup table
* Added list_certifications route for certification history
* Added get_certified_file route to generate link to download file from certification history
* Moved certified files to a subfolder named as certify_history_id
* Now copying warning files to certified-submission bucket on certification
* Added script to load historical FABS data


#### June 9, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added is_historical to published_award_financial_assistance table
  * Added awarding_agency_name, awarding_sub_tier_agency_n, funding_agency_name, and funding_sub_tier_agency_na to published_award_financial_assistance table
  * Created detached_award_procurement and fpds_update tables
  * Added cfda_title to published_award_financial_assistance
* Added check_current_page route
* Restricted front-end views and layout based on user permissions and response from check_current_page route
* Added logging within validations


#### May 24, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added cfda_program table
  * Added submission_updated_at_view view
* Added load_cfda.py to load CFDA data via FTP
* New SQL rules added


#### May 10, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Updated published_award_financial_assistance table
  * Added zips table
  * Updated detached_award_financial_assistance table
  * Updated published_award_financial_assistance table
* Added script to retrieve Zip Code data: readZips.py
* New SQL rules added
* Removed dependency on Celery & RabbitMQ

#### April 24, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migration: added executive_compensation table
* Updated config key from `awardee_attributes_file_name` to `executive_compensation_file_name`
* Updated `requirements.txt` to upgrade SQLAlchemy version from 1.0.9 to 1.1.9

#### April 12, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updates to SQL program activity validation rule
* Updates to the domain values for program activity
* Adding a column to sub-tier agency table -- will need to upgrade alembic head


#### March 15, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added check to restrict deleting a certified submission
* Added new route: [`/v1/certify_submission`](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/development/dataactbroker#post-v1certify_submission)
* Added new route: [`/v1/restart_validation`](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/development/dataactbroker#post-v1restart_validation))
* Updates to several sql rules


#### March 1, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* file_column table updates, will need to reinitialize the table
* New alembic migration revision added to include cascading on delete for all models associated with a submission (must run alembic upgrade head)
* Updates to several sql rules
* New API route: POST [`/v1/delete_submission`](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/development/dataactbroker#post-v1delete_submission)
