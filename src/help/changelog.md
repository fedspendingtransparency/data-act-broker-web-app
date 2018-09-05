### September 5, 2018

In this release of the Broker, we:

* Updated rule B9 (which checks that the provided TAS/Program Activity matches the authoritative source from OMB) so that users can submit or resubmit data for FY17Q2 or FY17Q3 without triggering a warning. Note that the rule is not applicable to this timeframe as the OMB BDR Program Activity process was not in place yet.
* Updated backend to improve the user experience and reduce instances of hung submissions.
* Made various backend improvements related to adding submission dashboard filters. Added the first two of these filters to the frontend, with the rest of the filters to come soon.
* Backend update to pave the way for a DAIMS v1.3 change allowing agencies to choose to generate D files based on funding agency (default will still be to generate by awarding agency, the current behavior).
* Fixed a bug that was preventing a new file from being generated in some cases when D1/D2 dates were changed.
* Updated the frontend so that it provided a better sense that file uploads were in progress.
* Corrected a minor bug in Firefox that affected file reuploads.
