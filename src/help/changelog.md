#### September 9, 2016

In this version of the Broker, we are importing D1 and D2 file information from the USAspending UAT environment, improved the handling of encoding in files, corrected a Resources file, and added and updated some validations.

  - [Updated: Generating D1 and D2](#/help?section=d1d2updated)
  - [Encoding in Files](#/help?section=encoding)
  - [Resources](#/help?section=resources)
  - [Updated Validations](#/help?section=updatedValidations)
  - [Browser Requirements & Known Issues](#/help?section=browser)
  - [Accessibility Statement](#/help?section=accessibilityStatement)

#### Updated: Generating D1 and D2{section=d1d2updated}

In this release, we have added the ability to generate the D1 and D2 files from the data in the USAspending UAT environment that comes from ASP and FPDS. The procurement data for File D1 is only available through 7/31/2016, at this time. Submit your financial assistance data for File D2 through the ASP UAT environment. **Note:** This functionality is newly implemented so let us know if you have problems.

#### Encoding in Files{section=encoding}

Some users reported errors trying to submit files. We improved how the Broker handles some encoding scenarios so these errors are no longer generated.

#### Updated Validations{section=updatedValidations}
Below is a cumulative table of validations in the RSS. The status column indicates whether they are currently implemented in the Broker. Some rules that were already implemented in the Broker were changed in the release of the Errata. The currently implemented rule and new unimplemented rule are both listed below, with corresponding version indicators in the rule label (i.e. "C14 (v1)" or "C14 (v2)"). Outdated versions of rules that have been replaced by a new version have been removed. Some rules are no longer needed and are marked as deleted.

Refer to the [Resources](#/help?section=resources) section for sample files and additional references. A corrected version of the validation rules spreadsheet has been posted.

```!inline-html
<table class="usa-da-table table-bordered help-table">
    <thead>
        <tr>
            <th scope="col" class="col-12">Relates to Files</th>
            <th scope="col" class="col-10">Rule Name</th>
            <th scope="col" class="col-40">Rule Detail</th>
            <th scope="col" class="col-18">Status</th>
            <th scope="col" class="col-20">Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>A/B/C</td>
            <td>A1</td>
            <td>TAS components: The combination of all the elements that make up the TAS must match the Treasury Central Accounting Reporting System (CARS). AgencyIdentifier, MainAccountCode, and SubAccountCode are always required. AllocationTransferAgencyIdentifier, BeginningPeriodOfAvailability, EndingPeriodOfAvailability and AvailabilityTypeCode are required if present in the CARS table.</td>
            <td>Implemented</td>
            <td>TAS must be valid</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A2</td>
            <td class="break-word">BudgetAuthorityAvailableAmountTotal_CPE = BudgetAuthorityAppropriatedAmount_CPE + BudgetAuthorityUnobligatedBalanceBroughtForward_FYB + AdjustmentsToUnobligatedBalanceBroughtForward_CPE + OtherBudgetaryResourcesAmount_CPE</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A3</td>
            <td class="break-word">OtherBudgetaryResourcesAmount_CPE = ContractAuthorityAmountTotal_CPE + BorrowingAuthorityAmountTotal_CPE + SpendingAuthorityfromOffsettingCollectionsAmountTotal_CPE</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A4</td>
            <td class="break-word">StatusOfBudgetaryResourcesTotal_CPE= ObligationsIncurredTotalByTAS_CPE + UnobligatedBalance_CPE</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A6</td>
            <td class="break-word">BudgetAuthorityAvailableAmountTotal_CPE= CPE value for GTAS SF 133 line #1910, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A7</td>
            <td class="break-word">BudgetAuthorityUnobligatedBalanceBroughtForward_FYB= value for GTAS SF 133 line #1000, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A8</td>
            <td class="break-word">BudgetAuthorityAppropriatedAmount_CPE= CPE aggregate value for GTAS SF 133 line #1160 + #1180 + #1260 + #1280, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A9</td>
            <td class="break-word">ContractAuthorityAmountTotal_CPE= CPE aggregate value for GTAS SF 133 line #1540 + #1640, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A10</td>
            <td class="break-word">BorrowingAuthorityAmountTotal_CPE= aggregate value for GTAS SF 133 line #1340 + #1440, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A11</td>
            <td class="break-word">SpendingAuthorityfromOffsettingCollectionsAmountTotal_CPE= aggregate value for GTAS SF 133 line #1750 + #1850, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A12</td>
            <td class="break-word">AdjustmentsToUnobligatedBalanceBroughtForward_CPE= aggregate value for GTAS SF 133 line #1010 through 1042, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A14</td>
            <td>GrossOutlayAmountByTAS_CPE= value for GTAS SF 133 line #3020, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A15</td>
            <td>UnobligatedBalance_CPE= value for GTAS SF 133 line #2490, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A16</td>
            <td>All the elements that have FYB in file A, B & C would be expected in quarter 1, as a soft edit. It would be optional in subsequent periods.</td>
            <td>Implemented</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A17</td>
            <td>Deleted</td>
            <td>Deleted</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A18 (v2)</td>
            <td class="break-word">GrossOutlayAmountByTAS_CPE (file A) = sum of all GrossOutlayAmountByProgramObjectClass (file B) {When Program Activity and Object Class are not blank, this value is the sum of all Gross Outlay Amounts reported in file B, by TAS/Subaccount}</td>
            <td>Pending Update</td>
            <td>Cross-File Validation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A19 (v2)</td>
            <td class="break-word">ObligationsIncurredTotalByTAS_CPE (File A) = negative sum of ObligationsIncurredByProgramObjectClass_CPE (File B)</td>
            <td>Pending Update</td>
            <td>Cross-File Validation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A20</td>
            <td>Must be valid Agency ID in the Common Government-wide Accounting Classification (CGAC)</td>
            <td>Implemented</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A21</td>
            <td>Only acceptable values are x and [blank]</td>
            <td>Implemented</td>
            <td>Requirement for availability type codes</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A22</td>
            <td>ObligationsIncurredTotalByTAS_CPE= value for GTAS SF 133 line #2190, as of the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A23</td>
            <td>StatusOfBudgetaryResourcesTotal_CPE= value for GTAS SF 133 line #2500, as of the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
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
            <td class="break-word">SpendingAuthorityfromOffsettingCollectionsAmountTotal_CPE must be provided if TAS has spending authority per CARS or GTAS. If no spending authority on TAS, leave blank.</td>
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
            <td class="break-word">DeobligationsRecoveriesRefundsByTAS_CPE = aggregate value for GTAS SF 133 line 1021+1033, as of the same reporting period</td>
            <td>Implemented</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A30</td>
            <td>All TAS values in File A (appropriations) should exist in File B (object class program activity), and vice versa, for the same reporting period</td>
            <td>Implemented</td>
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
            <td>Implemented</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A33</td>
            <td>Each TAS reported to GTAS for SF 133 should be reported in File A, and vice versa, for the same reporting period</td>
            <td>Implemented</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A34</td>
            <td class="break-word">BudgetAuthorityUnobligatedBalanceBroughtForward_FYB= value for GTAS SF 133 line #2490 from the end of the prior fiscal year</td>
            <td>Not implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A35</td>
            <td class="break-word">DeobligationsRecoveriesRefundsByTAS_CPE in File A should equal USSGL (4871_CPE+ 4971_CPE+ 4872_CPE+ 4972_CPE) for the TAS in File B</td>
            <td>Not implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>A</td>
            <td>A36</td>
            <td class="break-word">BudgetAuthorityUnobligatedBalanceBroughtForward_FYB should have an amount populated for the reporting period, if GTAS line #1000 is populated for the same TAS as of the end of the same reporting period</td>
            <td>Not implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B3 (v1)</td>
            <td class="break-word">ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4831 + 4871 + 4881). This applies to the program activity and object class level.</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B3 (v2)</td>
            <td class="break-word">ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4881). This applies to the program activity and object class level. Note for FYB values, only 4801 is expected to have a balance other than zero</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B4 (v1)</td>
            <td class="break-word">ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4931 + 4971 + 4981). This applies to the program activity and object class level</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B4 (v2)</td>
            <td class="break-word">ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4981). This applies to the program activity and object class level. Note for FYB values, only 4901 is expected to have a balance other than zero</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B5</td>
            <td class="break-word">GrossOutlayAmountByProgramObjectClass (FYB or CPE, File B) = GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE, File B) + GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE, File B)</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B6 (v1)</td>
            <td class="break-word">GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4832 + 4872+ 4882). This applies to the program activity and object class level</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B6 (v2)</td>
            <td class="break-word">GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4882). This applies to the program activity and object class level. Note for FYB values, only 4802 is expected to have a balance other than zero</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B7 (v1)</td>
            <td class="break-word">GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE)= USSGL(4902 + 4908 + 4972 + 4982). This applies to the program activity and object class level</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B7 (v2)</td>
            <td class="break-word">GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE)= USSGL(4902 + 4908 + 4982). This applies to the program activity and object class level. Note for FYB values, only 4908 is expected to have a balance other than zero</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B9</td>
            <td>Must be a valid program activity name for the corresponding TAS/TAFS as defined in Section 82 of OMB Circular A-11</td>
            <td>Implemented</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B10</td>
            <td>Must be a valid program activity code for the corresponding TAS/TAFS as defined in Section 82 of OMB Circular A-11</td>
            <td>Implemented</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B11 (v1)</td>
            <td>Must be valid 3-digit object class as defined in OMB Circular A-11 Section 83.6, or a 4-digit code which includes a 1-digit prefix that distinguishes direct, reimbursable, and allocation obligation.</td>
            <td>Implemented</td>
            <td>Do not include decimal points</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B11 (v2)</td>
            <td>Must be valid 3-digit object class as defined in OMB Circular A-11 Section 83.6, or a 4-digit code which includes a 1-digit prefix that distinguishes direct, reimbursable, and allocation obligations. Do not include decimal points when reporting in the Schema</td>
            <td>Pending Update</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B12 (v1)</td>
            <td>Reimbursable flag indicator is required when reporting obligation or outlay USSGL account balances (excluding downward adjustments SGL accounts)</td>
            <td>Implemented</td>
            <td class="break-word">Valid values are "R" for "ReimbursableFundingSource" and "D" for "DirectFundingSource"</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B12 (v2)</td>
            <td class="break-word">Reimbursable flag indicator is required when reporting obligation or outlay USSGL account balances (excluding downward adjustments USSGL accounts), and a 3 digit object class is provided. Valid values are "R" for "ReimbursableFundingSource" and "D" for "DirectFundingSource"</td>
            <td>Pending Update</td>
            <td class="break-word">Element Conditionally Required</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B13 (v1)</td>
            <td class="break-word">DeobligationsRecoveriesRefundsdOfPriorYearByProgramObjectClass_CPE = USSGL(4871+ 4872 + 4971 + 4972)</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B13 (v2)</td>
            <td class="break-word">DeobligationsRecoveriesRefundsOfPriorYearByProgramObjectClass_CPE = USSGL(4871+ 4872 + 4971 + 4972)</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B14</td>
            <td class="break-word>File B: All the D amounts reported for (4801_CPE less 4801_FYB) + (4802_CPE less 4802_FYB) + 4881_CPE + 4882_CPE + (4901_CPE less 4901_FYB) + 4902_CPE + (4908_CPE less 4908_FYB) + 4981_CPE + 4982_CPE = SF 133 line 2004 per TAS, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B15</td>
            <td>File B: All the R amounts reported for (4801_CPE less 4801_FYB) + (4802_CPE less 4802_FYB) + 4881_CPE + 4882_CPE + (4901_CPE less 4901_FYB) + 4902_CPE + (4908_CPE less 4908_FYB) + 4981_CPE + 4982_CPE = SF 133 line 2104 per TAS, for the same reporting period</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B16</td>
            <td>Deleted</td>
            <td>Deleted</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B17</td>
            <td>Deleted</td>
            <td>Deleted</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B18</td>
            <td class="break-word">Reimbursable flag indicator is not required if object class is 4 digits. But if either 'D' or 'R' are given, then they have to correspond to the first digit of object class. Valid values are "R" for "ReimbursableFundingSource" and "D" for "DirectFundingSource". If an object class is 4 digits, then if it starts with 1 (1XXX) then it corresponds to a Reimbursable flag indicator of "'D," else if it starts with 2 (2XXX) then it corresponds to a Reimbursable flag indicator of "R."</td>
            <td>Pending Update</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>B</td>
            <td>B19</td>
            <td>The combination of TAS/object class/program activity code/reimbursable flag in File B (object class program activity) should be unique</td>
            <td>Implemented</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>B, C</td>
            <td>B20</td>
            <td>All combinations of TAS/program activity code/object class in File C (award financial) should exist in File B (object class program activity). Since not all object classes will have award activity, it is acceptable for combinations of TAS/program activity code/object class in File C to be a subset of those provided in File B</td>
            <td>Implemented</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C3 (v1)</td>
            <td class="break-word">ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4831 + 4871 + 4881). This applies to the award level.</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C3 (v2)</td>
            <td class="break-word">ObligationsUndeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4801 + 4881). This applies to the award level. Note for FYB values, only 4801 is expected to have a balance other than zero</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C4 (v1)</td>
            <td class="break-word">ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4931 + 4971 + 4981). This applies to the award level.</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C4 (v2)</td>
            <td class="break-word">ObligationsDeliveredOrdersUnpaidTotal (FYB or CPE) = USSGL(4901 + 4981). This applies to the award level. Note for FYB values, only 4901 is expected to have a balance other than zero</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C5 (v1)</td>
            <td class="break-word">GrossOutlayAmountByAward (FYB or CPE, File C) = GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE, File C) + GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE, File C)</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C5 (v2)</td>
            <td class="break-word">GrossOutlayAmountByAward (FYB or CPE, File C) = GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE, File C) + GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE, File C)</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C6 (v1)</td>
            <td class="break-word">GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4832 + 4872+ 4882). This applies to the award level.</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C6 (v2)</td>
            <td class="break-word">GrossOutlaysUndeliveredOrdersPrepaidTotal (FYB or CPE) = USSGL(4802 + 4882). This applies to the award level. Note for FYB values, only 4802 is expected to have a balance other than zero</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C7 (v1)</td>
            <td class="break-word">GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE) = USSGL(4902 + 4908 + 4972 + 4982). This applies to the award level.</td>
            <td>Implemented</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C7 (v2)</td>
            <td class="break-word">GrossOutlaysDeliveredOrdersPaidTotal (FYB or CPE) = USSGL(4902 + 4908 + 4982). This applies to the award level. Note for FYB values, only 4908 is expected to have a balance other than zero</td>
            <td>Pending Update</td>
            <td>Calculation</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C8</td>
            <td>Unique FAIN/URI from file C exists in file D2</td>
            <td>Implemented</td>
            <td>Linkage</td>
        </tr>
        <tr>
            <td>C/D2</td>
            <td>C9</td>
            <td class="break-word">Unique FAIN/URI from file D2 exists in file C, except D2 records where FederalActionObligation = 0</td>
            <td>Implemented</td>
            <td>Linkage</td>
        </tr>
        <tr>
            <td>C/D1</td>
            <td>C11</td>
            <td class="break-word">Unique PIID, ParentAwardId from file C exists in file D1</td>
            <td>Not Implemented</td>
            <td>Linkage</td>
        </tr>
        <tr>
            <td>C/D1</td>
            <td>C12</td>
            <td class="break-word">Unique PIID, ParentAwardId from file D1 exists in file C, except D1 records with zero FederalActionObligation</td>
            <td>Not Implemented</td>
            <td>Linkage</td>
        </tr>
        <tr>
            <td>C/D2</td>
            <td>C14 (v1)</td>
            <td>If FAIN is not provided then provide URI </td>
            <td>Implemented</td>
            <td> </td>
        </tr>
        <tr>
            <td>C/D</td>
            <td>C14 (v2)</td>
            <td>Each row provided in file C must contain either a FAIN, URI, or PIID.</td>
            <td>Pending Update</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C17</td>
            <td>Not Required on rows that include values for USSGL accounts balances or subtotals</td>
            <td>Implemented</td>
            <td>This is for transactions, not for USSGL amounts, from the financial systems.</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C18</td>
            <td class="break-word">DeobligationsRecoveriesRefundsOfPriorYearByAward_CPE = USSGL(4871+ 4872 + 4971 + 4972). This applies to the award level.</td>
            <td>Pending Update</td>
            <td>This applies to the award level</td>
        </tr>
        <tr>
            <td>C</td>
            <td>C19</td>
            <td>Deleted</td>
            <td>Deleted</td>
            <td>&nbsp;</td>
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
            <td>Deleted</td>
            <td>Deleted</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D1</td>
            <td class="break-word">Element value must be a valid enumeration as described in the "Domain_Values.xlsx" spreadsheet.</td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D2</td>
            <td class="break-word">Must be blank for aggregate records; required for non-aggregate records.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D3</td>
            <td class="break-word">Must be a valid date with a value between 19991001 and 20991231. Date must follow YYYYMMDD format, where YYYY is the year, MM the month and DD the day. A future ActionDate is valid only if it occurs within the current fiscal year.</td>
            <td>Element Conditionally Required</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D4</td>
            <td class="break-word">PeriodOfPerformanceCurrentEndDate >= PeriodOfPerformanceStartDate</td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D5</td>
            <td class="break-word">Either FAIN or URI (Unique Record Identifier) is required for corrections and deletions (i.e., when CorrectionLateDeleteIndicator = C or D). The combination of FAIN and AwardModificationAmendmentNumber must be unique if the URI is not provided. The URI must be unique if the FAIN and AwardModificationAmendmentNumber are not provided.</td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D6</td>
            <td class="break-word">The combination of FAIN, AwardModificationAmendmentNumber, URI, and AwardingSubTierAgencyCode must be unique unless the CorrectionLateDeleteIndicator = C or D. </td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D7</td>
            <td class="break-word">This is required only when the combination of FAIN and AwardModificationAmendmentNumber is not unique. Field must contain a unique value except when the CorrectionLateDeleteIndicator contains the code “C” or “D”. This field is required for aggregate records. </td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D8</td>
            <td class="break-word">Year must be in current or previous fiscal year (as compared to the date of ASP submission) and follow format YYYYQ, with Q representing fiscal quarter and taking value 1, 2, 3, or 4. </td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D9</td>
            <td class="break-word">Required if LegalEntityCountryCode is NOT USA. Must be blank if LegalEntityCountryCode is USA.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D10</td>
            <td class="break-word">AwardeeRecipientUniqueIdentifier (currently DUNS number) must be a valid 9-digit DUNS number and exist in the System for Award Management (SAM.gov). Must be blank for aggregate records (i.e., when RecordType = 1) and individual recipients. This is a required field for new grant assistance awards/cooperative agreements and must be active in SAM as of the ActionDate for these awards. AwardeeRecipientUniqueIdentifier is not required for loans, direct payments, insurance, and other types of financial assistance. AwardeeRecipientUniqueIdentifier does not have to be active in SAM when CorrectionLateDeleteIndicator = C or D.</td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D11</td>
            <td class="break-word">LegalEntityZIP5 and LegalEntityZIPLast4, when combined, represent a valid 9-digit USPS ZIP+4 code. This field must be blank for aggregate records and foreign recipients (i.e., when LegalEntityCountryCode is not USA). Otherwise, it is a required field.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D12</td>
            <td class="break-word">Not required for aggregate records. Required for non-aggregate records.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D13</td>
            <td class="break-word">Field must be in ##.### format. For new grant assistance awards, must be active as of the ActionDate in the Catalog of Federal Domestic Assistance Code List (located at www.cfda.gov).</td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D14</td>
            <td class="break-word">With two exceptions, this field must contain a valid two letter USPS state code in the first two positions. The two exceptions: 1) field must contain "00FORGN" when PrimaryPlaceOfPerformanceCountryCode is not USA; 2) field must contain "00*****" for multi-state places of performance.</td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D15</td>
            <td class="break-word">PrimaryPlaceOfPerformanceCode must be consistent with PrimaryPlaceOfPerformanceZIP+4, PrimaryPlaceOfPerformanceCountryCode, and PrimaryPlaceOfPerformanceCongressionalDistrict. For aggregate records (i.e., RecordType = 1), it must be in XX**### format, where XX is the USPS state code and ### a valid three-digit county code. When PrimaryPlaceOfPerformanceZIP+4 is provided, PrimaryPlaceOfPerformanceCode should be in XX##### format, where XX is the USPS state code and ##### a valid five-digit city code. For more information on the state, city, and county codes, see the "Domain_Values.xlsx" spreadsheet</td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D16</td>
            <td class="break-word">This field must be blank when PrimaryPlaceOfPerformanceCountryCode is not USA. When PrimaryPlaceOfPerformanceCountryCode is USA: 1) This field must be blank in the case of county-wide, multi-state, or statewide awards (as indicated by the PrimaryPlaceOfPerformanceCode); 2) Outside of the cases just mentioned, this field is required, and must either take the value "city-wide" (city-wide awards only) or a valid USPS ZIP+4 code (all other awards). </td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D17</td>
            <td class="break-word">Required if PrimaryPlaceOfPerformanceCountryCode is NOT USA. Must be blank if PrimaryPlaceOfPerformanceCountryCode is USA.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D20</td>
            <td class="break-word">If AssistanceType is 07 or 08, this field must be blank. For all other AssistanceType, field must be filled in.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D21</td>
            <td class="break-word">If AssistanceType is 07 or 08, this field is required. For any other AssistanceType, it must be blank.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D22</td>
            <td class="break-word">The data element must contain "MULTIPLE RECIPIENTS" for aggregate records.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D23</td>
            <td class="break-word">Must be blank when PrimaryPlaceOfPerformanceCountryCode is not USA. When PrimaryPlaceOfPerformanceCountry Code is USA: 1) When PrimaryPlaceOfPerformanceZIP+4 is provided to 9 digits, PrimaryPlaceOfPerformanceCongressionalDistrict will be derived and must be left blank; 2) If PrimaryPlaceOfPerformanceZIP+4 is not fully provided, this field is required. In this case, enter a two-digit congressional district that contains the primary place of performance. This congressional district must exist in the state indicated in the PrimaryPlaceOfPerformanceCode. If the primary place of performance includes more than one congressional district, enter "90." For U.S. territories and the District of Columbia, enter "00" for at-large districts, "98" for jurisdictions with a nonvoting delegate, and "99" for jurisdictions with no representative. </td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D24</td>
            <td class="break-word">Must be blank if LegalEntityCountryCode is USA.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D25</td>
            <td class="break-word">Must be blank for aggregate records</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D26</td>
            <td class="break-word">Must be provided in all submissions.</td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D27</td>
            <td class="break-word">Provided code must be one to three letters in length. Each letter must be a valid enumeration from A to X (as described in the "Domain_Values.xlsx" spreadsheet).</td>
            <td>Implemented in ASP</td>
            <td>Requirement</td>
        </tr>
        <tr>
            <td>D2</td>
            <td>D28</td>
            <td class="break-word">If AssistanceType is 07 or 08 this field must be blank. </td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
        </tr>
         <tr>
            <td>D2</td>
            <td>D29</td>
            <td class="break-word">If ActionType = A and ActionDate > 20170531 (i.e., this applies to new awards issued after May 31, 2017), AwardingAgencyCode is required.</td>
            <td>Implemented in ASP</td>
            <td>Element Conditionally Required</td>
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

*  Windows Operating System .TXT files can be viewed on any Windows-based document reader.
* [Adobe Reader](https://get.adobe.com/reader/) (.pdf) For viewing and printing PDF documents.
* [Microsoft Word Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=4) (.doc, .docx) For viewing, printing, and copying Word documents without having Microsoft Word installed. It replaces Word Viewer 2003 and previous versions.
* [Microsoft Excel Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=10) (.xls, .xlsx) For viewing and printing Excel workbooks without having Microsoft Excel installed. It replaces Excel Viewer 97 and previous versions.
* [Microsoft PowerPoint Viewer](http://www.microsoft.com/en-us/download/details.aspx?id=6) (.ppt, .pptx) For viewing full-featured presentations created in PowerPoint 97 and later versions.