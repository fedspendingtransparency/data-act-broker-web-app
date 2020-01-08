/**
 * SubmissionGuidePage.jsx
 * Created by Mike Bray 5/19/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import SubmissionGuideContent from './SubmissionGuideContent';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs'])
};

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-submission-guide-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide" type={this.props.type} />
                        <SubmissionGuideContent {...this.props} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

LandingPage.propTypes = propTypes;
