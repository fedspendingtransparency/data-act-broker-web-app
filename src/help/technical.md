#### September 6, 2019{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Reworked DUNS loader to improve performance of reloading the entire dataset in a quick timeframe.
* Added historic_duns table for ease of reloading DUNS dataset.
* Added script to reload certified errors/warnings from older submissions.
* Added script to reload specific awards/transactions from FPDS.
* Updated script which corrected agency codes and names in transactions to support multiple subtier agency codes.

