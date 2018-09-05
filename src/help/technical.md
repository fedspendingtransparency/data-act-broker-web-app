### September 5, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Add `user_id` filter to the `/v1/list_submissions` endpoint.
* Update `/v1/generate_file/` and `/v1/generate_detached_file/` to allow for D file generation by awarding agency or funding agency.
* Created `/v1/list_submission_users` to list names of users who have created submissions that the current user can see.
* Database migrations:
  * Add `agency_type` to the FileRequest and SQS table.
  * Add `dba_name` to the DUNS table.
