### June 6, 2018

In this release of the Broker, we

* Updated USPS zip code data used in Broker derivations and validations with that in USPS’s PostalPro product (https://postalpro.usps.com/address-quality-solutions/zip-4-product). We expect this will have a minimal but positive impact to agencies, since this is the most up-to-date ZIP database available. Agencies that purchase their own ZIP+4 product for internal validation purposes should take note.
* Various mop-up tasks related to DAIMS 1.2 Broker deploy (finished updating all hyperlinks throughout the Broker to DAIMS v1.2 documents, removed FiscalYearQuarterCorrection and LegalEntityAddressLine3 from DABS-generated D1/D2 files, reordered the elements in DABS-generated D1/D2 files to match DAIMS 1.2, and changed primaryplaceofperformancezip_4 header to primaryplaceofperformancezip+4 in DABS-generated D1/D2 files to conform with DAIMS).
* Fixed a minor bug with Broker navigation within the Help sections.
* Updated the subaward loader to check for PIID/FAIN with and without dashes when looking for award identifiers to match the FSRS records to.
* Because the Broker documentation has included two different terse labels (place_of_performance_zip4 and place_of_performance_zip4a) for PrimaryPlaceOfPerformanceZIP+4 over time, we updated the Broker to accept either.