#### May 18, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* SQL rule updates corresponding with DAIMS v1.2
* Updated Configuration Files for FABS
* New alembic migrations to support DAIMS v1.2 changes.
* Changes to the FPDS Loader to include new data and description columns per DAIMS v1.2
* Updates to `initialize.py` to load additional congressional districts from census 2000 within our load zip codes process per DAIMS v1.2 rules change.
* Updated file E and F loaders to include additional fields per DAIMS v1.2. 
* Adding additional parent DUNS loader to populate parent DUNS information to the DUNS table for and initial load and to the daily DUNS loader. Aids in adding parent DUNS information for FABS derivations per DAIMS v1.2.
* Renaming FABS file types to be consistent. Updated, lookup contents loaded in `initialize.py`  under the `-db` flag.

