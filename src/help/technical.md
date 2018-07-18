### July 5, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Upgraded from boto to boto3.
* DB (alembic) migrations required for the ExternalDataLoadDate table.
* Made updates to the Program Activity loader to validate file contents.
* Made updates to the FPDS nightly loader to check for changes to the data as the load occurs.
