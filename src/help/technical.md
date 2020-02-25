#### February 10, 2020{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Prevented users from re-uploading a FABS file while publishing.
* Updated DUNS, HistoricDUNS, and Subaward tables to properly store business types (and not their codes). This will update the File F "SubAwardeeBusinessTypes" column for grants.
* Added script to backfill FSRS records for data quality.
