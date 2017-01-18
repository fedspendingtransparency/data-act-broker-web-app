#### January 18, 2017
On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through greater agency use.

In this version of the Broker, several bugs were fixed relating to the flex fields, the C23 validation, file E creation, and rule B18. Additionally, financing accounts are now excluded from the A33 validation, per the new loan policy.

  - [Flex field fix](#/help?section=flexfield)
  - [C23 validation fix](#/help?section=c23)
  - [File E generation fix](#/help?section=filee)
  - [Update to rule B18](#/help?section=B18)
  - [Financing accounts exclusion](#/help?section=A33)

##### Flex field fix{section=flexfield}

After the flex fields were rolled out in an earlier release, we discovered a bug where multiple instances of a flex field would cause submission files to return errors. This has been fixed and users should no longer experience errors when using flex fields in their files. The proper syntax for the flex field headers is `flex_`.

##### C23 validation fix{section=c23}

In earlier versions of the broker, the C23 validation would produce a failure in cases where both amounts from C and D for an award were zero but reported as different data types (such as string vs a numeric). We've fixed this bug so that even different data types that represent the same amount should match and not produce an error.

##### File E generation fix{section=filee}

Previously the file E generation was not working due to locked SAM credentials. A new SAM account has been created and deployed so that users should be able to generate their E file without error.

##### Update to rule B18{section=B18}

Rule B18 was modified to prevent conflict with Rule B12, when downward adjustment USSGLs are submitted with a blank D/R field.

##### Financing accounts exclusion{section=A33}

Rule A33 was modified so that users will no longer see a warning if the submission does not include Financing Accounts. 

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
