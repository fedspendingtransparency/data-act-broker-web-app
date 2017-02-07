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
