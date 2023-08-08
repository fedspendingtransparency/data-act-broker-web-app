#### August 8, 2023{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added support to login into the Broker via CAIA. Note that you will no longer be able to login using MAX on October 1, 2023.
* `/v1/max_login` will no longer be supported on October 1st, 2023. Instead, CAIA login is supported now (via `/v1/caia_login`) and will be the only option then. 
* Finally removed previously deprecated `/v1/get_certified_file`. Please use `/v1/get_published_file` instead.
