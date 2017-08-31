#### August 31, 2017{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

*Updated error messages for FABS validations
*Updated SQL rules, including renaming 'D' validations to 'FABS' validations
*Added new error types (rowCountError and fileTypeError)
*Updated FABS derivations and FPDS script to accommodate FREC agencies
*Updated FPDS loader script to pull csv extracts
*Alembic migrations:
                *Modified frec, cgac and sub_tier_agency tables to accomodate FREC data
                *Added columns to detached_award_procurement

