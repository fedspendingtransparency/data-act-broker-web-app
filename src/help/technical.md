#### June 28, 2019{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Optimized FSRS loader scripts for both daily FSRS updates, resolving unlinked subawards, and entirely rederiving Subaward data.
* Reordered elements in the unique FABS transaction key and included CFDA Number to the uniqueness.
* Added an upper index on afa_generated_unique for performance.
