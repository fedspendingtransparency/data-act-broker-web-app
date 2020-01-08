#### January 6, 2020{section=changelog}
In this release of the Broker, we:

* Fixed several minor display issues experienced by Internet Explorer users.
* Fixed a bug where some users would have the same agency name displayed twice when filtering by agency.
* Introduced pipe delimited file format for generating files D1 and D2 within the submission context. If a user plans to download the D1/D2 files after generation then they should select which format they want when entering the dates and the Awarding or Funding option. This choice determines what file type gets stored with the submission and would be the format for the file if downloaded at any point in the future. If a different file format is desired at a later time, the user would need to regenerate the file(s) in order to download that format. If there is no intent to download the files, either choice is acceptable as the Broker internally processes both file types the same.  The pipe delimited file format is also available in the detached file generation context. 
* The interface for selecting to generate D1 and D2 by either Awarding or Funding agency was updated to radio buttons to better indicate which selection was being made and to match the new pipe delimited file format interface.
* The beginning and ending dates the user entered when generating D1 and D2 files are now captured in the file name.
