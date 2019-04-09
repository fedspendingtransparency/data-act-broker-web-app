##### April 5, 2019{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated unique award keys in transaction data to be consistent with USAspending.gov.
* Updated the CFDA loader to pull from a common source shared with USAspending.gov.
* Removed deprecated submit_detached_file endpoint from the API. This should not affect Broker Inbound API users given that they do not use this endpoint.
* Fixed the logic of providing current fiscal quarter on the frontend.
