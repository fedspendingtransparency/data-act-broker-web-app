/**
* AddDataTypeSelector.jsx
* Created by Kyle Fox 12/29/15
*/

import React from 'react';

export default class TypeSelector extends React.Component {
    render() {
        return (
            <div className="usa-da-color-gray-light-half-tone usa-da-login-container usa-grid container">
                <div className="row usa-da-submit-row">
                    <h2>Two ways to submit your data...</h2>
                    <div className="row text-center">
                        <div className="col-md-6">
                            <a className="usa-da-button-big usa-da-button-biggest submit" value="Upload Files">
                                Upload Files
                            </a>
                        </div>
                        <div className="col-md-6">
                            <a
                                className="usa-da-button-big usa-da-button-biggest submit disabled"
                                value="Setup a Data Feed"
                                disabled>Setup a Data Feed
                                <div><em>Coming Soon</em></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
