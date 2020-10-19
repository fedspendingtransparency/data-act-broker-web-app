#### October 19, 2020{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Broker application is now supported by Python 3.7. For developers, please rebuild your docker images or local environment to run with this new version.
* Reorganized the API documentation from the README in thedataactbrokerdirectory to thedocsdirectory. Additionally, each endpoint has been moved to an individual file as API contracts.
* Updated the uploaded file count to exclude blank rows.
* The following endpoints will be deprecated soon and replaced with newer endpoints
   * GET /v1/submission/<submission\_id>/report\_url/ -> GET /v1/report\_url/
   * POST /v1/get\_fabs\_meta/ -> GET /v1/get\_fabs\_meta/
   * POST /v1/get\_certified\_file/ -> GET /v1/get\_certified\_file/
* Updated the messages of /v1/check\_current\_page/ for accuracy.
