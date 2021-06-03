#### June 1, 2021{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added UEI columns (`ultimate_parent_uei_name`,`ultimate_parent_uei`,`awardee_or_recipient_uei_n`,`awardee_or_recipient_uei`) to `detached_award_procurement` used for FPDS.
* Added `transaction_obligated_amount` to the error/warning reports for rules C8 and C11 under `Source Value Provided` and `Difference` columns.
* Added `federal_action_obligation` to the error/warning reports for rules C9 and C12 under the `Source Value Provided` and `Difference` columns.
* Created and utilized a script to move agency files in S3 for agency code changes.