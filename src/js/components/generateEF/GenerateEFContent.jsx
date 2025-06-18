/**
  * GenerateEFContent.jsx
  * Created by Kevin Li 8/24/16
  */

import React from 'react';

import GenerateEFOverlay from './GenerateEFOverlay';
import GenerateEFItem from './generateItem/GenerateEFItem';

export default class GenerateEFContent extends React.Component {
    render() {
        return (
            <div>
                <div className="container center-block with-overlay">
                    <div className="row usa-da-submission-instructions">
                        <div className="col-md-12">
                            <p>
                                Please wait while your File E: Executive Compensation Data and F: Sub-award Data files
                                are generated. These files do not undergo any additional validations.
                            </p>
                        </div>
                    </div>


                    <GenerateEFItem
                        {...this.props}
                        type="E"
                        title="Executive Compensation Data"
                        description={"Executive Compensation data is generated from the System for Award Management" +
                            " and includes data for the receiving entities of the awards in File D."} />
                    <GenerateEFItem
                        {...this.props}
                        type="F"
                        title="Sub-Award Data"
                        description={"Sub-award data is generated from SAM and includes the subawards for the prime" +
                            "awards in File D."} />
                </div>
                <GenerateEFOverlay {...this.props} />
            </div>
        );
    }
}
