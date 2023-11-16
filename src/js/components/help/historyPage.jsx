/**
 * HistoryPage.jsx
 * Created by Emily Gullo 9/27/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import HelpSidebar from './helpSidebar';
import HistoryContent from './historyContent';
import HelpNav from './helpNav';

const propTypes = {
    history: PropTypes.oneOf(['release', 'technical']),
    type: PropTypes.oneOf(['dabs', 'fabs']),
    helpOnly: PropTypes.bool,
    clSections: PropTypes.array,
    tSections: PropTypes.array,
    technicalHistory: PropTypes.string,
    releaseHistory: PropTypes.string
};

const defaultProps = {
    history: '',
    type: '',
    helpOnly: false,
    clSections: [],
    tSections: [],
    technicalHistory: '',
    releaseHistory: ''
};

export default class HistoryPage extends React.Component {
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        const activeTab = this.props.type === 'fabs' ? 'FABSHelp' : 'help';
        const color = this.props.type === 'fabs' ? 'teal' : 'dark';
        const title = this.props.history === 'technical' ? 'Technical Notes Archive' : 'Release Notes Archive';
        const history = this.props.history === 'technical' ? this.props.technicalHistory : this.props.releaseHistory;
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab={activeTab} type={this.props.type} logoOnly={this.props.helpOnly} />
                    <div className={`usa-da-content-${color} mb-60`}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                        Help | DATA Broker
                                        <HelpNav selected="Help" type={this.props.type} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-4">
                                <HelpSidebar
                                    changeSections={this.props.clSections}
                                    technicalSections={this.props.tSections}
                                    type={this.props.type} />
                            </div>
                            <div className="col-md-8">
                                <HistoryContent history={history} title={title} />
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

HistoryPage.propTypes = propTypes;
HistoryPage.defaultProps = defaultProps;
