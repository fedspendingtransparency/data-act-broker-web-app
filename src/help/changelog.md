 #### October 6, 2017

In this release of the Broker, we released the ability to generate D1/D2 files via the Broker and made improvements to the Financial Assistance Broker Submission (FABS).

  - [D1/D2 File Generation](#/help?section=releasedraftv3)
  - [FABS Improvements](#/help?section=fabsimprovements2)


##### D1/D2 File Generation {section=releasedraftv3}
In this release, we transitioned the backed infrastructure that is used to generate the D1/D2 files from the legacy USAspending.gov infrastructure to the Broker. D2 file generation will include agencies’ FABS data. D1 file generation will be provided to the Broker via the FPDS-NG ATOM feed.


##### FABS Improvements {section=fabsimprovements2}
In this release, we made several improvements to FABS, including:
- Implemented the ability for FABS to derive FundingAgencyCode;
- Updated validations so that no error (or warning) is triggered if PPOPCongressionalDistrict is blank AND PPOPZIP+4 is 9 digits; and
- User interface improvements to prevent a user form encountering issues when clicking the “Publish” button.
