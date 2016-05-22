/**
  * AdminPageMessage.jsx
  **/

import React from 'react';

const defaultProps = {
	data: {
		hidden: true,
		user: "",
		action: ""
	}
}

export default class AdminPageMessage extends React.Component {
	
    render(){
        var classNames = require('classnames');
        let classes = classNames({
            'hidden': this.props.data.hidden === true,
            'usa-alert usa-alert-success': this.props.data.hidden === false && this.props.data.action == 'approved',
            'usa-alert usa-alert-error': this.props.data.hidden === false && this.props.data.action == 'denied'
        });

        return (
            <div className={classes}>
                <div className="usa-alert-body">
                    <h3 className="usa-alert-heading">Success</h3>
                    <p className="usa-alert-text">{this.props.data.user}'s DATA Act Broker account has been {this.props.data.action}.</p>
                </div>
            </div>
        );
    }
}

AdminPageMessage.defaultProps = defaultProps;