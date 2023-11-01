/**
 * HelpPage.jsx
 * Created by Mike Bray 4/1/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from 'query-string';

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import Banner from 'components/SharedComponents/Banner';
import HelpSidebar from './helpSidebar';
import HelpContent from './helpContent';
import HelpNav from './helpNav';

const propTypes = {
    location: PropTypes.object,
    type: PropTypes.oneOf(['dabs', 'fabs']),
    helpOnly: PropTypes.bool,
    changelog: PropTypes.string,
    technical: PropTypes.string,
    clSections: PropTypes.array,
    tSections: PropTypes.array
};

const defaultProps = {
    location: null,
    type: '',
    helpOnly: false,
    changelog: '',
    technical: '',
    clSections: [],
    tSections: []
};

export default class HelpPage extends React.Component {
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        const help = this.props.type === 'fabs' ? 'FABShelp' : 'help';
        const color = this.props.type === 'fabs' ? 'teal' : 'dark';
        const queryParams = queryString.parse(this.props.location.search);
        const { section } = queryParams;
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab={help} type={this.props.type} logoOnly={this.props.helpOnly} />
                    <div className={`usa-da-content-${color} mb-60`}>
                        <div className="container">
                            <div className="row usa-da-page-title">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                        {this.props.type.toUpperCase()} | Help
                                        <HelpNav selected="Help" type={this.props.type} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner type={this.props.type} />
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-4">
                                <HelpSidebar
                                    changeSections={this.props.clSections}
                                    technicalSections={this.props.tSections}
                                    helpOnly={this.props.helpOnly}
                                    type={this.props.type} />
                            </div>
                            <div className="col-md-8">
                                <HelpContent
                                    section={section}
                                    changelog={this.props.changelog}
                                    technical={this.props.technical} />
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
                            <FontAwesomeIcon icon="angle-up" size="lg" />
                        </div>
                        <span className="hidden-label">Back to top</span>
                    </button>
                </div>
            </div>
        );
    }
}

HelpPage.propTypes = propTypes;
HelpPage.defaultProps = defaultProps;
