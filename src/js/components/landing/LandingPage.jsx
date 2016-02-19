/**
* LandingPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/NavigationComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import LandingContent from './LandingContent.jsx';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar activeTab="landing"/>
                <LandingContent/>
                <Footer/>
            </div>
        );
    }
}
