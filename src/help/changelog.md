#### June 15, 2016

In this version of the Broker, we added an indicator of when your data was last saved, made it easier to select your agency, made it easier to submit your data without errors, updated some of the validations, and identified another issue. 

  - [Time Data Last Saved](#/help?section=lastSaved)
  - [Easier Agency Selection](#/help?section=agencyCGAC)
  - [Accidental Commas in Dollar Amounts](#/help?section=removeCommas)
  - [Header Row Capitalization Errors](#/help?section=elementCaps)
  - [Updated Validations](#/help?section=updatedValidations)
  - [Browser Requirements & Known Issues](#/help?section=browser)

#### Time Data last Saved{section=lastSaved}
The Broker automatically saves your files when you upload them and at each step of the validation process. The time the data was last saved is displayed at the top of the broker below the Help menu.

#### Easier Agency Selection{section=agencyCGAC}
When you register for an account or create a submission, you can enter your CGAC code to correctly select your agency.

#### Accidental Commas in Dollar Amounts{section=removeCommas}
The Practices and Procedures document specifies that dollar amounts should be submitted without commas. However, if you accidentally include commas in dollar amounts the Broker will remove them.

#### Header Row Capitalization Errors{section=elementCaps}
The Practices and Procedures document specifies that the element names in the header row should exactly match the RSS element names. However, to assist you the Broker will process files with incorrect element name capitalization.

#### Updated Validations{section=updatedValidations}
Below is a cumulative table of validations implemented to date.

<table className="usa-da-table table-bordered">
<thead>
<tr>
<th scope="col">Relates to Files</th>
<th scope="col">Rule Name</th>
<th scope="col">Rule Detail</th>
<th scope="col">Notes</th>
</tr>
</thead>
<tbody>
<tr><td>A/B/C</td>
<td>A1</td>
<td>TAS components: The combination of all the elements that make up the TAS must match the Treasury Central Accounting Reporting System (CARS). AgencyIdentifier, MainAccountCode, and SubAccountCode are always required. AllocationTransferAgencyIdentifier, BeginningPeriodOfAvailability, EndingPeriodOfAvailability and AvailabilityTypeCode are required if present in the CARS table.</td>
<td>TAS must be valid</td>
</tr>
<tr><td>A</td>
<td>A2</td>
<td>BudgetAuthorityAvailableAmountTotal_CPE = BudgetAuthorityAppropriatedAmount_CPE + BudgetAuthorityUnobligatedBalanceBroughtForward_FYB + AdjustmentsToUnobligatedBalanceBroughtForward_CPE + OtherBudgetaryResourcesAmount_CPE</td>
<td>Calculation</td>
</tr>
<tr><td>A</td>
<td>A3</td>
<td>OtherBudgetaryResourcesAmount_CPE = ContractAuthorityAmountTotal_CPE + BorrowingAuthorityAmountTotal_CPE + SpendingAuthorityfromOffsettingCollectionsAmountTotal_CPE</td>
<td>Calculation</td>
</tr>
<tr><td>A</td>
<td>A4</td>
<td>StatusOfBudgetaryResourcesTotal_CPE= ObligationsIncurredTotalByTAS_CPE + UnobligatedBalance_CPE</td>
<td>Calculation</td>
</tr>
<tr><td>A</td>
<td>A21</td>
<td>Only acceptable values are x and [blank]</td>
<td>Requirement for availability type codes</td>
</tr>
<tr><td>A</td>
<td>A24</td>
<td>StatusOfBudgetaryResourcesTotal_CPE = BudgetAuthorityAvailableAmountTotal_CPE</td>
<td>In File A, both of these elements must match, per TAS</td>
</tr>
<tr><td>B</td>
<td>B3</td>
<td>ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4831 + 4871 + 4881). This applies to the program activity and object class level.</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B4</td>
<td>ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4931 + 4971 + 4981). This applies to the program activity and object class level.</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B5</td>
<td>GrossOutlayAmountByProgramObjectClass (FYB or CPE, File B) = GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE, File B) + GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE, File B)</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B6</td>
<td>GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4832 + 4872+ 4882). This applies to the program activity and object class level.</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B7</td>
<td>GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE)= USSGL(4902 + 4908 + 4972 + 4982). This applies to the program activity and object class level.</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B13</td>
<td>DeobligationsRecoveriesRefundsdOfPriorYearByProgramObjectClass_CPE = USSGL(4871+ 4872 + 4971 + 4972)</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C3</td>
<td>ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4831 + 4871 + 4881). This applies to the award level.</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C4</td>
<td>ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4931 + 4971 + 4981). This applies to the award level.</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C5</td>
<td>GrossOutlayAmountByAward (FYB or CPE, File C) = GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE, File C) + GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE, File C)</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C6</td>
<td>GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4832 + 4872+ 4882). This applies to the award level.</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C7</td>
<td>GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE) = USSGL(4902 + 4908 + 4972 + 4982). This applies to the award level.</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C8</td>
<td>Unique FAIN/URI from file C exists in file D2</td>
<td>Linkage</td>
</tr>
<tr><td>C/D2</td>
<td>C9</td>
<td>Unique FAIN/URI from file D2 exists in file C, except D2 records with zero FederalActionObligation</td>
<td>Linkage</td>
</tr>
<tr><td>C/D1</td>
<td>C14</td>
<td>If FAIN is not provided then provide URI </td>
<td> </td>
</tr>
<tr><td>C</td>
<td>C17</td>
<td>Not Required on rows that include values for USSGL accounts balances or subtotals</td>
<td>This is for transactions, not for USSGL amounts, from the financial systems.</td>
</tr>
</tbody>
</table>

#### Browser Requirements & Known Issues{section=browser}
The Broker is currently tested with the following browsers:

* Internet Explorer version 10 and higher
* Firefox (current version)
* Chrome (current version)
* Safari (current version)

Although you may use any browser/version combination you wish, we cannot support browsers and versions other than the ones stated above.

Known Issues

* Proxy issue
* The Broker will not work when using Internet Explorer under medium privacy settings or high security settings.
