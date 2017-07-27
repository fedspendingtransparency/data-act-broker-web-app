/**
* GTASWarningBanner.jsx
* Created by Minahm Kim 07/07/17
**/

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

const defaultProps = {
    type: 'all'
}

export default class Banner extends React.Component {
    constructor(props) {
        super(props)

        console.log('banner')

        this.state = {
            type: this.props.type,
            window: []
        }
    }

    componentDidMount(){
        this.isWindow();
    }

    componentWillReceiveProps(nextProps) {
        let type = null;
        if(this.state.type !== nextProps.type){
            type = nextProps.type;
        }
        if(type && type != this.state.type) {
            this.setState({
                'type': type
            })
            this.isWindow()
        }
    }

    isWindow() {
        ReviewHelper.isWindow()
            .then((res) => {
                let windows = []
                console.log(res.data, this.state)
                for(let i = 0; i < res.data.length; i++) {
                    if(res.data[i].type.toLowerCase() == this.state.type.toLowerCase() || res.data[i].type.toLowerCase() == 'all') {
                        windows.push(res.data[i]);
                    }
                }
                if(windows.length != 0) {
                    this.setState({window: windows})
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getRows(){
        let msg = [];
        for(let i = 0; i < this.state.window.length; i++) {
            msg.push(
                <div key={'banner'+i} className="published-submission-warning-banner">
                    <div className='container'>
                        <div className='row'>
                            <div className="col-xs-1">
                                <i className="usa-da-icon"><Icons.ExclamationTriangle /> </i>
                            </div>
                            <div className="col-xs-11">
                                <p>{this.state.window[i].message}</p>
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

Banner.defaultProps = defaultProps
