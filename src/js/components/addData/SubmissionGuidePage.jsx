/**
 * SubmissionGuidePage.jsx
 * Created by Mike Bray 5/19/16
 */

import React from 'react'; 
import PropTypes from 'prop-types';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import SubmissionGuideContent from './SubmissionGuideContent';
import Footer from '../SharedComponents/FooterComponent';

const propTypes = {
    route: PropTypes.object
};

const defaultProps = {
    route: null
};

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-submission-guide-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide" type={this.props.route.type} />
                        <SubmissionGuideContent {...this.props} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

LandingPage.propTypes = propTypes;
LandingPage.defaultProps = defaultProps;
