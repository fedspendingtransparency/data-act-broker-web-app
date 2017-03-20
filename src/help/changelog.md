#### March 15, 2017

On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through continued agency use.

In this release of the Broker, agencies are now able to certify and submit data for publication. We rolled out bug fixes for flex fields, B11 and C11/C12 validation rules, and Program Activity case sensitivity. We also improved the submission dashboard functionality and updated the warning and error messages to reflect clarifications to the validation rules.  submission dashboard and the warning and error messages were updated to reflect recent changes to the validation rules.


  - [Data Submission](#/help?section=data)
  - [Program Activity case sensitive fix](#/help?section=case)
  - [B11 validation fix](#/help?section=b11)
  - [C11/C12 validation fix](#/help?section=c11)
  - [Flex field fix](#/help?section=flex)
  - [Updated warning/error messages](#/help?section=warning)
  - [Functionality improvement](#/help?section=imp)


##### Data Submission{section=data}

In this release of the Broker, agencies are now able to certify and submit data. Certified data will be available in the DATA Act Outbound Application Programming Interface (API) and will be sent to the data store for publication on the future website. All test submissions certified before March 15th are marked as not certified and are not available for publication unless the files are recertified.

##### Program Activity case sensitive fix{section=case}

In this release of the Broker, we rolled out a fix to make validations for Program Activity not case sensitive.

##### B11 validation fix{section=b11}

In previous versions of the Broker, the B11 validation produced an error for a blank reimbursable/direct indicator. In this release, we updated the B11 validation to only check for Object Class validity.

##### C11/C12 validation fix{section=c11}

In the previous version of the Broker, the C11/C12 validation produced a warning if both PIID and ParentAwardID were submitted. We corrected this to not produce a warning if both PIID and ParentAwardID are submitted.

##### Flex field fix{section=flex}

In previous versions of the Broker, flex fields were not available in the cross file validation reports. We updated the Broker to show flex fields in the cross file validation reports.

##### Updated warning/error messages{section=warning}

In this release of the Broker, we updated the warning and error messages to reflect clarifications made to the validation rules from recent releases.

##### Functionality improvement{section=imp}

We updated the submission dashboard to allow the user to sort the submission tables by any of the column headers.

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
