#### January 27, 2020{section=changelog}
In this release of the Broker, we:

* Fixed minor bug on date picker for detached File A generation to display the correct available periods for file generation.
* Fixed bug on Error and Warning report where Difference column returned incorrect amount due to a wrong sign in a calculation.
* Updated pagination component on DABS Dashboard and updated table spacing.

#### January 6, 2020
In this release of the Broker, we:

* Fixed several minor display issues experienced by Internet Explorer users.
* Fixed a bug where some users would have the same agency name displayed twice when filtering by agency.
* Introduced pipe delimited file format for generating files D1 and D2 within the submission context. If a user plans to download the D1/D2 files after generation then they should select which format they want when entering the dates and the Awarding or Funding option. This choice determines what file type gets stored with the submission and would be the format for the file if downloaded at any point in the future. If a different file format is desired at a later time, the user would need to regenerate the file(s) in order to download that format. If there is no intent to download the files, either choice is acceptable as the Broker internally processes both file types the same.  The pipe delimited file format is also available in the detached file generation context. 
* The interface for selecting to generate D1 and D2 by either Awarding or Funding agency was updated to radio buttons to better indicate which selection was being made and to match the new pipe delimited file format interface.
* The beginning and ending dates the user entered when generating D1 and D2 files are now captured in the file name.

#### December 16, 2019
In this release of the Broker, we:

* Fiscal Year 2020 DABS Reporting Schedule published on Help page.
* Users with DABS Read Only permissions are now able to generate detached File A and detached Files D1 and D2 from the Broker landing page for all agencies.  Read Only user will still not be able to generate D files within an agency submission.
* Released the Agency Data Dashboard on DABS.  This is a new page that will allow users to graphically see data about historical agency submissions and allow them to filter results to help identify warning trends for their agency. 

#### December 2, 2019
In this release of the Broker, we:

* Deployed updates to Error and Warning reports. Users will need to start a new submission or regenerate reports for existing submissions to see the new format.  See Technical Notes for summary of changes.
* Updated documentation for the USPS zips table and ensured auto updates will take place at least monthly.

#### November 18, 2019
In this release of the Broker, we:

* Fixed title header alignment on DATA Act Broker initial landing page
* Fixed front end bug on DABS Upload & Validate page where if the user misspelled the name of the reporting agency while beginning a new submission, a page refresh would be required before being able to select a Monthly or Quarterly submission.

#### November 4, 2019
In this release of the Broker, we:

* Fixed DABS front end bug where refreshing the page while in the submission workflow caused users to be taken to the furthest step the submission had reached rather than remaining on current page.
* Completed front end work on FABS permissions to allow a non-publishing role.

#### October 21, 2019
In this release of the Broker, we:

* Updated FABS to properly show error message if attempting to navigate to an invalid submission ID.

#### October 7, 2019
In this release of the Broker, we:

* Added a Download Comments link on the Review & Publish page in DABS where all entered comments on submission files can be downloaded on a single file.
* Fixed a bug on DABS where, in a few cases, the same Warning Code would be displayed on more than one line in the Warning Table and Tree Map.  While the total number of Warnings was correct, it now shows on one line for each Warning Code in all cases. In addition, historical submissions that had this issue also now display each Warning Code as one line. 
* Fixed calculation on Review & Publish page to show correct Total File Size.
* Updated API to return error message when attempting to upload a Monthly Submission and a range of months was set in the parameters.   
* Updated name of Broker table submission\_narrative to file\_comment for internal consistency.  This resulted in new API endpoints. Previous endpoints were deprecated and scheduled for removal. API users should review API documentation.

#### September 20, 2019
In this release of the Broker, we:

* Updated DABS handling of comments provided for files at the time of certification.  Comments for all files are now provided in one file that can be downloaded from the Submission History page, as well as via API.  Previously Certified submissions that had comments provided have been backfilled on the Submission History page to provide this file for those submissions.  As part of this update, if comments on a certified submission are added or modified after certification, the submission status will change to Needs Recertification and this file will only update once submission is (re)certified.

#### September 6, 2019
In this release of the Broker, we:

* Fixed a bug in FABS where after publishing a file and then navigating to upload a new file the upload file box wasn’t resetting and displayed the last published file name.
* Corrected an issue where the Broker was not always redirecting when users entered a new Submission ID in the URL. Users can now enter valid FABS or DABS Submission ID’s in the URL while viewing another Submission and be taken to the requested submission. Users will be notified to navigate to FABS first when they are currently viewing a DABS Submission and enter a FABS Submission ID, and vice versa. User will also be shown an error message if attempting to navigate to a deleted or nonexistent Submission ID.  

NOTE: This change updates the DABS URL structure and any saved shortcuts to historical Submissions will no longer work with the old URL structure.  Users can filter by Submission ID in the Broker or navigate to the historical Submission ID by entering it in the current URL line if they want to view previous Submissions.  Or simply append ‘/submission/1234’ (where 1234 is the Submission ID) to the Broker URL to navigate to the desired Submission.  

#### August 23, 2019
In this release of the Broker, we:

* Updated DABS to store errors and warnings associated with certified submissions to allow for easier queries and to better position the data for future use.
* Added samples to the API documentation for readability and clarity.
* Added additional columns to the Federal Hierarchy export for a fuller representation of the data.
* Updated the warning text shown to users when deleting a submission.

#### August 9, 2019
In this release of the Broker, we:

* Updated DABS and FABS row count on uploaded/generated files to only display the number of rows of data and clarified the text to make this clear.
* Updated functionality for ‘Last Modified’ filter on the DABS and FABS Submission Dashboards to limit selectable date ranges to periods where data exists.
* Added new SubTier 97CY to unified agency list.
* Default sorting of certified submissions on DABS Submission Dashboard updated to ‘Last Modified’ column so the most recent certified submission shows at top of list regardless of the period being certified.

#### July 29, 2019
In this release of the Broker, we:

* Updated FABS to allow deletion of previously published records with only the unique combination of FAIN, AwardModificationAmendmentNumber, URI, CFDA_Number, and AwardingSubTierAgencyCode elements needing to be provided on the submission file (along with a CorrectionDeleteIndicator of ‘D’).
* Updated file header validation to only process the DAIMS Data Element Label name or the Terse 30 Label as valid header name. All other header names will be ignored and not processed as data.
* Updated the on screen Header Error report and downloadable Header Error report to return the DAIMS Data Element Label that is missing and not the terse name for clarity.
* Updated checks in FABS for ActionType to ensure it is not case-sensitive.

#### July 15, 2019
In this release of the Broker, we:

* Updated cross file validation between FAIN/URI/PIID/Parent PIID between C and D1/D2 to ensure it is not case-sensitive.
* Updated checks in FABS for BusinessTypes, Country Codes, duplicate Awards, and SubTier Codes to ensure they are not case-sensitive.
* Updated Subaward/Prime Award matching to ensure matching is not case-sensitive.
* Consolidated multiple back-end agency lists into a single unified agency list and updated all back-end references and code to use this new consolidated list.

#### June 28, 2019
In this release of the Broker, we:

* Updated File F generation process to make use of Broker backend updates implemented in the prior release.  This allows for Broker based generation of File F without need for external query each time.
* Updated FABS check for duplicate transactions to no longer be case sensitive.  Also, ensured Office Codes and Primary Place of Performance Code are not case sensitive.
* Updated unique transaction key to allow reporting of multiple CFDA Programs in FABS.  Updated related FABS2 rules text to include CFDA Program.
* Updated country code list used by Broker to GENC 3.0 update 10.
* Fixed a frontend bug where any key press would trigger certain buttons on the Broker when they had tab focus.
* Updated the Broker to respond to the IAE Federal Hierarchy splitting the funding office flag into assistance funding and contract funding flags.

#### June 14, 2019
In this release of the Broker, we:

* Backend updates to implement DAIMS 1.3.1 changes related to File F, and pave the way for unified, Broker-based approach to subaward data in USAspending
* Improved how the Broker uses and stores Executive Compensation data so that File E can be generated from an internal table (updated daily) rather than an ad-hoc SAM WSDL query. Executive Compensation data is now stored transactionally with contracts and assistance data for easier and more accurate surfacing on USAspending. Backfilled this executive compensation data at the transactional level (at the time of award) where historical EC data was available in SAM SFTP service. 

#### June 3, 2019
In this release of the Broker, we:

* Made the Reporting Period column of Certified Submissions on the DABS Submission Dashboard sortable to allow viewing certified submissions chronologically.
* Updated how the DABS backend handles DUNS file loads and File E generation for improved efficiency.
* Added General Ledger Post Date to the Award Financial File C in DABS as indicated in DAIMS 1.3.1 for FY2019 Quarter 3. This is an optional field, but, consistent with longstanding DAIMS requirements, agencies must include it as a header in File C from this point forward.

#### May 20, 2019
In this release of the Broker, we:

* Updated domestic city and county codes and USPS ZIP Code data (including all derivations from ZIP such as congressional district mappings).  
* Updated FABS City Code table and automated update process.  
* Updated validation rules A7, A9, A10, and A11 to ensure proper handling of null values.
* Various backend process improvements with validator timeout/termination handling, and memory management.

