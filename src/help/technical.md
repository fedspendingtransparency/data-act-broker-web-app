#### November 16, 2021{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added support for DEFC values X and Y.
* Updated SQL rules to ensure UEI checks are case-insensitive
* Added "Progress" column to the Jobs table and `check_status` in preparation for the upload and validation progress bars.
* Backfilled a significant portion of recipient data with their appropriate UEI values. 
* Updated FSRS loader to pull in UEI values.
