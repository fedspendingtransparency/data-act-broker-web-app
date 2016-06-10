#### What's New in This Release - June 1, 2016
In this version of the broker, we have made a change if you are logging in with Internet Explorer, added funtionality for the Broker to recognize files with the pipe symbol as a delimiter, and updated some of the validations.

* [(Sample Old) Logging into the Broker with Internet Explorer](#/help?section=oldBrokerIE)
* [(Sample Old) Submit Files with Pipe Symbol](#/help?section=oldPipe)
* [(Sample Old) File Validations per RSS v1.0](#/help?section=oldFileValv1)
* [(Sample Old)Cross File Validations](#/help?section=oldCrossFileValv1)
* [(Sample Old) Browser Requirements & Known Issues](#/help?section=oldBrowser)

#### (Sample Old) Logging into the Broker with Internet Explorer{section=oldBrokerIE}
During user testing, some Internet Explorer users were unable to log into the Broker and upload files. We implemented a workaround so users with Internet Explorer on __medium security settings__ can log in and upload files. See Known Issues below.

#### (Sample Old) Submit File with Pipe Symbol{section=oldPipe}
Based on user feedback, we changed the Broker to automatically detect whether a file is using a comma or pipe symbol as a delimiter, based on the format of the header row.

#### (Sample Old) File Validations per RSS v1.0{section=oldFileValv1}
Submitted files will be validated per RSS v1.0. Specifically:

* Field names match the RSS v1.0
* Maximum field length does not exceed the value in RSS v1.0
* Required fields are present per RSS v1.0
* Records in File C have a PIID, FAIN, or URI

#### (Sample Old) Cross File Validations{section=oldCrossFileValv1}
We started work on cross file validations, beginning with cross validation of the FAIN, URI or PIID between sample files for Files C and D2.

#### (Sample Old) Browser Requirements & Known Issues{section=oldBrowser}
The Broker is currently tested with the following browsers:

* Internet Explorer version 10 and higher
* Firefox (current version)
* Chrome (current version)
* Safari (current version)

Although you may use any browser/version combination you wish, we cannot support browsers and versions other than the ones stated above.

Known Issues

* The Broker will not work when using Internet Explorer under medium privacy settings or high security settings.