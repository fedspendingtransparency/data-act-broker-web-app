#### January 18, 2017

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


#### December 21, 2016
On September 30, 2016, we released the full version of the DATA Act Broker that contained everything agencies need to test the data validation and submission process. Now we are making improvements to the Broker and responding to issues discovered through greater agency use.

In this version of the Broker, users are able to generate D files outside of a submission, rules that were temporarily warnings are changed back to errors, the Broker is available at a new URL, rule B5 is updated, object class validations require a specific value when an object class is unknown, and MAX permissions allow users who are part of of multiple agency permission groups to have different permissions for different agencies.

  - [Generate D files outside of a submission](#/help?section=Dfiles)
  - [Temporary Warnings Changed Back to Errors](#/help?section=warnings2Errors)
  - [New URL for the Data Broker](#/help?section=URL)
  - [Update to Rule B5](#/help?section=B5)
  - [Object Class Validation Update](#/help?section=objectClass)
  - [MAX Group Permissions Allow for Different Permissions for a User Who is Part of a Multiple Agency Permission Group](#/help?section=maxGroup)
  - [Browser Requirements & Known Issues](#/help?section=browser)
  - [Accessibility Statement](#/help?section=accessibilityStatemen)

##### Generate D Files Outside of a Submission{section=Dfiles}

Users will be able to generate D files outside the context of a submission. In other words, they won't need to validate A-C to be able to generate D files.
