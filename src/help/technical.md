#### August 10, 2020{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Significantly improved the performance of FABS derivations and publications by using SQL calls and compressed tables.
* Reworked the data ingesting process to be parallelized simultaneously to improve data validation performance.
* Reworked the processing of SQL validations to be batched to save on large batches of memory and help performance.