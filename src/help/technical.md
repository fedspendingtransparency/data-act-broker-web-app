#### May 18, 2021{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Updated backend packages to address potential security issues.
* Updated the DUNS Loaders to support the new SAM REST API instead of the SFTP/WSDL services.
* Added UEI columns (`uei`, `ultimate_parent_uei`) to the `duns` table to begin the transition from DUNS to UEI SAM as the authoritative identifier for recipients.
