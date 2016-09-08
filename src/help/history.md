#### What's New in This Release - August 10, 2016

In this version of the Broker, we separated out the validation checks into warnings and critical errors, added the interface to create D1 and D2 files, improved 508 compliance, increased server capacity, added an interface for broker users to notify other users that a submission is ready, and fixed a bug that incorrectly showed submissions as valid on the home page submission table.

  - [Warnings and Errors](#/help?section=warnings)
  - [Generating D1 and D2](#/help?section=d1d2)
  - [Improved 508 Compliance](#/help?section=508compliance)
  - [Increased Server Capacity](#/help?section=capacity)
  - [Notify Another User](#/help?section=notifyauser)
  - [Bugfix: Submissions Incorrectly Show as Valid](#/help?section=homepagesubmissiontable)

#### Warnings and Errors{section=warnings}

In previous versions of the Broker, all failing validations were treated as critical errors. In this release, we have added an almost identical interface for the warnings, complete with a downloadable file and table. The warnings appear alongside the existing error download and tables. Files with warnings may be submitted, but files with critical errors will not pass validation and may not be submitted.

#### Generating D1 and D2{section=d1d2}

In previous versions of the Broker, you could only upload a D2 file. If you didn't have a D2 file, you could use the sample file provided. In this release, we have added the interface to generate the D1 and D2 files. **PLEASE NOTE** that the interface currently returns sample files until the integration with the ASP and FPDS is complete in the next 2-3 weeks.

#### Improved 508 Compliance{section=508compliance}

In this release, the Broker has further improved it's compliance with 508 accessibility guidelines. 

#### Increase Server Capacity{section=capacity}

In this release, the development team has significantly increased the base capacity of the web and database servers powering the Broker. 

#### Notify Another User{section=notifyauser}

Broker users can now send a notification to another user within their same agency when they want them to view a submission. This option is available on the Review Data page, after all validations have completed. You can also send other users in your agency the link to your in-progress submission anytime.

#### Bugfix: Submissions Incorrectly Show as Valid{section=homepagesubmissiontable}

Several users reported a minor bug with the submission table that appears on the home page. It was showing submissions as valid that actually had errors. This has been corrected to more accurately reflect the status of a submission.

####  What's New in This Release - July 27, 2016

In this version of the Broker, we updated the Broker branding to Beta, improved the validation processing time, implemented short data element names, made the styling more consistent, improved the accessibility of the Broker, added a resources section, and updated the information on validations. 

  - [DATA Act Broker - Beta Release](#/help?section=betaRelease)
  - [Validation Processing Time](#/help?section=processingTime)
  - [Short Data Element Names](#/help?section=shortNames)
  - [Consistent Style](#/help?section=consistentStyle)
  - [More Validations in SQL](#/help?section=validationSQL3)
  - [Accessibility Improvements](#/help?section=accessibilityImprovements)


#### DATA Act Broker - Beta Release{section=betaRelease}
We updated all the relevant text to reflect "Beta Release." We still plan on incremental updates to the Broker about every two weeks.

NOTE: Even though the DATA Act Broker - Beta Release has been in place since the June 29th release, the URL will remain the same [https://alpha-broker.usaspending.gov](https://alpha-broker.usaspending.gov).

#### Validation Processing Time{section=processingTime}
We made some improvements to reduce the validation processing time. If you're still experiencing submissions that take more than 15-20 minutes, please contact us so we can troubleshoot the issue.

#### Short Data Element Names{section=shortNames}
Some agency financial systems need to use column heading that are less than 30 characters long. We have created a set of short element names. See the Resources section for element name crosswalk.

#### Consistent Broker Styling{section=consistentStyle}
We made some small changes so the Broker displays in a more consistent manner.

#### More Validations in SQL{section=validationSQL3}
Agency developers may be interested to know that we transitioned more of the Broker validations to using SQL statements. The list of SQL statements is publicly available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

#### Accessibility Improvements{section=accessibilityImprovements}
We made several changes to improve the accessibility of the Broker by adaptive technologies like screen readers. We also added an accessibility statement in this Help file.


#### What's New in This Release - July 13, 2016

NOTE: The DATA Act Broker - Alpha Release is now in beta status (as of the June 29, 2016 release). We will be updating the related text indicators on the website in the next release. The URL ([https://alpha-broker.usaspending.gov](https://alpha-broker.usaspending.gov)) will not change for now.

In this version of the Broker, we changed the submission date timeframe, reduced the errors generated by blanks, improved the display of the tree map for errors, display the cross file validations, and updated some more validations to SQL. 

  - [Reporting Date Timeframe](#/help?section=reportingDateTimeframe)
  - [Tree Map for Errors](#/help?section=treeMap)
  - [Display of Cross-File Validations](#/help?section=crossFileValv2)
  - [More Validations in SQL](#/help?section=validationSQL2)
  - [Updated Validations](#/help?section=updatedValidations)

#### Reporting Date Timeframe{section=reportingDateTimeframe}
When you create a new submission, the date selection is for one month or one quarter. Examples: June 2016 or Quarter 4 - 2016.

#### Tree Map for Errors{section=treeMap}
We updated the color of the tree map and the language used to describe the errors. Look for further improvements to the error descriptions in future releases.

#### Display of Cross-File Validations{section=crossFileValv2}
After each individual file is validated, the Broker performs some cross-file validations. You will now see the results of these validations in the Broker, see a table of errors,  
be able to download an error report, and upload corrected files.

#### More Validations in SQL{section=validationSQL2}
Agency developers may be interested to know that we transitioned more of the Broker validations to using SQL statements. The list of SQL statements is publically available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

#### Updated Validations{section=updatedValidations}
In this release we have transitioned all of these validations to SQL except A1, B9, and B10. See cumulative table of validations above.

#### What's New in This Release - June 29, 2016
In this version of the Broker, we made several small changes to make the Broker easier to use, added a section to display submissions from your agency, clarified the process to upload corrected files, added an email notification feature, transitioned some of the validation rules to SQL statements, and updated some of the validations. 

  - [Ease of Use Improvements](#/help?section=easeofUse)
  - [Submissions from Your Agency](#/help?section=agencySubdashboard)
  - [Uploading Corrected Files](#/help?section=uploadCorrectedFiles)
  - [Send Email Notifications](#/help?section=sendEmail)
  - [Some Validations in SQL](#/help?section=validationSQL)
  - [Updated Validations](#/help?section=updatedValidations)

#### Ease of Use Improvements{section=easeofUse}
- **Confirm Password** When you create a Broker account, you are prompted to enter a Password and then to Confirm Password.
- **Username** On the log in screen, we have replaced the Username prompt with Email Address since your user name is your email address.
- **Submission Guide** If you hide the Submission Guide page, when you select your agency for a new submission, there is a link to view the Submission Guide. The Submission Guide also has a link to the validations listed on this Help page.
- **Default Dates** When creating your submission, the dates default to the beginning of the fiscal year and the current month or quarter.
- **Last Saved** The Broker automatically saves your files when you upload them and at each step of the validation process. The date and time the data was last saved is displayed at the top of the screen below the Help menu. 
- **Leave Validations Running** You can leave the validation page and the validations will continue to run. Come back at any time to check your progress or results.
- **Spam Folder Warning** Some users report that emails from the Broker end up in their spam folders. We've added a reminder to check your spam folder on pages that generate emails.
- **Back to Top** We know this Help page is getting long so we added an arrow in the lower right corner. Click it to take you back to the top of the page at any time.

#### Submissions from Your Agency{section=agencySubdashboard}
We've added a table to the Broker home page where you can see recent submissions from your agency. View and edit submissions from this table.

#### Uploading Corrected Files{section=uploadCorrectedFiles}
If one or more of your files fails validation, only those failed files will have a prompt in red for you to upload a corrected file. Click *Choose Corrected File* to browse to your file and select it. Or drag and drop a corrected file onto the file icon. Click *Upload Corrected CSV Files*. The validations on the corrected files will run again.

#### Send Email Notifications{section=sendEmail}
After your data has been successfully validated, the *Review & Publish* page has a button to *Notify Another User that the Submission is Ready for Certification*. This opens a field where you can type in multiple email addresses for users in your agency. 

#### Some Validations in SQL{section=validationSQL}
Agency developers may be interested to know that we transitioned some of the Broker validations to using SQL statements. The list of SQL statements is publically available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

#### Updated Validations{section=updatedValidations}
In this release we included rules A18, A19, A20, B9, B10, B11, B12, and C18. See cumulative table above.

#### What's New in This Release - June 15, 2016
In this version of the Broker, we made it easier to select your agency, made it easier to submit your data without errors, and updated some of the validations. 

* [Easier Agency Selection](#/help?section=agencyCGAC)
* [Accidental Commas in Dollar Amounts](#/help?section=removeCommas)
* [Header Row Capitalization Errors](#/help?section=elementCaps)

#### Easier Agency Selection{section=agencyCGAC}
When you register for an account or create a submission, you can enter your CGAC code to correctly select your agency.

#### Accidental Commas in Dollar Amounts{section=removeCommas}
The Practices and Procedures document specifies that dollar amounts should be submitted without commas. However, if you accidentally include commas in dollar amounts the Broker will remove them.

#### Header Row Capitalization Errors{section=elementCaps}
The Practices and Procedures document specifies that the element names in the header row should exactly match the RSS element names. However, to assist you the Broker will process files with incorrect element name capitalization.
#### What's New in This Release - June 1, 2016
In this version of the broker, we have added some information on the screens to help you with your data submission, added some functionality to help you select the reporting period, and updated some of the validations. __Note:__ Validation details are included in the cumulative updated validations table.

* [Step-by-Step Guide on the Broker Home Page](#/help?section=stepby)
* [Submission Guide](#/help?section=subguide)
* [Selecting Reporting Period](#/help?section=dateselect)

#### Step-by-Step Guide on the Broker Home Page{section=stepby}
When you log into the Broker, you will see three choices that guide you to _Upload and validate a new submission_, _Continue with an existing submission_, and _Review, certify, and publish a submission_.

#### Submission Guide{section=subguide}
The Submission Guide provides details of the four steps to submit your agency's data. Once you have reviewed this page, you can check a box to hide this page the next time you log into the Broker.
        
#### Select Reporting Period{section=dateselect}
Based on user feedback, the quarterly submission dates are displayed as the quarter number and the fiscal year. Example: Quarter 2 - 2016.

#### What's New in This Release - May 17, 2016
In this version of the Broker, we have made a change if you are logging in with Internet Explorer, added functionality for the Broker to recognize files with the pipe symbol as a delimiter, and updated some of the validations.

* [Logging into the Broker with Internet Explorer](#/help?section=brokerIE)
* [Submit Files with Pipe Symbol](#/help?section=pipe)
* [File Validations per RSS v1.0](#/help?section=fileValv1)
* [Cross File Validations](#/help?section=crossFileValv1)

#### Logging into the Broker with Internet Explorer{section=brokerIE}
During user testing, some Internet Explorer users were unable to log into the Broker and upload files. We implemented a workaround so users with Internet Explorer on __medium security settings__ can log in and upload files. See Known Issues below.

#### Submit File with Pipe Symbol{section=pipe}
Based on user feedback, we changed the Broker to automatically detect whether a file is using a comma or pipe symbol as a delimiter, based on the format of the header row.

#### File Validations per RSS v1.0{section=fileValv1}
Submitted files will be validated per RSS v1.0. Specifically:
* Field names match the RSS v1.0
* Maximum field length does not exceed the value in RSS v1.0
* Required fields are present per RSS v1.0
* Records in File C have a PIID, FAIN, or URI 

#### Cross File Validations{section=crossFileValv1}
We started work on cross file validations, beginning with cross validation of the FAIN, URI or PIID between sample files for Files C and D2.
