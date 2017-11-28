/**
  * TestEnvironmentBanner.jsx
  * Created by Alisa Burdeyny 7/5/17
  */

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';


export default class TestEnvironmentBanner extends React.Component {
    render() {
        return (
            <div className="usa-da-header-warning-banner">
                <span className="usa-da-icon error-icon"><Icons.ExclamationTriangle /></span>
                <p>This is a test environment.</p>
            </div>
        );
    }
}
