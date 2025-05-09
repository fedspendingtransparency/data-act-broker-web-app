/**
 * PublishDisclaimer.jsx
 * Created by Alisa Burdeyny 6/23/2020
 */

import React from 'react';

export default class PublishDisclaimer extends React.Component {
    render() {
        return (
            <div className="disclaimer-text" tabIndex={0}>
                <p>
                    I attest that the monthly data being submitted to Treasury in Files A-C meets the reporting
                    requirements under the DATA Act and OMB M-20-21, and that the reported data was produced following
                    my agency’s normal practices and procedures, including the same systems and methods used to certify
                    the agency’s last quarterly submission.  I attest that I will continue to evaluate this data,
                    following data quality control processes, and will thereafter certify the data, including any
                    corrections, in the next quarterly certification statement, consistent with OMB A-123, Appendix A.
                </p>
            </div>
        );
    }
}
