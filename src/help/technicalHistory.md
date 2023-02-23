#### January 31, 2023{section=technical}
In this release of the Broker, we:

* No additional technical notes.

#### January 10, 2023
In this release of the Broker, we:

* Documented the new `zips_historical` table to be used for accurately deriving congressional districts.
* Resolved a minor bug with the date pickers regarding fiscal years.

#### December 20, 2022
In this release of the Broker, we:

* Updated FABS derivations to properly populate congressional districts based on current or historical zips data.
* Resolved potential issues and improved performance for the zip loader.
* Fixed a minor issue with default submission dates for periods 1-3.

#### November 29, 2022
In this release of the Broker, we:

* No additional technical notes.

#### November 18, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Renamed several columns in the `AwardProcurement` and `PublishedAwardProcurement` models and tables per the D1 updates.

#### November 8, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* On the day following the close of the GTAS reporting window for each period we receive a file (`gtas_status`) from GTAS with a list of failed edits in that system. This file includes details on the impacted TAS, the severity level of the edit (severity with domain values Fatal or Proposed), the status of the edit (`atb_submission_status` with domain values F = failed, C = certified, E = passed edits but not certified, P = pending certification), and whether that edit has an approved override (`approved_override_exists` with Boolean domain values). We use this file to populate the GTASStatus field now available on the generated File A. A single TAS may have many GTAS edits in a period and thus appear multiple times in `gtas_status`, but each TAS only appears once in a Broker generated File A for a period. We use the first applicable rule to roll up `gtas_status` to the TAS and period level: 
    1.	If the selected FY and period have not started their submission window yet, then set GTASStatus to “GTAS window open”.
    2.	If a FY, period, and TAS combo exists in `gtas_status` with severity = Fatal AND approved_override_exists = False then set GTASStatus for that FY, period, and TAS combo to “failed fatal edit - no override”.
    3.	If a FY, period, and TAS combo exists in `gtas_status` with `atb_submission_status` = F AND severity = Fatal AND `approved_override_exists` = True then set GTASStatus for that FY, period, and TAS combo to “failed fatal edit – override”.
    4.	If a FY, period, and TAS combo exists in `gtas_status` with `atb_submission_status` = E AND severity = Fatal AND `approved_override_exists` = True then set GTASStatus for that FY, period, and TAS combo to “passed required edits – override”.
    5.	If a FY, period, and TAS combo exists in `gtas_status` with `atb_submission_status` = P AND severity = Fatal AND `approved_override_exists` = True then set GTASStatus for that FY, period, and TAS combo to “pending certification – override”.
    6.	If a FY, period, and TAS combo exists in` gtas_status` with `atb_submission_status` = C AND severity = Fatal AND `approved_override_exists` = True then set GTASStatus for that FY, period, and TAS combo to “certified – override”.
    7.	If a FY, period, and TAS combo exists in `gtas_status` set GTASStatus for that FY, period, and TAS combo to “passed required edits – override”.
    8.	If a FY, period, and TAS combo does not exist in `tas_failed_edits` AND the FY and period exist in `tas_failed_edits` then set GTASStatus to “passed required edits”.
    9.	If a FY and period don’t exist in `tas_failed_edits` then set GTASStatus to “”. This indicates that the TAS and period combo exist in the generated File A, but we do not have enough information to assign a value.

#### October 18, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Processed FY2023 DABS Reporting Schedule in the database.

#### September 23, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated FABS31.2.2 to stay as a warning for action dates prior to 10/01/2032.
* Updated validation rule text for FABS3.2, FABS3.4, and FABS45 for clarity.

#### September 6, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Renamed a shared log file from `logging.py` to `broker_logging.py` and updated its references throughout the repository for clarity and to address a sporadic library import conflict.
* Fixed a bug in the in the validation logic for rule B19 by padding 3-digit object classes to 4 digits with a trailing 0. For example, previously object class values 115 and 1150 were treated as distinct values for this rule. Now, these two representations of the same object class will both be treated as 1150 for validation. This change only applies to the validation rule and does not affect how object classes are stored in the database.
* Cleared duplicate error metadata from the database for data accuracy.

#### August 16, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated our agency sub-tier list for new sub-tiers appearing in the data.

