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
        let version = 'v1.1'
        if(this.props.type == 'validations') {
            type = <span> and its <a href='https://community.max.gov/download/attachments/1286474850/DAIMS_Validation_Rules_v1.1.xlsx?version=1&modificationDate=1498857363500&api=v2' className='daims-link'>Validations {version}.</a></span>
        } else if(this.props.type == 'practices') {
            type = <span> and its <a href='https://community.max.gov/download/attachments/1286474850/DAIMS_Practices_Procedures_v1.1.pdf?version=1&modificationDate=1498857477698&api=v2' className='daims-link'>Practices &amp; Procedures {version}.</a></span>
        }

        return (
            <div className='daims'>
                <span className='daims-header'>June 30, 2017: </span>
                <span className='daims-message'>
                    Treasury released the DATA Act Information Model Schema (DAIMS) {version}.
                    Daims {version} is a minor update of the schema and will be implemented in production in the fall of 2017.
                    Find out more information about <a className='daims-link' href='https://community.max.gov/x/YgyuT'>DAIMS {version}</a>{type}
                </span>
            </div>
        );
    }
}
