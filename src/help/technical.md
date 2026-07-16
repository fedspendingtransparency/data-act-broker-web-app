#### July 21, 2026{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Continued cleanup of the upcoming SAM Contract API loader to replace the FPDS loader.
* Bumped versions of various frontend libraries for security.
* Added additional verification for redirect URI for login.
* Reworked the underlying postgres calls for CSV generation.
* Included various sanitization checks via the API.
* Sanitized the typeahead values on the frontend.
* Added extra checks for certain functionalities to be run locally.
* Properly managed the API’s debug mode for proper logging and API exceptions.
* Added secure flag for session cookie.
* Set max limits for several endpoints for performance.
* Added additional check for `/v1/check_detached_generation_status` to accept only detached job ids.
* Updated webpack’s devtool for the production environment.
