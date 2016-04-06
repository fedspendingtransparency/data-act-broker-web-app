/**
 * HelpPage.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import HelpSidebar from './helpSidebar.jsx';
import HelpContent from './helpContent.jsx';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="site_wrap">
                <Navbar activeTab="help"/>
                <div className="usa-da-content-dark mb-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mt-50 mb-30">
                                <div className="display-2">Help | DATA Act Broker - Alpha Release</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row usa-da-help-page">
                        <div className="col-md-4">
                            <HelpSidebar />
                        </div>
                        <div className="col-md-8">
                            <HelpContent/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
