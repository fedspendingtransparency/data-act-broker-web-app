#### April 5, 2019
In this release of the Broker, we:

* Updated Broker Resource page to reference DAIMS v1.3.1 documents.
* Implemented DAIMS v1.3.1 changes to elements in File D1 and D2. Users who have scripts based on D1/D2 files should update them to match the D1/D2 elements and names in DAIMS v1.3.1.
* Updated Submission Dashboard to notify user if there are no submissions to display.
* Fixed edge-case issue with email sent after the creation of the DABS submission. These errors only occurred for agencies associated with a FREC. 
* Fixed small issue with line count inaccuracies in File A that occurred when extra carriage returns were present in the submission file.
* Fixed validation rule A34 to correctly generate a critical error when the BudgetAuthorityUnobligatedBalanceBroughtForward value is empty.
* Fixed download URL expiration issue for File A/D1/D2. Links are now generated upon click.
* Various backend changes and improvements surrounding job handling and memory management.
