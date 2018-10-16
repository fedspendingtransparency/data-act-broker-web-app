##### October 11, 2018{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Replaced all download links with file.usaspending.gov proxy links.
* Script created to populate historical fields in the tas_lookup table. 
* Updated Flask from 0.11 to 1.0.2 and Werkzeug from 0.11.11 to 0.14.1.
* Begin migration from boto to boto3.
  * NOTE: boto and smart_open will no longer be used by the Broker after the next production deploy, all AWS interaction will be handled by boto3.