#### July 26, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added tests for SF133 and failed TAS loaders for ensured accuracy.
* Added DEFC 7 to the list of accepted DEFC’s.

#### July 5, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated FABS derivations to support the new PPoP formats (`XXTS###` and `XX####T`).
* Added a new loader and table for storing certain TASs and their GTAS certification status for future use.


#### June 14, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated several dependencies for updating our Red Hat servers.
* Renamed all certified tables to their published equivalents in the code and database for clarity.
* Renamed the `d2_submission` column in the submission table to `is_fabs` for clarity.

#### May 24, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Renamed `DetachedAwardFinancialAssistance` and `PublishedAwardFinancialAssistance` models to `FABS` and `PublishedFabs` for clarity, both in the database and all its references throughout the code.

#### May 3, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Renamed duns table to sam_recipient and refactored all code referring to recipients as DUNS to be SAM Recipients.
* Updated File A Generation and A33.1 logic to account for more agencies and their groupings.
* Backfilled the "Entity Data Source" column in FPDS tables on the Broker.

#### April 12, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Fully transitioned the SAM loader, API interfaces, and SQL Rules to be based on the SAM UEI instead of the DUNS.
* Updated FABS, D1, D2, E, and F files to only include the recipient UEI and not the DUNS.
* Updated B12 to be a fatal error.

#### March 22, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added "Entity Data Source" to the FPDS loader and table to start accumulating data.
* Updated reverting functionality to include reverting comments files in addition to all the other submission files and data.

#### March 1, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated A36 to account for multiple amounts in SF133 grouped by the same TAS.
* Added deadline to the `latest_publication_period` endpoint.
* Improved the logout functionality to ensure users remain logged out until they log back in.

#### February 8, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Refactored and renamed all downloadable files on the Broker. See `dataactcore/models/lookups.py` for details.
* Renamed `current_user` to `active_user` to resolve a navigation issue.

#### January 14, 2022

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated multiple columns in the FPDS tables to be of type Boolean instead of Text to save on database space.
* Updated the database to store both when a submission starts publishing and when it finally publishes.

#### December 22, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Modified TAS loader to include TAS/Display TAS values when updating data.
* Updated program activity loader to export a public version of the data to be shared on the Data Sources page.
* Moved temporary FABS Business Categories SQL function to a more-permanent migration.
* Updated the quarter picker on the Generate File A page to display new periods on the first of the next month instead of waiting for the GTAS period to complete.

#### December 7, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated `check_status` to include progress indicators and filenames.

#### November 16, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added support for DEFC values X and Y.
* Updated SQL rules to ensure UEI checks are case-insensitive
* Added "Progress" column to the Jobs table and `check_status` in preparation for the upload and validation progress bars.
* Backfilled a significant portion of recipient data with their appropriate UEI values. 
* Updated FSRS loader to pull in UEI values.

#### October 26, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated External Load Date table with start and end time of most of the daily data loads.

#### September 30, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added Assurance Statements (now known as Agency Comments files) to the Raw Files page on the Broker.
* Updated subaward data to replace the two-character country codes with their three- character equivalents.

#### September 14, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added FY22 reporting window dates to the DABS database.
* Added 2 character country codes to the country code data table and updated Subaward data to use the new codes.

#### August 24, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated logic and/or descriptions to various rules related to the upcoming DAIMS 2.1 changes in October and November.
* Updated B9 logic to account for outlays with unknown program activity codes/names.

#### August 3, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added internal FABS recipient derivations based on recipient DUNS and recipient UEI in preparation for DAIMS 2.1.
* Updated File F generation to be more accurate and consistent when linking between FSRS and Award data.
* Dropped `awardee_or_recipient_uei_n` and `ultimate_parent_uei_name` from FPDS table and loader as they were considered duplicates.
* Backfilled/cleaned File B and C data to update the object class codes to the new standardized format.
* Updated the FABS derivation for ActionTypeDescription to support ActionType E and backfilled the FABS data with that type.
* Updated Rule Descriptions for A34 and B14 with minor fixes.

#### July 13, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Deprecated validation rule B18
* Removed all instances of DEFC 9 from the rules and code.
* Updated Rules B11 and B12 to account for the new Object Class updates
* Updated the shared object class file and loader to only support the 3-digit codes and their 4-digit equivalents suffixed with an additional zero.

