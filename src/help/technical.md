### August 22, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added a filter to the `/v1/list_submissions/` endpoint. Allows filtering by:
  * Submission IDs
  * Agency codes
  * File names
  * Last modified date range
* Made an update to the DUNS loader to not replace data if the retrieved column is empty.
