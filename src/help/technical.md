#### October 13, 2026{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added extra unique constraints, locks, and checks for the submission table and endpoints to prevent any possible race conditions when updating submissions.
* Reworked the unregistered sam recipient and office loaders to use a blue-green approach for safer full reloads.
* Refined the logic of the quarterly vs monthly submissions check.
* Sanitized various filenames, queries, and urls for safekeeping.
* Cleaned up a minor labeling bug for File A’s “GTASStatus” column.
* Fixed a unit test for FABS 4.3 specifically for the FY cutover on 9/30.