#### May 6, 2019
In this release of the Broker, we:

* Updated FABS to accommodate an office type name change in Federal Hierarchy API.
* Modified the error file text output by the Broker for FABS19 and FABS24.2 to clarify why they trigger in certain edge cases. No code logic for these rules changed, only error text. 
* Updated DABS validation rule C11 to significantly improve processing time for large submission file sets.
* Backfilled FY19Q1 derived data elements in agency FABS submissions that relied on the Federal Hierarchy (office names, funding subtier code/name when not submitted and derivable, funding toptier code/name). No agency submitted data was altered, only derived elements that were previously blank (due to being received in FABS before agency data was completely loaded into the Federal Hierarchy).
* Added SubTier 4340 (new NEH SubTier) and 9505 (new STB SubTier) to Broker.

#### April 19, 2019
In this release of the Broker, we:

* In DABS, after clicking "Certify" and confirming, the “Certify” button is disabled and the text updated to indicate that certification is in progress.  This is to prevent users from accidentally clicking and certifying multiple times.
* Minor fix to the dropdown text on the File A Generation page, where the quarter indicators were previously misaligned in some cases; quarters now align to the appropriate period. 
* Updated the D1/D2 funding toggle within DABS to allow for separate toggle selections for D1/D2. This will provide agencies with the ability to choose 'funding' for one D file and 'awarding' for the other within DABS.

#### April 5, 2019
In this release of the Broker, we:

* Updated Broker Resource page to reference DAIMS v1.3.1 documents.
* Implemented DAIMS v1.3.1 changes to elements in File D1 and D2. Users who have scripts based on D1/D2 files should update them to match the D1/D2 elements and names in DAIMS v1.3.1.
* Updated Submission Dashboard to notify user if there are no submissions to display.
* Fixed edge-case issue with email sent after the creation of the DABS submission. These errors only occurred for agencies associated with a FREC. 
* Fixed small issue with line count inaccuracies in File A that occurred when extra carriage returns were present in the submission file.
* Fixed validation rule A34 to correctly generate a critical error when the BudgetAuthorityUnobligatedBalanceBroughtForward value is empty.
* Fixed download URL expiration issue for File A/D1/D2. Links are now generated upon click.
* Various backend changes and improvements surrounding job handling and memory management.

#### March 25, 2019
In this release of the Broker, we:

* Made edits to File F generation to align with changes in DAIMS v1.3.1
* Implemented the FABS38.2.2 validation rule from DAIMS v1.3.1.
* Renamed FABS38.2 to FABS38.2.1 to accommodate the new FABS38.2.2 validation rule.
* Implemented the FABS38.4.1 validation rule from DAIMS v1.3.1
* Renamed FABS38.4 to FABS38.4.1 to accommodate the new FABS38.4.2 validation rule. 
* Updated B9 Validation Rule to be case-insensitive when checking the program activity name/program activity code combination for the corresponding funding TAS/TAF.
* Fixed aberrant display box behavior that occasionally occurred when viewing with the visual summary information on errors or warnings for a submission.

#### March 11, 2019
In this release of the Broker, we:

* Updated the Broker so that DABS data cannot be certified prior to the opening of the DABS submission window. Such data can still be tested as normal. 
* Updated the Broker so data that was validated or generated prior to the opening of the certification window for a given quarter must be revalidated once the submission window for that quarter opens. This ensures that DABS validations are run against the full set of GTAS data) and that D files are not outdated for purposes of publication and cross-file validation.
* Minor UI improvement (display tweak to help page)

#### February 25, 2019
In this release of the Broker, we:

* Updated FABS 39.3, FABS41.1 and FABS41.2 so that they allow for valid city codes in the ####R format. Updated FABS39.1 to properly implement the city-code format check, and to allow for ####R format to be used.
* Updated generated D1/D2 filenames so they indicate whether they were generated by ‘funding’ or ‘awarding’ agency.
* Improved Broker error handling and on-screen display of error messages.
* Various UI improvements (UI for FABS submissions post-publication, UI tweaks to File A generation)
* Various backend process improvements with file generation, validator, certification tables, USPS data loader, and job handling

#### February 7, 2019
In this release of the Broker, we:

