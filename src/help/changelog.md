#### June 29, 2016

In this version of the Broker, we made several small changes to make the Broker easier to use, added a section to display submissions from your agency, clarified the process to upload corrected files, added an email notification feature, transitioned some of the validation rules to SQL statements, and updated some of the validations. 

  - [Ease of Use Improvements](#/help?section=easeofUse)
  - [Submissions from Your Agency](#/help?section=agencySubdashboard)
  - [Uploading Corrected Files](#/help?section=uploadCorrectedFiles)
  - [Send Email Notifications](#/help?section=sendEmail)
  - [Some Validations in SQL](#/help?section=validationSQL)
  - [Updated Validations](#/help?section=updatedValidations)
  - [Browser Requirements & Known Issues](#/help?section=browser)

#### Ease of Use Improvements{section=easeofUse}
- **Confirm Password** When you create a Broker account, you are prompted to enter a Password and then to Confirm Password.
- **Username** On the log in screen, we have replaced the Username prompt with Email Address since your user name is your email address.
- **Submission Guide** If you hide the Submission Guide page, when you select your agency for a new submission, there is a link to view the Submission Guide. The Submission Guide also has a link to the validations listed on this Help page.
- **Default Dates** When creating your submission, the dates default to the beginning of the fiscal year and the current month or quarter.
- **Last Saved** The Broker automatically saves your files when you upload them and at each step of the validation process. The date and time the data was last saved is displayed at the top of the screen below the Help menu. 
- **Leave Validations Running** You can leave the validation page and the validations will continue to run. Come back at any time to check your progress or results.
- **Spam Folder Warning** Some users report that emails from the Broker end up in their spam folders. We've added a reminder to check your spam folder on pages that generate emails.
- **Back to Top** We know this Help page is getting long so we added an arrow in the lower right corner. Click it to take you back to the top of the page at any time.

#### Submissions from Your Agency{section=agencySubdashboard}
We've added a table to the Broker home page where you can see recent submissions from your agency. View and edit submissions from this table.

#### Uploading Corrected Files{section=uploadCorrectedFiles}
If one or more of your files fails validation, only those failed files will have a prompt in red for you to upload a corrected file. Click *Choose Corrected File* to browse to your file and select it. Or drag and drop a corrected file onto the file icon. Click *Upload Corrected CSV Files*. The validations on the corrected files will run again.

#### Send Email Notifications{section=sendEmail}
After your data has been successfully validated, the *Review & Publish* page has a button to *Notify Another User that the Submission is Ready for Certification*. This opens a field where you can type in multiple email addresses for users in your agency. 

#### Some Validations in SQL{section=validationSQL}
Agency developers may be interested to know that we transitioned some of the Broker validations to using SQL statements. The list of SQL statements is publically available on [GitHub](https://github.com/fedspendingtransparency/data-act-broker-backend/blob/development/dataactvalidator/config/sqlRules.csv).

#### Updated Validations{section=updatedValidations}
Below is a cumulative table of validations implemented to date. In this release we included rules A18, A19, A20, B9, B10, B11, B12, and C18.

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
<td>A18</td>
<td class="break-word">GrossOutlayAmountByTAS_CPE (file A) = sum of all GrossOutlayAmountByProgramObjectClass (file B)</td>
<td>Cross File Validation (back-end only, not yet shown to users in the Broker)</td>
</tr>
<tr><td>A</td>
<td>A19</td>
<td class="break-word">ObligationsIncurredTotalByTAS_CPE (File A) = sum of ObligationsIncurredByProgramObjectClass_CPE (File B)</td>
<td>Cross File Validation (back-end only, not yet shown to users in the Broker)</td>
</tr>
<tr><td>A</td>
<td>A20</td>
<td>Must be valid Agency ID in the Common Government-wide Accounting Classification (CGAC)</td>
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
<td>B9</td>
<td>Must be a valid program activity name for the corresponding TAS/TAFS as defined in Section 82 of OMB Circular A-11.</td>
<td> </td>
</tr>
<tr><td>B</td>
<td>B10</td>
<td>Must be a valid program activity code for the corresponding TAS/TAFS as defined in Section 82 of OMB Circular A-11.</td>
<td> </td>
</tr>
<tr><td>B</td>
<td>B11</td>
<td>Must be valid 3-digit object class as defined in OMB Circular A-11 Section 83.6, or a 4-digit code which includes a 1-digit prefix that distinguishes direct, reimbursable, and allocation obligations.</td>
<td>Do not include decimal points</td>
</tr>
<tr><td>B</td>
<td>B12</td>
<td>Reimbursable flag indicator is required when reporting obligation or outlay USSGL account balances (excluding downward adjustments SGL accounts)</td>
<td class="break-word">Valid values are "R" for "ReimbursableFundingSource" and "D" for "DirectFundingSource"</td>
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
<tr><td>C</td>
<td>C18</td>
<td class="break-word">DeobligationsRecoveriesRefundsOfPriorYearByAward_CPE = USSGL(4871+ 4872 + 4971 + 4972)</td>
<td>This applies to the award level</td>
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
