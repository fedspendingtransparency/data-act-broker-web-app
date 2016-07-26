#### July 27, 2016

In this version of the Broker, we updated the Broker branding to Beta, improved the validation processing time, implemented short data element names, made the styling more consistent, improved the accessibility of the Broker, added a resources section, and updated the information on validations. 

  - [DATA Act Broker - Beta Release](#/help?section=betaRelease)
  - [Validation Processing Time](#/help?section=processingTime)
  - [Short Data Element Names](#/help?section=shortNames)
  - [Consistent Style](#/help?section=consistentStyle)
  - [Accessibility Improvements](#/help?section=accessibilityImprovements)
  - [Resources](#/help?section=resources)
  - [More Validations in SQL](#/help?section=validationSQL3)
  - [Updated Validations](#/help?section=updatedValidations)
  - [Browser Requirements & Known Issues](#/help?section=browser)
  - [Accessibility Statement](#/help?section=accessibilityStatement)

#### DATA Act Broker - Beta Release{section=betaRelease}
We updated all the relelvant text to reflect "Beta Release." We still plan on incremental updates to the Broker about every two weeks.

NOTE: Even though the the DATA Act Broker - Beta Release has been in place since the June 29th release, the URL will remain the same [https://alpha-broker.usaspending.gov](https://alpha-broker.usaspending.gov).

#### Validation Processing Time{section=processingTime}
We made some improvements to reduce the validation processing time. If you're still experiencing submissions that take more than 15-20 minutes, please contact us so we can troubleshoot the issue.

#### Short Data Element Names{section=shortNames}
Some agency financial systems need to use column heading that are less than 30 characters long. We have created a set of short element names. See the Resources section for element name crosswalk.

#### Consistent Broker Styling{section=consistentStyle}
We made some small changes so the Broker displays in a more consistent manner.

#### Accessibility Improvements{section=accessibilityImprovements}
We made several changes to improve the accessibility of the Broker by adaptive technologies like screen readers. We also added an accessibility statement in this Help file.

#### Resources{section=resources}
We identified several files that you may want to have readily available while using the Broker.
 - File A: Appropriation Account data [Download sample file](https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/appropValid.csv)
 - File B: Object Class and Program Activity data [Download sample file](https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/programActivityValid.csv)
 - File C: Award Financial data [Download sample data](https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardFinancialValid.csv)
 - Long Element Name to Short Element Name Crosswalk [Download file](https://s3-us-gov-west-1.amazonaws.com/prod-data-act-submission/rss/AgencyLabel_to_TerseLabel.xlsx)
 - Validation Rules resource [Download file](https://s3-us-gov-west-1.amazonaws.com/prod-data-act-submission/rss/Validation_Rules.xlsx)
 - Domain Values resource [Download file](https://s3-us-gov-west-1.amazonaws.com/prod-data-act-submission/rss/Domain_Values.xlsx)

#### More Validations in SQL{section=validationSQL3}
Agency developers may be interested to know that we transitioned more of the Broker validations to using SQL statements. The list of SQL statements is publically available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules).

#### Updated Validations{section=updatedValidations}
Below is a cumulative table of validations in the RSS. The status column indicates whether they are currently implemented in the Broker.

```!inline-html
<table class="usa-da-table table-bordered help-table">
<thead>
<tr>
<th scope="col" class="col-12">Relates to Files</th>
<th scope="col" class="col-10">Rule Name</th>
<th scope="col" class="col-45">Rule Detail</th>
<th scope="col" class="col-13">Status</th>
<th scope="col" class="col-20">Notes</th>
</tr>
</thead>
<tbody>
<tr><td>A/B/C</td>
<td>A1</td>
<td>TAS components: The combination of all the elements that make up the TAS must match the Treasury Central Accounting Reporting System (CARS). AgencyIdentifier, MainAccountCode, and SubAccountCode are always required. AllocationTransferAgencyIdentifier, BeginningPeriodOfAvailability, EndingPeriodOfAvailability and AvailabilityTypeCode are required if present in the CARS table.</td>
<td>Implemented</td>
<td>TAS must be valid</td>
</tr>
<tr><td>A</td>
<td>A2</td>
<td class="break-word">BudgetAuthorityAvailableAmountTotal_CPE = BudgetAuthorityAppropriatedAmount_CPE + BudgetAuthorityUnobligatedBalanceBroughtForward_FYB + AdjustmentsToUnobligatedBalanceBroughtForward_CPE + OtherBudgetaryResourcesAmount_CPE</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>A</td>
<td>A3</td>
<td class="break-word">OtherBudgetaryResourcesAmount_CPE = ContractAuthorityAmountTotal_CPE + BorrowingAuthorityAmountTotal_CPE + SpendingAuthorityfromOffsettingCollectionsAmountTotal_CPE</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>A</td>
<td>A4</td>
<td class="break-word">StatusOfBudgetaryResourcesTotal_CPE= ObligationsIncurredTotalByTAS_CPE + UnobligatedBalance_CPE</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A6</td>
<td class="break-word">BudgetAuthorityAvailableAmountTotal_CPE= CPE value for GTAS SF 133 line #1910 </td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A7</td>
<td class="break-word">BudgetAuthorityUnobligatedBalanceBroughtForward_FYB= value for GTAS SF 133 line #1000 </td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A8</td>
<td class="break-word">BudgetAuthorityAppropriatedAmount_CPE= CPE aggregate value for GTAS SF 133 line #1160 + #1180 + #1260 + #1280</td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A9</td>
<td class="break-word">ContractAuthorityAmountTotal_CPE= CPE aggregate value for GTAS SF 133 line #1540 + #1640</td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A10</td>
<td class="break-word">BorrowingAuthorityAmountTotal_CPE= CPE aggregate value for GTAS SF 133 line #1340 + #1440</td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A11</td>
<td class="break-word">SpendingAuthorityfromOffsettingCollectionsAmountTotal_CPE= CPE aggregate value for GTAS SF 133 line #1750 + #1850</td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A12</td><td>AdjustmentsToUnobligatedBalanceBroughtForward_CPE= CPE aggregate value for GTAS SF 133 line #1010 through 1042</td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A14</td>
<td>GrossOutlayAmountByTAS_CPE= CPE value for GTAS SF 133 line #3020</td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A15</td><td>UnobligatedBalance_CPE= CPE value for GTAS SF 133 line #2490 </td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A17</td>
<td>Submitted value must match corresponding GTAS value (see specific rule)</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
<tr><td>A</td>
<td>A18</td>
<td class="break-word">GrossOutlayAmountByTAS_CPE (file A) = sum of all GrossOutlayAmountByProgramObjectClass (file B)</td>
<td>Implemented</td>
<td>Cross-File Validation</td>
</tr>
<tr><td>A</td>
<td>A19</td>
<td class="break-word">ObligationsIncurredTotalByTAS_CPE (File A) = sum of ObligationsIncurredByProgramObjectClass_CPE (File B)</td>
<td>Implemented</td>
<td>Cross-File Validation</td>
</tr>
<tr><td>A</td>
<td>A20</td>
<td>Must be valid Agency ID in the Common Government-wide Accounting Classification (CGAC)</td>
<td>Implemented</td>
</tr>
<tr><td>A</td>
<td>A21</td>
<td>Only acceptable values are x and [blank]</td>
<td>Implemented</td>
<td>Requirement for availability type codes</td>
</tr>
<tr>
<td>A</td>
<td>A22</td>
<td>ObligationsIncurredTotalByTAS_CPE= CPE value for GTAS SF 133 line #2190 </td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>A</td>
<td>A23</td>
<td>StatusOfBudgetaryResourcesTotal_CPE= CPE value for GTAS SF 133 line #2500</td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr><td>A</td>
<td>A24</td>
<td class="break-word">StatusOfBudgetaryResourcesTotal_CPE = BudgetAuthorityAvailableAmountTotal_CPE</td>
<td>Implemented</td>
<td>In File A, both of these elements must match, per TAS</td>
</tr>
<tr>
<td>A</td>
<td>A25</td>
<td>BorrowingAuthorityAmountTotal_CPE must be provided if TAS has borrowing authority per CARS or GTAS. If no borrowing authority on TAS, leave blank.</td>
<td>Not implemented</td>
<td>Element Conditionally Required</td>
</tr>
<tr>
<td>A</td>
<td>A26</td>
<td>ContractAuthorityAmountTotal_CPE must be provided if TAS has contract authority per CARS or GTAS. If no contract authority on TAS, leave blank.</td>
<td>Not implemented</td>
<td>Element Conditionally Required</td>
</tr>
<tr>
<td>A</td>
<td>A27</td>
<td>SpendingAuthorityfromOffsettingCollectionsAmountTotal_CPE must be provided if TAS has spending authority per CARS or GTAS. If no spending authority on TAS, leave blank.</td>
<td>Not implemented</td>
<td>Element Conditionally Required</td>
</tr>
<tr>
<td>A</td>
<td>A28</td>
<td>OtherBudgetaryResourcesAmount_CPE must be provided if TAS has borrowing, contract or spending authority per CARS or GTAS. If not applicable, leave blank.</td>
<td>Not implemented</td>
<td>Element Conditionally Required</td>
</tr>
<tr>
<td>A</td>
<td>A29</td>
<td>DeobligationsRecoveriesRefundsByTAS_CPE = CPE aggregate value for GTAS SF 133 line 1021+1033</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
<tr>
<td>A</td>
<td>A30</td>
<td>All TAS values in File A (appropriations) should exist in File B (object class program activity), and vice versa.</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
<tr>
<td>A/B/C</td>
<td>A31</td>
<td>Beginning Period of Availability and Ending Period of Availability must be blank if Availability Type Code = X</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
<tr>
<td>A</td>
<td>A32</td>
<td>TAS values in File A (appropriations) should be unique</td>
<td>Not implemented</td><td>Requirement</td>
</tr>
<tr>
<td>A</td>
<td>A33</td>
<td>Each TAS reported to GTAS for SF 133 should be reported in File A</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
<tr><td>B</td>
<td>B3</td>
<td class="break-word">ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4831 + 4871 + 4881). This applies to the program activity and object class level.</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B4</td>
<td class="break-word">ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4931 + 4971 + 4981). This applies to the program activity and object class level.</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B5</td>
<td class="break-word">GrossOutlayAmountByProgramObjectClass (FYB or CPE, File B) = GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE, File B) + GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE, File B)</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B6</td>
<td class="break-word">GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4832 + 4872+ 4882). This applies to the program activity and object class level.</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B7</td>
<td class="break-word">GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE)= USSGL(4902 + 4908 + 4972 + 4982). This applies to the program activity and object class level.</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B9</td>
<td>Must be a valid program activity name for the corresponding TAS/TAFS as defined in Section 82 of OMB Circular A-11.</td>
<td>Implemented</td>
<td> </td>
</tr>
<tr><td>B</td>
<td>B10</td>
<td>Must be a valid program activity code for the corresponding TAS/TAFS as defined in Section 82 of OMB Circular A-11.</td>
<td>Implemented</td>
<td> </td>
</tr>
<tr><td>B</td>
<td>B11</td>
<td>Must be valid 3-digit object class as defined in OMB Circular A-11 Section 83.6, or a 4-digit code which includes a 1-digit prefix that distinguishes direct, reimbursable, and allocation obligations.</td>
<td>Implemented</td>
<td>Do not include decimal points</td>
</tr>
<tr><td>B</td>
<td>B12</td>
<td>Reimbursable flag indicator is required when reporting obligation or outlay USSGL account balances (excluding downward adjustments SGL accounts)</td>
<td>Implemented</td>
<td class="break-word">Valid values are "R" for "ReimbursableFundingSource" and "D" for "DirectFundingSource"</td>
</tr>
<tr><td>B</td>
<td>B13</td>
<td class="break-word">DeobligationsRecoveriesRefundsdOfPriorYearByProgramObjectClass_CPE = USSGL(4871+ 4872 + 4971 + 4972)</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>B</td>
<td>B14</td>
<td>All the D amounts reported for (4801_CPE less 4801_FYB) + (4802_CPE less 4802_FYB) + 4881_CPE + 4882_CPE + (4901_CPE less 4901_FYB) + 4902_CPE + (4908_CPE less 4908_FYB) + 4981_CPE + 4982_CPE = SF 133 line 2004 per TAS</td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>B</td>
<td>B15</td>
<td>All the R amounts reported for (4801_CPE less 4801_FYB) + (4802_CPE less 4802_FYB) + 4881_CPE + 4882_CPE + (4901_CPE less 4901_FYB) + 4902_CPE + (4908_CPE less 4908_FYB) + 4981_CPE + 4982_CPE = SF 133 line 2104 per TAS</td>
<td>Not implemented</td>
<td>Calculation</td>
</tr>
<tr>
<td>B</td>
<td>B18</td>
<td>Reimbursable flag indicator is not required if object class is 4 digits. But if either "D" or "R" are given, then they have to correspond to the first digit of object class. Valid values are "R" for "ReimbursableFundingSource" and "D" for "DirectFundingSource". If an object class is 4 digits, then if it starts with 1 (1XXX) then it corresponds to a Reimbursable flag indicator of "D," else if it starts with 2 (2XXX) then it corresponds to a Reimbursable flag indicator of "R."</td>
<td>Not implemented</td>
<td>Element Conditionally Required</td>
</tr>
<tr>
<td>B</td>
<td>B19</td>
<td>The combination of TAS/object class/program activity code/reimbursable flag in File B (object class program activity) should be unique</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
<tr>
<td>B, C</td>
<td>B20</td>
<td>All combinations of TAS/program activity code/object class in File C (award financial) should exist in File B (object class program activity).</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>

<tr><td>C</td>
<td>C3</td>
<td class="break-word">ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4831 + 4871 + 4881). This applies to the award level.</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C4</td>
<td class="break-word">ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4931 + 4971 + 4981). This applies to the award level.</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C5</td>
<td class="break-word">GrossOutlayAmountByAward (FYB or CPE, File C) = GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE, File C) + GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE, File C)</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C6</td>
<td class="break-word">GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4832 + 4872+ 4882). This applies to the award level.</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C7</td>
<td class="break-word">GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE) = USSGL(4902 + 4908 + 4972 + 4982). This applies to the award level.</td>
<td>Implemented</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C8</td>
<td>Unique FAIN/URI from file C exists in file D2</td>
<td>Implemented</td>
<td>Linkage</td>
</tr>
<tr><td>C/D2</td>
<td>C9</td>
<td>Unique FAIN/URI from file D2 exists in file C, except D2 records with zero FederalActionObligation</td>
<td>Implemented</td>
<td>Linkage</td>
</tr>
<tr><td>C/D1</td>
<td>C14</td>
<td>If FAIN is not provided then provide URI </td>
<td>Implemented</td>
<td> </td>
</tr>
<tr><td>C</td>
<td>C17</td>
<td>Not Required on rows that include values for USSGL accounts balances or subtotals</td>
<td>Implemented</td>
<td>This is for transactions, not for USSGL amounts, from the financial systems.</td>
</tr>
<tr><td>C</td>
<td>C18</td>
<td class="break-word">DeobligationsRecoveriesRefundsOfPriorYearByAward_CPE = USSGL(4871+ 4872 + 4971 + 4972)</td>
<td>Implemented</td>
<td>This applies to the award level</td>
</tr>
<tr>
<td>C</td>
<td>C19</td>
<td>The combination of TAS/object class/program activity code (if supplied)/award id components/obligated amount in File C (award financial) should be unique. If they are not, the broker will display a warning, unless the submitted File C contains an optional unique transaction id that can be used to verify uniqueness.</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
<tr>
<td>C</td>
<td>C20</td>
<td>The totals by combination of TAS/object class provided in File C must be equal to, or less than, the same combinations in File B</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
<tr>
<td>C</td>
<td>C21</td>
<td>The totals by combination of TAS/program activity code provided in File C must be equal to, or less than, the same combinations in File B</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
<tr>
<td>C</td>
<td>C22</td>
<td>All award identifiers for financial modifications or new transactions with non-zero obligated amounts in Files D1 or D2 should exist in File C.</td>
<td>Not implemented</td>
<td>Requirement</td>
</tr>
</tbody>
</table>
!inline-html```

#### Browser Requirements & Known Issues{section=browser}
The Broker is currently tested with the following browsers:

* Internet Explorer version 10 and higher
* Firefox (current version)
* Chrome (current version)
* Safari (current version)

Although you may use any browser/version combination you wish, we cannot support browsers and versions other than the ones stated above.

Known Issues

* The Broker will not work when using Internet Explorer under medium privacy settings or high security settings.

#### Accessibility Statement{section=accessibilityStatement}
**Commitment and Guidelines**
Alpha-broker.usaspending.gov is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. To meet this commitment we develop this website to conform to the [Web Content Accessibility Guidelines 2.0](https://www.w3.org/TR/WCAG/). These guidelines explain how to make websites more accessible to people with disabilities, and we believe they also make our website easier for everyone to use.
The [Accessible Rich Internet Applications Suite (WAI-ARIA)](https://www.w3.org/WAI/intro/aria) addresses accessibility challenges by defining new ways to provide functionality with assistive technology. With WAI-ARIA, developers are able to provide usable and accessible advanced Web applications to people with disabilities. Alpha-broker.usaspending.gov also uses The Voluntary Product Accessibility Template® (VPAT®) to document adherence with Section 508 of the Rehabilitation Act accessibility standards.

We know our website changes regularly so we’re always looking for ways to improve. If there is information you think should be included on this page, or if you experience any difficulty accessing this site, please contact us at [DATABroker@fiscal.treasury.gov](mailto:DATABroker@fiscal.treasury.gov) for assistance.

**Documents**
The documents offered within Alpha-broker.usaspending.gov use multiple file formats. Below is a list that will help you identify which software downloads are needed to view different file extensions. If you require a file format other than those currently provided or experience accessibility issues, please contact us at [DATABroker@fiscal.treasury.gov] (mailto:DATABroker@fiscal.treasury.gov) for assistance.

**Document Files**
- Windows Operating System .TXT files can be viewed on any Windows-based document reader.
- [Adobe Reader](https://get.adobe.com/reader/) (.pdf) For viewing and printing PDF documents.
 - [Microsoft Word Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=4) (.doc, .docx) For viewing, printing, and copying Word documents without having Microsoft Word installed. It replaces Word Viewer 2003 and previous versions.
- [Microsoft Excel Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=10) (.xls, .xlsx) For viewing and printing Excel workbooks without having Microsoft Excel installed. It replaces Excel Viewer 97 and previous versions.
- [Microsoft PowerPoint Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=6) (.ppt, .pptx) For viewing full-featured presentations created in PowerPoint 97 and later versions.