#### June 22, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Renamed `tas_id` to `account_num` in the staging and certified tables.
* Added documentation for both the FABS and FPDS derivations.
* Updated the SF133 loader to allow more than single character DEFCs, resolve any unlinked SF133 data to TAS data, and conversely update any outdated TAS data in the SF133 data.
* Added `tas` and `display_tas` columns to `tas_lookup` for easier comparisons.

#### June 1, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added UEI columns (`ultimate_parent_uei_name`,`ultimate_parent_uei`,`awardee_or_recipient_uei_n`,`awardee_or_recipient_uei`) to `detached_award_procurement` used for FPDS.
* Added `transaction_obligated_amount` to the error/warning reports for rules C8 and C11 under `Source Value Provided` and `Difference` columns.
* Added `federal_action_obligation` to the error/warning reports for rules C9 and C12 under the `Source Value Provided` and `Difference` columns.
* Created and utilized a script to move agency files in S3 for agency code changes.

#### May 18, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated backend packages to address potential security issues.
* Updated the DUNS Loaders to support the new SAM REST API instead of the SFTP/WSDL services.
* Added UEI columns (`uei`, `ultimate_parent_uei`) to the `duns` table to begin the transition from DUNS to UEI SAM as the authoritative identifier for recipients.

#### May 3, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated Federal Hierarchy loader to process inactive offices and run on incremental updates.
* Preventing users from starting revalidation while a job is still running.

#### April 19, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Renamed `tas_id` to `account_num` in SF133 table for database clarity.
* Cleared out error messages in the database when restarting or preparing jobs to run to improve database clarity.
* Removed/updated a couple packages to enhance security and docker setup.

#### April 5, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Resolved a minor FE bug with total obligations when reverting.
* Updated the error state messages of the DABS Review page.

#### March 19, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updating the DUNS loader to support loading in values from a specific date.
* Trimming database of text values of any spaces before or after the text value.
* Updated a couple SQL rule comments for clarity and the logic of FABS 38.2.2 to only apply for financial assistance funding offices and not contracting funding offices.

#### March 8, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Removed the following deprecated endpoints:
    * POST version of get\_fabs\_meta
    * POST version of get\_certified\_file
    * /v1/submission/<submission\_id>/report_url
* Updated various external loaders to strip/trim incoming data for data accuracy.

#### February 22, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated the DABS Review page to calculate Total Obligations from File C upon loading instead of when loading the page to improve on the page performance with larger submissions.
* Updated the DABS reporting schedule accounting for holidays.
* Both on the frontend and API users must publish and certify using only monthly submissions starting from FY22 on. All quarterly submissions from that point on will be automatically converted to test submissions.

#### February 8, 2021

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added support for overall submission comments.
* Added 'R' to COVID-19 DEFCs in file stored in the repository.

#### January 26, 2021

In this release, no additional technical notes are provided.

#### January 12, 2021

In this release, no additional technical notes are provided.

#### December 23, 2020

In this release, no additional technical notes are provided.

#### November 30, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Program Activity Code and Name are now required for File C
* Updated logic of rules C20, C21, and C26 for accuracy.
* Removed the FY20 reporting schedule link from the Help page.

#### November 17, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Backfilled `display_tas` and FY17Q2 data in sf133 and certified tables.
* Added more dynamic variables to config for environment changes.

#### November 2, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added FY21 Submission window schedule to the database.
* Updated the design of the maintenance page when deploying the API.
* Reloaded Agency table in the database.

#### October 19, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Broker application is now supported by Python 3.7. For developers, please rebuild your docker images or local environment to run with this new version.
* Reorganized the API documentation from the README in thedataactbrokerdirectory to thedocsdirectory. Additionally, each endpoint has been moved to an individual file as API contracts.
* Updated the uploaded file count to exclude blank rows.
* The following endpoints will be deprecated soon and replaced with newer endpoints
   * GET /v1/submission/<submission\_id>/report\_url/ -> GET /v1/report\_url/
   * POST /v1/get\_fabs\_meta/ -> GET /v1/get\_fabs\_meta/
   * POST /v1/get\_certified\_file/ -> GET /v1/get\_certified\_file/
