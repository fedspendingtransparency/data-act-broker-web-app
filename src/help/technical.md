### June 19, 2018

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Setup the local developer environment to use Docker containers
* New API endpoints
  * /v1/revalidation_threshold/ 
  * /v1/submission_data/
* USPS download script exits with status code of 3 and does not update the date when no data is found.
* Updated initialize.py to separate out the country codes from the “domain data” load.
* Always update a user’s name on login.
