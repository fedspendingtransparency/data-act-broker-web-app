#### January 10, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Changes to the FPDS loader
* Alembic migrations
* New content in config.yml file
* SQL rule updates
* Submission-related functions from function_bag.py have been separated out to a submission_handler.py file
* Front end linter added to confirm code quality
* NPM update required to work with newer version of ES-lint. Newer ES-lint requires additional libraries which were added to the package.json. Jenkins params were updated (NPM 4 support removed) and added the command `npm update` to make sure the environment is as expected
