#### May 3, 2022{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Renamed duns table to sam_recipient and refactored all code referring to recipients as DUNS to be SAM Recipients.
* Updated File A Generation and A33.1 logic to account for more agencies and their groupings.
* Backfilled the "Entity Data Source" column in FPDS tables on the Broker.
