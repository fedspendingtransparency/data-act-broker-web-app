#### June 15, 2016

In this version of the Broker, we made it easier to select your agency, made it easier to submit your data without errors, and updated some of the validations. 

  - [Easier Agency Selection](#/help?section=agencyCGAC)
  - [Accidental Commas in Dollar Amounts](#/help?section=removeCommas)
  - [Header Row Capitalization Errors](#/help?section=elementCaps)
  - [Updated Validations](#/help?section=updatedValidations)
  - [Browser Requirements & Known Issues](#/help?section=browser)

#### Easier Agency Selection{section=agencyCGAC}
When you register for an account or create a submission, you can enter your CGAC code to correctly select your agency.

#### Accidental Commas in Dollar Amounts{section=removeCommas}
The Practices and Procedures document specifies that dollar amounts should be submitted without commas. However, if you accidentally include commas in dollar amounts the Broker will remove them.

#### Header Row Capitalization Errors{section=elementCaps}
The Practices and Procedures document specifies that the element names in the header row should exactly match the RSS element names. However, to assist you the Broker will process files with incorrect element name capitalization.

#### Updated Validations{section=updatedValidations}
Below is a cumulative table of validations implemented to date.

```!inline-html
<table class="usa-da-table table-bordered help-table">
<thead>
<tr>
<th scope="col" class="col-15">Relates to Files</th>
<th scope="col" class="col-15">Rule Name</th>
<th scope="col" class="col-45">Rule Detail</th>
<th scope="col" class="col-25">Notes</th>
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
<td class="break-word">BudgetAuthorityAvailableAmountTotal_CPE = BudgetAuthorityAppropriatedAmount_CPE + BudgetAuthorityUnobligatedBalanceBroughtForward_FYB + AdjustmentsToUnobligatedBalanceBroughtForward_CPE + OtherBudgetaryResourcesAmount_CPE</td>
<td>Calculation</td>
</tr>
<tr><td>A</td>
<td>A3</td>
<td class="break-word">OtherBudgetaryResourcesAmount_CPE = ContractAuthorityAmountTotal_CPE + BorrowingAuthorityAmountTotal_CPE + SpendingAuthorityfromOffsettingCollectionsAmountTotal_CPE</td>
<td>Calculation</td>
</tr>
<tr><td>A</td>
<td>A4</td>
<td class="break-word">StatusOfBudgetaryResourcesTotal_CPE= ObligationsIncurredTotalByTAS_CPE + UnobligatedBalance_CPE</td>
<td>Calculation</td>
</tr>
<tr><td>A</td>
<td>A21</td>
<td>Only acceptable values are x and [blank]</td>
<td>Requirement for availability type codes</td>
</tr>
<tr><td>A</td>
<td>A24</td>
<td class="break-word">StatusOfBudgetaryResourcesTotal_CPE = BudgetAuthorityAvailableAmountTotal_CPE</td>
<td>In File A, both of these elements must match, per TAS</td>
</tr>
<tr><td>B</td>
<td>B3</td>
<td class="break-word">ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4831 + 4871 + 4881). This applies to the program activity and object class level.</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B4</td>
<td class="break-word">ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4931 + 4971 + 4981). This applies to the program activity and object class level.</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B5</td>
<td class="break-word">GrossOutlayAmountByProgramObjectClass (FYB or CPE, File B) = GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE, File B) + GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE, File B)</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B6</td>
<td class="break-word">GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4832 + 4872+ 4882). This applies to the program activity and object class level.</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B7</td>
<td class="break-word">GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE)= USSGL(4902 + 4908 + 4972 + 4982). This applies to the program activity and object class level.</td>
<td>Calculation</td>
</tr>
<tr><td>B</td>
<td>B13</td>
<td class="break-word">DeobligationsRecoveriesRefundsdOfPriorYearByProgramObjectClass_CPE = USSGL(4871+ 4872 + 4971 + 4972)</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C3</td>
<td class="break-word">ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4831 + 4871 + 4881). This applies to the award level.</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C4</td>
<td class="break-word">ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4931 + 4971 + 4981). This applies to the award level.</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C5</td>
<td class="break-word">GrossOutlayAmountByAward (FYB or CPE, File C) = GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE, File C) + GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE, File C)</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C6</td>
<td class="break-word">GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4832 + 4872+ 4882). This applies to the award level.</td>
<td>Calculation</td>
</tr>
<tr><td>C</td>
<td>C7</td>
<td class="break-word">GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE) = USSGL(4902 + 4908 + 4972 + 4982). This applies to the award level.</td>
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