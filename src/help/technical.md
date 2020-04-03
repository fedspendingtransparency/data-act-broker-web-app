#### March 20, 2020{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Created a "revert\_submission" endpoint which will allow users to revert an updated DABS submission to its last certified state.
* Created and backfilled CertifiedAwardProcurement and CertifiedAwardFinancialAssistance tables to be used for the "revert\_submission" endpoint.
* Updated README instructions for users installing the Broker.
* Users can create test submissions for the same agency and the same quarter despite the certified submission already existing. Note one cannot certify these test submissions.
