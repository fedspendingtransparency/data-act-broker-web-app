#### August 3, 2021{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added internal FABS recipient derivations based on recipient DUNS and recipient UEI in preparation for DAIMS 2.1.
* Updated File F generation to be more accurate and consistent when linking between FSRS and Award data.
* Dropped `awardee_or_recipient_uei_n` and `ultimate_parent_uei_name` from FPDS table and loader as they were considered duplicates.
* Backfilled/cleaned File B and C data to update the object class codes to the new standardized format.
* Updated the FABS derivation for ActionTypeDescription to support ActionType E and backfilled the FABS data with that type.
* Updated Rule Descriptions for A34 and B14 with minor fixes.
