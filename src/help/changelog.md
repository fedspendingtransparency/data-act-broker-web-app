#### January 13, 2026{section=changelog}
In this release of the Broker, we:

* Removed FABS36 as the AssistanceListingNumber format will be changed and checked via FABS37.3.
* Updated rule B28. This update ensures that $0 TAS rows are validated by checking for either a PARK value of 0000, or a valid PARK associated with the corresponding funding TAS/TAFS.
