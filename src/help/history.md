#### April 12, 2022{section=changelog}
In this release of the Broker, we:

* Updated FABS45 validation rule to be a warning and not an error, and clarified the text of the rule to better describe its function.
* Added new Disaster Emergency Fund Codes 3, 4, and 5 to the list of valid codes in the Broker.

#### March 22, 2022
In this release of the Broker, we:

* Updated front-end functionality to prevent a user from adding and saving comments while a DABS submission is publishing or certifying.
* Resolved a minor bug in the error display for the login screen.
* Several back-end updates in preparation for UEI becoming the official award recipient identifier on 04/04/22.

#### March 1, 2022
In this release of the Broker, we:

* Updated FABS45 validation rule text to clarify what the rule is checking. No change was made to how the rule functions.
* Updated how Disaster Emergency Fund Code (DEFC) QQQ is handled. The Broker will process DEFC Q and DEFC QQQ as identical so no warnings should be triggered when 
these two are compared or when the user converts from Q to QQQ.
* Updated the default reporting period when creating DABS submissions to be the current period being reported on, or the next period to be reported if it is between reporting windows.
* Fixed minor bugs.

#### February 8, 2022
In this release of the Broker, we:

* Fixed a few minor bugs with validation rules.
* Updated naming convention for Broker files as they appear on the Submission History page for clarity. Now the user is better able to determine the contents of the file prior to downloading or once they have saved it locally. This will apply to new submissions moving forward as files are created, existing files for existing submissions are not being renamed.
* Removed the ability to create new Quarterly submissions for FY22 and forward as all submissions for current and future periods are now required to be Monthly submissions.
* Updated the Service Desk information on the Broker Help page for accuracy.
* Added timestamps in the Broker workflow to let users know when a given set of Validations last ran and when D1 or D2 files were last generated.

#### January 14, 2022
In this release of the Broker, we:

* Updated the Submission History page for Published/Certified submissions. In the Download Files section where users can click to download individual files that were included in each submission, we added a link to download all the files at the same time in a .zip file.
* Added a "Revalidate Submission" button on Steps 1 and 3 of the DABS Submission Workflow to allow users to intentionally run the validations again from the current page. In the event a user had encountered a critical error and now believes the error has been cleared, they will have the ability to run the set of validations on that page again without the need to start a new submission or have to delete and re-upload an agency file.

#### December 22, 2021
In this release of the Broker, we:

* Modified Validation rule C18 to only trigger when all the optional balances relevant to this rule are provided. This is to allow for agencies to voluntarily provide some of the elements for greater transparency (4872/4972) without having an additional warning trigger.
* Updated the front end to provide the ability to add a banner message to the login page prior to the user signing in. This way, if necessary, we can provide important information to the user in the event the ability to sign in is non-functional.
* Updated validation rules B19, C28, and FABS 2.1 to consistently return all rows after the first row encountered when checking for duplicate row values.
* Updated the timestamp on the DABS Publish History page to include the time in addition to the date a submission was published.
* Added a progress bar to the cross-file validations in DABS. This will display the estimated progress the Broker has made on running these validations across all sets of files. This will assist the user in determining how long the process will take to complete.
* Removed the link to FY21 Submission Calendar on the Broker help page.
* Updated the ‘Upload & Validate a New Submission’ page in DABS to automatically default new submissions to monthly.

#### December 7, 2021
In this release of the Broker, we:

* Added progress bars to the first set of validations the user sees in DABS and FABS. This will display the estimated progress the Broker has made while running validations on the submitted files so the user can gauge how long until the validations are complete. Cross file validation progress bars are planned to be added in a future release.

#### November 16, 2021
In this release of the Broker, we:

* Implemented the second phase of DAIMS 2.1 (primarily DABS changes). Please refer to the official DAIMS 2.1 release for details.
* Updated validation rule FABS3.3 and FABS3.5 to not trigger when the record is a correction.
* Fixed a minor bug with the time display on the Data Sources Help page.

#### October 26, 2021
In this release of the Broker, we:

* Added a new Data Sources page on the Help page. This page lists all the external data the Broker imports and uses while processing agency submitted data. The name and a description of the data element are provided as well as the data source. When possible, the page also links directly to the data source so users can download and review it to assist in researching errors or warnings in their monthly submissions.

#### September 30, 2021
In this release of the Broker, we:

* Implemented the first phase of DAIMS 2.1 (primarily FABS additions). Please refer to the official DAIMS 2.1 release for details.
* Added additional date fields to the agency comments raw file for clarity.

#### September 14, 2021
In this release of the Broker, we:

* Added a new Raw Files section to the Help Page. This page contains the raw agency submission files for both DABS and FABS that previously had been located on USAspending.gov in the download section. Users will need a MAX account to authenticate and get access to the Broker, but no special agency permissions are required to access the Help Pages or these files.
* Added a link to the FY22 DABS Reporting Window Schedule to the Broker Help page.

#### August 24, 2021
In this release of the Broker, we:

* Fixed some minor frontend bugs with Historic and Active Dashboards displaying monthly and quarterly submissions.

#### August 3, 2021
In this release of the Broker, we:

* Added a TEST submission type to FABS. Like DABS TEST submissions, this submission type allows a file to be uploaded and validations ran; however, it cannot be published. This will provide agencies with a way to test FABS data and FABS file formats with no possibility of a test file being published. When testing is complete the file can be deleted, or the Broker will auto-delete any TEST submission that hasn’t had activity in the last 6 months.
* Updated the DABS historical dashboard to improve display for monthly submissions.  Monthly submissions now display individually and can be viewed along with quarterly submissions as agencies transition to monthly reporting. Updated the axis to show fiscal yearand reporting period more clearly. Added new functionality to the graph to allow the user to interactively show or hide specific warnings by clicking on the legend.
* Minor bug fixes.

#### July 13, 2021
In this release of the Broker, we:

* Implemented DAIMS 2.1 guidance on submission of ObjectClass (OC) and DisasterEmergencyFundCode (DEFC) elements. 
* DEFC ‘9’ is no longer valid for submission as a generic placeholder, only valid DEFC may be submitted.
* Object Class format modified to match GTAS format.
* Modified several validation rules impacted by DEFC and OC changes.

#### June 22, 2021
In this release of the Broker, we:

* Updated rule A33 to properly account for FREC agencies and to match the logic of File A generation in associating TAS with Agency.
* Updated the maximum field length for `DisasterEmergencyFundCode` (DEFC) for File B and File C from 2 to 3 characters as specified in DAIMS 2.1.

#### June 1, 2021
In this release of the Broker, we:

* Added the obligation amount to the DABS Error and Warning reports for validation rules C8/C9 and C11/C12. The amount of the transaction is now included in the `Source Value Provided` column as well as in the `Difference` column. This should assist agencies with prioritization based on materiality.

