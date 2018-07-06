### June 19, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Limited permissions for Service Accounts to facilitate logging in via the inbound API
  * A service account will be capped at Edit only permissions for DABS and FABS. Service accounts will not be able to certify DABS or publish FABS submissions.
* Updated the check_status endpoint to limit functionality to only what is necessary to evaluate the status of the submission.
