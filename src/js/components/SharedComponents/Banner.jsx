/**
* GTASWarningBanner.jsx
* Created by Minahm Kim 07/07/17
**/

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class Banner extends React.Component {
    constructor(props) {
        super(props)
    }

    getRows(){
        let msg = [];
        for(let i = 0; i < this.props.data.length; i++) {
            msg.push(
                <div key={'banner'+i} className="published-submission-warning-banner">
                    <div className='container'>
                        <div className='row'>
                            <div className="col-xs-1">
                                <i className="usa-da-icon"><Icons.ExclamationTriangle /> </i>
                            </div>
                            <div className="col-xs-11">
                                <p>{this.props.data[i].message}</p>
                            </div>
                        </div>
                    </div>
                </div>
                )
        }
        return msg;
    }

    render() {
        // let date = this.parseDate(this.props.data.end_date)
        let message = this.getRows();
        return (
                <div>
                    {message}
                </div>
            );
        }
    }
