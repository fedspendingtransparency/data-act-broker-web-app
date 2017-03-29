#### March 15, 2017

On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through continued agency use.

In this release of the Broker, agencies are now able to certify and submit data for publication. We rolled out bug fixes for flex fields, B11 and C11/C12 validation rules, and Program Activity case sensitivity. We also improved the submission dashboard functionality and updated the warning and error messages to reflect clarifications to the validation rules.  submission dashboard and the warning and error messages were updated to reflect recent changes to the validation rules.


  - [Data Submission](#/help?section=data)
  - [Program Activity case sensitive fix](#/help?section=case)
  - [B11 validation fix](#/help?section=b11)
  - [C11/C12 validation fix](#/help?section=c11)
  - [Flex field fix](#/help?section=flex)
  - [Updated warning/error messages](#/help?section=warning)
  - [Functionality improvement](#/help?section=imp)


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

We know our website changes regularly so we’re always looking for ways to improve. If there is information you think should be included on this page, or if you experience any difficulty accessing this site, please contact us at [DATAPMO@fiscal.treasury.gov](mailto:DATAPMO@fiscal.treasury.gov) for assistance.

###### Documents

The documents offered within Alpha-broker.usaspending.gov use multiple file formats. Below is a list that will help you identify which software downloads are needed to view different file extensions. If you require a file format other than those currently provided or experience accessibility issues, please contact us at [DATAPMO@fiscal.treasury.gov] (mailto:DATAPMO@fiscal.treasury.gov) for assistance.

###### Document Files

*  Windows Operating System .TXT files can be viewed on any Windows-based document reader.
* [Adobe Reader](https://get.adobe.com/reader/) (.pdf) For viewing and printing PDF documents.
* [Microsoft Word Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=4) (.doc, .docx) For viewing, printing, and copying Word documents without having Microsoft Word installed. It replaces Word Viewer 2003 and previous versions.
* [Microsoft Excel Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=10) (.xls, .xlsx) For viewing and printing Excel workbooks without having Microsoft Excel installed. It replaces Excel Viewer 97 and previous versions.
* [Microsoft PowerPoint Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=6) (.ppt, .pptx) For viewing full-featured presentations created in PowerPoint 97 and later versions.

#### March 1, 2017
On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through continued agency use.

In this release of the Broker, bug fixes were rolled out for B14/B15, C8/C9, C11/C12, and C23.  Functionality improvements were rolled out, including a delete button for non-certified submissions, a File B header processing fix, and updates to improve file processing time. We also implemented an updated list of agency CGAC codes, names, and abbreviations.



  - [B14/B15 validation Fix](#/help?section=b14)
  - [C8/C9 validation fix](#/help?section=c8)
  - [C23 validation fix](#/help?section=c23)
  - [Reporting SGL data in File C](#/help?section=sgl)
  - [Deleting an old submission](#/help?section=delete)
  - [File B header processing fix](#/help?section=header)
  - [Updated list of agency CGAC codes](#/help?section=cgac)
  - [Improved processing time fix](#/help?section=improvements)  
  - [B11 validation fix](#/help?section=b11)



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
On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through continued agency use.

In this release of the Broker, bugs were fixed relating to downloading cross file warning/error reports, the B14/B15 validations, and Program Activities with the code '0000' and title 'Unknown/Other'. Functionality improvements were rolled out, including downloading submission files, padding zero values for Object Class and Program Activity, and others.


  - [B14/B15 validation Fix](#/help?section=b14)
  - [Program Activity](#/help?section=pa)
  - [Cross file warning/error reports](#/help?section=cross)
  - [Functionality Improvements](#/help?section=improvements)


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
On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through continued agency use.

This release of the Broker was focused primarily on maintenance. Notable fixes rolled out in this release include improved processing of high volume files submissions and fixes for rules B9, B10, and B12.


  - [Improved Processing Time](#/help?section=time)
  - [B12 Validation fix](#/help?section=b12)
  - [B9/B10 validation fix](#/help?section=b9)


##### Improved processing time fix{section=time}

In this release, we implemented a solution to improve the processing and stability of file submissions at a high volume.

##### B12 validation fix{section=b12}

In earlier versions of the Broker, the B12 validation would prompt a warning if the Direct/Reimbursable (D/R) flag field was not populated for transfer USSGLs (4831, 4832, 4931), which conflicted with GTAS requirements. We made changes to this rule to allow for the submission of blank D/R fields when submitting transfer USSGLs (4831, 4832, 4931).

##### B9/B10 validation fix{section=b9}

In earlier versions of the Broker, the B9/B10 validations produced warnings for FY 2017 Program Activity codes. Treasury has not received the authoritative list of FY 2017 Program Activity codes yet. This rule was modified to only validate Program Activity for years that we have domain values for.


#### January 18, 2017

In this version of the Broker, several bugs were fixed relating to the flex fields, the C23 validation, file E creation, and rule B18. Additionally, financing accounts are now excluded from the A33 validation, per the new loan policy.

  - [Flex field fix](#/help?section=flexfield)
  - [C23 validation fix](#/help?section=c23)
  - [File E generation fix](#/help?section=filee)
  - [Update to rule B18](#/help?section=B18)
  - [Financing accounts exclusion](#/help?section=A33)

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
On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through greater agency use.

In this version of the Broker, users are able to generate D files outside of a submission, rules that were temporarily warnings are changed back to errors, the Broker is available at a new URL, rule B5 is updated, object class validations require a specific value when an object class is unknown, and MAX permissions allow users who are part of of multiple agency permission groups to have different permissions for different agencies.

  - [Generate D files outside of a submission](#/help?section=Dfiles)
  - [Temporary Warnings Changed Back to Errors](#/help?section=warnings2Errors)
  - [New URL for the Data Broker](#/help?section=URL)
  - [Update to Rule B5](#/help?section=B5)
  - [Object Class Validation Update](#/help?section=objectClass)
  - [MAX Group Permissions Allow for Different Permissions for a User Who is Part of a Multiple Agency Permission Group](#/help?section=maxGroup)
  - [Browser Requirements & Known Issues](#/help?section=browser)
  - [Accessibility Statement](#/help?section=accessibilityStatemen)

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

  - [Flex Fields](#/help?section=flexfields)
  - [Comment box available for each file in certification](#/help?section=comments)
  - [White space bugfix](#/help?section=whitespace)
  - [Improvements to local install process](#/help?section=local)
  - [Rounding error bugfix](#/help?section=rounding)

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

On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through greater agency use.

In this version of the Broker, we are using MAX to manage user accounts, we updated how the Broker processes several rules and reports errors, revised Rule A16, and populated the information in the summary table on the final Broker screen.

  - [Sign In Using MAX](#/help?section=MAXsign)
  - [Processing of Validation Rules](#/help?section=ValidationRules)
  - [Summary Table](#/help?section=SummaryTable)

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

  - [Validation and File Download](#/help?section=crossFileDownload)
  - [Better PIID and FAIN/URI Processing](#/help?section=C14Processing)
  - [Help Pages Readability](#/help?section=helpReadability)
  - [Browser Requirements & Known Issues](#/help?section=browser)
  - [Accessibility Statement](#/help?section=accessibilityStatement)

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

  - [Cross-File Validation Improvements](#/help?section=crossFileImp)
  - [Validation Rules Implemented](#/help?section=validationRulesStatus)
  - [New Help](#/help?section=newHelp)
  - [Browser Requirements & Known Issues](#/help?section=browser)
  - [Accessibility Statement](#/help?section=accessibilityStatement)

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

  - [Receiving Files D1 and D2](#/help?section=receivingd1d2)
  - [Screens for Certification](#/help?section=certifyScreens)
  - [Broker Test Data](#/help?section=testData)
  - [Updated Validations](#/help?section=updatedValidations)

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

  - [Updated: Generating D1 and D2](#/help?section=d1d2updated)
  - [Encoding in Files](#/help?section=encoding)

###### Updated: Generating D1 and D2{section=d1d2updated}

In this release, we have added the ability to generate the D1 and D2 files from the data in the USAspending UAT environment that comes from ASP and FPDS. The procurement data for File D1 is only available through 7/31/2016, at this time. Submit your financial assistance data for File D2 through the ASP UAT environment. **Note:** This functionality is newly implemented so let us know if you have problems.

###### Encoding in Files{section=encoding}

Some users reported errors trying to submit files. We improved how the Broker handles some encoding scenarios so these errors are no longer generated.

#### What's New in This Release - August 10, 2016

In this version of the Broker, we separated out the validation checks into warnings and critical errors, added the interface to create D1 and D2 files, improved 508 compliance, increased server capacity, added an interface for broker users to notify other users that a submission is ready, and fixed a bug that incorrectly showed submissions as valid on the home page submission table.

  - [Warnings and Errors](#/help?section=warnings)
  - [Generating D1 and D2](#/help?section=d1d2)
  - [Improved 508 Compliance](#/help?section=508compliance)
  - [Increased Server Capacity](#/help?section=capacity)
  - [Notify Another User](#/help?section=notifyauser)
  - [Bugfix: Submissions Incorrectly Show as Valid](#/help?section=homepagesubmissiontable)

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

  - [DATA Act Broker - Beta Release](#/help?section=betaRelease)
  - [Validation Processing Time](#/help?section=processingTime)
  - [Short Data Element Names](#/help?section=shortNames)
  - [Consistent Style](#/help?section=consistentStyle)
  - [More Validations in SQL](#/help?section=validationSQL3)
  - [Accessibility Improvements](#/help?section=accessibilityImprovements)


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

  - [Reporting Date Timeframe](#/help?section=reportingDateTimeframe)
  - [Tree Map for Errors](#/help?section=treeMap)
  - [Display of Cross-File Validations](#/help?section=crossFileValv2)
  - [More Validations in SQL](#/help?section=validationSQL2)
  - [Updated Validations](#/help?section=updatedValidations)

###### Reporting Date Timeframe{section=reportingDateTimeframe}
When you create a new submission, the date selection is for one month or one quarter. Examples: June 2016 or Quarter 4 - 2016.

###### Tree Map for Errors{section=treeMap}
We updated the color of the tree map and the language used to describe the errors. Look for further improvements to the error descriptions in future releases.

###### Display of Cross-File Validations{section=crossFileValv2}
After each individual file is validated, the Broker performs some cross-file validations. You will now see the results of these validations in the Broker, see a table of errors,  
be able to download an error report, and upload corrected files.

###### More Validations in SQL{section=validationSQL2}
Agency developers may be interested to know that we transitioned more of the Broker validations to using SQL statements. The list of SQL statements is publically available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

###### Updated Validations{section=updatedValidations}
In this release we have transitioned all of these validations to SQL except A1, B9, and B10. See cumulative table of validations above.

#### What's New in This Release - June 29, 2016
In this version of the Broker, we made several small changes to make the Broker easier to use, added a section to display submissions from your agency, clarified the process to upload corrected files, added an email notification feature, transitioned some of the validation rules to SQL statements, and updated some of the validations.

  - [Ease of Use Improvements](#/help?section=easeofUse)
  - [Submissions from Your Agency](#/help?section=agencySubdashboard)
  - [Uploading Corrected Files](#/help?section=uploadCorrectedFiles)
  - [Send Email Notifications](#/help?section=sendEmail)
  - [Some Validations in SQL](#/help?section=validationSQL)
  - [Updated Validations](#/help?section=updatedValidations)

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

* [Easier Agency Selection](#/help?section=agencyCGAC)
* [Accidental Commas in Dollar Amounts](#/help?section=removeCommas)
* [Header Row Capitalization Errors](#/help?section=elementCaps)

###### Easier Agency Selection{section=agencyCGAC}
When you register for an account or create a submission, you can enter your CGAC code to correctly select your agency.

###### Accidental Commas in Dollar Amounts{section=removeCommas}
The Practices and Procedures document specifies that dollar amounts should be submitted without commas. However, if you accidentally include commas in dollar amounts the Broker will remove them.

###### Header Row Capitalization Errors{section=elementCaps}
The Practices and Procedures document specifies that the element names in the header row should exactly match the RSS element names. However, to assist you the Broker will process files with incorrect element name capitalization.
#### What's New in This Release - June 1, 2016
In this version of the broker, we have added some information on the screens to help you with your data submission, added some functionality to help you select the reporting period, and updated some of the validations. __Note:__ Validation details are included in the cumulative updated validations table.

* [Step-by-Step Guide on the Broker Home Page](#/help?section=stepby)
* [Submission Guide](#/help?section=subguide)
* [Selecting Reporting Period](#/help?section=dateselect)

###### Step-by-Step Guide on the Broker Home Page{section=stepby}
When you log into the Broker, you will see three choices that guide you to _Upload and validate a new submission_, _Continue with an existing submission_, and _Review, certify, and publish a submission_.

###### Submission Guide{section=subguide}
The Submission Guide provides details of the four steps to submit your agency's data. Once you have reviewed this page, you can check a box to hide this page the next time you log into the Broker.

###### Select Reporting Period{section=dateselect}
Based on user feedback, the quarterly submission dates are displayed as the quarter number and the fiscal year. Example: Quarter 2 - 2016.

#### What's New in This Release - May 17, 2016
In this version of the Broker, we have made a change if you are logging in with Internet Explorer, added functionality for the Broker to recognize files with the pipe symbol as a delimiter, and updated some of the validations.

* [Logging into the Broker with Internet Explorer](#/help?section=brokerIE)
* [Submit Files with Pipe Symbol](#/help?section=pipe)
* [File Validations per RSS v1.0](#/help?section=fileValv1)
* [Cross File Validations](#/help?section=crossFileValv1)

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