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
In this version of the broker, we have made a change if you are logging in with Internet Explorer, added funtionality for the Broker to recognize files with the pipe symbol as a delimiter, and updated some of the validations.

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