#### May 18, 2021
In this release of the Broker, we:

* Updated the Review & Publish page of the DABS workflow to alert users that their comments will be available on the Agency Submission Statistics page and added a link to that page.

#### May 3, 2021
In this release of the Broker, we:

* Updated validation rules C20, C21, and C26 to only return the values that are failing this check in the `Difference` column. This should make the reports more readable and assist agencies in quickly investigating and resolving these warnings.
* Resolved some minor frontend bugs regarding sorting of errors and warnings, fixing banners, and displaying certain error messages properly.

#### April 19, 2021
In this release of the Broker, we:

* Fixed a bug in the process for generating File A where, in rare instances, an agency with a TAS assigned to them with an agency identifier of 011 would not get included in the File A generated by the Broker. All 011 TAS should now appear in the appropriate File A for the appropriate agency.
* Added V to list of valid Disaster Emergency Fund Codes (DEFC) and included it in the list of COVID-19 related DEFC’s.
* Updated API documentation to provide full URL with the endpoint documentation.
* Fixed a few minor Front End display bugs.

#### April 5, 2021
In this release of the Broker, we:

* Added another warning notification on the Review & Publish page to alert users when they have unsaved comments.
* Updated FREC agency names to use the FREC abbreviation instead of the parent CGAC abbreviation.

#### March 19, 2021
In this release of the Broker, we:

* Added a warning alerting the user to unsaved comments on the lower section of the Review & Publish page.
* Updated the text on several FABS validations to match DAIMS more closely and updated minor bug in FABS 38.2.2 logic to function correctly. 
* Added a note on the Release Note and Tech Note Archive pages to indicate that historical links are not maintained.

#### March 8, 2021
In this release of the Broker, we:

* Resolved a minor bug with the frontend on the DABS Review & Publish page.

#### February 22, 2021
In this release of the Broker, we:

* Updated the Broker to comply with OMB Memo M-20-21 to require all agencies to submit monthly file sets beginning in FY22. For periods selected in FY22 and beyond, any new quarterly submission will only be able to be created as a Test submission.
* Enhanced the user interface in DABS for the Review & Publish page (step 5 of the workflow). We redesigned the Agency Comments section of the page to be more intuitive and more useful to users. Changes include:
    * Removing the single comment box and the drop list to choose which file to comment on and replacing with an individual box for each file. This enables users to see all their comments on page at the same time to facilitate review as well as make it clearer that separate comments can be provided for each file. 
    * The comment section is now collapsible.
    * We added a new Submission Comment box. This is to allow users to provide any overall comments or statements they feel are applicable to the submission as a whole. They can then limit the individual file comments to only comments pertaining specifically to that file. 
    * All Comment boxes now detect and warn users if they are including non-ASCII text which may affect the appearance of their comments on USAspending.gov.
    * The page will inform the user if there are unsaved comments on the page and will notify them if they attempt to leave the page with unsaved comments.

#### February 8, 2021
In this release of the Broker, we:

* Updated the API and database to handle submission comments which will be released in a future front-end update.
* Updated the list of valid COVID-19 related Disaster Emergency Fund Codes (DEFC) to include the newly assigned “R” code when validations are running.

#### January 26, 2021
In this release of the Broker, we:

* Made several minor front-end bug fixes.

#### January 12, 2021
In this release of the Broker, we:

* Updated displays for DABS reporting period selection and adding a couple of labels to other reporting periods on the site.
* Updated dates for selecting periods in FY21 for file generations.

#### December 23, 2020
In this release of the Broker, we:

* Updated logic for validation rule B20 to allow reporting periods prior to FY21 to be submitted, updated, and re-certified without requiring valid Program Activity Codes and Names in File C. Program Activity was optional in File C until the start of FY21 when it became a required field (per OMB Memo M-20-21).

#### November 30, 2020
In this release of the Broker, we:

* Updated File C to make Program Activity Code and Program Activity Name required fields to comply with OMB Memo M-20-21.
* Updated logic in validations C20, C21, and C26 to now properly trigger these warnings and only return a difference on the warning report for those balances that fail the check.

#### November 17, 2020
In this release of the Broker, we:

* Added note to Certify page in DABS to remind users comments are published on USAspending.gov.

#### November 2, 2020
In this release of the Broker, we:

* FY21 reporting window schedule added to Help pages. 
* Updated submission creation page and submission guide to add language for Test Submissions expiring. We also updated the Submission Table to show days remaining until expiration for submissions with less than 30 days remaining. 
* Fixed several minor bugs.

#### October 19, 2020
In this release of the Broker, we:

* Fixed various visual aspects and minor bugs of the frontend for improved user experience.

#### October 5, 2020
In this release of the Broker, we:

* Updated DABS to identify and remove any Test submissions that have not been updated in over 6 months. After the initial removal, this process will run on a nightly basis. To prevent a submission from being removed, simply make an update to it (such as saving a comment) before the 6 months’ time has elapsed. In addition, all uncertified FY17Q1 or before submissions will be removed as reporting was not required for that reporting time frame.
* Several bug fixes and performance enhancements. 

#### September 21, 2020
In this release of the Broker, we:

* Reloaded Broker City Code table and ensured validations account for a City Code spanning more than one state.
* Updated logic for DABS Validation Rule C23 such that only File C lines with a value for TOA will be compared to D1/D2.
* Modified the “Upload & Validate a New Submission” page of the DABS workflow to inform users upon selecting the period if an existing Published or Certified submission already exists for the reporting period they chose.
* Added a filter for Test Submissions on the DABS Active Submission Table.
* Minor bug fixes.

#### September 4, 2020
In this release of the Broker, we:

* Updated Submission History column on Submission Table to show Certification date when a published submission is certified.
* Added an option to include FPDS Element numbers in the header titles for file D1 when generating from the Home page (outside of the submission workflow).
* Added user instructions on initial DABS and FABS file upload page about avoiding Broker login time outs during large file uploads.
* Minor bug fixes

#### August 10, 2020
In this release of the Broker, we:

* Made multiple code updates to increase Broker performance and efficiency when loading and processing file submissions.

#### July 13, 2020
In this release of the Broker, we:

