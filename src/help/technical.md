#### July 13, 2020{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated the Broker application workflow to allow publication/certification of monthly submissions (see dataactbroker/README.md for details)
    * Added the following endpoints:
        * `published_submissions` returns a list of published submissions for an agency and time period
    * Updated the following endpoints:
        * `upload_dabs_files` now accepts a `test_submission` flag when creating DABS submissions
    * Deprecated the following endpoints:
        * `check_year_quarter` which has now been replaced by `published_submissions
* Updated the Broker application workflow to separate publication and certification of DABS submissions (see dataactbroker/README.md for details)
    * Added the following endpoints:
        * `publish_dabs_submission` for only publishing monthly submissions
        * `certify_dabs_submission` for only certifying DABS submissions
    * Updated the following endpoints:
        * Renamed `latest_certification_period` to `latest_publication_period` for publications
        * Renamed `certify_submission` to `publish_and_certify_dabs_submission`
        * `list_submissions` now includes new data points related to the changes
        * `submission_metadata` now includes new data points related to the changes
        * Renamed `list_certifications` to `list_history` to include published data
        * `get_certified_file` now accepts `published_files_history_id`