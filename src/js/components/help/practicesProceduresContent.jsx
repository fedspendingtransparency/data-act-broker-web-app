/**
 * PracticeProceduresContent.jsx
 * Created by Emily Gullo 9/2/2016
 **/

import React from 'react';
import $ from 'jquery';


export default class PracticesProceduresContent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
      this.scrollToTop();
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollToTop();
    }

    scrollToTop() {
            $('html, body').animate({
                scrollTop: 0
            }, 500);

    }

    render() {
        return (
            <div className="usa-da-help-content">

                <h2>Practices &amp; Procedures</h2>
                <p>Use this document for additional overall instructions for creating and understanding DATA Act reporting and validation rules.</p>

                <h6>1. Daily award submission - Procurements</h6>
                <p>1.1 Agencies will continue to submit procurement award data to the Federal Procurement Data System (FPDS) on a daily basis.</p>

                <h6>2. Twice monthly award submission - Financial Assistance (Grants, Loans, and Insurance)</h6>
                <p>2.1 Agencies will submit to an updated Award Submission Portal (ASP) at least twice monthly, using a new DATA Act submission format specified by the D2-Award (Financial Assistance) tab of the Interface Definition Document (IDD). The updated ASP will have very similar validations (captured in the Rules (IDD) tab of this document) to the old, with a few enhancements that address agency's concerns. </p>
                <p>2.2 Agencies will ensure there is a quarter end incremental submission through ASP before the quarterly DATA Act submission.</p>
                <p>2.3 Per FFATA requirement, all FA awards must be submitted within 30 days of the award date.</p>

                <h6>3. Quarterly submission</h6>
                  <p>3.1 Files A, B, and C correlate with OMB Circular A-11's Exhibit 82E Schedule X and the USSGL crosswalk for the SF-133. To facilitate reporting and reconciliation, we have added USSGL crosswalk SF-133 lines for total/subtotal lines which are common between the files. The layout for File B is columnar versus OMB Circular A-11 Schedule X's row-based layout; the columnar format provides greater clarity for non-accounting stakeholders because element names are spelled out. The format still allows for updates per USSGL crosswalk or other schema changes in the future. Note that the Reimbursable Flag Indicator (ByDirectReimbursableFundingSource) data element is applicable to the obligation and outlay SGL amounts on the same CSV submission row.</p>
                  <p>3.2 Agencies will submit Files A, B, and C quarterly. To complement A, B, and C, the broker will generate Files D1, D2, E, and F for a specified date range at the agency's request. Agencies will inspect the complete submission file set, verify the data submitted in Files A - C is correct at the field level, and submit it. The broker will validate A, B, and C at the field level, and cross validate all files (A to F). It will generate an error report as appropriate; agencies should note any warnings and address broker generated validation errors. After addressing these errors, agencies will certify and resubmit the updated submission file set. This will continue until the submitted files satisfy the broker validations. At this point the submission will be accepted and the process completed for the quarter.</p>
                  <p>RSS items are submitted and validated quarterly; IDD D2-Award (Financial Assistance) items are validated twice monthly (upon submission to the ASP). IDD D1-Award (Procurement) items are validated daily (upon submission to FPDS-NG). Cross validations between  IDD and RSS items occur quarterly once all files are submitted. </p>
                  <p>3.3 Agencies are encouraged to generate data extracts throughout the quarter to perform validation, improve data quality, and to reduce the number of potential validation errors at the end of the quarter.</p>
                  <p>3.4 File C should include all award IDs with each TransactionObligatedAmount which occurred during the quarter. Please note that Award Modification numbers are not accepted, but agencies may include their own unique identifiers to differentiate financial transactions. However, these items will be ignored and not stored.</p>
                      <ul><li><strong>Example 1:</strong> Award A gets $10K additional funding in the quarter and award B had no funding change in the quarter, then File C should only include award A.</li>
                      <li><strong>Example 2:</strong> Award A had a funding increase of $10K then a funding decrease of $10K in the same quarter, then File C should include award A.</li>
                      <li><strong>Example 3:</strong> Award C had a no cost extension to the period of performance. This would not be included in File C.</li></ul>
                  <p>3.5 File B requires fiscal year beginning balances for obligations and outlays at the program activity and object class level.  This is required by the DATA Act and is consistent with the OMB A-11 requirements.  We understand that some agencies have difficulty in providing the fiscal year beginning balances at the program activity and object class level, due to how the beginning balances were rolled over at the close of the fiscal year. We will continue to work with the agencies and OMB to find a resolution of this issue.</p>
                  <p>3.6 The reporting of Interagency Agreements (IAA), Allocation Transfers, and Intragovernmental (IGT) buy/sell transactions needs policy decisions that require further discussion. We welcome agency input and feedback on any proposed policy recommendations and approaches.</p>
                  <p>3.7 OMB policy regarding File C reporting of historic awards made before the first reporting period is pending. The linkage rules between File C and D1/D2 will be affected by the policy decisions. </p>
                  <p>3.8 The current validation rules for aggregate records utilize the URI and are subject to change once Treasury, OMB, and the Financial Assistance community establish final linkage validation rules for aggregate records.</p>

                <h6>4. Treasury Accounting Symbol (TAS) for Files</h6>
                <p>4.1 All TAS (both unexpired and expired) reported in SF 133, need to be included in Files A and B.</p>

                <h6>5. Format for amounts</h6>
                <p>5.1 Dollar amounts should be to the penny indicated in the standard way by a decimal point followed by two digits. Dollar signs and commas are not allowed. For Required fields, enter "0" (zero) if the value does not exist. Blanks are not allowed for Required elements.</p>
                <p>5.2 For individual USSGL items: Positive amounts should be reported to indicate debit balances, net increase to normal debit accounts, or decreases to normal credit accounts.</p>
                <p>5.3 For individual USSGL items: Negative amounts should be reported to indicate credit balances, net increases to normal credit accounts, or decreases to normal debit accounts.</p>
                <p>5.4 For File A, report the amounts with the same sign as they appear in the SF 133 report outputs (e.g., if line 3020 shows negative, use the negative sign to report Gross Outlays; if 1750 + 1850 results in a positive "balance", report the positive to report Spending Authority.</p>
                <p>5.5 For Files B and C, calculated subtotals should follow the SF 133 crosswalk as reference. Since SF 133 is not reported at either the program activity/object class or award level, report the signage as the net of the underlying USSGLs. For example, Obligations Incurred maps to SF 133 line 2190. The agency has credit balances of 100 each in 480100 and 490100, and balances of zero in the remaining USSGL that map to line 2190. The agency should report -200 for Obligations Incurred.</p>

                <h6>6. Submission Metadata</h6>
                <p>6.1 Reporting period and reporting agency data will be collected in the broker web interface, and not in the individual files, as it applies to Files A, B, and C.</p>
                <p>6.2 The broker web interface will allow agencies to specify the Fiscal reporting period and Fiscal Year. Example: The fiscal reporting period of "03" and fiscal year of "2017" would be for a December 2016 submission of FY 2017, Quarter 1 data.</p>
                <p>6.3 The Reporting Period and Fiscal Year will be available in the API for download for validation or correction of the file. Additionally, agencies may include the Reporting Period and Fiscal Year in the data.</p>

                <h6>7. Certification</h6>
                <p>7.1 OMB policy regarding certification is pending.</p>
                <p>7.2 Quarterly reporting shall be certified by the Agency Senior Accountable Official (SAO) after GTAS certification and within 7 to 60 days after quarter end. This allows agencies to complete their financial assistance reporting, which can be delayed up to 30 days. As agencies gain proficiency, this reporting window may be shortened.</p>

           </div>
        );
    }
}
