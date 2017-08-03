/**
* LandingPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import LandingContentContainer from '../../containers/landing/LandingContentContainer.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let activeTab = this.props.route.type === 'fabs' ? 'detachedLanding' : 'landing';

        return (
            <div>
                <div className="usa-da-site_wrap">
                    <div className="usa-da-landing-page">
        	            <div className="usa-da-page-content">
        	                <Navbar activeTab={activeTab} type={this.props.route.type} />
        	                <LandingContentContainer type={this.props.route.type}/>
        	            </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
