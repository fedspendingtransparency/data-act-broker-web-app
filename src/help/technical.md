#### October 7, 2019{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added documentation explaining permissions in the Broker and how they are set.
* Added incremental progress logs when publishing FABS files for clarity.
* Renamed submission narrative table and endpoints to comments. Note: the submission narrative endpoints are now deprecated and will be removed in a future release. Please use the following endpoints instead: 
    * /v1/get\_submission\_comments
    * /v1/update\_submission\_comments
