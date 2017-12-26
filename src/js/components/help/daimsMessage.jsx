/**
 * daimsMessage.jsx
 * Created by Minahm Kim 6/30/2017
 **/

import React from 'react';

export default class DaimsMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let type = <span>.</span>;
        let version = 'v1.2';
        if(this.props.type == 'practices') {
            type = <span> and its <a href='https://community.max.gov/download/attachments/1286474850/DAIMS_Practices_Procedures_v1.1.pdf?version=1&modificationDate=1498857477698&api=v2' className='daims-link'>Practices &amp; Procedures {version}.</a></span>
        }

        return (
            <div className='daims'>
                <span className='daims-header'>December 22, 2017: </span>
                <span className='daims-message'>
                    Treasury released the DATA Act Information Model Schema (DAIMS) {version}. DAIMS {version} is a minor update of the schema and will be implemented for the submission of Q3 FY 2018 data. Find out more information about the final <a className='daims-link' href='https://community.max.gov/x/Dwn4Tg'>DAIMS {version}</a>{type}
                </span>
            </div>
        );
    }
}
