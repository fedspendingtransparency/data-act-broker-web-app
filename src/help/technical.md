#### August 17, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* New alembic migrations:
  * Added legal entity location fields to published_award_financial_assistance
  * Added fields to detached_award_financial_assistance and published_award_financial_assistance to support historical FABS data
  * Added application type to submission_window
  * Added DUNS table
* Updated FABS data and loader to store historical changes
* Added DUNS historical data loader
* Created new frontend routes (home, landing, and help) to accommodate FABS submissions.
