#### August 23, 2019{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added `place_of_perform_street` and `sub_place_of_perform_street` columns to the Subaward table.
* Created `certified_error_metadata` table to keep track of errors and warnings of certified submissions.
* Ensured that the `list_submissions` endpoint is accurate matching its `min_last_modified` with the submission's `last_modified` value.
* Added logs to incoming API requests to help track down specific errors.
