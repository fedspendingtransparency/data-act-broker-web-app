#### October 7, 2019{section=changelog}
In this release of the Broker, we:

* Added a Download Comments link on the Review & Publish page in DABS where all entered comments on submission files can be downloaded on a single file.
* Fixed a bug on DABS where, in a few cases, the same Warning Code would be displayed on more than one line in the Warning Table and Tree Map.  While the total number of Warnings was correct, it now shows on one line for each Warning Code in all cases. In addition, historical submissions that had this issue also now display each Warning Code as one line. 
* Fixed calculation on Review & Publish page to show correct Total File Size.
* Updated API to return error message when attempting to upload a Monthly Submission and a range of months was set in the parameters.   
* Updated name of Broker table submission_narrative to file_comment for internal consistency.  This resulted in new API endpoints. Previous endpoints were deprecated and scheduled for removal. API users should review API documentation.