* Implemented DAIMS 2.0 changes in the Broker. See [DAIMS-v2.0] (https://fiscal.treasury.gov/data-transparency/DAIMS-current.html) for details.

#### June 1, 2020
In this release of the Broker, we:

* Updated the display on FABS published submission page to show the published time for a submission consistently.
* Updated the sort order of columns on D1/D2 to better match DAIMS 1.4 release and added Additional Reporting element to D1.

#### May 18, 2020
In this release of the Broker, we:

* Implemented DAIMS 1.4 changes in the Broker. See [DAIMS-v1.4](https://www.fiscal.treasury.gov/data-transparency/DAIMS-v1.4.html) for details.
* Launched the Active Data Act Broker Dashboard. Unlike the Historical dashboard that shows only Certified submissions, the Active Dashboard shows agencies data about any current submissions they have that are still in an uncertified state. 
    * Navigate to the DABS Dashboard page and enter your filter criteria to see any submissions available to view. After selecting a submission, agencies can see any errors or warnings that submission has triggered by selecting the Error or Warning links above the submission information. 
    * The Dashboard shows the counts of Low, Medium, and High Impact errors and warnings and a chart of their relative Significance to your agency. A table summary of all the errors and warnings is also shown below the chart. 
    * Users with Certifier access to the Broker can customize the settings for Impact and Significance to change how these errors and warnings are displayed. This is done by clicking on the user’s name in the upper right then choosing Settings. A list of each rule for each file will be displayed and the user can choose the Impact of that rule for their agency from a drop down and the rules can also be sorted into any order with rules of higher significance being at the top. The Dashboard will use these custom settings when analyzing a submission and displaying the data in the chart area. This enables an agency to quickly see any validations it has deemed to be more important and know at a glance where to begin their analysis. Note: Agencies with more than one certifier should coordinate use of this function as any changes to the settings for an agency apply to all users who view the Dashboard.

#### May 4, 2020
In this release of the Broker, we:

* Updated the banner shown at the top to better communicate to the user the status of the selected submission. If a Broker action is in progress users are notified and prevented from initiating a new action until the current process is complete.

#### April 17, 2020
In this release of the Broker, we:

* Updated the Broker front end so that when users initiate a submission for a period they have previously certified, they will see a notification that there is already a certified submission for this period. They will also be provided a link to that certified submission. Any new submissions for a certified period will be marked as test a submission and they will be directed to update the certified submission if they want recertify the period.
* Made several minor bug fixes. 

#### April 6, 2020
In this release of the Broker, we:

* Updated Broker functionality to allow agencies to make changes to a previously certified submission, whether for testing purposes or with the intent to recertify, and then be able to abandon those changes and return their submission to its last certified status.  This includes returning all certified files as of the last certification as well as warning files and agency certification comments. To use this functionality, users will see a new button on the last step of the submission workflow (Step 5, Review and Publish) called Revert Submission to the left of the file comments box. Simply click the button and the submission will be reverted. The last modified date on the submission table will show the current date.
* Fixed other minor bugs.

#### March 20, 2020
In this release of the Broker, we:

* Updated the Broker front end to allow agencies to submit files for reporting periods that already have a certified submission. Previously the Broker prevented this and forced users to go into their certified submission to load files for the selected period. This change will allow much greater flexibility for testing data as well as testing system integration for agencies with these testing needs. The new submission will show a banner to indicate the selected reporting period has already been certified and this will be a test submission. The banner will also provide a link to the certified submission in the event the user wants to make changes to the official submission. A test submission cannot be certified so risk of test data being certified has been eliminated. Once testing is complete the submission can simply be deleted. This functionality is available via the front end or API.
* Updated the instructions for installing a copy of the Broker locally which will allow agencies to test how their custom systems to automate reporting will integrate with the Broker.  
* Updated links to sample submission files.
* Fixed a minor bug with page redirects.

#### March 9, 2020
In this release of the Broker, we:

* Minor updates to website UI components. 

#### February 24, 2020
In this release of the Broker, we:

* Made code changes to the file loading and processing functions of the DATA Act Broker to increase efficiency when very large files are being uploaded. Agencies with large files should see meaningful performance improvements and processing time reduction when submitting files.
* Various minor bug fixes.

#### February 10, 2020
In this release of the Broker, we:

* Fixed minor page formatting issue on Help page.
* Front end updates to improve performance and consistency and prepare for future upgrades.

#### January 27, 2020
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

#### Update Historical DUNS
In this release of the broker we updated DUNS data to allow agencies to submit awards with historical (prior to 2014) DUNS information.

#### January 10, 2018

In this release of the Broker, we made the following updates:

#### Update FABS rule 31.1 error message
In this release of the broker we updated the language of FABS rule 31.1 to be more descriptive.

#### Update B9/B10 to check for 2016-2018 (changed from just 2016-2017)
In this relase of the broker we have updated rules B9 and B10.

#### Bug Fixes
In this release, the following bugs have been found and addressed
 - Users were unable to create a DABS submission if a FABS submission shared the same agency and action dates. 
 - Users were unable to start re-validation of certain submissions due to missing values in the API call. 
 - Users were unable to delete submissions that contain a cached D file.

#### December 22, 2017

In this release of the Broker, we made the following updates:

#### Schema - Released DAIMS v1.2
Treasury released the final DATA Act Information Model Schema (DAIMS) v1.2. DAIMS v1.2 is a minor update of the schema and addresses some agency feedback, implements policy requirements, promote additional data standardization and reduce agency burden. The release is targeted for implementation in production for the submission of FY 2018 Quarter 3 data. Find out more information in the [DABS Resources](#/resources) section.

#### DATA Act Broker Submission Deadlines
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

##### FABS Improvements
In this release, we made several improvements to FABS, including:

- Updated the submission dashboard to include the agency file name; 
- Implemented a feature to prevent users from publishing duplicate data files; 
- Updated the FABS validations so that there is no header error in FABS for facevalueloanguarantee or facevalueofdirectloanorloanguarantee
- Updated validations so that no error (or warning) is triggered if PPOPCongressionalDistrict.


#### October 6, 2017

In this release of the Broker, we released the ability to generate D1/D2 files via the Broker and made improvements to the Financial Assistance Broker Submission (FABS).


##### D1/D2 File Generation
In this release, we transitioned the backed infrastructure that is used to generate the D1/D2 files from the legacy USAspending.gov infrastructure to the Broker. D2 file generation will include agencies' FABS data. D1 file generation will be provided to the Broker via the FPDS-NG ATOM feed.


##### FABS Improvements
In this release, we made several improvements to FABS, including:
- Implemented the ability for FABS to derive FundingAgencyCode;
- Updated validations so that no error (or warning) is triggered if PPOPCongressionalDistrict is blank AND PPOPZIP+4 is 9 digits; and
- User interface improvements to prevent a user form encountering issues when clicking the "Publish" button.


#### September 28, 2017

In this release of the Broker, we released the draft DAIMS v2.0 and implemented DAIMS v1.1.

##### Schema - Release Draft v2.0 and Implemented v1.1
Treasury released the draft DATA Act Information Model Schema (DAIMS) v2.0. DAIMS v2.0 is a major update of the schema and will be finalized in December 2017. Find out more information in the Resources section. In addition, Treasury implemented the DATA Act Information Model Schema (DAIMS) v1.1 including the transition of the Award Submission Portal (ASP) to the Financial Assistance Broker Submission (FABS).


##### FABS Improvements
Treasury released the draft DATA Act Information Model Schema (DAIMS) v2.0. DAIMS v2.0 is a major update of the schema and will be finalized in December 2017. Find out more information in the Resources section. In addition, Treasury implemented the DATA Act Information Model Schema (DAIMS) v1.1 including the transition of the Award Submission Portal (ASP) to the Financial Assistance Broker Submission (FABS).

#### September 20, 2017

In this release of the Broker, we launched the Financial Assistance Broker Submission (FABS).

##### Launched Financial Assistance Broker Submission
In this release, we launched the Financial Assistance Broker Submission (FABS). Users can now upload, validate, and publish their agency's financial assistance data to the Broker. Users can also test their financial assistance data and view previous submissions.

#### August 31, 2017

In this release of the Broker, we improved FABS and front-end navigation, and loaded historical data.

##### Resolved issues found during FABS testing
In this release, FABS issues with certain data elements were fixed and the submission process was improved.

##### Front-end updates to improve navigation
In this release, updates were made to FABS to improve user navigation and ease of use.

##### Historical data load
In this release, legacy USAspending historical data from 2000 to 2016 was loaded to the Broker’s database.

#### August 17, 2017

In this release of the Broker, we continued to develop the Financial Assistance Broker Submission (FABS) as well as made improvements to the Broker submission process.

##### Financial Assistance Broker Submission (FABS) Development
In this release, we continued to develop and improve FABS. Specifically, we updated:
- validation rules related to legal entity (DUNS)
- derivations related to congressional district
- submission dashboard and navigation between FABS and quarterly DATA Act Broker Submission (DABS)
In addition, we implemented performance improvements to decrease the time it takes to validate a FABS file.

##### Broker Submission Improvements
In this release, we implemented bug fixes related to program activity and D1/D2 file generation, as well as updated the Help content. We also continued to work on loading historical procurement and financial assistance data.

#### August 2, 2017

In this release of the Broker, we made improvements to Broker validations and submissions and implemented financial reporting entity code (FREC) functionality.

##### Financial Assistance Broker Submission (FABS) Development
In this release, we continued to develop and improve FABS including validation rules and permissions.

##### Broker Submission Improvements
In this release, agencies can submit U.S. territories and single-district states and their congressional districts without errors. We also improved place of performance address information derivation. Finally, we now display the start and end of GTAS submission periods.

##### Shared Agency ID (AID)
In this release, agencies with a shared Agency ID (AID) can now report using financial reporting entity code (FREC) instead of AID.


#### July 19, 2017

In this release of the Broker, we made improvements to Broker validations, navigation, and user assistance, along with several other user enhancements.

##### Financial Assistance Broker Submission (FABS) Development
Treasury released the DATA Act Information Model Schema (DAIMS) v1.1. DAIMS v1.1 is a minor update of the schema and will be implemented in production in the fall of 2017. Find out more information in the Resources section.

##### Broker Navigation & Assistance
In this release, we implemented improvements and fixed bugs related to the submission process. These updates include:

- D file with new lines generated without error: Users can now generate a D file that contains a new line and does not cause an error, allowing the submission to complete all cross file validations.
- Shared service providers testing submissions: Shared service providers can successfully log into the Broker to test submissions.
- Submission link correction: Users will be directed to the correct submission page without skipping any steps.
- Warnings for same-period submissions: User will be properly warned if they try to create a submission in the same period as a certified/updated submission. This way, users can understand what the error in their submission is.
- Permissions for "Delete Submission" button: Users with uploader rights will now be able to see the "trash can" deletion icon.

##### DAIMS v1.1 Updates
Treasury released the DATA Act Information Model Schema (DAIMS) v1.1. DAIMS v1.1 is a minor update of the schema and will be implemented in production in the fall of 2017. Find out more information in the Resources section.


#### July 5, 2017

In this release of the Broker, Treasury  released a schema update: DAIMS v1.1 as well as improvements to the submission process.updates were made so that users can generate D files without new line errors, improvements were made to submission links, logins, and error warnings, and deletion permissions were restored. Also, we released a schema update: DAIMS v1.1.

##### Schema Release
Treasury released the DATA Act Information Model Schema (DAIMS) v1.1. DAIMS v1.1 is a minor update of the schema and will be implemented in production in the fall of 2017. Find out more information in the Resources section.

##### Submission Improvements
In this release, we implemented improvements and fixed bugs related to the submission process. These updates include:

- D file with new lines generated without error: Users can now generate a D file that contains a new line and does not cause an error, allowing the submission to complete all cross file validations.
- Shared service providers testing submissions: Shared service providers can successfully log into the Broker to test submissions.
- Submission link correction: Users will be directed to the correct submission page without skipping any steps.
- Warnings for same-period submissions: User will be properly warned if they try to create a submission in the same period as a certified/updated submission. This way, users can understand what the error in their submission is.
- Permissions for "Delete Submission" button: Users with uploader rights will now be able to see the "trash can" deletion icon.


#### June 21, 2017

In this release of the Broker, we made updates to the submission dashboard to show previously certified files.

##### Viewing all previously certified files
In this release, we updated the Broker so that all users can view and download previous certifications. Users can also see warning files accompanied with the certifications.


#### June 9, 2017

In this release of the Broker, all users are now able to generate D files outside the context of a submission. We also implemented processing time improvements.

##### Generating D files outside of a submission
In this release, we updated the Broker so that all users can generate D files outside the context of a submission regardless of the user's permissions.

##### Improved processing time
In this release, we implemented changes to improve the processing time so that high volume file validations can be completed in a timely manner.


#### May 24, 2017

In this release of the Broker, we added a certified data column to the submission dashboard, updated the warning/error reports to include the rule label, and updated the help page with information about the Service Desk.

##### Certified date column in the submission dashboard
In this release, we updated the submission dashboard so that users can see when the file was certified.

##### Rule label included in error and warning descriptions
In this release, we updated the error and warning reports so that users can view the rule label (i.e. A9) for each error or warning.

##### Service Desk information on help page
In this release, we updated the Help Page so that users can access information on the Service Desk under "Getting More Help."


#### May 10, 2017

In this release of the Broker, we rolled out functionality improvements for the cross-file validation processing time and a disabled upload button for users without upload or certify permissions.

##### Display of Upload & Validate feature for users without upload permissions
In this release, we updated the Broker so that only users in an agency's upload and certify permission group will see an active Upload & Validate button on the home page of the Broker.

##### Improved processing time
In this release, we implemented a solution to improve the processing time for cross-file validations.


#### April 26, 2017

In this release of the Broker, we rolled out functionality improvements for users to navigate to previously completed steps and a disabled certify button for users without certification permissions. We also added a link to the USAspending Service Desk on the Help page.

##### Broker navigation between validation steps
In this release of the Broker, we implemented a functionality improvement for users to navigate to any previously completed step in the submission process.

##### Display of certify button for users without certification permissions
In this release, we updated the Broker so that only users in an agency's certify permission group will see an active certify button on the final submission page of the Broker.

##### Service Desk link
In this release, we added a link to the USAspending Service Desk on the Help page under "Getting More Help."


#### April 12, 2017

In this release of the Broker, we deployed the FY2017 Program Activity code list. We rolled out a bug fix for Program Activity and Object Class warnings and implemented a solution to improve the validation processing time, along with other improvements.

##### FY 2017 Program Activity codes
In this release of the Broker, Treasury deployed the FY2017 Program Activity code list. You can access a copy of this list on [Github](https://github.com/fedspendingtransparency/data-act-broker-backend/blob/development/dataactvalidator/config/example_program_activity.csv). If you have questions or issues related to the list, please contact OMB at SpendingTransparency@omb.eop.gov.The new Program Activity list applies to the validation rules B9 and B10.

##### Program Activity and Object Class warnings
In the previous version of the Broker, users received warnings for blank or 000/0000 Program Activity and Object Class fields for TASs that have no obligations or outlays. We updated the Broker to not issue warnings for B9, B10, B11, B12, and B18 in these cases.

##### Improved processing time
In this release, we implemented changes to improve the processing time of file validations.

##### Functionality improvements
In this release, we made improvements to the submission dashboard and submission status. Specifically:

- Updated the submission dashboard to show certified submissions that are updated but not re-certified with a status of "Updated (Needs Re-certification)".
- Updated the final submission page so read-only users only see a disabled certify button.
- Updated the Certified Submission table on the Submission Dashboard page to include a "Certified By" column.
- Added a warning message so that a user is notified if they try to create a submission for the same period of a previously certified submission.


#### March 29, 2017

In this release of the Broker, agencies are now able to make changes to previously certified files. We also rolled out bug fixes for C9 and C12.

##### Changes to previously certified files
In this release of the Broker, agencies are now able to make changes to previously certified files. To update a previously certified submission, go to the submissions that you want to correct and upload the corrected files.  Go through the file validations and certify the corrected files.

##### Error report fix
In previous versions of the Broker, users experienced an issue with the error report not showing the same number of errors listed on the submission page. We rolled out a fix to correct this issue.

##### C9 warning message
In the previous version of the Broker, the C9 validation was not consistently producing warnings. We updated the implementation to reflect the C9 validation rule in the DAIMS that states, "Unique FAIN and/or URI from file D2 should exist in file C, except D2 records where FederalActionObligation and OriginalLoanSubsidyCost = 0. FAIN may be null for aggregated records. URI may be null for non-aggregated records."

##### C12 warning message
In the previous version of the Broker, the C12 validation was not consistently producing warnings. We updated the implementation to reflect the C12 validation rule in the DAIMS that states, "Each unique PIID (or combination of PIID/ParentAwardId) from file D1 should exist in file C during the same reporting period, except D1 records where FederalActionObligation = 0."


#### March 15, 2017

In this release of the Broker, agencies are now able to certify and submit data for publication. We rolled out bug fixes for flex fields, B11 and C11/C12 validation rules, and Program Activity case sensitivity. We also improved the submission dashboard functionality and updated the warning and error messages to reflect clarifications to the validation rules.  submission dashboard and the warning and error messages were updated to reflect recent changes to the validation rules.

##### Data Submission
In this release of the Broker, agencies are now able to certify and submit data. Certified data will be available in the DATA Act Outbound Application Programming Interface (API) and will be sent to the data store for publication on the future website. All test submissions certified before March 15th are marked as not certified and are not available for publication unless the files are recertified.

##### Program Activity case sensitive fix
In this release of the Broker, we rolled out a fix to make validations for Program Activity not case sensitive.

##### B11 validation fix
In previous versions of the Broker, the B11 validation produced an error for a blank reimbursable/direct indicator. In this release, we updated the B11 validation to only check for Object Class validity.

##### C11/C12 validation fix
In the previous version of the Broker, the C11/C12 validation produced a warning if both PIID and ParentAwardID were submitted. We corrected this to not produce a warning if both PIID and ParentAwardID are submitted.

##### Flex field fix
In previous versions of the Broker, flex fields were not available in the cross file validation reports. We updated the Broker to show flex fields in the cross file validation reports.

##### Updated warning/error messages
In this release of the Broker, we updated the warning and error messages to reflect clarifications made to the validation rules from recent releases.

##### Functionality improvement
We updated the submission dashboard to allow the user to sort the submission tables by any of the column headers.

##### Browser Requirements & Known Issues
The Broker is currently tested with the following browsers:

* Internet Explorer version 10 and higher
* Firefox (current version)
* Chrome (current version)
* Safari (current version)

Although you may use any browser/version combination you wish, we cannot support browsers and versions other than the ones stated above.

Known Issues

* The Broker will not work when using Internet Explorer under medium privacy settings or high security settings.

##### Accessibility Statement

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

##### B14/B15 validation fix
In previous versions of the Broker, the B14/B15 validation would produce a failure in the File B related to GTAS lines 2004 (direct) and 2104(reimbursable). In this release of the Broker, the B14/B15 validation was updated to add up correctly to compare against the SF 133 lines 2004/2104.

##### C8/C9 validation fix
In earlier versions of the Broker, the C8/C9 validations produced warnings if both a FAIN and URI were reported for a record. In this release, the C8/C9 validation will not trigger a warning if both a FAIN and URI are reported together.

##### C23 validation fix
In this release of the Broker, the C23 cross file validation was updated so that if `parent_award_id` is present, both `PIID` and `parent_award_id` are used to cross validate Files C and D1. If `parent_award_id` is not present, the validator compares `PIID` in File C to the `PIID` in File D1 only.

##### Reporting SGL data in File C
In earlier versions of the Broker, the validation rules were generating warnings for File C submissions that had SGL balances for an award without D1/D2 activity in the reporting period. In this release of the Broker, the C8/C9 and C11/C12 validations have been updated to only run on rows in File C that have a transaction obligated amount value in the field.

##### Deleting an old submission
In this release of the Broker, we rolled out a delete button in the submission dashboard that upload users can use to delete non-certified submissions. Submissions that are deleted are permanently removed from the website and are unable to be recovered.

##### File B header processing fix
In this release of the Broker, we rolled out a functionality fix to allow users to submit File B that either does or does not have the typo on the DeobligationsRecoveriesRefundsdOfPriorYearByProgramObjectClass_CPE field.

##### Updated list of agency CGAC codes
In this release of the Broker, we implemented an updated list of agency CGAC codes, names and abbreviations. The full list is available [here](https://github.com/fedspendingtransparency/data-act-broker-backend/blob/development/dataactvalidator/config/agency_list.csv).

##### Improved processing time fix
In this release, we implemented a solution to improve the processing and stability of file submissions at a high volume.

##### B11 validation fix
Previously, the B11 validation was checking the direct/reimbursable flag. We updated this rule to check the object class only.


#### February 13, 2017

In this release of the Broker, bugs were fixed relating to downloading cross file warning/error reports, the B14/B15 validations, and Program Activities with the code '0000' and title 'Unknown/Other'. Functionality improvements were rolled out, including downloading submission files, padding zero values for Object Class and Program Activity, and others.

##### B14/B15 validation fix
In earlier versions of the Broker, the B14/B15 validations produced fatal errors. In this release, the B14/B15 validation was changed to a warning.

##### Program Activity
In this release of the Broker, Program Activities with the code '0000' and title 'Unknown/Other' will validate without warnings.

##### Cross file warning/error reports
We discovered a bug in the process for downloading cross file warning and error reports. This has been fixed and users should no longer experience issues when downloading the cross file warning and error reports.

##### Functionality Improvements
* File names on the submission page are now links that can download the most recent file uploaded.
* Object Class and Program activity pass for zero values that are not fully padded to '000' or '0000', respectively.
* A Broker registration link has been added to the help page for users that do not have a Broker account.
* A column has been added for agency name in the submission dashboard.
* Improved processing time for file submissions at a high volume.


#### February 1, 2017

This release of the Broker was focused primarily on maintenance. Notable fixes rolled out in this release include improved processing of high volume files submissions and fixes for rules B9, B10, and B12.


##### Improved processing time fix
In this release, we implemented a solution to improve the processing and stability of file submissions at a high volume.

##### B12 validation fix
In earlier versions of the Broker, the B12 validation would prompt a warning if the Direct/Reimbursable (D/R) flag field was not populated for transfer USSGLs (4831, 4832, 4931), which conflicted with GTAS requirements. We made changes to this rule to allow for the submission of blank D/R fields when submitting transfer USSGLs (4831, 4832, 4931).

##### B9/B10 validation fix
In earlier versions of the Broker, the B9/B10 validations produced warnings for FY 2017 Program Activity codes. Treasury has not received the authoritative list of FY 2017 Program Activity codes yet. This rule was modified to only validate Program Activity for years that we have domain values for.


#### January 18, 2017

In this version of the Broker, several bugs were fixed relating to the flex fields, the C23 validation, file E creation, and rule B18. Additionally, financing accounts are now excluded from the A33 validation, per the new loan policy.

##### Flex field fix
After the flex fields were rolled out in an earlier release, we discovered a bug where multiple instances of a flex field would cause submission files to return errors. This has been fixed and users should no longer experience errors when using flex fields in their files. The proper syntax for the flex field headers is `flex_`.

##### C23 validation fix
In earlier versions of the broker, the C23 validation would produce a failure in cases where both amounts from C and D for an award were zero but reported as different data types (such as string vs a numeric). We've fixed this bug so that even different data types that represent the same amount should match and not produce an error.

##### File E generation fix
Previously the file E generation was not working due to locked SAM credentials. A new SAM account has been created and deployed so that users should be able to generate their E file without error.

##### Update to rule B18
Rule B18 was modified to prevent conflict with Rule B12, when downward adjustment USSGLs are submitted with a blank D/R field.

##### Financing accounts exclusion
Rule A33 was modified so that users will no longer see a warning if the submission does not include Financing Accounts.


#### December 21, 2016

In this version of the Broker, users are able to generate D files outside of a submission, rules that were temporarily warnings are changed back to errors, the Broker is available at a new URL, rule B5 is updated, object class validations require a specific value when an object class is unknown, and MAX permissions allow users who are part of of multiple agency permission groups to have different permissions for different agencies.

##### Generate D Files Outside of a Submission
Users will be able to generate D files outside the context of a submission. In other words, they won't need to validate A-C to be able to generate D files.

##### Temporary Warnings Changed Back to Errors
All Rules that were temporarily warnings are changed back to critical errors. These warnings were documented on the validation table on the Help page, with a note that they would become errors in the future. The exception to this is rule A33, which will remain a warning for now.

##### New URL for Data Broker
The Data Broker is now be available at broker.usaspending.gov. All users should be automatically redirected.

##### Object Class Validation Update
Object Class validations only allow the object classes listed in the domain values. If the object class is unknown, agencies should use '000' instead of a value of their choosing. Please note that only '000' will be accepted by the broker, not '0' or '00'. If you're editing your files in Excel, you may need to pay careful attention to the formatting of the object class column to make sure it does not truncate the value to '0'.

##### MAX Group Permissions Allow for Different Permissions for a User Who is Part of a Multiple Agency Permission Group
Updates to the MAX group permissions  allow for different permissions for different agencies, when a user is part of multiple agency permission groups, such as shared service providers.


#### December 7, 2016

In this release we are making improvements to the Broker and responding to issues discovered through greater agency use.

In this release there are bugfixes, improvements, and changes to the way the Data Broker handles certain conditions.

##### Flex Fields
Users can now add additional columns to their submission files (A-C) that will be returned in their warning and error files. To use this feature, add any column to your submission data and prefix the header with "flex\_". For example, a column named "flex_reportingbureau" will be ignored for validation purposes but returned for any rows that have errors in the warnings and error reports.

##### Comments in Certification
Users can now add comments to each file during the certification process. On the final summary screen, you can select the file you wish to add comments for and write free-form prose to accompany that file for certification purposes.

##### White space bugfix
In previous versions of the broker, rows of white space at the end of a file would cause validation errors. This was common for users exporting from excel. The broker will now ignore rows at the end of the file if all of the values are whitespace.

##### Improvements to the Local Install process
In this release we made improvements to the local install process for the broker so that users can more easily install the local broker for internal use.

##### Rounding Error bugfix
In previous versions of the broker, certain GTAS lines were being rounded when the source data was imported into the broker. We've resolved this issue to make sure the source data for all GTAS validations is correct.


##### November 30, 2016

In this version of the Broker, we are using MAX to manage user accounts, we updated how the Broker processes several rules and reports errors, revised Rule A16, and populated the information in the summary table on the final Broker screen.

##### Sign In Using MAX
If you are seeing this in What's New in This Release, you already know about the MAX.gov sign in that was implemented with this release. If your coworkers are having trouble signing in, they should contact their agency administrator for MAX. If the agency doesn't have a MAX administrator, email DATAPMO@fiscal.treasury.gov

##### Processing of Validation Rules
We updated how the Broker processes some rules.

A16: The Broker will check for a published or publishable submission for the current fiscal year before running Rule A16 on Files A and B. File C is no longer checked for Rule A16 as the FYB data elements are optional in this file. Note: Rule A16 is updated in the Validation Rules table and the downloadable spreadsheet. See the Validation Rules page.
B14 & B15: We fixed a sign problem in these rules.
B20: If the program activity provided in File C is zero, null, or blank, then the Broker compares the combination of TAS and object class between Files B and C instead.
C8 & C9: Updates to how the Broker checks FAIN and URI in these rules.
C23: Errors are now displayed for this rule after the File C - D2 cross-file validation.
Various rules: Downward adjustments are excluded, where applicable.

##### Summary Table
The final Broker screen displays a summary of your agency's submission. File size, number of rows, and number of warnings are displayed for the files you uploaded. Agency name and report start and end dates are displayed for your agency's submission. The dollar amounts for total obligations incurred, total financial assistance obligations, and total procurement obligations are calculated from your agency's submission and displayed.

#### What's New in This Release - October 21, 2016

On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through greater agency use.

In this version of the Broker, we have improved the cross-file validation and file download experience, improved the Broker processing of PIID and FAIN/URI, and improved the readability of the Help pages.

###### Validation and File Download
Cross File Validations and File Downloads

- The cross-file validation reports now include the error text instead of the rule description text.
- While the D1 and D2 files are being generated, the messaging is more descriptive, "Creating your D1 and D2 files from ASP and FPDS. This may take a few minutes."
- If there is an error generating the file from ASP or FPDS, the message says, "A problem occurred receiving data from ASP" (or FPDS) instead of a generic 404 error.
- File E, Additional Awardee Attributes, can now be generated and downloaded after Files D1 and D2 generate.

###### Better PIID and FAIN/URI Processing
The Broker processing of Rule C14 was updated to better handle the combinations PIID with either FAIN or URI.

###### Help Pages Readability
We have updated the styling of the Help pages to use consistent header styles and remove unneeded white space to improve readability. We have also added a navigation bar to move between help pages.

#### What's New in This Release - September 30, 2016

This version of the DATA Act Broker contains everything agencies need to test the data validation and submission process.

In this version of the Broker, we have improved the cross-file validation experience, implemented all the current validation rules, reorganized the Help section, including new pages for Resources and Validation Rules.

###### Cross-File Validation Improvements
When running cross-file validations, you will see the file pairs for the C - D1 validations, you will see the the validation warnings, and you will be able to upload corrected files for one pair of validations without having to correct all files. You will also be able to download the the files generated by the Broker.

###### Validation Rules Implemented
All the current validation rules for Files A, B, and C, plus the cross-file validations have been implemented.  For more details, see the [Validation Rules](/#/validations) page.

###### New Help
This Help section of the Broker has been reorganized. The main page only includes the latest release notes. The prior release notes are on the [Release Notes Archive](/#/history) page.

The new [Resources - DAIMS](/#/resources) page includes all the information from the old Resources section and has been expanded to include a web page of the [Practices and Procedures](/#/practices). Some content from other websites was moved from other websites. Some Resources content has been updated, including the Domain Values and the Long Element Name to Short Element Name Crosswalk.

The [Validation Rules](/#/validations) page contains not only the most current information on the rules status, but also a severity column that indicates whether a rule generates a warning or a fatal error.


#### What's New in This Release - September 21, 2016

This is the Full Version of the DATA Act Broker and contains everything agencies need to test their data.

In this version of the Broker, we have improved how the Broker receives D1 and D2 file information from the USAspending UAT environment, added screens for certifying submissions, improved the data we are using for Broker testing, corrected a Resources file, and updated the table of validations.

###### Receiving Files D1 and D2
In this release, we have improved how the Broker receives the data for Files D1 and D2 from the USAspending UAT environment that comes from ASP and FPDS. As a user, you should not see any changes, except better functionality.

###### Screens for Certification
The Broker now displays the screens an SAO will use to certify a submission. The text on these screens is based on a Draft OMB policy memo. The screens are there for you to review and understand the language and process. Feel free to click on any option - you will NOT actually certify and submit data to USAspending, at this time.

###### Broker Test Data
We are testing the Broker with actual agency data to better replicate your experiences. You won't see any changes in the Broker.

###### Updated Validations
Below is a cumulative table of validations in the RSS and IDD. The status column indicates whether they are currently implemented in the Broker. The table has been revised to match the latest validations rules spreadsheet in the Resources section.
**Note:** in the September 30, 2016 release the validation rules, resources, this release notes archive were moved to different pages. Use the left navigation pane on the Help home page to access these new pages.

#### What's New in This Release - September 14, 2016

In this version of the Broker, we are importing D1 and D2 file information from the USAspending UAT environment, improved the handling of encoding in files, corrected a Resources file, and added and updated some validations.

###### Updated: Generating D1 and D2
In this release, we have added the ability to generate the D1 and D2 files from the data in the USAspending UAT environment that comes from ASP and FPDS. The procurement data for File D1 is only available through 7/31/2016, at this time. Submit your financial assistance data for File D2 through the ASP UAT environment. **Note:** This functionality is newly implemented so let us know if you have problems.

###### Encoding in Files
Some users reported errors trying to submit files. We improved how the Broker handles some encoding scenarios so these errors are no longer generated.

#### What's New in This Release - August 10, 2016

In this version of the Broker, we separated out the validation checks into warnings and critical errors, added the interface to create D1 and D2 files, improved 508 compliance, increased server capacity, added an interface for broker users to notify other users that a submission is ready, and fixed a bug that incorrectly showed submissions as valid on the home page submission table.

###### Warnings and Errors
In previous versions of the Broker, all failing validations were treated as critical errors. In this release, we have added an almost identical interface for the warnings, complete with a downloadable file and table. The warnings appear alongside the existing error download and tables. Files with warnings may be submitted, but files with critical errors will not pass validation and may not be submitted.

###### Generating D1 and D2
In previous versions of the Broker, you could only upload a D2 file. If you didn't have a D2 file, you could use the sample file provided. In this release, we have added the interface to generate the D1 and D2 files. **PLEASE NOTE** that the interface currently returns sample files until the integration with the ASP and FPDS is complete in the next 2-3 weeks.

###### Improved 508 Compliance
In this release, the Broker has further improved it's compliance with 508 accessibility guidelines.

###### Increase Server Capacity
In this release, the development team has significantly increased the base capacity of the web and database servers powering the Broker.

###### Notify Another User
Broker users can now send a notification to another user within their same agency when they want them to view a submission. This option is available on the Review Data page, after all validations have completed. You can also send other users in your agency the link to your in-progress submission anytime.

###### Bugfix: Submissions Incorrectly Show as Valid
Several users reported a minor bug with the submission table that appears on the home page. It was showing submissions as valid that actually had errors. This has been corrected to more accurately reflect the status of a submission.

####  What's New in This Release - July 27, 2016

In this version of the Broker, we updated the Broker branding to Beta, improved the validation processing time, implemented short data element names, made the styling more consistent, improved the accessibility of the Broker, added a resources section, and updated the information on validations.

###### DATA Act Broker - Beta Release
We updated all the relevant text to reflect "Beta Release." We still plan on incremental updates to the Broker about every two weeks.

NOTE: Even though the DATA Act Broker - Beta Release has been in place since the June 29th release, the URL will remain the same [https://alpha-broker.usaspending.gov](https://alpha-broker.usaspending.gov).

###### Validation Processing Time
We made some improvements to reduce the validation processing time. If you're still experiencing submissions that take more than 15-20 minutes, please contact us so we can troubleshoot the issue.

###### Short Data Element Names
Some agency financial systems need to use column heading that are less than 30 characters long. We have created a set of short element names. See the Resources section for element name crosswalk.

###### Consistent Broker Styling
We made some small changes so the Broker displays in a more consistent manner.

###### More Validations in SQL
Agency developers may be interested to know that we transitioned more of the Broker validations to using SQL statements. The list of SQL statements is publicly available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

###### Accessibility Improvements
We made several changes to improve the accessibility of the Broker by adaptive technologies like screen readers. We also added an accessibility statement in this Help file.


#### What's New in This Release - July 13, 2016

NOTE: The DATA Act Broker - Alpha Release is now in beta status (as of the June 29, 2016 release). We will be updating the related text indicators on the website in the next release. The URL ([https://alpha-broker.usaspending.gov](https://alpha-broker.usaspending.gov)) will not change for now.

In this version of the Broker, we changed the submission date timeframe, reduced the errors generated by blanks, improved the display of the tree map for errors, display the cross file validations, and updated some more validations to SQL.

###### Reporting Date Timeframe
When you create a new submission, the date selection is for one month or one quarter. Examples: June 2016 or Quarter 4 - 2016.

###### Tree Map for Errors
We updated the color of the tree map and the language used to describe the errors. Look for further improvements to the error descriptions in future releases.

###### Display of Cross-File Validations
After each individual file is validated, the Broker performs some cross-file validations. You will now see the results of these validations in the Broker, see a table of errors, be able to download an error report, and upload corrected files.

###### More Validations in SQL
Agency developers may be interested to know that we transitioned more of the Broker validations to using SQL statements. The list of SQL statements is publically available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

###### Updated Validations
In this release we have transitioned all of these validations to SQL except A1, B9, and B10. See cumulative table of validations above.

#### What's New in This Release - June 29, 2016

In this version of the Broker, we made several small changes to make the Broker easier to use, added a section to display submissions from your agency, clarified the process to upload corrected files, added an email notification feature, transitioned some of the validation rules to SQL statements, and updated some of the validations.

###### Ease of Use Improvements
- **Confirm Password** When you create a Broker account, you are prompted to enter a Password and then to Confirm Password.
- **Username** On the log in screen, we have replaced the Username prompt with Email Address since your user name is your email address.
- **Submission Guide** If you hide the Submission Guide page, when you select your agency for a new submission, there is a link to view the Submission Guide. The Submission Guide also has a link to the validations listed on this Help page.
- **Default Dates** When creating your submission, the dates default to the beginning of the fiscal year and the current month or quarter.
- **Last Saved** The Broker automatically saves your files when you upload them and at each step of the validation process. The date and time the data was last saved is displayed at the top of the screen below the Help menu.
- **Leave Validations Running** You can leave the validation page and the validations will continue to run. Come back at any time to check your progress or results.
- **Spam Folder Warning** Some users report that emails from the Broker end up in their spam folders. We've added a reminder to check your spam folder on pages that generate emails.
- **Back to Top** We know this Help page is getting long so we added an arrow in the lower right corner. Click it to take you back to the top of the page at any time.

###### Submissions from Your Agency
We've added a table to the Broker home page where you can see recent submissions from your agency. View and edit submissions from this table.

###### Uploading Corrected Files
If one or more of your files fails validation, only those failed files will have a prompt in red for you to upload a corrected file. Click *Choose Corrected File* to browse to your file and select it. Or drag and drop a corrected file onto the file icon. Click *Upload Corrected CSV Files*. The validations on the corrected files will run again.

###### Send Email Notifications
After your data has been successfully validated, the *Review & Publish* page has a button to *Notify Another User that the Submission is Ready for Certification*. This opens a field where you can type in multiple email addresses for users in your agency.

###### Some Validations in SQL
Agency developers may be interested to know that we transitioned some of the Broker validations to using SQL statements. The list of SQL statements is publically available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

###### Updated Validations
In this release we included rules A18, A19, A20, B9, B10, B11, B12, and C18. See cumulative table above.

#### What's New in This Release - June 15, 2016

In this version of the Broker, we made it easier to select your agency, made it easier to submit your data without errors, and updated some of the validations.

###### Easier Agency Selection
When you register for an account or create a submission, you can enter your CGAC code to correctly select your agency.

###### Accidental Commas in Dollar Amounts
The Practices and Procedures document specifies that dollar amounts should be submitted without commas. However, if you accidentally include commas in dollar amounts the Broker will remove them.

###### Header Row Capitalization Errors
The Practices and Procedures document specifies that the element names in the header row should exactly match the RSS element names. However, to assist you the Broker will process files with incorrect element name capitalization.

#### What's New in This Release - June 1, 2016

In this version of the broker, we have added some information on the screens to help you with your data submission, added some functionality to help you select the reporting period, and updated some of the validations. __Note:__ Validation details are included in the cumulative updated validations table.

###### Step-by-Step Guide on the Broker Home Page
When you log into the Broker, you will see three choices that guide you to _Upload and validate a new submission_, _Continue with an existing submission_, and _Review, certify, and publish a submission_.

###### Submission Guide
The Submission Guide provides details of the four steps to submit your agency's data. Once you have reviewed this page, you can check a box to hide this page the next time you log into the Broker.

###### Select Reporting Period
Based on user feedback, the quarterly submission dates are displayed as the quarter number and the fiscal year. Example: Quarter 2 - 2016.

#### What's New in This Release - May 17, 2016

In this version of the Broker, we have made a change if you are logging in with Internet Explorer, added functionality for the Broker to recognize files with the pipe symbol as a delimiter, and updated some of the validations.

###### Logging into the Broker with Internet Explorer
During user testing, some Internet Explorer users were unable to log into the Broker and upload files. We implemented a workaround so users with Internet Explorer on __medium security settings__ can log in and upload files. See Known Issues below.

###### Submit File with Pipe Symbol
Based on user feedback, we changed the Broker to automatically detect whether a file is using a comma or pipe symbol as a delimiter, based on the format of the header row.

###### File Validations per RSS v1.0
Submitted files will be validated per RSS v1.0. Specifically:
* Field names match the RSS v1.0
* Maximum field length does not exceed the value in RSS v1.0
* Required fields are present per RSS v1.0
* Records in File C have a PIID, FAIN, or URI

###### Cross File Validations
We started work on cross file validations, beginning with cross validation of the FAIN, URI or PIID between sample files for Files C and D2.
