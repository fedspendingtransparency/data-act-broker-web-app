#### March 1, 2017
On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through continued agency use.

In this release of the Broker, bug fixes were rolled out for B14/B15, C8/C9, C11/C12, and C23.  Functionality improvements were rolled out, including a delete button for non-certified submissions, a File B header processing fix, and updates to improve file processing time. We also implemented an updated list of agency CGAC codes, names, and abbreviations.



  - [B14/B15 validation Fix](#/help?section=b14)
  - [C8/C9 validation fix](#/help?section=c8)
  - [C23 validation fix](#/help?section=c23)
  - [Reporting SGL data in File C](#/help?section=sgl)
  - [Deleting an old submission](#/help?section=delete)
  - [File B header processing fix](#/help?section=header)
  - [Updated list of agency CGAC codes](#/help?section=cgac)
  - [Improved processing time fix](#/help?section=improvements)  
  - [B11 validation fix](#/help?section=b11)



##### B14/B15 validation fix{section=b14}

In previous versions of the Broker, the B14/B15 validation would produce a failure in the File B related to GTAS lines 2004 (direct) and 2104(reimbursable). In this release of the Broker, the B14/B15 validation was updated to add up correctly to compare against the SF 133 lines 2004/2104.

##### C8/C9 validation fix{section=c8}

In earlier versions of the Broker, the C8/C9 validations produced warnings if both a FAIN and URI were reported for a record. In this release, the C8/C9 validation will not trigger a warning if both a FAIN and URI are reported together.

##### C23 validation fix{section=c23}

In this release of the Broker, the C23 cross file validation was updated so that if `parent_award_id` is present, both `PIID` and `parent_award_id` are used to cross validate Files C and D1. If `parent_award_id` is not present, the validator compares `PIID` in File C to the `PIID` in File D1 only.

##### Reporting SGL data in File C{section=sgl}

In earlier versions of the Broker, the validation rules were generating warnings for File C submissions that had SGL balances for an award without D1/D2 activity in the reporting period. In this release of the Broker, the C8/C9 and C11/C12 validations have been updated to only run on rows in File C that have a transaction obligated amount value in the field.

##### Deleting an old submission{section=delete}

In this release of the Broker, we rolled out a delete button in the submission dashboard that upload users can use to delete non-certified submissions. Submissions that are deleted are permanently removed from the website and are unable to be recovered.

##### File B header processing fix{section=header}

In this release of the Broker, we rolled out a functionality fix to allow users to submit File B that either does or does not have the typo on the DeobligationsRecoveriesRefundsdOfPriorYearByProgramObjectClass_CPE field.

##### Updated list of agency CGAC codes{section=cgac}

In this release of the Broker, we implemented an updated list of agency CGAC codes, names and abbreviations. The full list is available [here](https://github.com/fedspendingtransparency/data-act-broker-backend/blob/development/dataactvalidator/config/agency_list.csv).

##### Improved processing time fix{section=improvements}

In this release, we implemented a solution to improve the processing and stability of file submissions at a high volume.

##### B11 validation fix{section=b11}

Previously, the B11 validation was checking the direct/reimbursable flag. We updated this rule to check the object class only. 


##### Browser Requirements & Known Issues{section=browser}
The Broker is currently tested with the following browsers:

* Internet Explorer version 10 and higher
* Firefox (current version)
* Chrome (current version)
* Safari (current version)

Although you may use any browser/version combination you wish, we cannot support browsers and versions other than the ones stated above.

Known Issues

* The Broker will not work when using Internet Explorer under medium privacy settings or high security settings.

##### Accessibility Statement{section=accessibilityStatement}

###### Commitment and Guidelines

The DATA Act implementation team is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. To meet this commitment we develop this website to conform to the [Web Content Accessibility Guidelines 2.0](https://www.w3.org/TR/WCAG/). These guidelines explain how to make websites more accessible to people with disabilities, and we believe they also make our website easier for everyone to use.
The [Accessible Rich Internet Applications Suite (WAI-ARIA)](https://www.w3.org/WAI/intro/aria) addresses accessibility challenges by defining new ways to provide functionality with assistive technology. With WAI-ARIA, developers are able to provide usable and accessible advanced Web applications to people with disabilities. Alpha-broker.usaspending.gov also uses The Voluntary Product Accessibility Template® (VPAT®) to document adherence with Section 508 of the Rehabilitation Act accessibility standards.

We know our website changes regularly so we’re always looking for ways to improve. If there is information you think should be included on this page, or if you experience any difficulty accessing this site, please contact us at [DATAPMO@fiscal.treasury.gov](mailto:DATAPMO@fiscal.treasury.gov) for assistance.

###### Documents

The documents offered within Alpha-broker.usaspending.gov use multiple file formats. Below is a list that will help you identify which software downloads are needed to view different file extensions. If you require a file format other than those currently provided or experience accessibility issues, please contact us at [DATAPMO@fiscal.treasury.gov] (mailto:DATAPMO@fiscal.treasury.gov) for assistance.

###### Document Files

*  Windows Operating System .TXT files can be viewed on any Windows-based document reader.
* [Adobe Reader](https://get.adobe.com/reader/) (.pdf) For viewing and printing PDF documents.
* [Microsoft Word Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=4) (.doc, .docx) For viewing, printing, and copying Word documents without having Microsoft Word installed. It replaces Word Viewer 2003 and previous versions.
* [Microsoft Excel Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=10) (.xls, .xlsx) For viewing and printing Excel workbooks without having Microsoft Excel installed. It replaces Excel Viewer 97 and previous versions.
* [Microsoft PowerPoint Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=6) (.ppt, .pptx) For viewing full-featured presentations created in PowerPoint 97 and later versions.
