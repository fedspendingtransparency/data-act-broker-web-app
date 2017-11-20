/**
 * daimsMessage.jsx
 * Created by Minahm Kim 6/30/2017
 **/

import React, { PropTypes } from 'react';

const propTypes = {
    type: PropTypes.string
};

export default class DaimsMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let type = <span>.</span>;
        let version = 'v2.0';
        if (this.props.type === 'practices') {
            type = (<span> and its
                <a href={"https://community.max.gov/download/attachments/1286474850/DAIMS_Practices_Procedures_" +
                    "v1.1.pdf?version=1&modificationDate=1498857477698&api=v2"} className="daims-link">
                    Practices &amp; Procedures {version}.
                </a>
            </span>);
        }

        return (
            <div className="daims">
                <span className="daims-header">September 27, 2017: </span>
                <span className="daims-message">
                    Treasury released the DATA Act Information Model Schema (DAIMS) {version}. DAIMS {version} is a
                    major update of the schema and will be finalized in December 2017 for implementation in Q3 FY 2018.
                    Find out more information about <a className="daims-link" href="https://community.max.gov/x/Nwn4Tg">
                    DAIMS {version}</a>{type}
                </span>
            </div>
        );
    }
}

DaimsMessage.propTypes = propTypes;
