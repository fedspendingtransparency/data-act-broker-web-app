/**
 * ResourcesPage.jsx
 * Created by Emily Gullo 9/27/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import HelpNav from './helpNav';
import ResourcesContent from './resourcesContent';
import Banner from '../SharedComponents/Banner';
import Footer from '../SharedComponents/FooterComponent';

import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs']),
    helpOnly: PropTypes.bool
};

const defaultProps = {
    type: '',
    helpOnly: false
};

export default class ResourcesPage extends React.Component {
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        const activeTab = this.props.type === 'fabs' ? 'FABSHelp' : 'help';
        const color = this.state.type === 'fabs' ? 'teal' : 'dark';
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab={activeTab} type={this.props.type} logoOnly={this.props.helpOnly} />
                    <div className={`usa-da-content-${color} mb-60`}>
                        <div className="container">
                            <div className="row usa-da-page-title">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                        {this.props.type.toUpperCase()} | Resources
                                        <HelpNav selected="Resources" type={this.props.type} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner />
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-12">
                                <ResourcesContent type={this.state.type} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <div className="usa-da-help-top-button">
                    <button
                        onClick={this.scrollToTop}
                        aria-label="Back to top">
                        <div className="usa-da-icon">
                            <Icons.AngleUp alt="Arrow pointing up" />
                        </div>
                        <span className="hidden-label">Back to top</span>
                    </button>
                </div>
            </div>
        );
    }
}

ResourcesPage.propTypes = propTypes;
ResourcesPage.defaultProps = defaultProps;
