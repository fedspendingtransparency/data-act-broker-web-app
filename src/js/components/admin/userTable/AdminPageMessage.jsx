/**
  * AdminPageMessage.jsx
  **/

import React from 'react';

const defaultProps = {
	data: {
		user: "",
		action: "",
        type: "success"
	}
}

export default class AdminPageMessage extends React.Component {
	
    render(){
        var classNames = require('classnames');
        let classes = classNames({
            'usa-alert usa-alert-success': this.props.data.type == 'success',
            'usa-alert usa-alert-error': this.props.data.type == 'failed',
        });

        let title = 'Success';
        if (this.props.data.type == 'failed') {
            title = 'Error';
        }

        return (
            <div className="usa-da-admin-message-wrap row">
                <div className="col-md-12 usa-da-admin-message">
                    <div className={classes}>
                        <div className="usa-alert-body">
                            <h3 className="usa-alert-heading">{title}</h3>
                            <p className="usa-alert-text">{this.props.data.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AdminPageMessage.defaultProps = defaultProps;