/**
 * PracticeProceduresContent.jsx
 * Created by Emily Gullo 9/2/2016
 **/

import React from 'react';
import $ from 'jquery';
import { generateProtectedUrls } from '../../helpers/util.js';
import DaimsMessage from './DaimsMessage.jsx';

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
				  practicesProceduresUrl: urls['DAIMS_Practices_Procedures_v1.02_20161221.xlsx']
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
				<DaimsMessage type='practices' />
				<p><em>Last updated: December 21, 2016</em></p>

				<p>The following are additional overall instructions for creating and understanding DATA Act reporting and validation rules.  The Practices and Procedures spreadsheet, with change log, is available for download.  <a href={this.state.practicesProceduresUrl} target="_blank" rel="noopener noreferrer">Download file</a></p>

				<h5>1. Daily award submission - Procurements</h5>
				<ul>
				<li>1.1 Agencies will continue to submit procurement award data to the Federal Procurement Data System (FPDS-NG) on a daily basis.</li>
				</ul>
				<h5>2. Twice monthly award submission - Financial Assistance (Grants, Loans, Insurance, and Other Financial Assistance)</h5>
				<ul>
				<li>2.1 Agencies will submit to the updated Award Submission Portal (ASP) at least twice monthly, using a new DATA Act submission format (CSV) specified by the D2-Award (Financial Assistance) tab of the Interface Definition Document (IDD).</li>
				<li>2.2 Agencies will ensure that all of their ASP data for a given quarter has been submitted and accepted prior to making that quarter's DATA Act Broker submission.</li>
				<li>2.3 Per FFATA requirement, all Financial Assistance awards must be submitted within 30 days of the award date.</li>
				</ul>
				<h5>3. Quarterly submission</h5>
				<ul>
				<li>3.1 Files A, B, and C correlate with OMB Circular A-11 and the USSGL crosswalk for the SF-133. To facilitate reporting and reconciliation, we have added USSGL crosswalk SF-133 lines for total/subtotal lines which are common between the files. The format allows for updates per USSGL crosswalk or other schema changes in the future. Note that the Reimbursable Flag Indicator (ByDirectReimbursableFundingSource) data element is applicable to the obligation and outlay SGL amounts on the same CSV submission row.</li>
				<li>3.2 Agencies will submit Files A, B, and C quarterly. To complement A, B, and C, the DATA Act Broker (Broker) will generate Files D1, D2, E, and F for a specified date range at the agency's request. Agencies will inspect the complete submission file set, verify that the data submitted in Files A - C is correct at the field level, and upload it. The Broker will validate A, B, and C at the field level, and cross validate all files (A to F). It will generate an error report as appropriate; agencies should note any warnings and address Broker generated validation errors. After addressing these errors, agencies will upload the updated submission file set. This error correction and re-upload process will continue until the files pass the Broker validations. At this point the files will be ready for certification.</li>
				<li>In keeping with existing practice, IDD D2-Award (Financial Assistance) items are validated upon submission to the ASP. IDD D1-Award (Procurement) items are validated upon submission to FPDS-NG.  RSS items are submitted to and validated quarterly by the DATA Act Broker. The agency, by way of the DATA Act Broker, will generate the D1 content that is originally sourced from FPDS-NG, the D2 content that is orginally sourced from ASP, the File E content that is originally sourced from SAM, and File F content that is originally sourced from FSRS.</li>
				<li>3.3 Agencies are encouraged to generate monthly data extracts throughout the quarter to perform validation, improve data quality, and to reduce the number of potential validation errors at the end of the quarter. Additionally, the DATA Act Broker has the ability to generate D1 and D2 Files without requiring an agency to submit Files A-C.</li>
				<li>3.4 <b>TransactionObligatedAmount:</b> File C should include all award IDs with each TransactionObligatedAmount which occurred during the quarter. Please note that Award Modification numbers are not accepted, but agencies may include their own unique identifiers (i.e. flex fields) to differentiate financial transactions. However, these items will be ignored and not stored.</li>
				<ul>
				<li><b>Example 1:</b> Award A gets $10K additional funding in the quarter and award B had no funding change in the quarter, then File C should only include the TransactionObligatedAmount of $10K for award A.</li>
				<li><b>Example 2:</b> Award A had a funding increase of $10K then a funding decrease of $10K in the same quarter, then File C should include award A with both TransactionObligatedAmounts reported individually.</li>
				<li><b>Example 3:</b> Award C had a no cost extension to the period of performance. There would not be a value included for TransactionObligatedAmount for the award in File C.</li>
				<li><b>Example 4:</b> Award A had a funding decrease (deobligation) of $5K, an invoice of $2K, and a payment of $1K, then File C Transaction Obligation Amount should only include the deobligation of $5K.</li>
				</ul>
				<li>3.5 File B requires fiscal year beginning balances for obligations and outlays at the program activity and object class level.  This is required by the DATA Act and is consistent with the OMB A-11 requirements.  We understand that some agencies have difficulty in providing the fiscal year beginning balances at the program activity and object class level, due to how the beginning balances were rolled over at the close of the fiscal year. We will continue to work with the agencies and OMB to find a resolution of this issue.</li>
				</ul>
				<h5>4. Treasury Accounting Symbol (TAS) for Files</h5>
				<ul>
				<li>4.1  All TAS (both unexpired and expired) reported in SF 133, need to be included in Files A and B, with the exception of Financing Accounts. Per OMB Memorandum M-17-04, further guidance regarding TAS reporting for Allocation Transfers and IGT Buy/Sell transactions are provided in the following sub-bullets.</li>
        <li>4.1.1 Financing Accounts are non-budgetary accounts which record the means of financing for Direct loan and loan guarantee obligations.  Financing accounts should not be reported in DATA Act Files A, B, and C.  For loans reporting, agencies should report financial information from the program account only.  Because Files A, B, and C have to do with budgetary transactions and will only reflect the positive subsidy costs of new credit assistance, Federal credit awards will have more detail in File D2 than in Files A-C. For more information, refer to OMB Loans FAQ paper, dated November 4, 2016. </li>
        <li>4.1.2 The reporting of Allocation Transfers will be submitted by the awarding agency for Files A, B, and C. Funding and awarding agencies should determine processes with each other to share necessary data for Files A-C for accurate and timely submissions. In the future, the funding agency will be able to determine whether the funding agency or awarding agency will submit.</li>
        <li>4.1.3 For Intragovernmental (IGT) buy/sell transactions, both the awarding and funding agency should submit Files A and B pertinent to their respective agencies, and the awarding agency should submit financial detail applicable to the specific award in its File C.</li>
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
				<li>6.2 The DATA Act Broker web interface will allow agencies to specify the Fiscal reporting period as either Month or Quarter, as well as the Fiscal Year.</li>
				<li>6.3 The reporting period and fiscal year will be available in the API for download for validation or correction of the file. Additionally, agencies may include the reporting period and fiscal year in their submitted data (i.e. flex fields), but this extra information will be ignored and not stored.</li>
        <li>6.4 Flex Fields are information agencies are permitted to upload within their submission files for their reference, in a non standard column.  This information will not be validated or stored within the broker.</li>
				</ul>
				<h5>7. Certification</h5>
				<ul>
				<li>7.1 OMB Memorandum M-17-04 requires the agency Senior Accountable Official (SAO) to assure the alignment among Files A-F is valid and reliable, for the interconnectivity/linkages (e.g., award ID linkage) for quarterly DATA Act submissions.  In addition, M-14-04 requires SAOs to assure the data submitted in Files A-C to be valid and reliable. To provide this assurance, the SAO will confirm that internal controls over data quality mechanisms are in place for the data submitted in DATA Act files. Where there are legitimate differences between files, the SAO may provide categorical explanations for misalignments. These explanations can be entered into a separate comment box available for each file they are certifying. Existing data quality measures required by regulation and/or OMB guidance will be sufficient for SAO reliance on individual data files.</li>
				<li>7.2 Quarterly reporting shall be certified by the agency SAO after GTAS certification and within 7 to 60 days after quarter end. This allows agencies to complete their financial assistance reporting, which can be delayed up to 30 days. As agencies gain proficiency, this reporting window may be shortened.  (Note:  Agencies are required to submit and certify their Q2 files to the broker by April 30, 2017.)</li>
				</ul>
			</div>
           </div>
        );
    }
}
