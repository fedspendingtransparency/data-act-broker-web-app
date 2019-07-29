#### July 29, 2019{section=changelog}
In this release of the Broker, we:

* Updated FABS to allow deletion of previously published records with only the unique combination of FAIN, AwardModificationAmendmentNumber, URI, CFDA_Number, and AwardingSubTierAgencyCode elements needing to be provided on the submission file (along with a CorrectionDeleteIndicator of ‘D’).
* Updated file header validation to only process the DAIMS Data Element Label name or the Terse 30 Label as valid header name. All other header names will be ignored and not processed as data.
* Updated the on screen Header Error report and downloadable Header Error report to return the DAIMS Data Element Label that is missing and not the terse name for clarity.
* Updated checks in FABS for ActionType to ensure it is not case-sensitive.
