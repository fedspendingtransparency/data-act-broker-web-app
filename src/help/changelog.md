#### July 5, 2017

In this release of the Broker, Treasury  released a schema update: DAIMS v1.1 as well as improvements to the submission process.updates were made so that users can generate D files without new line errors, improvements were made to submission links, logins, and error warnings, and deletion permissions were restored. Also, we released a schema update: DAIMS v1.1.

  - [Schema Release](#/help?section=schemarelease)
  - [Submission Improvements](#/help?section=submissionimprovements)

##### Schema Release{section=schemarelease}

Treasury released the DATA Act Information Model Schema (DAIMS) v1.1. DAIMS v1.1 is a minor update of the schema and will be implemented in production in the fall of 2017. Find out more information in the Resources section.

##### Submission Improvements{section=submissionimprovements}

In this release, we implemented improvements and fixed bugs related to the submission process. These updates include:

* D file with new lines generated without error: Users can now generate a D file that contains a new line and does not cause an error, allowing the submission to complete all cross file validations.
* Shared service providers testing submissions: Shared service providers can successfully log into the Broker to test submissions.
* Submission link correction: Users will be directed to the correct submission page without skipping any steps.
* Warnings for same-period submissions: User will be properly warned if they try to create a submission in the same period as a certified/updated submission. This way, users can understand what the error in their submission is.
* Permissions for “Delete Submission” button: Users with uploader rights will now be able to see the “trash can” deletion icon.