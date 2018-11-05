##### November 1, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Database migration to include unique_award_key in the FPDS and FABS staging tables.
* Upgrade boto to boto3 and remove boto from the requirements.
* Move file type validation to before file upload.
* Enforce 30-minute session timeout.
* Update documentation and error handling.
