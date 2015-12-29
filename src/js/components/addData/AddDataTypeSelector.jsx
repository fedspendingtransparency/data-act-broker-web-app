/**
* AddDataTypeSelector.jsx
* Created by Kyle Fox 12/29/15
**/

import React from 'react';

export default class TypeSelector extends React.Component {
 	  render() {
 		    return (
            <div className="usa-da-color-gray-light-half-tone usa-da-login-container usa-grid">
                <div className="usa-width-one-whole">
                    <p>
                        Three ways to submit your data...
                        <button className="usa-button-big" type="submit" value="Upload CSV Files">Upload CSV Files</button>
                        <button className="usa-button-big" type="submit" value="Upload XBRL File" disabled={true}>Upload XBRL File</button>
                        <button className="usa-button-big" type="submit" value="Setup a Data Feed" disabled={true}>Setup a Data Feed</button>
                    </p>
                </div>
            </div>
 		    );
 	  }
}
