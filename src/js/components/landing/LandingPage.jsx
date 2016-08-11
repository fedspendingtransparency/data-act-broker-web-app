/**
* LandingPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import LandingContentContainer from '../../containers/landing/LandingContentContainer.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <div className="usa-da-site_wrap">
                    <div className="usa-da-landing-page">
        	            <div className="usa-da-page-content">
        	                <Navbar activeTab="landing"/>
        	                <LandingContentContainer />
        	            </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
