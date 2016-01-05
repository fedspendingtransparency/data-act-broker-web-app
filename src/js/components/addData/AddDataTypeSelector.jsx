/**
* AddDataTypeSelector.jsx
* Created by Kyle Fox 12/29/15
**/

import React from 'react';

export default class TypeSelector extends React.Component {
 	  render() {
 		    return (
            <div className="usa-da-color-gray-light-half-tone usa-da-login-container usa-grid container">
                <div className="usa-width-one-whole row center-block">
                    <h2>Three ways to submit your data...</h2>
                    <div className="row text-center">
                        <div className="col-md-4"><button className="usa-da-button-biggest" type="submit" value="Upload CSV Files">Upload CSV Files</button></div>
                        <div className="col-md-4"><button className="usa-da-button-biggest" type="submit" value="Upload XBRL File" disabled={true}>Upload XBRL File</button></div>
                        <div className="col-md-4"><button className="usa-da-button-biggest" type="submit" value="Setup a Data Feed" disabled={true}>Setup a Data Feed</button></div>
                    </div>
                </div>
            </div>
 		    );
 	  }
}
