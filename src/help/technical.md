#### January 6, 2020{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added "PrimaryPlaceOfPerformanceScope" derivation for FABS records and script to backfill it. Note, this is not currently included in D2 files.
* Updated subaward pipeline to exclude aggregate records when sending to FSRS.
* Removed "submission\_narrative" endpoints. Please use "submission\_comment" endpoints instead displayed in the README.
* Updated API to make the trailing slash for each endpoint to be optional.
* Resolved various minor bugs.
