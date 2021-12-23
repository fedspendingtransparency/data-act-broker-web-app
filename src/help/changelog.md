#### December 22, 2021{section=changelog}
In this release of the Broker, we:

* Modified Validation rule C18 to only trigger when all the optional balances relevant to this rule are provided. This is to allow for agencies to voluntarily provide some of the elements for greater transparency (4872/4972) without having an additional warning trigger.
* Updated the front end to provide the ability to add a banner message to the login page prior to the user signing in. This way, if necessary, we can provide important information to the user in the event the ability to sign in is non-functional.
* Updated validation rules B19, C28, and FABS 2.1 to consistently return all rows after the first row encountered when checking for duplicate row values.
* Updated the timestamp on the DABS Publish History page to include the time in addition to the date a submission was published.
* Added a progress bar to the cross-file validations in DABS. This will display the estimated progress the Broker has made on running these validations across all sets of files. This will assist the user in determining how long the process will take to complete.
* Removed the link to FY21 Submission Calendar on the Broker help page.
* Updated the ‘Upload & Validate a New Submission’ page in DABS to automatically default new submissions to monthly.
