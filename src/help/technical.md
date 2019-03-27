##### March 25, 2019{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated certify_submission API endpoint documents to include new errors for standard quarterly revalidation thresholds and special revalidation thresholds. This rule checks the validation date and confirms the submission is certifiable.
* Modified the TAS loader to prevent loading any possible duplicates.
* Standardized unique award keys between Broker and USASpending.gov.
* Optimized File F generation for performance in memory and speed.
