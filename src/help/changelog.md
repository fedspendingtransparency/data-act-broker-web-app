#### March 29, 2017

On September 30, 2016, we released the full version of the DATA Act Broker that contains everything agencies need to test the data validation and submission process. We continue to make improvements to the Broker and respond to issues discovered through agency use.

In this release of the Broker, agencies are now able to make changes to previously certified files. We also rolled out bug fixes for C9 and C12. 

  - [Changes to previously certified files](#/help?section=certified)
  - [Error report fix](#/help?section=reportFix)
  - [C9 warning message](#/help?section=c9warning)
  - [C12 warning message](#/help?section=c12warning)
 
##### Changes to previously certified files{section=certified}
In this release of the Broker, agencies are now able to make changes to previously certified files. To update a previously certified submission, go to the submissions that you want to correct and upload the corrected files.  Go through the file validations and certify the corrected files. 

##### Error report fix{section=reportFix}
In previous versions of the Broker, users experienced an issue with the error report not showing the same number of errors listed on the submission page. We rolled out a fix to correct this issue.

##### C9 warning message{section=c9warning}
In the previous version of the Broker, the C9 validation was not consistently producing warnings. We updated the implementation to reflect the C9 validation rule in the DAIMS that states, “Unique FAIN and/or URI from file D2 should exist in file C, except D2 records where FederalActionObligation and OriginalLoanSubsidyCost = 0. FAIN may be null for aggregated records. URI may be null for non-aggregated records.” 

##### C12 warning message{section=c12warning}
In the previous version of the Broker, the C12 validation was not consistently producing warnings. We updated the implementation to reflect the C9 validation rule in the DAIMS that states, “Each unique PIID (or combination of PIID/ParentAwardId) from file D1 should exist in file C during the same reporting period, except D1 records where FederalActionObligation = 0.”