/**
  * CertifyDisclaimer.jsx
  * Created by Kevin Li 9/6/16
  */

import React from 'react';

export default class CertifyDisclaimer extends React.Component {
    render() {
        return (
            // eslint-disable-next-line
            <div className="disclaimer-text" tabIndex={0}>
                <p>
                    MPM 2016-03 requires the DATA Act SAO to provide, on a quarterly basis,
                    reasonable assurance that their agency&apos;s internal controls support the
                    reliability and validity of the agency account-level and award-level data
                    reported to USAspending.gov. MPM 2016-03 specifies that this assurance should
                    leverage data quality and management controls established in statute, regulation,
                    and Federal-widepolicy and be aligned with the internal control and
                    risk management strategies in Circular A-123.
                </p>
                <p>Agency&apos;s quarterly SAO assurance includes three certification levels:</p>
                <ul>
                    <li>
                        The complete DATA Act quarterly submission to USAspending.gov is valid and reliable. Since a
                        DATA Act submission contains a combination of many data sets, the SAO will be required to
                        attest to the validity and reliability of the complete DATA Act submission and the
                        interconnectivity/linkages across all the data in files A, B, C, D, E and F. To provide this
                        assurance, agencies should have internal controls in place over all of the data reported to
                        USAspending.gov per A-123.
                    </li>
                    <li>
                        The data in each DATA Act file reported in the quarterly submission to USAspending.gov is valid
                        and reliable. To provide this level of certification, the SAO will confirm that internal
                        controls over data quality mechanisms are in place for the  data submitted  in the files
                        contained in the quarterly submission.  Existing data quality measures required by regulation
                        and/or OMB guidance will be sufficient for SAO reliance on individual data in files as outlined
                        in Appendix A. Consistent with MPM 2016-03, Appendix A summarizes existing validations and
                        assurances over the data and files reported to USAspending.gov and explains how the SAO
                        assurance should leverage the existing requirements. In addition, OMB is reviewing
                        opportunities to enhance assurances over specific DATA Act data and files and provide
                        additional guidance, as appropriate.
                    </li>
                    <li>
                        Data reported to USAspending.gov matches or is directly provided by authoritative sources
                        outlined in MPM 2016-03. To provide this assurance, agencies should have controls and processes
                        in place to achieve this matching.
                    </li>
                </ul>
            </div>
        );
    }
}
