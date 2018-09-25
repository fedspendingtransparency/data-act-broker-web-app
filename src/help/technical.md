### September 25, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Enforce uniqueness in the CFDA database table.
* Begin making code changes for a refactor of D generation file caching.
  *	D file generations now check the cache before sending a message to the SQS queue.
* Update the fields required to make an IDV record unique. Script created to update the database contents to remove duplicated IDV records and those that should have been deleted historically.
