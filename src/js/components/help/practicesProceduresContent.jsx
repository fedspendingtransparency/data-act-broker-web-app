/**
 * PracticeProceduresContent.jsx
 * Created by Emily Gullo 9/2/2016
 **/

import React from 'react';
import $ from 'jquery';
import { generateProtectedUrls } from '../../helpers/util.js';

export default class PracticesProceduresContent extends React.Component {

    constructor(props) {
        super(props);

        this.urlPromise = null;

        this.state = {
            practicesProceduresUrl: '#'
        };
    }

    componentDidMount() {
      this.scrollToTop();

	  // also load the remaining URLs
	  this.urlPromise = generateProtectedUrls();
	  this.urlPromise.promise
		  .then((urls) => {
			  this.setState({
				  practicesProceduresUrl: urls['DAIMS_Practices_Procedures.xlsx']
			  });

			  this.urlPromise = null;
		  });
    }

	componentWillUnmount() {
        // cancel in-flight S3 signing requests when the component unmounts
        if (this.urlPromise) {
            this.urlPromise.cancel();
        }
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

				<div className="practices-procedures">

				<h2>Practices &amp; Procedures</h2>
				<p><em>Last updated: September 30, 2016</em></p>

				<p>The following are additional overall instructions for creating and understanding DATA Act reporting and validation rules.  The Practices and Procedures spreadsheet, with change log, is available for download.  <a href={this.state.practicesProceduresUrl} target="_blank" rel="noopener noreferrer">Download file</a></p>

				<h5>1. Daily award submission - Procurements</h5>
				<ul>
				<li>1.1 Agencies will continue to submit procurement award data to the Federal Procurement Data System (FPDS-NG) on a daily basis.</li>
				</ul>
				<h5>2. Twice monthly award submission - Financial Assistance (Grants, Loans, and Insurance)</h5>
				<ul>
				<li>2.1 Agencies will submit to an updated Award Submission Portal (ASP) at least twice monthly, using a new DATA Act submission format specified by the D2-Award (Financial Assistance) tab of the Interface Definition Document (IDD).</li>
				<li>2.2 Agencies will ensure there is a quarter end incremental submission through ASP before the quarterly DATA Act submission.</li>
				<li>2.3 Per FFATA requirement, all FA awards must be submitted within 30 days of the award date.</li>
				</ul>
				<h5>3. Quarterly submission</h5>
				<ul>
				<li>3.1 Files A, B, and C correlate with OMB Circular A-11's Exhibit 82E Schedule X and the USSGL crosswalk for the SF-133. To facilitate reporting and reconciliation, we have added USSGL crosswalk SF-133 lines for total/subtotal lines which are common between the files. The layout for File B is columnar versus OMB Circular A-11 Schedule X's row-based layout; the columnar format provides greater clarity for non-accounting stakeholders because element names are spelled out. The format still allows for updates per USSGL crosswalk or other schema changes in the future. Note that the Reimbursable Flag Indicator (ByDirectReimbursableFundingSource) data element is applicable to the obligation and outlay SGL amounts on the same CSV submission row.</li>
				<li>3.2 Agencies will submit Files A, B, and C quarterly. To complement A, B, and C, the DATA Act Broker (Broker) will generate Files D1, D2, E, and F for a specified date range at the agency's request. Agencies will inspect the complete submission file set, verify the data submitted in Files A - C is correct at the field level, and submit it. The Broker will validate A, B, and C at the field level, and cross validate all files (A to F). It will generate an error report as appropriate; agencies should note any warnings and address Broker generated validation errors. After addressing these errors, agencies will certify and resubmit the updated submission file set. This will continue until the submitted files satisfy the Broker validations. At this point the submission will be accepted and the process completed for the quarter.</li>
				<li>In keeping with existing practice, IDD D2-Award (Financial Assistance) items are validated upon submission to the ASP. IDD D1-Award (Procurement) items are validated upon submission to FPDS-NG.  RSS items are submitted and validated quarterly to the DATA Act Broker; upon agency notification during submission, the IDD items are generated from the ASP and FPDS-NG for certain cross-file validations against RSS data quarterly, once all files are submitted.</li>
				<li>3.3 Agencies are encouraged to generate data extracts throughout the quarter to perform validation, improve data quality, and to reduce the number of potential validation errors at the end of the quarter.</li>
				<li>3.4 <b>TransactionObligatedAmount:</b> File C should include all award IDs with each TransactionObligatedAmount which occurred during the quarter. Please note that Award Modification numbers are not accepted, but agencies may include their own unique identifiers to differentiate financial transactions. However, these items will be ignored and not stored.</li>
				<ul>
				<li><b>Example 1:</b> Award A gets $10K additional funding in the quarter and award B had no funding change in the quarter, then File C should only include the TransactionObligatedAmount of $10K for award A.</li>
				<li><b>Example 2:</b> Award A had a funding increase of $10K then a funding decrease of $10K in the same quarter, then File C should include award A with both TransactionObligatedAmounts reported individually.</li>
				<li><b>Example 3:</b> Award C had a no cost extension to the period of performance. There would not be a value included for TransactionObligatedAmount for the award in File C.</li>
				<li><b>Example 4:</b> Award A had a funding decrease (deobligation) of $5K, an invoice of $2K, and a payment of $1K, then File C Transaction Obligation Amount should only include the deobligation of $5K.</li>
				</ul>
				<li>3.5 File B requires fiscal year beginning balances for obligations and outlays at the program activity and object class level.  This is required by the DATA Act and is consistent with the OMB A-11 requirements.  We understand that some agencies have difficulty in providing the fiscal year beginning balances at the program activity and object class level, due to how the beginning balances were rolled over at the close of the fiscal year. We will continue to work with the agencies and OMB to find a resolution of this issue.</li>
				<li>3.6 The reporting of Interagency Agreements (IAA), Allocation Transfers, and Intragovernmental (IGT) buy/sell transactions needs policy decisions that require further discussion. We welcome agency input and feedback on any proposed policy recommendations and approaches.</li>
				<li>3.7 (Deleted in v1.01)</li>
				<li>3.8 The current validation rules for aggregate records utilize the URI and are subject to change once Treasury, OMB, and the Financial Assistance community establish final linkage validation rules for aggregate records.</li>
				</ul>
				<h5>4. Treasury Accounting Symbol (TAS) for Files</h5>
				<ul>
				<li>4.1 All TAS (both unexpired and expired) reported in SF 133, need to be included in Files A and B.</li>
				</ul>
				<h5>5. Format for amounts</h5>
				<ul>
				<li>5.1 Dollar amounts should be to the penny indicated in the standard way by a decimal point followed by two digits. Dollar signs and commas are not allowed. For Required fields, enter "0" (zero) if the value does not exist. Blanks are not allowed for Required elements.</li>
				<li>5.2 For individual USSGL items: Positive amounts should be reported to indicate debit balances, net increase to normal debit accounts, or decreases to normal credit accounts.</li>
				<li>5.3 For individual USSGL items: Negative amounts should be reported to indicate credit balances, net increases to normal credit accounts, or decreases to normal debit accounts.</li>
				<li>5.4 For File A, report the amounts with the same sign as they appear in the SF 133 report outputs (e.g., if line 3020 shows negative, use the negative sign to report Gross Outlays; if 1750 + 1850 results in a positive "balance", report the positive to report Spending Authority).</li>
				<li>5.5 For Files B and C, calculated subtotals should follow the SF 133 crosswalk as reference. Since SF 133 is not reported at either the program activity/object class or award level, report the signage as the net of the underlying USSGLs. For example, Obligations Incurred maps to SF 133 line 2190. The agency has credit balances of 100 each in 480100 and 490100, and balances of zero in the remaining USSGL that map to line 2190. The agency should report -200 for Obligations Incurred.</li>
				</ul>
				<h5>6. Submission Metadata</h5>
				<ul>
				<li>6.1 Reporting period and reporting agency data will be collected in the DATA Act Broker web interface, and not in the individual files, as it applies to Files A, B, and C.</li>
				<li>6.2 The DATA Act Broker web interface will allow agencies to specify the Fiscal reporting period and Fiscal Year. Example: The fiscal reporting period of "03" and fiscal year of "2017" would be for a December 2016 submission of "Quarter&nbsp;1&nbsp;-&nbsp;2017" data.</li>
				<li>6.3 The Reporting Period and Fiscal Year will be available in the API for download for validation or correction of the file. Additionally, agencies may include the Reporting Period and Fiscal Year in their submitted data, but this extra information will be ignored and not stored in the data store.</li>
				</ul>
				<h5>7. Certification</h5>
				<ul>
				<li>7.1 OMB policy regarding certification is pending.</li>
				<li>7.2 Quarterly reporting shall be certified by the Agency Senior Accountable Official (SAO) after GTAS certification and within 7 to 60 days after quarter end. This allows agencies to complete their financial assistance reporting, which can be delayed up to 30 days. As agencies gain proficiency, this reporting window may be shortened.</li>
				</ul>
			</div>
           </div>
        );
    }
}
