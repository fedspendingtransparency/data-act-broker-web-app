/**
* LoginTopBar.jsx
* Created by Destin Frasier 4/15/16
**/

import React from 'react';

export default class LoginTopBanner extends React.Component {
    render() {
        return (
                <div className="usa-da-top-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-1">
                                <i className="usa-da-icon usa-da-icon-exclamation-triangle"></i>
                            </div>
                            <div className="col-xs-11">
                                <p>This site is not intended to be an official resource for federal spending data. To submit official federal spending data, please visit <a href="http://www.USAspending.gov" target="_blank">USAspending.gov</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
