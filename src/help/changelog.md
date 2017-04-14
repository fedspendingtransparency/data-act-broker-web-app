#### April 12, 2017

On September 30, 2016, we released the full version of the DATA Act Broker that contains everything agencies need to test the data validation and submission process. We continue to make improvements to the Broker and respond to issues discovered through agency use.

In this release of the Broker, we deployed the FY2017 Program Activity code list. We rolled out a bug fix for Program Activity and Object Class warnings and implemented a solution to improve the validation processing time, along with other improvements.

  - [FY 2017 Program Activity codes](#/help?section=pa17)
  - [Program Activity and Object Class warnings](#/help?section=paoc)
  - [Improved processing time](#/help?section=processingtime)
  - [Functionality improvements](#/help?section=functionality)

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
