/**
  * TestEnvironmentBanner.jsx
  * Created by Alisa Burdeyny 7/5/17
  */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class TestEnvironmentBanner extends React.Component {
    render() {
        return (
            <div className="usa-da-header-warning-banner">
                <div className="usa-da-icon error-icon">
                    <FontAwesomeIcon icon="triangle-exclamation" className="exclamation-triangle-icon" />
                </div>
                <div>
                    <p>This is a test environment.</p>
                </div>
            </div>
        );
    }
}