* Updated the messages of /v1/check\_current\_page/ for accuracy.

#### October 5, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated frontend behavior to prevent potential workflow bugs when publishing submissions.
* Updated frontend behavior when making submissions to immediately notify users that a published submission already exists for that agency and period.
* Updated frontend behavior to immediately detect and notify users when they are uploading an invalid file type (i.e. not csv or txt).
* Updated delete submission functionality to include removing stored submission files.

#### September 21, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated submission\_metadata’s “Last Modified” values to match what is displayed on the Submission Table.
* Updated front-end behavior various DABS pages when a submission is reverting to prevent potential issues.

#### September 4, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Renamed database tables and fields for clarity.
* Updated publishing status to prevent duplicate published data.
* Updated backfilling business categories script to account for transactions with multiple business types.
* Created DEFC table to store DEFC values to be used for rules B24 and C25.
* Added submission type filter to the list submissions endpoint.
* Added a day to the publish and certification deadlines as the deadline is the night of that date.

#### August 10, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Significantly improved the performance of FABS derivations and publications by using SQL calls and compressed tables.
* Reworked the data ingesting process to be parallelized simultaneously to improve data validation performance.
* Reworked the processing of SQL validations to be batched to save on large batches of memory and help performance.

#### July 13, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated the Broker application workflow to allow publication/certification of monthly submissions (see dataactbroker/README.md for details)
    * Added the following endpoints:
        * `published_submissions` returns a list of published submissions for an agency and time period
    * Updated the following endpoints:
        * `upload_dabs_files` now accepts a `test_submission` flag when creating DABS submissions
    * Deprecated the following endpoints:
        * `check_year_quarter` which has now been replaced by `published_submissions
* Updated the Broker application workflow to separate publication and certification of DABS submissions (see dataactbroker/README.md for details)
    * Added the following endpoints:
        * `publish_dabs_submission` for only publishing monthly submissions
        * `certify_dabs_submission` for only certifying DABS submissions
    * Updated the following endpoints:
        * Renamed `latest_certification_period` to `latest_publication_period` for publications
        * Renamed `certify_submission` to `publish_and_certify_dabs_submission`
        * `list_submissions` now includes new data points related to the changes
        * `submission_metadata` now includes new data points related to the changes
        * Renamed `list_certifications` to `list_history` to include published data
        * `get_certified_file` now accepts `published_files_history_id`

#### June 1, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated submission metadata endpoint to include consistent date formats.

#### May 18, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Released DAIMS 1.4 on the Broker. Various changes can be found in the DAIMS release.
* Released the Active DABS Dashboard page, allowing certifiers to notice similar errors/warnings with their active submissions.
* Added Rule Settings modal, allowing certifiers to designate the significance and impact of each of the rules for their agency. These settings will be used for visualizations in the Active DABS Dashboard.

#### May 4, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated "list\_agencies" endpoint to filter out agencies based on the user's affiliations.
* Updated settings endpoints only to be accessible by DABS submitters/certifiers.

#### April 17, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Dropped outdated "fpds\_contracting\_offices" table.
* Added a “Reverting” publish status to prevent users from interrupting the reverting process.
* Updated older FABS records with outdated business types (‘00’, ‘01’, etc.).
* Updated FABS rules and derivations for data quality (FABS38, “legal\_entity\_congressional” when record type is “1”).

#### April 6, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Upgraded python library (psutil) for security updates
* Reworked linking between FSRS grants and FABS records to improve data quality.
* Added functionality to revert already certified and updated submissions back to when they were last certified, allowing users to further test submissions in a safe scenario.

#### March 20, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Created a "revert\_submission" endpoint which will allow users to revert an updated DABS submission to its last certified state.
* Created and backfilled CertifiedAwardProcurement and CertifiedAwardFinancialAssistance tables to be used for the "revert\_submission" endpoint.
* Updated README instructions for users installing the Broker.
* Users can create test submissions for the same agency and the same quarter despite the certified submission already existing. Note one cannot certify these test submissions.

#### March 9, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated FABS derivation for place\_of\_performance\_scope for accuracy.
* Dropped the constraint on users creating submissions via API for a period that is already certified. Users will still be unable to certify for these duplicate submissions.

#### February 24, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Refactored the data loading process used in multiple features, speeding up the performance two to three times in certain cases.
* Fixed FABS 2.2.1 error text for accuracy.
* Updated FABS derivations with record type “3” to account for “Place of Performance State Code”.

#### February 10, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Prevented users from re-uploading a FABS file while publishing.
* Updated DUNS, HistoricDUNS, and Subaward tables to properly store business types (and not their codes). This will update the File F "SubAwardeeBusinessTypes" column for grants.
* Added script to backfill FSRS records for data quality.

#### January 27, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Backfilled certified\_flex\_field table in preparation for future functionality.
* Added additional logging for uploading files for debugging purposes.
* Refactored the overall site's router to allow upgrading the React versions.
* Removed unused node packages for a cleaner installation process.
* Upgraded React version to be compatible with modern versions of React.

#### January 6, 2020

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added "PrimaryPlaceOfPerformanceScope" derivation for FABS records and script to backfill it. Note, this is not currently included in D2 files.
* Updated subaward pipeline to exclude aggregate records when sending to FSRS.
* Removed "submission\_narrative" endpoints. Please use "submission\_comment" endpoints instead displayed in the README.
* Updated API to make the trailing slash for each endpoint to be optional.
* Resolved various minor bugs.

#### December 16, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated submission_window table and “/window” endpoint to support dynamic banners of different types (informational and warning) and headers

#### December 2, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

Error/Warning Reports have been updated with the following to improve readability:

* Flex fields have been extracted from the "Field Names" and "Values Provided" columns and put into its own column labeled "Flex Fields".
* Added "Unique ID" column containing values unique to that rule to help identify specific rows.
* Added "Expected Value" column detailing the value expected for that error or warning.
* Added "Difference" column representing the difference(s) between the values provided and the values expected. Note: this will only be populated if both values are numerical.
* For cross-file reports:
  * Values are split between "Source Values" (provided) and "Target Values" (expected)
  * "Difference" column will be the difference(s) between the source and target values.
  * "Row Number" has been renamed to "Source Row Number".
  * "Source Flex Field" has been added representing the source flex fields.
  * Renamed columns to be singular and not plural for consistency.
* Any values with the string "None" have been replaced with a blank space.
* TAS values have been reformatted to match the format from USASpending.gov.

#### November 18, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Fixed minor front-end bug involving the drop-down agency lists displaying correctly and to address security reviews.

#### November 4, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated agency selectors on DABS pages to not include unaffiliated subtiers.
* Added endpoint "GET /v1/latest\_certification\_period/" which returns the latest quarter/fy of certifying DABS submissions.
* Added endpoint "POST /v1/get\_rule\_labels/" which returns a list of filtered rule labels.
* Added several endpoints to be used for the agency data dashboard (for trend analysis and listing error metadata).

#### October 21, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added "/v1/historic\_dabs\_summary" endpoint which surfaces submission data filtered by agencies and the fiscal periods. This will be used by the Agency Data dashboard soon to come.
* Updated permissions documentation with details on each role's available functionality.
* Updated frontend DAIMS link to the latest DAIMS 1.3.1 for accuracy.

#### October 7, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added documentation explaining permissions in the Broker and how they are set.
* Added incremental progress logs when publishing FABS files for clarity.
* Renamed submission narrative table and endpoints to comments. Note: the submission narrative endpoints are now deprecated and will be removed in a future release. Please use the following endpoints instead: 
    * /v1/get\_submission\_comments
    * /v1/update\_submission\_comments

#### September 20, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added endpoint (get\_comments\_file) which generates a file containing all the comments related to a submission.
* Updated the Subaward loader to link subawards to awards, specifically taking into account dashes in the award ids.

#### September 6, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Reworked DUNS loader to improve performance of reloading the entire dataset in a quick timeframe.
* Added historic_duns table for ease of reloading DUNS dataset.
* Added script to reload certified errors/warnings from older submissions.
* Added script to reload specific awards/transactions from FPDS.
* Updated script which corrected agency codes and names in transactions to support multiple subtier agency codes.

#### August 23, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added `place_of_perform_street` and `sub_place_of_perform_street` columns to the Subaward table.
* Created `certified_error_metadata` table to keep track of errors and warnings of certified submissions.
* Ensured that the `list_submissions` endpoint is accurate matching its `min_last_modified` with the submission's `last_modified` value.
* Added logs to incoming API requests to help track down specific errors.

#### August 9, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated FPDS loader to store "Additional Reporting" records in preparation for future DAIMS work.
* Updated the accuracy of file upload row counts, excluding the header and extra carriage returns.
* Improved the performance of cross-file rules A18 and A19.
* Updated Federal Hierarchy loader to include metrics on new CGAC’s, subtiers to be imported in order to update the unified agency list shared with USAspending.gov.
* Added functionality to generate pipe-delimited text files for D1 and D2.

#### July 29, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added additional metadata with uploads for easier tracking.
* Dropped the deprecated ExecutiveCompensation table (the DUNS table now includes this data).
* Removed dependency on the unified agency list's "FPDS Department ID" column.

#### July 15, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Reloaded agencies using the unified agency list to be shared between broker and USAspending API.
* Verified and updated the following SQL validation rules for FABS to be case-insensitive: 13, 14, 15, 16, 17, 18, 21, 23, 31.
* Verified and updated the logic of FABS derivations to be based on case-insensitive values.

#### June 28, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Optimized FSRS loader scripts for both daily FSRS updates, resolving unlinked subawards, and entirely rederiving Subaward data.
* Reordered elements in the unique FABS transaction key and included CFDA Number to the uniqueness.
* Added an upper index on afa_generated_unique for performance.

#### June 14, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated FSRS loader to populate Subaward data including derivations for File F and other FSRS data points.
* Updated FABS derivations and FPDS loader to include Executive Compensation data in transaction data.
* Updated underlying broker packages (Paramiko).

#### June 3, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Included quarterly revalidation threshold loader to further automate setup.
* Updated underlying broker packages (SQLAlchemy).
* Reincorporated Executive Compensation loader to the nightly cadence and stopped loading external data upon File E generation.

#### May 20, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated several underlying python packages (Jinja2, webargs, psutil, supervisord).
* Removed extraneous characters from CFDA reference data and updated CFDA loader to properly decode values.

#### May 6, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added metrics reports to multiple data loaders for analysis.
* Updated database and code to reflect changes in the Federal Hierarchy API (specifically the financial assistance office type).
* Updated country code loader to label U.S. Territories or Freely Associated States.

#### April 19, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated FPDS loader to generate an artifact detailing the metrics of the run for analysis.
* Updated CFDA loader to properly encode the source csv and provide cleaner data.

#### April 5, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated unique award keys in transaction data to be consistent with USAspending.gov.
* Updated the CFDA loader to pull from a common source shared with USAspending.gov.
* Removed deprecated `submit_detached_file` endpoint from the API. This should not affect Broker Inbound API users given that they do not use this endpoint.
* Fixed the logic of providing current fiscal quarter on the frontend.

#### March 25, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated `certify_submission` API endpoint documents to include new errors for standard quarterly revalidation thresholds and special revalidation thresholds. This rule checks the validation date and confirms the submission is certifiable.
* Modified the TAS loader to prevent loading any possible duplicates.
* Standardized unique award keys between Broker and USASpending.gov.
* Optimized File F generation for performance in memory and speed.

#### March 11, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Established quarterly revalidation thresholds to re-enforce user submission windows
* Generated unique award key values to help group award data and sync with USASpending.gov

#### February 25, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Optimized how downloadable files are generated for performance.
* Optimized USPS loader script to use temporary tables to not halt other operations.
* Improved performance of FABS 21 and FABS 23 validations.  

#### February 7, 2019

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Script and database migrations to store federal hierarchy office codes.
* Database migrations creating separate tables for certified DABS data.
* Refactors and database migrations improving the file generation workflow. 
* Database migration updating job file size from Integer to Big Integer for larger files.
* Enforce 1-minute timeout for generated downloads. 

#### November 30, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* A file added to the `generate_detached_file` endpoint, dates currently must be in quarter format.
* All scripts previously using camelCase format have been switched to under_score. 
* Update permissions check to allow for users with no permissions to access the Help pages.

#### November 1, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Database migration to include `unique_award_key` in the FPDS and FABS staging tables.
* Upgrade boto to boto3 and remove boto from the requirements.
* Move file type validation to before file upload.
* Enforce 30-minute session timeout.
* Update documentation and error handling.

#### October 11, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Replaced all download links with file.usaspending.gov proxy links.
* Script created to populate historical fields in the tas_lookup table. 
* Updated Flask from 0.11 to 1.0.2 and Werkzeug from 0.11.11 to 0.14.1.
* Begin migration from boto to boto3.
  * NOTE: boto and smart_open will no longer be used by the Broker after the next production deploy, all AWS interaction will be handled by boto3.

#### September 25, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Enforce uniqueness in the CFDA database table.
* Begin making code changes for a refactor of D generation file caching.
  * D file generations now check the cache before sending a message to the SQS queue.
* Update the fields required to make an IDV record unique. Script created to update the database contents to remove duplicated IDV records and those that should have been deleted historically.

#### September 5, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Add `user_id` filter to the `/v1/list_submissions` endpoint.
* Update `/v1/generate_file/` and `/v1/generate_detached_file/` to allow for D file generation by awarding agency or funding agency.
* Created `/v1/list_submission_users` to list names of users who have created submissions that the current user can see.
* Database migrations:
  * Add `agency_type` to the FileRequest and SQS table.
  * Add `dba_name` to the DUNS table.

#### August 22, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added a filter to the `/v1/list_submissions/` endpoint. Allows filtering by:
  * Submission IDs
  * Agency codes
  * File names
  * Last modified date range
* Made an update to the DUNS loader to not replace data if the retrieved column is empty.

#### August 2, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updates to the API documentation and README.
* Rename routes for clarity:
  * Replaced submit_files/ with upload_dabs_files/
  * Replaced upload_detached_file/ with upload_fabs_file/
* File uploads are directed through the API instead of using temporary credentials on the front end.

#### July 18, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Upgraded from boto to boto3.
* DB (alembic) migrations required for the ExternalDataLoadDate table.
* Made updates to the Program Activity loader to validate file contents.
* Made updates to the FPDS nightly loader to check for changes to the data as the load occurs.

#### July 5, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Limited permissions for Service Accounts to facilitate logging in via the inbound API
  * A service account will be capped at Edit only permissions for DABS and FABS. Service accounts will not be able to certify DABS or publish FABS submissions.
* Updated the check_status endpoint to limit functionality to only what is necessary to evaluate the status of the submission.

#### June 19, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Setup the local developer environment to use Docker containers
* New API endpoints
  * /v1/revalidation_threshold/ 
  * /v1/submission_data/
* USPS download script exits with status code of 3 and does not update the date when no data is found.
* Updated initialize.py to separate out the country codes from the “domain data” load.
* Always update a user’s name on login.

#### June 6, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* SQL validations updates corresponding with DAIMS v1.2 mop-up tasks
* Updates to configuration files to support DAIMS v1.2 mop-up tasks
* Alembic Migration for `SQSMockQueue` to include a file generation agency code
* Updated Validator application to handle file generation
* Updated `initialize.py`. Adding additional argument  to make a separate CFDA loading process for improve tracking data loads

#### May 18, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* SQL rule updates corresponding with DAIMS v1.2
* Updated Configuration Files for FABS
* New alembic migrations to support DAIMS v1.2 changes.
* Changes to the FPDS Loader to include new data and description columns per DAIMS v1.2
* Updates to `initialize.py` to load additional congressional districts from census 2000 within our load zip codes process per DAIMS v1.2 rules change.
* Updated file E and F loaders to include additional fields per DAIMS v1.2. 
* Adding additional parent DUNS loader to populate parent DUNS information to the DUNS table for and initial load and to the daily DUNS loader. Aids in adding parent DUNS information for FABS derivations per DAIMS v1.2.
* Renaming FABS file types to be consistent. Updated, lookup contents loaded in `initialize.py`  under the `-db` flag.

#### April 26, 2018

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


#### January 10, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Changes to the FPDS loader
* Alembic migrations
* New content in config.yml file
* SQL rule updates
* Submission-related functions from function_bag.py have been separated out to a submission_handler.py file
* Front end linter added to confirm code quality
* NPM update required to work with newer version of ES-lint. Newer ES-lint requires additional libraries which were added to the package.json. Jenkins params were updated (NPM 4 support removed) and added the command `npm update` to make sure the environment is as expected

#### November 30, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* SQL rule changes to improve performance
* Increased logging
* Modified D1 file caching to only clear after latest FPDS load
Note: there were no database migrations

#### September 28, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated DUNS loader to include original registration date
* Updated FABS validations to use DUNS original registration date
* Updated FABS to include FREC permissions

#### August 31, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Alembic migrations:
  * Modified frec, cgac and sub_tier_agency tables to accomodate FREC data
  * Added columns to detached_award_procurement
* Updated error messages for FABS validations
* Updated SQL rules, including renaming 'D' validations to 'FABS' validations
* Added new error types (rowCountError and fileTypeError)
* Updated FABS derivations and FPDS script to accommodate FREC agencies
* Updated FPDS loader script to pull csv extracts

#### August 17, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added legal entity location fields to published_award_financial_assistance
  * Added fields to detached_award_financial_assistance and published_award_financial_assistance to support historical FABS data
  * Added application type to submission_window
  * Added DUNS table
* Updated FABS data and loader to store historical changes
* Added DUNS historical data loader
* Created new frontend routes (home, landing, and help) to accommodate FABS submissions.


#### August 2, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added city, county, and state fields to published_award_financial_assistance
  * Created zip_city and states lookup tables
  * Created submission_window table and dropped gtas_submission_window
  * Removed legal_entity_congressional from detached_award_financial_assistance
  * Allowed submission.reporting_start_date and submission.reporting_end_date to be null
* Added FABS permissions
* Created new frontend routes (home, landing, and help) to accommodate FABS submissions.


#### July 19, 2017

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


#### July 5, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added country_code table
  * Added city_code table
* Added zip loader to initialize.py
* Added SQL rules related to PrimaryPlaceOfPerformance
* Modified csvReader to allow for newlines within fields


#### June 21, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added certify_files_history table
  * Added fr_entity_type and fr_entity_description fields to tas_lookup table
* Added list_certifications route for certification history
* Added get_certified_file route to generate link to download file from certification history
* Moved certified files to a subfolder named as certify_history_id
* Now copying warning files to certified-submission bucket on certification
* Added script to load historical FABS data


#### June 9, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added is_historical to published_award_financial_assistance table
  * Added awarding_agency_name, awarding_sub_tier_agency_n, funding_agency_name, and funding_sub_tier_agency_na to published_award_financial_assistance table
  * Created detached_award_procurement and fpds_update tables
  * Added cfda_title to published_award_financial_assistance
* Added check_current_page route
* Restricted front-end views and layout based on user permissions and response from check_current_page route
* Added logging within validations


#### May 24, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added cfda_program table
  * Added submission_updated_at_view view
* Added load_cfda.py to load CFDA data via FTP
* New SQL rules added


#### May 10, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Updated published_award_financial_assistance table
  * Added zips table
  * Updated detached_award_financial_assistance table
  * Updated published_award_financial_assistance table
* Added script to retrieve Zip Code data: readZips.py
* New SQL rules added
* Removed dependency on Celery & RabbitMQ

#### April 24, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migration: added executive_compensation table
* Updated config key from `awardee_attributes_file_name` to `executive_compensation_file_name`
* Updated `requirements.txt` to upgrade SQLAlchemy version from 1.0.9 to 1.1.9

#### April 12, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updates to SQL program activity validation rule
* Updates to the domain values for program activity
* Adding a column to sub-tier agency table -- will need to upgrade alembic head


#### March 15, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added check to restrict deleting a certified submission
* Added new route: [`/v1/certify_submission`](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/development/dataactbroker#post-v1certify_submission)
* Added new route: [`/v1/restart_validation`](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/development/dataactbroker#post-v1restart_validation))
* Updates to several sql rules


#### March 1, 2017

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* file_column table updates, will need to reinitialize the table
* New alembic migration revision added to include cascading on delete for all models associated with a submission (must run alembic upgrade head)
* Updates to several sql rules
* New API route: POST [`/v1/delete_submission`](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/development/dataactbroker#post-v1delete_submission)
