/**
* LandingPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import LandingContent from './LandingContent.jsx';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="site_wrap">
                <Navbar activeTab="landing"/>
                <LandingContent/>
            </div>
        );
    }
}
