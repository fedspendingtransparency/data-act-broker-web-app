#### June 28, 2019{section=changelog}
In this release of the Broker, we:

* Updated File F generation process to make use of Broker backend updates implemented in the prior release.  This allows for Broker based generation of File F without need for external query each time.
* Updated FABS check for duplicate transactions to no longer be case sensitive.  Also, ensured Office Codes and Primary Place of Performance Code are not case sensitive.
* Updated unique transaction key to allow reporting of multiple CFDA Programs in FABS.  Updated related FABS2 rules text to include CFDA Program.
* Updated country code list used by Broker to GENC 3.0 update 10.
* Fixed a frontend bug where any key press would trigger certain buttons on the Broker when they had tab focus.
* Updated the Broker to respond to the IAE Federal Hierarchy splitting the funding office flag into assistance funding and contract funding flags.
