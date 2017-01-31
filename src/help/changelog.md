#### February 1, 2017
On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through continued agency use.

This release of the Broker was focused primarily on maintenance. Notable fixes rolled out in this release include improved processing of high volume files submissions and fixes for rules B9, B10, and B12.


  - [Improved Processing Time](#/help?section=time)
  - [B12 Validation fix](#/help?section=b12)
  - [B9/B10 validation fix](#/help?section=b9)


##### Improved processing time fix{section=time}

In this release, we implemented a solution to improve the processing and stability of file submissions at a high volume.

##### B12 validation fix{section=b12}

In earlier versions of the Broker, the B12 validation would prompt a warning if the Direct/Reimbursable (D/R) flag field was not populated for transfer USSGLs (4831, 4832, 4931), which conflicted with GTAS requirements. We made changes to this rule to allow for the submission of blank D/R fields when submitting transfer USSGLs (4831, 4832, 4931).

##### B9/B10 validation fix{section=b9}

In earlier versions of the Broker, the B9/B10 validations produced warnings for FY 2017 Program Activity codes. Treasury has not received the authoritative list of FY 2017 Program Activity codes yet. This rule was modified to only validate Program Activity for years that we have domain values for.


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

We know our website changes regularly so we’re always looking for ways to improve. If there is information you think should be included on this page, or if you experience any difficulty accessing this site, please contact us at [DATABroker@fiscal.treasury.gov](mailto:DATABroker@fiscal.treasury.gov) for assistance.

###### Documents

The documents offered within Alpha-broker.usaspending.gov use multiple file formats. Below is a list that will help you identify which software downloads are needed to view different file extensions. If you require a file format other than those currently provided or experience accessibility issues, please contact us at [DATABroker@fiscal.treasury.gov] (mailto:DATABroker@fiscal.treasury.gov) for assistance.

###### Document Files

*  Windows Operating System .TXT files can be viewed on any Windows-based document reader.
* [Adobe Reader](https://get.adobe.com/reader/) (.pdf) For viewing and printing PDF documents.
* [Microsoft Word Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=4) (.doc, .docx) For viewing, printing, and copying Word documents without having Microsoft Word installed. It replaces Word Viewer 2003 and previous versions.
* [Microsoft Excel Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=10) (.xls, .xlsx) For viewing and printing Excel workbooks without having Microsoft Excel installed. It replaces Excel Viewer 97 and previous versions.
* [Microsoft PowerPoint Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=6) (.ppt, .pptx) For viewing full-featured presentations created in PowerPoint 97 and later versions.