* Updated the Broker to implement the Federal Hierarchy validations and derivations described in DAIMS v1.3. Implemented a related one-time data enhancement that backfills office names from 10/1/2018 forward in FABS using provided office codes and the Federal Hierarchy.
* Updated the Broker File A Generation in DABS to be based on period rather than fiscal quarter (quarters can still be generated by selecting periods 03, 06, 09, and 12, so no functionality was lost).
* Updated Help section of the Broker to streamline it and reduce redundancies between it and the Fiscal Service DAIMS page (https://fiscal.treasury.gov/data-transparency/) and the Broker. 
* Various API documentation and error message improvements.
* Updated job file size limit and memory management to allow larger D1/D2 files to generate without issue.
* Various minor updates and improvements (Updated DABS Submission calendar document, Updated links to relaunched Fiscal Service Website, updated duplicate publication check to catch additional edge-case, improved special character handling in filenames and carriage return handling within data cells).

#### November 30, 2018
In this release of the Broker, we:

* Updated the Broker to generate a provisional File A for agencies that they may use as a submission starting point (though only certifying to it if they verify its accuracy and completeness) or for reconciliation purposes. File A generation is accessed from the DABS homepage and happens outside the submission context.
* Various API documentation and error message improvements.
* Various memory management fixes that were causing publishing submissions to hang in isolated cases.

#### November 1, 2018
In this release of the Broker, we:

* Updated Broker upload step to check the file type and only allow .CSV or .TXT (other file extensions will be rejected prior to uploading).
* The Broker now allows agencies to (optionally) generate File D1 and D2 by funding agency on both the detached File D page and within a submission.
* Added the last two filters to the Submission Dashboard pages. They allow filtering by the user that created the submission and the Last Modified Date of the submission.
* Reduced Broker user session timeout to a more reasonable timespan (30 minutes of inactivity).
* Various Broker Inbound API documentation improvements based on user feedback.
* Various minor bug fixes and improvements.

#### October 11, 2018
In this release of the Broker, we:

* Updated all Broker download URLs to use a .gov domain.
* Improved inbound API documentation, error handling, and error messages based on user feedback.
* Updated Broker generated D1/D2 File layout and casing so it is fully consistent with DAIMS.
* Various backend improvements in error handling, tools.

#### September 25, 2018

In this release of the Broker, we:

* Added frontend functionality to filter the Submission Dashboard by agency.
* Updated detached D file generation to immediately return cached files.

#### September 5, 2018

In this release of the Broker, we:

* Updated rule B9 (which checks that the provided TAS/Program Activity matches the authoritative source from OMB) so that users can submit or resubmit data for FY17Q2 or FY17Q3 without triggering a warning. Note that the rule is not applicable to this timeframe as the OMB BDR Program Activity process was not in place yet.
* Updated backend to improve the user experience and reduce instances of hung submissions.
* Made various backend improvements related to adding submission dashboard filters. Added the first two of these filters to the frontend, with the rest of the filters to come soon.
* Backend update to pave the way for a DAIMS v1.3 change allowing agencies to choose to generate D files based on funding agency (default will still be to generate by awarding agency, the current behavior).
* Fixed a bug that was preventing a new file from being generated in some cases when D1/D2 dates were changed.
* Updated the frontend so that it provided a better sense that file uploads were in progress.
* Corrected a minor bug in Firefox that affected file reuploads.

#### August 22, 2018

In this release of the Broker, we:

* Made various backend improvements related to an upcoming feature adding submission dashboard filters.
* Now that DAIMS documents are hosted in a single location on the Bureau of the Fiscal Service website, we streamlined the Broker help pages to reduce duplication of effort and the chance for documents hosted in multiple places to get out of sync. The Resources tab now includes a link to the aforementioned DAIMS section of the Fiscal Service website.

#### August 2, 2018

In this release of the Broker, we:

* Made various backend improvements related to the inbound API development work.

#### July 18, 2018

In this release of the Broker, we made the following updates:

* Made various backend improvements related to the inbound API development work.
* Updated Program Activity (PA) loader to detect new PA files, skip bad rows, and load updated PA files automatically into the Broker Validation database on a nightly basis as the data is updated in the OMB MAX Collect Exercise.
* Fixed a bug in rule B9 fiscal year and quarter validation.

#### July 5, 2018

In this release of the Broker, we made the following updates:

* Made various backend improvements related to the inbound API development work.
* Upload Corrected Files button on the cross-file page is no longer clickable unless there is a new file selected to be uploaded. 

#### June 19, 2018

In this release of the Broker, we made the following updates:

* Various backend improvements related to the inbound API development work.

#### June 6, 2018

In this release of the Broker, we

* Updated USPS zip code data used in Broker derivations and validations with that in USPS’s PostalPro product (https://postalpro.usps.com/address-quality-solutions/zip-4-product). We expect this will have a minimal but positive impact to agencies, since this is the most up-to-date ZIP database available. Agencies that purchase their own ZIP+4 product for internal validation purposes should take note.
* Various mop-up tasks related to DAIMS 1.2 Broker deploy (finished updating all hyperlinks throughout the Broker to DAIMS v1.2 documents, removed FiscalYearQuarterCorrection and LegalEntityAddressLine3 from DABS-generated D1/D2 files, reordered the elements in DABS-generated D1/D2 files to match DAIMS 1.2, and changed primaryplaceofperformancezip_4 header to primaryplaceofperformancezip+4 in DABS-generated D1/D2 files to conform with DAIMS).
* Fixed a minor bug with Broker navigation within the Help sections.
* Updated the subaward loader to check for PIID/FAIN with and without dashes when looking for award identifiers to match the FSRS records to.
* Because the Broker documentation has included two different terse labels (place_of_performance_zip4 and place_of_performance_zip4a) for PrimaryPlaceOfPerformanceZIP+4 over time, we updated the Broker to accept either.

#### May 18, 2018

In this release of the Broker, we implemented updates to both FABS and DABS to comply with the DATA Act Information Model Schema (DAIMS) v1.2. Click [here](https://community.max.gov/x/Dwn4Tg) to see the complete details regarding the [DAIMS v1.2](https://community.max.gov/x/Dwn4Tg) changes. 

See the FABS Resources and Validations pages for additional information to assist with your FABS submission.

See the DABS Resources and Validations pages for additional information to assist with your DABS submission.

Note: DABS and FABS submissions after May 18, 2018 must comply with DAIMS v1.2. This includes re-certifications of previous DABS submissions and updates to FABS submissions.

#### April 26, 2018

In this release of the Broker, we made the following updates:

 - Updated A33 so that it does not prompt warnings if financing accounts are not included in File A.
 - Updated rule C5 functionality so that it works similarly to B5.
 - Updated the functionality of C8, C11, and C23 so that they apply when ATA is the same as the AID (previously these rules were ignored whenever ATA was filled in, including when ATA was the same as the AID).
 - Corrected C9 so that it does not prompt warnings for awards with negative OriginalLoanSubsidyCost.
 - Note: FABS changes due to DAIMS v1.2 implementation will go live on May 18.

#### February 21, 2018

In this release of the Broker, we made the following updates:

 - [Update Historical DUNS](#/help?section=historicalduns)


#### Update Historical DUNS {section=historicalduns}
In this release of the broker we updated DUNS data to allow agencies to submit awards with historical (prior to 2014) DUNS information.

#### January 10, 2018

In this release of the Broker, we made the following updates:

 - [FABS 31.1 Rule Update](#/help?section=0110rule311)

 - [Update Database Fields](#/help?section=0110databaseUpdate)

 - [Update B9/B10 rules](#/help?section=0110ruleUpdate)

 - [Bug Fixes](#/help?section=0110bugs)


#### Update FABS rule 31.1 error message {section=0110rule311}
In this release of the broker we updated the language of FABS rule 31.1 to be more descriptive.

#### Update B9/B10 to check for 2016-2018 (changed from just 2016-2017) {section=0110ruleUpdate}
In this relase of the broker we have updated rules B9 and B10.

#### Bug Fixes {section=0110bugs}
In this release, the following bugs have been found and addressed
 - Users were unable to create a DABS submission if a FABS submission shared the same agency and action dates. 
 - Users were unable to start re-validation of certain submissions due to missing values in the API call. 
 - Users were unable to delete submissions that contain a cached D file.

#### December 22, 2017

In this release of the Broker, we made the following updates:

 - [Schema - Release DAIMS v1.2](#/help?section=daims12release)

 - [DATA Act Broker Submission Deadlines](#/help?section=dabsSubmissionsDeadlines)


#### Schema - Released DAIMS v1.2 {section=daims12release}
Treasury released the final DATA Act Information Model Schema (DAIMS) v1.2. DAIMS v1.2 is a minor update of the schema and addresses some agency feedback, implements policy requirements, promote additional data standardization and reduce agency burden. The release is targeted for implementation in production for the submission of FY 2018 Quarter 3 data. Find out more information in the [DABS Resources](#/resources) section.

#### DATA Act Broker Submission Deadlines {section=dabsSubmissionsDeadlines}
In this release of the Broker we published the DATA Act Broker submission deadlines for fiscal year 2018. You can find the submission calendar on the Help page.

#### November 30, 2017

In this release of the Broker, we made several improvements, including: 

- Making overall Broker performance improvements to improve validation times and D1/D2 file generation.
- Updating FABS so that flex fields in agency submission files appear in the warning and error files when the only error is a missing required element.
- Updating the FABS dashboard so that users can accurately sort on the “Published” status category. 
- Updating the DABS Upload & Validate error message to accommodate non-csv files.
- Updating the DABS reference tables to be up-to-date with the most recent program activity names/codes and Treasury Account Symbols. 


#### October 26, 2017

In this release of the Broker, we made improvements to Financial Assistance Broker Submission (FABS).

  - [FABS Improvements](#/help?section=fabsimprovements3)


##### FABS Improvements {section=fabsimprovements3}
In this release, we made several improvements to FABS, including:
- Updated the submission dashboard to include the agency file name; 
- Implemented a feature to prevent users from publishing duplicate data files; 
- Updated the FABS validations so that there is no header error in FABS for facevalueloanguarantee or facevalueofdirectloanorloanguarantee
- Updated validations so that no error (or warning) is triggered if PPOPCongressionalDistrict.


#### October 6, 2017

In this release of the Broker, we released the ability to generate D1/D2 files via the Broker and made improvements to the Financial Assistance Broker Submission (FABS).

  - [D1/D2 File Generation](#/help?section=dfilegeneration)
  - [FABS Improvements](#/help?section=fabsimprovements2)


##### D1/D2 File Generation {section=dfilegeneration}
In this release, we transitioned the backed infrastructure that is used to generate the D1/D2 files from the legacy USAspending.gov infrastructure to the Broker. D2 file generation will include agencies' FABS data. D1 file generation will be provided to the Broker via the FPDS-NG ATOM feed.


##### FABS Improvements {section=fabsimprovements2}
In this release, we made several improvements to FABS, including:
- Implemented the ability for FABS to derive FundingAgencyCode;
- Updated validations so that no error (or warning) is triggered if PPOPCongressionalDistrict is blank AND PPOPZIP+4 is 9 digits; and
- User interface improvements to prevent a user form encountering issues when clicking the "Publish" button.


#### September 28, 2017

In this release of the Broker, we released the draft DAIMS v2.0 and implemented DAIMS v1.1.

  - [Schema - Release Draft v2.0 and Implemented v1.1](#/help?section=releasedraftv2)
  - [FABS Improvements](#/help?section=fabsimprovements1)


##### Schema - Release Draft v2.0 and Implemented v1.1 {section=releasedraftv2}
Treasury released the draft DATA Act Information Model Schema (DAIMS) v2.0. DAIMS v2.0 is a major update of the schema and will be finalized in December 2017. Find out more information in the Resources section. In addition, Treasury implemented the DATA Act Information Model Schema (DAIMS) v1.1 including the transition of the Award Submission Portal (ASP) to the Financial Assistance Broker Submission (FABS).


##### FABS Improvements {section=fabsimprovements1}
Treasury released the draft DATA Act Information Model Schema (DAIMS) v2.0. DAIMS v2.0 is a major update of the schema and will be finalized in December 2017. Find out more information in the Resources section. In addition, Treasury implemented the DATA Act Information Model Schema (DAIMS) v1.1 including the transition of the Award Submission Portal (ASP) to the Financial Assistance Broker Submission (FABS).
#### September 20, 2017

In this release of the Broker, we launched the Financial Assistance Broker Submission (FABS).

  - [Launched Financial Assistance Broker Submission](#/help?section=fabsdevelopment3)

##### Launched Financial Assistance Broker Submission {section=fabsdevelopment3}
In this release, we launched the Financial Assistance Broker Submission (FABS). Users can now upload, validate, and publish their agency's financial assistance data to the Broker. Users can also test their financial assistance data and view previous submissions.

#### August 31, 2017

In this release of the Broker, we improved FABS and front-end navigation, and loaded historical data.

  - [Resolved issues found during FABS testing](#/help?section=fabsdevelopment2)
  - [Broker Improvements](#/help?section=frontendimprovements)
  - [Historical data load](#/help?section=Historicaldataload)

##### Resolved issues found during FABS testing{section=fabsdevelopment2}
In this release, FABS issues with certain data elements were fixed and the submission process was improved.

##### Front-end updates to improve navigation{section=frontendimprovements}
In this release, updates were made to FABS to improve user navigation and ease of use.

##### Historical data load{section=Historicaldataload}
In this release, legacy USAspending historical data from 2000 to 2016 was loaded to the Broker’s database.

#### August 17, 2017

In this release of the Broker, we continued to develop the Financial Assistance Broker Submission (FABS) as well as made improvements to the Broker submission process.

  - [Financial Assistance Broker Submission (FABS) Development](#/help?section=fabsdevelopment)
  - [Broker Improvements](#/help?section=brokerimprovements)

##### Financial Assistance Broker Submission (FABS) Development{section=fabsdevelopment}
In this release, we continued to develop and improve FABS. Specifically, we updated:
- validation rules related to legal entity (DUNS)
- derivations related to congressional district
- submission dashboard and navigation between FABS and quarterly DATA Act Broker Submission (DABS)
In addition, we implemented performance improvements to decrease the time it takes to validate a FABS file.

##### Broker Submission Improvements{section=brokerimprovements}

In this release, we implemented bug fixes related to program activity and D1/D2 file generation, as well as updated the Help content. We also continued to work on loading historical procurement and financial assistance data.

#### August 2, 2017

In this release of the Broker, we made improvements to Broker validations and submissions and implemented financial reporting entity code (FREC) functionality.

  - [Financial Assistance Broker Submission (FABS) Development](#/help?section=fabsdevelopment)
  - [Broker Submission Improvements](#/help?section=brokerimprovements)
  - [Shared Agency ID (AID)](#/help?section=frecsubmission)

##### Financial Assistance Broker Submission (FABS) Development{section=fabsdevelopment}

In this release, we continued to develop and improve FABS including validation rules and permissions.

##### Broker Submission Improvements{section=brokerimprovements}

In this release, agencies can submit U.S. territories and single-district states and their congressional districts without errors. We also improved place of performance address information derivation. Finally, we now display the start and end of GTAS submission periods.

##### Shared Agency ID (AID){section=frecsubmission}

In this release, agencies with a shared Agency ID (AID) can now report using financial reporting entity code (FREC) instead of AID.


#### July 19, 2017

In this release of the Broker, we made improvements to Broker validations, navigation, and user assistance, along with several other user enhancements.

  - [Financial Assistance Broker Submission (FABS) Development](#/history?section=fabsdevelopment)
  - [Broker Navigation & Assistance](#/history?section=brokernav)
  - [DAIMS v1.1 Updates](#/history?section=daimshelpupdate)

##### Financial Assistance Broker Submission (FABS) Development{section=fabsdevelopment}

Treasury released the DATA Act Information Model Schema (DAIMS) v1.1. DAIMS v1.1 is a minor update of the schema and will be implemented in production in the fall of 2017. Find out more information in the Resources section.

##### Broker Navigation & Assistance{section=brokernav}

In this release, we implemented improvements and fixed bugs related to the submission process. These updates include:

- D file with new lines generated without error: Users can now generate a D file that contains a new line and does not cause an error, allowing the submission to complete all cross file validations.
- Shared service providers testing submissions: Shared service providers can successfully log into the Broker to test submissions.
- Submission link correction: Users will be directed to the correct submission page without skipping any steps.
- Warnings for same-period submissions: User will be properly warned if they try to create a submission in the same period as a certified/updated submission. This way, users can understand what the error in their submission is.
- Permissions for "Delete Submission" button: Users with uploader rights will now be able to see the "trash can" deletion icon.

##### DAIMS v1.1 Updates{section=daimshelpupdate}

Treasury released the DATA Act Information Model Schema (DAIMS) v1.1. DAIMS v1.1 is a minor update of the schema and will be implemented in production in the fall of 2017. Find out more information in the Resources section.


#### July 5, 2017

In this release of the Broker, Treasury  released a schema update: DAIMS v1.1 as well as improvements to the submission process.updates were made so that users can generate D files without new line errors, improvements were made to submission links, logins, and error warnings, and deletion permissions were restored. Also, we released a schema update: DAIMS v1.1.

  - [Schema Release](#/history?section=schemarelease)
  - [Submission Improvements](#/history?section=submissionimprovements)

##### Schema Release{section=schemarelease}

Treasury released the DATA Act Information Model Schema (DAIMS) v1.1. DAIMS v1.1 is a minor update of the schema and will be implemented in production in the fall of 2017. Find out more information in the Resources section.

##### Submission Improvements{section=submissionimprovements}

In this release, we implemented improvements and fixed bugs related to the submission process. These updates include:

- D file with new lines generated without error: Users can now generate a D file that contains a new line and does not cause an error, allowing the submission to complete all cross file validations.
- Shared service providers testing submissions: Shared service providers can successfully log into the Broker to test submissions.
- Submission link correction: Users will be directed to the correct submission page without skipping any steps.
- Warnings for same-period submissions: User will be properly warned if they try to create a submission in the same period as a certified/updated submission. This way, users can understand what the error in their submission is.
- Permissions for "Delete Submission" button: Users with uploader rights will now be able to see the "trash can" deletion icon.


#### June 21, 2017

In this release of the Broker, we made updates to the submission dashboard to show previously certified files.

  - [Viewing all previously certified files](#/history?section=certhistory)

##### Viewing all previously certified files{section=certhistory}
In this release, we updated the Broker so that all users can view and download previous certifications. Users can also see warning files accompanied with the certifications.


#### June 9, 2017

In this release of the Broker, all users are now able to generate D files outside the context of a submission. We also implemented processing time improvements.

  - [Generating D files outside of a submission](#/history?section=generatedfile)
  - [Improved processing time](#/history?section=processingtime)

##### Generating D files outside of a submission{section=generatedfile}
In this release, we updated the Broker so that all users can generate D files outside the context of a submission regardless of the user's permissions.

##### Improved processing time{section=processingtime}
In this release, we implemented changes to improve the processing time so that high volume file validations can be completed in a timely manner.


#### May 24, 2017

In this release of the Broker, we added a certified data column to the submission dashboard, updated the warning/error reports to include the rule label, and updated the help page with information about the Service Desk.

  - [Certified date column in the submission dashboard](#/history?section=certifieddatecolumn)
  - [Rule label included in error and warning descriptions](#/history?section=rulelabeldesc)
  - [Service Desk information on help page](#/history?section=servicedeskinfo)

##### Certified date column in the submission dashboard{section=certifieddatecolumn}
In this release, we updated the submission dashboard so that users can see when the file was certified.

##### Rule label included in error and warning descriptions{section=rulelabeldesc}
In this release, we updated the error and warning reports so that users can view the rule label (i.e. A9) for each error or warning.

##### Service Desk information on help page{section=servicedeskinfo}
In this release, we updated the Help Page so that users can access information on the Service Desk under "Getting More Help."


#### May 10, 2017

In this release of the Broker, we rolled out functionality improvements for the cross-file validation processing time and a disabled upload button for users without upload or certify permissions.

  - [Display of Upload & Validate feature for users without upload permissions](#/history?section=permissions)
  - [Improved processing time](#/history?section=processing)

##### Display of Upload & Validate feature for users without upload permissions{section=permissions}
In this release, we updated the Broker so that only users in an agency's upload and certify permission group will see an active Upload & Validate button on the home page of the Broker.

##### Improved processing time{section=processing}
In this release, we implemented a solution to improve the processing time for cross-file validations.


#### April 26, 2017

In this release of the Broker, we rolled out functionality improvements for users to navigate to previously completed steps and a disabled certify button for users without certification permissions. We also added a link to the USAspending Service Desk on the Help page.

  - [Broker navigation between validation steps](#/history?section=navigation)
  - [Display of certify button for users without certification permissions](#/history?section=button)
  - [Service Desk link](#/history?section=servicedesk)

##### Broker navigation between validation steps{section=navigation}
In this release of the Broker, we implemented a functionality improvement for users to navigate to any previously completed step in the submission process.

##### Display of certify button for users without certification permissions{section=button}
In this release, we updated the Broker so that only users in an agency's certify permission group will see an active certify button on the final submission page of the Broker.

##### Service Desk link{section=servicedesk}
In this release, we added a link to the USAspending Service Desk on the Help page under "Getting More Help."


#### April 12, 2017

In this release of the Broker, we deployed the FY2017 Program Activity code list. We rolled out a bug fix for Program Activity and Object Class warnings and implemented a solution to improve the validation processing time, along with other improvements.

  - [FY 2017 Program Activity codes](#/history?section=pa17)
  - [Program Activity and Object Class warnings](#/history?section=paoc)
  - [Improved processing time](#/history?section=processingtime)
  - [Functionality improvements](#/history?section=functionality)

##### FY 2017 Program Activity codes{section=pa17}
In this release of the Broker, Treasury deployed the FY2017 Program Activity code list. You can access a copy of this list on [Github](https://github.com/fedspendingtransparency/data-act-broker-backend/blob/development/dataactvalidator/config/example_program_activity.csv). If you have questions or issues related to the list, please contact OMB at SpendingTransparency@omb.eop.gov.The new Program Activity list applies to the validation rules B9 and B10.

##### Program Activity and Object Class warnings{section=paoc}
In the previous version of the Broker, users received warnings for blank or 000/0000 Program Activity and Object Class fields for TASs that have no obligations or outlays. We updated the Broker to not issue warnings for B9, B10, B11, B12, and B18 in these cases.

##### Improved processing time{section=processingtime}
In this release, we implemented changes to improve the processing time of file validations.

##### Functionality improvements{section=functionality}
In this release, we made improvements to the submission dashboard and submission status. Specifically:

  - Updated the submission dashboard to show certified submissions that are updated but not re-certified with a status of "Updated (Needs Re-certification)".
  - Updated the final submission page so read-only users only see a disabled certify button.
  - Updated the Certified Submission table on the Submission Dashboard page to include a "Certified By" column.
  - Added a warning message so that a user is notified if they try to create a submission for the same period of a previously certified submission.


#### March 29, 2017

In this release of the Broker, agencies are now able to make changes to previously certified files. We also rolled out bug fixes for C9 and C12.

  - [Changes to previously certified files](#/history?section=certified)
  - [Error report fix](#/history?section=reportFix)
  - [C9 warning message](#/history?section=c9warning)
  - [C12 warning message](#/history?section=c12warning)

##### Changes to previously certified files{section=certified}
In this release of the Broker, agencies are now able to make changes to previously certified files. To update a previously certified submission, go to the submissions that you want to correct and upload the corrected files.  Go through the file validations and certify the corrected files.

##### Error report fix{section=reportFix}
In previous versions of the Broker, users experienced an issue with the error report not showing the same number of errors listed on the submission page. We rolled out a fix to correct this issue.

##### C9 warning message{section=c9warning}
In the previous version of the Broker, the C9 validation was not consistently producing warnings. We updated the implementation to reflect the C9 validation rule in the DAIMS that states, "Unique FAIN and/or URI from file D2 should exist in file C, except D2 records where FederalActionObligation and OriginalLoanSubsidyCost = 0. FAIN may be null for aggregated records. URI may be null for non-aggregated records."

##### C12 warning message{section=c12warning}
In the previous version of the Broker, the C12 validation was not consistently producing warnings. We updated the implementation to reflect the C12 validation rule in the DAIMS that states, "Each unique PIID (or combination of PIID/ParentAwardId) from file D1 should exist in file C during the same reporting period, except D1 records where FederalActionObligation = 0."


#### March 15, 2017

In this release of the Broker, agencies are now able to certify and submit data for publication. We rolled out bug fixes for flex fields, B11 and C11/C12 validation rules, and Program Activity case sensitivity. We also improved the submission dashboard functionality and updated the warning and error messages to reflect clarifications to the validation rules.  submission dashboard and the warning and error messages were updated to reflect recent changes to the validation rules.


  - [Data Submission](#/history?section=data)
  - [Program Activity case sensitive fix](#/history?section=case)
  - [B11 validation fix](#/history?section=b11)
  - [C11/C12 validation fix](#/history?section=c11)
  - [Flex field fix](#/history?section=flex)
  - [Updated warning/error messages](#/history?section=warning)
  - [Functionality improvement](#/history?section=imp)


##### Data Submission{section=data}

In this release of the Broker, agencies are now able to certify and submit data. Certified data will be available in the DATA Act Outbound Application Programming Interface (API) and will be sent to the data store for publication on the future website. All test submissions certified before March 15th are marked as not certified and are not available for publication unless the files are recertified.

##### Program Activity case sensitive fix{section=case}

In this release of the Broker, we rolled out a fix to make validations for Program Activity not case sensitive.

##### B11 validation fix{section=b11}

In previous versions of the Broker, the B11 validation produced an error for a blank reimbursable/direct indicator. In this release, we updated the B11 validation to only check for Object Class validity.

##### C11/C12 validation fix{section=c11}

In the previous version of the Broker, the C11/C12 validation produced a warning if both PIID and ParentAwardID were submitted. We corrected this to not produce a warning if both PIID and ParentAwardID are submitted.

##### Flex field fix{section=flex}

In previous versions of the Broker, flex fields were not available in the cross file validation reports. We updated the Broker to show flex fields in the cross file validation reports.

##### Updated warning/error messages{section=warning}

In this release of the Broker, we updated the warning and error messages to reflect clarifications made to the validation rules from recent releases.

##### Functionality improvement{section=imp}

We updated the submission dashboard to allow the user to sort the submission tables by any of the column headers.

##### Browser Requirements & Known Issues{section=browser}
The Broker is currently tested with the following browsers:

* Internet Explorer version 10 and higher
* Firefox (current version)
* Chrome (current version)
* Safari (current version)

Although you may use any browser/version combination you wish, we cannot support browsers and versions other than the ones stated above.

Known Issues

* The Broker will not work when using Internet Explorer under medium privacy settings or high security settings.

##### Accessibility Statement{section=accessibilityStatement}

###### Commitment and Guidelines

The DATA Act implementation team is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. To meet this commitment we develop this website to conform to the [Web Content Accessibility Guidelines 2.0](https://www.w3.org/TR/WCAG/). These guidelines explain how to make websites more accessible to people with disabilities, and we believe they also make our website easier for everyone to use.
The [Accessible Rich Internet Applications Suite (WAI-ARIA)](https://www.w3.org/WAI/intro/aria) addresses accessibility challenges by defining new ways to provide functionality with assistive technology. With WAI-ARIA, developers are able to provide usable and accessible advanced Web applications to people with disabilities. Alpha-broker.usaspending.gov also uses The Voluntary Product Accessibility Template® (VPAT®) to document adherence with Section 508 of the Rehabilitation Act accessibility standards.

We know our website changes regularly so we're always looking for ways to improve. If there is information you think should be included on this page, or if you experience any difficulty accessing this site, please contact us at [DATAPMO@fiscal.treasury.gov](mailto:DATAPMO@fiscal.treasury.gov) for assistance.

###### Documents

The documents offered within Alpha-broker.usaspending.gov use multiple file formats. Below is a list that will help you identify which software downloads are needed to view different file extensions. If you require a file format other than those currently provided or experience accessibility issues, please contact us at [DATAPMO@fiscal.treasury.gov](mailto:DATAPMO@fiscal.treasury.gov) for assistance.

###### Document Files

*  Windows Operating System .TXT files can be viewed on any Windows-based document reader.
* [Adobe Reader](https://get.adobe.com/reader/) (.pdf) For viewing and printing PDF documents.
* [Microsoft Word Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=4) (.doc, .docx) For viewing, printing, and copying Word documents without having Microsoft Word installed. It replaces Word Viewer 2003 and previous versions.
* [Microsoft Excel Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=10) (.xls, .xlsx) For viewing and printing Excel workbooks without having Microsoft Excel installed. It replaces Excel Viewer 97 and previous versions.
* [Microsoft PowerPoint Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=6) (.ppt, .pptx) For viewing full-featured presentations created in PowerPoint 97 and later versions.

#### March 1, 2017

In this release of the Broker, bug fixes were rolled out for B14/B15, C8/C9, C11/C12, and C23.  Functionality improvements were rolled out, including a delete button for non-certified submissions, a File B header processing fix, and updates to improve file processing time. We also implemented an updated list of agency CGAC codes, names, and abbreviations.



  - [B14/B15 validation Fix](#/history?section=b14)
  - [C8/C9 validation fix](#/history?section=c8)
  - [C23 validation fix](#/history?section=c23)
  - [Reporting SGL data in File C](#/history?section=sgl)
  - [Deleting an old submission](#/history?section=delete)
  - [File B header processing fix](#/history?section=header)
  - [Updated list of agency CGAC codes](#/history?section=cgac)
  - [Improved processing time fix](#/history?section=improvements)
  - [B11 validation fix](#/history?section=b11)



##### B14/B15 validation fix{section=b14}

In previous versions of the Broker, the B14/B15 validation would produce a failure in the File B related to GTAS lines 2004 (direct) and 2104(reimbursable). In this release of the Broker, the B14/B15 validation was updated to add up correctly to compare against the SF 133 lines 2004/2104.

##### C8/C9 validation fix{section=c8}

In earlier versions of the Broker, the C8/C9 validations produced warnings if both a FAIN and URI were reported for a record. In this release, the C8/C9 validation will not trigger a warning if both a FAIN and URI are reported together.

##### C23 validation fix{section=c23}

In this release of the Broker, the C23 cross file validation was updated so that if `parent_award_id` is present, both `PIID` and `parent_award_id` are used to cross validate Files C and D1. If `parent_award_id` is not present, the validator compares `PIID` in File C to the `PIID` in File D1 only.

##### Reporting SGL data in File C{section=sgl}

In earlier versions of the Broker, the validation rules were generating warnings for File C submissions that had SGL balances for an award without D1/D2 activity in the reporting period. In this release of the Broker, the C8/C9 and C11/C12 validations have been updated to only run on rows in File C that have a transaction obligated amount value in the field.

##### Deleting an old submission{section=delete}

In this release of the Broker, we rolled out a delete button in the submission dashboard that upload users can use to delete non-certified submissions. Submissions that are deleted are permanently removed from the website and are unable to be recovered.

##### File B header processing fix{section=header}

In this release of the Broker, we rolled out a functionality fix to allow users to submit File B that either does or does not have the typo on the DeobligationsRecoveriesRefundsdOfPriorYearByProgramObjectClass_CPE field.

##### Updated list of agency CGAC codes{section=cgac}

In this release of the Broker, we implemented an updated list of agency CGAC codes, names and abbreviations. The full list is available [here](https://github.com/fedspendingtransparency/data-act-broker-backend/blob/development/dataactvalidator/config/agency_list.csv).

##### Improved processing time fix{section=improvements}

In this release, we implemented a solution to improve the processing and stability of file submissions at a high volume.

##### B11 validation fix{section=b11}

Previously, the B11 validation was checking the direct/reimbursable flag. We updated this rule to check the object class only.


#### February 13, 2017

In this release of the Broker, bugs were fixed relating to downloading cross file warning/error reports, the B14/B15 validations, and Program Activities with the code '0000' and title 'Unknown/Other'. Functionality improvements were rolled out, including downloading submission files, padding zero values for Object Class and Program Activity, and others.


  - [B14/B15 validation Fix](#/history?section=b14)
  - [Program Activity](#/history?section=pa)
  - [Cross file warning/error reports](#/history?section=cross)
  - [Functionality Improvements](#/history?section=improvements)


##### B14/B15 validation fix{section=b14}

In earlier versions of the Broker, the B14/B15 validations produced fatal errors. In this release, the B14/B15 validation was changed to a warning.

##### Program Activity{section=pa}

In this release of the Broker, Program Activities with the code '0000' and title 'Unknown/Other' will validate without warnings.

##### Cross file warning/error reports{section=cross}

We discovered a bug in the process for downloading cross file warning and error reports. This has been fixed and users should no longer experience issues when downloading the cross file warning and error reports.

##### Functionality Improvements{section=improvements}

  * File names on the submission page are now links that can download the most recent file uploaded.
  * Object Class and Program activity pass for zero values that are not fully padded to '000' or '0000', respectively.
  * A Broker registration link has been added to the help page for users that do not have a Broker account.
  * A column has been added for agency name in the submission dashboard.
  * Improved processing time for file submissions at a high volume.


#### February 1, 2017

This release of the Broker was focused primarily on maintenance. Notable fixes rolled out in this release include improved processing of high volume files submissions and fixes for rules B9, B10, and B12.


  - [Improved Processing Time](#/history?section=time)
  - [B12 Validation fix](#/history?section=b12)
  - [B9/B10 validation fix](#/history?section=b9)


##### Improved processing time fix{section=time}

In this release, we implemented a solution to improve the processing and stability of file submissions at a high volume.

##### B12 validation fix{section=b12}

In earlier versions of the Broker, the B12 validation would prompt a warning if the Direct/Reimbursable (D/R) flag field was not populated for transfer USSGLs (4831, 4832, 4931), which conflicted with GTAS requirements. We made changes to this rule to allow for the submission of blank D/R fields when submitting transfer USSGLs (4831, 4832, 4931).

##### B9/B10 validation fix{section=b9}

In earlier versions of the Broker, the B9/B10 validations produced warnings for FY 2017 Program Activity codes. Treasury has not received the authoritative list of FY 2017 Program Activity codes yet. This rule was modified to only validate Program Activity for years that we have domain values for.


#### January 18, 2017

In this version of the Broker, several bugs were fixed relating to the flex fields, the C23 validation, file E creation, and rule B18. Additionally, financing accounts are now excluded from the A33 validation, per the new loan policy.

  - [Flex field fix](#/history?section=flexfield)
  - [C23 validation fix](#/history?section=c23)
  - [File E generation fix](#/history?section=filee)
  - [Update to rule B18](#/history?section=B18)
  - [Financing accounts exclusion](#/history?section=A33)

##### Flex field fix{section=flexfield}

After the flex fields were rolled out in an earlier release, we discovered a bug where multiple instances of a flex field would cause submission files to return errors. This has been fixed and users should no longer experience errors when using flex fields in their files. The proper syntax for the flex field headers is `flex_`.

##### C23 validation fix{section=c23}

In earlier versions of the broker, the C23 validation would produce a failure in cases where both amounts from C and D for an award were zero but reported as different data types (such as string vs a numeric). We've fixed this bug so that even different data types that represent the same amount should match and not produce an error.

##### File E generation fix{section=filee}

Previously the file E generation was not working due to locked SAM credentials. A new SAM account has been created and deployed so that users should be able to generate their E file without error.

##### Update to rule B18{section=B18}

Rule B18 was modified to prevent conflict with Rule B12, when downward adjustment USSGLs are submitted with a blank D/R field.

##### Financing accounts exclusion{section=A33}

Rule A33 was modified so that users will no longer see a warning if the submission does not include Financing Accounts.


#### December 21, 2016

In this version of the Broker, users are able to generate D files outside of a submission, rules that were temporarily warnings are changed back to errors, the Broker is available at a new URL, rule B5 is updated, object class validations require a specific value when an object class is unknown, and MAX permissions allow users who are part of of multiple agency permission groups to have different permissions for different agencies.

  - [Generate D files outside of a submission](#/history?section=Dfiles)
  - [Temporary Warnings Changed Back to Errors](#/history?section=warnings2Errors)
  - [New URL for the Data Broker](#/history?section=URL)
  - [Update to Rule B5](#/history?section=B5)
  - [Object Class Validation Update](#/history?section=objectClass)
  - [MAX Group Permissions Allow for Different Permissions for a User Who is Part of a Multiple Agency Permission Group](#/history?section=maxGroup)
  - [Browser Requirements & Known Issues](#/history?section=browser)
  - [Accessibility Statement](#/history?section=accessibilityStatemen)

##### Generate D Files Outside of a Submission{section=Dfiles}

Users will be able to generate D files outside the context of a submission. In other words, they won't need to validate A-C to be able to generate D files.

##### Temporary Warnings Changed Back to Errors{section=warnings2Errors}

All Rules that were temporarily warnings are changed back to critical errors. These warnings were documented on the validation table on the Help page, with a note that they would become errors in the future. The exception to this is rule A33, which will remain a warning for now.

##### New URL for Data Broker{section=URL}

The Data Broker is now be available at broker.usaspending.gov. All users should be automatically redirected.

##### Object Class Validation Update{section=objectClass}

Object Class validations only allow the object classes listed in the domain values. If the object class is unknown, agencies should use '000' instead of a value of their choosing. Please note that only '000' will be accepted by the broker, not '0' or '00'. If you're editing your files in Excel, you may need to pay careful attention to the formatting of the object class column to make sure it does not truncate the value to '0'.

##### MAX Group Permissions Allow for Different Permissions for a User Who is Part of a Multiple Agency Permission Group{section=maxGroup}

Updates to the MAX group permissions  allow for different permissions for different agencies, when a user is part of multiple agency permission groups, such as shared service providers.


#### December 7, 2016
In this release we are making improvements to the Broker and responding to issues discovered through greater agency use.

In this release there are bugfixes, improvements, and changes to the way the Data Broker handles certain conditions.

  - [Flex Fields](#/history?section=flexfields)
  - [Comment box available for each file in certification](#/history?section=comments)
  - [White space bugfix](#/history?section=whitespace)
  - [Improvements to local install process](#/history?section=local)
  - [Rounding error bugfix](#/history?section=rounding)

##### Flex Fields{section=flexfields}

 Users can now add additional columns to their submission files (A-C) that will be returned in their warning and error files. To use this feature, add any column to your submission data and prefix the header with "flex\_". For example, a column named "flex_reportingbureau" will be ignored for validation purposes but returned for any rows that have errors in the warnings and error reports.

##### Comments in Certification{section=comments}

Users can now add comments to each file during the certification process. On the final summary screen, you can select the file you wish to add comments for and write free-form prose to accompany that file for certification purposes.

##### White space bugfix{section=whitespace}

In previous versions of the broker, rows of white space at the end of a file would cause validation errors. This was common for users exporting from excel. The broker will now ignore rows at the end of the file if all of the values are whitespace.

##### Improvements to the Local Install process{section=local}

In this release we made improvements to the local install process for the broker so that users can more easily install the local broker for internal use.

##### Rounding Error bugfix{section=rounding}

In previous versions of the broker, certain GTAS lines were being rounded when the source data was imported into the broker. We've resolved this issue to make sure the source data for all GTAS validations is correct.


##### November 30, 2016

In this version of the Broker, we are using MAX to manage user accounts, we updated how the Broker processes several rules and reports errors, revised Rule A16, and populated the information in the summary table on the final Broker screen.

  - [Sign In Using MAX](#/history?section=MAXsign)
  - [Processing of Validation Rules](#/history?section=ValidationRules)
  - [Summary Table](#/history?section=SummaryTable)

##### Sign In Using MAX{section=MAXsign}
If you are seeing this in What's New in This Release, you already know about the MAX.gov sign in that was implemented with this release. If your coworkers are having trouble signing in, they should contact their agency administrator for MAX. If the agency doesn't have a MAX administrator, email DATAPMO@fiscal.treasury.gov

##### Processing of Validation Rules{section=ValidationRules}
We updated how the Broker processes some rules.

A16: The Broker will check for a published or publishable submission for the current fiscal year before running Rule A16 on Files A and B. File C is no longer checked for Rule A16 as the FYB data elements are optional in this file. Note: Rule A16 is updated in the Validation Rules table and the downloadable spreadsheet. See the Validation Rules page.
B14 & B15: We fixed a sign problem in these rules.
B20: If the program activity provided in File C is zero, null, or blank, then the Broker compares the combination of TAS and object class between Files B and C instead.
C8 & C9: Updates to how the Broker checks FAIN and URI in these rules.
C23: Errors are now displayed for this rule after the File C - D2 cross-file validation.
Various rules: Downward adjustments are excluded, where applicable.

##### Summary Table{section=SummaryTable}
The final Broker screen displays a summary of your agency's submission. File size, number of rows, and number of warnings are displayed for the files you uploaded. Agency name and report start and end dates are displayed for your agency's submission. The dollar amounts for total obligations incurred, total financial assistance obligations, and total procurement obligations are calculated from your agency's submission and displayed.

#### What's New in This Release - October 21, 2016
On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through greater agency use.

In this version of the Broker, we have improved the cross-file validation and file download experience, improved the Broker processing of PIID and FAIN/URI, and improved the readability of the Help pages.

  - [Validation and File Download](#/history?section=crossFileDownload)
  - [Better PIID and FAIN/URI Processing](#/history?section=C14Processing)
  - [Help Pages Readability](#/history?section=helpReadability)
  - [Browser Requirements & Known Issues](#/history?section=browser)
  - [Accessibility Statement](#/history?section=accessibilityStatement)

###### Validation and File Download{section=crossFileDownload}

Cross File Validations and File Downloads

 - The cross-file validation reports now include the error text instead of the rule description text.
 - While the D1 and D2 files are being generated, the messaging is more descriptive, "Creating your D1 and D2 files from ASP and FPDS. This may take a few minutes."
 - If there is an error generating the file from ASP or FPDS, the message says, "A problem occurred receiving data from ASP" (or FPDS) instead of a generic 404 error.
 - File E, Additional Awardee Attributes, can now be generated and downloaded after Files D1 and D2 generate.

###### Better PIID and FAIN/URI Processing{section=C14Processing}

The Broker processing of Rule C14 was updated to better handle the combinations PIID with either FAIN or URI.

###### Help Pages Readability{section=helpReadability}

We have updated the styling of the Help pages to use consistent header styles and remove unneeded white space to improve readability. We have also added a navigation bar to move between help pages.

#### What's New in This Release - September 30, 2016
This version of the DATA Act Broker contains everything agencies need to test the data validation and submission process.

In this version of the Broker, we have improved the cross-file validation experience, implemented all the current validation rules, reorganized the Help section, including new pages for Resources and Validation Rules.

  - [Cross-File Validation Improvements](#/history?section=crossFileImp)
  - [Validation Rules Implemented](#/history?section=validationRulesStatus)
  - [New Help](#/history?section=newHelp)
  - [Browser Requirements & Known Issues](#/history?section=browser)
  - [Accessibility Statement](#/history?section=accessibilityStatement)

###### Cross-File Validation Improvements{section=crossFileImp}

When running cross-file validations, you will see the file pairs for the C - D1 validations, you will see the the validation warnings, and you will be able to upload corrected files for one pair of validations without having to correct all files. You will also be able to download the the files generated by the Broker.

###### Validation Rules Implemented{section=validationRulesStatus}

All the current validation rules for Files A, B, and C, plus the cross-file validations have been implemented.  For more details, see the [Validation Rules](/#/validations) page.

###### New Help{section=newHelp}

This Help section of the Broker has been reorganized. The main page only includes the latest release notes. The prior release notes are on the [Release Notes Archive](/#/history) page.

The new [Resources - DAIMS](/#/resources) page includes all the information from the old Resources section and has been expanded to include a web page of the [Practices and Procedures](/#/practices). Some content from other websites was moved from other websites. Some Resources content has been updated, including the Domain Values and the Long Element Name to Short Element Name Crosswalk.

The [Validation Rules](/#/validations) page contains not only the most current information on the rules status, but also a severity column that indicates whether a rule generates a warning or a fatal error.


#### What's New in This Release - September 21, 2016
This is the Full Version of the DATA Act Broker and contains everything agencies need to test their data.

In this version of the Broker, we have improved how the Broker receives D1 and D2 file information from the USAspending UAT environment, added screens for certifying submissions, improved the data we are using for Broker testing, corrected a Resources file, and updated the table of validations.

  - [Receiving Files D1 and D2](#/history?section=receivingd1d2)
  - [Screens for Certification](#/history?section=certifyScreens)
  - [Broker Test Data](#/history?section=testData)
  - [Updated Validations](#/history?section=updatedValidations)

###### Receiving Files D1 and D2{section=receivingd1d2}

In this release, we have improved how the Broker receives the data for Files D1 and D2 from the USAspending UAT environment that comes from ASP and FPDS. As a user, you should not see any changes, except better functionality.

###### Screens for Certification{section=certifyScreens}

The Broker now displays the screens an SAO will use to certify a submission. The text on these screens is based on a Draft OMB policy memo. The screens are there for you to review and understand the language and process. Feel free to click on any option - you will NOT actually certify and submit data to USAspending, at this time.

###### Broker Test Data{section=testData}

We are testing the Broker with actual agency data to better replicate your experiences. You won't see any changes in the Broker.

###### Updated Validations{section=updatedValidations}

Below is a cumulative table of validations in the RSS and IDD. The status column indicates whether they are currently implemented in the Broker. The table has been revised to match the latest validations rules spreadsheet in the Resources section.
**Note:** in the September 30, 2016 release the validation rules, resources, this release notes archive were moved to different pages. Use the left navigation pane on the Help home page to access these new pages.

#### What's New in This Release - September 14, 2016

In this version of the Broker, we are importing D1 and D2 file information from the USAspending UAT environment, improved the handling of encoding in files, corrected a Resources file, and added and updated some validations.

  - [Updated: Generating D1 and D2](#/history?section=d1d2updated)
  - [Encoding in Files](#/history?section=encoding)

###### Updated: Generating D1 and D2{section=d1d2updated}

In this release, we have added the ability to generate the D1 and D2 files from the data in the USAspending UAT environment that comes from ASP and FPDS. The procurement data for File D1 is only available through 7/31/2016, at this time. Submit your financial assistance data for File D2 through the ASP UAT environment. **Note:** This functionality is newly implemented so let us know if you have problems.

###### Encoding in Files{section=encoding}

Some users reported errors trying to submit files. We improved how the Broker handles some encoding scenarios so these errors are no longer generated.

#### What's New in This Release - August 10, 2016

In this version of the Broker, we separated out the validation checks into warnings and critical errors, added the interface to create D1 and D2 files, improved 508 compliance, increased server capacity, added an interface for broker users to notify other users that a submission is ready, and fixed a bug that incorrectly showed submissions as valid on the home page submission table.

  - [Warnings and Errors](#/history?section=warnings)
  - [Generating D1 and D2](#/history?section=d1d2)
  - [Improved 508 Compliance](#/history?section=508compliance)
  - [Increased Server Capacity](#/history?section=capacity)
  - [Notify Another User](#/history?section=notifyauser)
  - [Bugfix: Submissions Incorrectly Show as Valid](#/history?section=homepagesubmissiontable)

###### Warnings and Errors{section=warnings}

In previous versions of the Broker, all failing validations were treated as critical errors. In this release, we have added an almost identical interface for the warnings, complete with a downloadable file and table. The warnings appear alongside the existing error download and tables. Files with warnings may be submitted, but files with critical errors will not pass validation and may not be submitted.

###### Generating D1 and D2{section=d1d2}

In previous versions of the Broker, you could only upload a D2 file. If you didn't have a D2 file, you could use the sample file provided. In this release, we have added the interface to generate the D1 and D2 files. **PLEASE NOTE** that the interface currently returns sample files until the integration with the ASP and FPDS is complete in the next 2-3 weeks.

###### Improved 508 Compliance{section=508compliance}

In this release, the Broker has further improved it's compliance with 508 accessibility guidelines.

###### Increase Server Capacity{section=capacity}

In this release, the development team has significantly increased the base capacity of the web and database servers powering the Broker.

###### Notify Another User{section=notifyauser}

Broker users can now send a notification to another user within their same agency when they want them to view a submission. This option is available on the Review Data page, after all validations have completed. You can also send other users in your agency the link to your in-progress submission anytime.

###### Bugfix: Submissions Incorrectly Show as Valid{section=homepagesubmissiontable}

Several users reported a minor bug with the submission table that appears on the home page. It was showing submissions as valid that actually had errors. This has been corrected to more accurately reflect the status of a submission.

####  What's New in This Release - July 27, 2016

In this version of the Broker, we updated the Broker branding to Beta, improved the validation processing time, implemented short data element names, made the styling more consistent, improved the accessibility of the Broker, added a resources section, and updated the information on validations.

  - [DATA Act Broker - Beta Release](#/history?section=betaRelease)
  - [Validation Processing Time](#/history?section=processingTime)
  - [Short Data Element Names](#/history?section=shortNames)
  - [Consistent Style](#/history?section=consistentStyle)
  - [More Validations in SQL](#/history?section=validationSQL3)
  - [Accessibility Improvements](#/history?section=accessibilityImprovements)


###### DATA Act Broker - Beta Release{section=betaRelease}
We updated all the relevant text to reflect "Beta Release." We still plan on incremental updates to the Broker about every two weeks.

NOTE: Even though the DATA Act Broker - Beta Release has been in place since the June 29th release, the URL will remain the same [https://alpha-broker.usaspending.gov](https://alpha-broker.usaspending.gov).

###### Validation Processing Time{section=processingTime}
We made some improvements to reduce the validation processing time. If you're still experiencing submissions that take more than 15-20 minutes, please contact us so we can troubleshoot the issue.

###### Short Data Element Names{section=shortNames}
Some agency financial systems need to use column heading that are less than 30 characters long. We have created a set of short element names. See the Resources section for element name crosswalk.

###### Consistent Broker Styling{section=consistentStyle}
We made some small changes so the Broker displays in a more consistent manner.

###### More Validations in SQL{section=validationSQL3}
Agency developers may be interested to know that we transitioned more of the Broker validations to using SQL statements. The list of SQL statements is publicly available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

###### Accessibility Improvements{section=accessibilityImprovements}
We made several changes to improve the accessibility of the Broker by adaptive technologies like screen readers. We also added an accessibility statement in this Help file.


#### What's New in This Release - July 13, 2016

NOTE: The DATA Act Broker - Alpha Release is now in beta status (as of the June 29, 2016 release). We will be updating the related text indicators on the website in the next release. The URL ([https://alpha-broker.usaspending.gov](https://alpha-broker.usaspending.gov)) will not change for now.

In this version of the Broker, we changed the submission date timeframe, reduced the errors generated by blanks, improved the display of the tree map for errors, display the cross file validations, and updated some more validations to SQL.

  - [Reporting Date Timeframe](#/history?section=reportingDateTimeframe)
  - [Tree Map for Errors](#/history?section=treeMap)
  - [Display of Cross-File Validations](#/history?section=crossFileValv2)
  - [More Validations in SQL](#/history?section=validationSQL2)
  - [Updated Validations](#/history?section=updatedValidations)

###### Reporting Date Timeframe{section=reportingDateTimeframe}
When you create a new submission, the date selection is for one month or one quarter. Examples: June 2016 or Quarter 4 - 2016.

###### Tree Map for Errors{section=treeMap}
We updated the color of the tree map and the language used to describe the errors. Look for further improvements to the error descriptions in future releases.

###### Display of Cross-File Validations{section=crossFileValv2}
After each individual file is validated, the Broker performs some cross-file validations. You will now see the results of these validations in the Broker, see a table of errors, be able to download an error report, and upload corrected files.

###### More Validations in SQL{section=validationSQL2}
Agency developers may be interested to know that we transitioned more of the Broker validations to using SQL statements. The list of SQL statements is publically available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

###### Updated Validations{section=updatedValidations}
In this release we have transitioned all of these validations to SQL except A1, B9, and B10. See cumulative table of validations above.

#### What's New in This Release - June 29, 2016
In this version of the Broker, we made several small changes to make the Broker easier to use, added a section to display submissions from your agency, clarified the process to upload corrected files, added an email notification feature, transitioned some of the validation rules to SQL statements, and updated some of the validations.

  - [Ease of Use Improvements](#/history?section=easeofUse)
  - [Submissions from Your Agency](#/history?section=agencySubdashboard)
  - [Uploading Corrected Files](#/history?section=uploadCorrectedFiles)
  - [Send Email Notifications](#/history?section=sendEmail)
  - [Some Validations in SQL](#/history?section=validationSQL)
  - [Updated Validations](#/history?section=updatedValidations)

###### Ease of Use Improvements{section=easeofUse}
- **Confirm Password** When you create a Broker account, you are prompted to enter a Password and then to Confirm Password.
- **Username** On the log in screen, we have replaced the Username prompt with Email Address since your user name is your email address.
- **Submission Guide** If you hide the Submission Guide page, when you select your agency for a new submission, there is a link to view the Submission Guide. The Submission Guide also has a link to the validations listed on this Help page.
- **Default Dates** When creating your submission, the dates default to the beginning of the fiscal year and the current month or quarter.
- **Last Saved** The Broker automatically saves your files when you upload them and at each step of the validation process. The date and time the data was last saved is displayed at the top of the screen below the Help menu.
- **Leave Validations Running** You can leave the validation page and the validations will continue to run. Come back at any time to check your progress or results.
- **Spam Folder Warning** Some users report that emails from the Broker end up in their spam folders. We've added a reminder to check your spam folder on pages that generate emails.
- **Back to Top** We know this Help page is getting long so we added an arrow in the lower right corner. Click it to take you back to the top of the page at any time.

###### Submissions from Your Agency{section=agencySubdashboard}
We've added a table to the Broker home page where you can see recent submissions from your agency. View and edit submissions from this table.

###### Uploading Corrected Files{section=uploadCorrectedFiles}
If one or more of your files fails validation, only those failed files will have a prompt in red for you to upload a corrected file. Click *Choose Corrected File* to browse to your file and select it. Or drag and drop a corrected file onto the file icon. Click *Upload Corrected CSV Files*. The validations on the corrected files will run again.

###### Send Email Notifications{section=sendEmail}
After your data has been successfully validated, the *Review & Publish* page has a button to *Notify Another User that the Submission is Ready for Certification*. This opens a field where you can type in multiple email addresses for users in your agency.

###### Some Validations in SQL{section=validationSQL}
Agency developers may be interested to know that we transitioned some of the Broker validations to using SQL statements. The list of SQL statements is publically available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

###### Updated Validations{section=updatedValidations}
In this release we included rules A18, A19, A20, B9, B10, B11, B12, and C18. See cumulative table above.

#### What's New in This Release - June 15, 2016
In this version of the Broker, we made it easier to select your agency, made it easier to submit your data without errors, and updated some of the validations.

* [Easier Agency Selection](#/history?section=agencyCGAC)
* [Accidental Commas in Dollar Amounts](#/history?section=removeCommas)
* [Header Row Capitalization Errors](#/history?section=elementCaps)

###### Easier Agency Selection{section=agencyCGAC}
When you register for an account or create a submission, you can enter your CGAC code to correctly select your agency.

###### Accidental Commas in Dollar Amounts{section=removeCommas}
The Practices and Procedures document specifies that dollar amounts should be submitted without commas. However, if you accidentally include commas in dollar amounts the Broker will remove them.

###### Header Row Capitalization Errors{section=elementCaps}
The Practices and Procedures document specifies that the element names in the header row should exactly match the RSS element names. However, to assist you the Broker will process files with incorrect element name capitalization.
#### What's New in This Release - June 1, 2016
In this version of the broker, we have added some information on the screens to help you with your data submission, added some functionality to help you select the reporting period, and updated some of the validations. __Note:__ Validation details are included in the cumulative updated validations table.

* [Step-by-Step Guide on the Broker Home Page](#/history?section=stepby)
* [Submission Guide](#/history?section=subguide)
* [Selecting Reporting Period](#/history?section=dateselect)

###### Step-by-Step Guide on the Broker Home Page{section=stepby}
When you log into the Broker, you will see three choices that guide you to _Upload and validate a new submission_, _Continue with an existing submission_, and _Review, certify, and publish a submission_.

###### Submission Guide{section=subguide}
The Submission Guide provides details of the four steps to submit your agency's data. Once you have reviewed this page, you can check a box to hide this page the next time you log into the Broker.

###### Select Reporting Period{section=dateselect}
Based on user feedback, the quarterly submission dates are displayed as the quarter number and the fiscal year. Example: Quarter 2 - 2016.

#### What's New in This Release - May 17, 2016
In this version of the Broker, we have made a change if you are logging in with Internet Explorer, added functionality for the Broker to recognize files with the pipe symbol as a delimiter, and updated some of the validations.

* [Logging into the Broker with Internet Explorer](#/history?section=brokerIE)
* [Submit Files with Pipe Symbol](#/history?section=pipe)
* [File Validations per RSS v1.0](#/history?section=fileValv1)
* [Cross File Validations](#/history?section=crossFileValv1)

###### Logging into the Broker with Internet Explorer{section=brokerIE}
During user testing, some Internet Explorer users were unable to log into the Broker and upload files. We implemented a workaround so users with Internet Explorer on __medium security settings__ can log in and upload files. See Known Issues below.

###### Submit File with Pipe Symbol{section=pipe}
Based on user feedback, we changed the Broker to automatically detect whether a file is using a comma or pipe symbol as a delimiter, based on the format of the header row.

###### File Validations per RSS v1.0{section=fileValv1}
Submitted files will be validated per RSS v1.0. Specifically:
* Field names match the RSS v1.0
* Maximum field length does not exceed the value in RSS v1.0
* Required fields are present per RSS v1.0
* Records in File C have a PIID, FAIN, or URI

###### Cross File Validations{section=crossFileValv1}
We started work on cross file validations, beginning with cross validation of the FAIN, URI or PIID between sample files for Files C and D2.
