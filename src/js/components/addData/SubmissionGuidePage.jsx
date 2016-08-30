/**
 * SubmissionGuidePage.jsx
 * Created by Mike Bray 5/19/16
 **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import SubmissionGuideContent from './SubmissionGuideContent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-submission-guide-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide"/>
                        <SubmissionGuideContent {...this.props} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
