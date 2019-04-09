/**
 * HistoryPage.jsx
 * Created by Emily Gullo 9/27/16
 */

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import HelpSidebar from './helpSidebar';
import TechnicalHistoryContent from './TechnicalHistoryContent';
import HistoryContent from './historyContent';
import Footer from '../SharedComponents/FooterComponent';
import HelpNav from './helpNav';

import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    history: PropTypes.string,
    type: PropTypes.string,
    helpOnly: PropTypes.bool
};

const defaultProps = {
    history: {},
    type: '',
    helpOnly: false
};

export default class HelpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: '',
            title: ''
        };
    }
    scrollToTop() {
        window.scrollTo({
            top: 100,
            behavior: "smooth"
        });
    }

    render() {
        const activeTab = this.props.type === 'fabs' ? 'FABSHelp' : 'help';
        const color = this.props.type === 'fabs' ? 'teal' : 'dark';
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab={activeTab} type={this.props.type} logoOnly={this.props.helpOnly} />
                    <div className={`usa-da-content-${color} mb-60`}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                        Help | DATA Act Broker
                                    </div>
                                    <HelpNav selected="Help" type={this.props.type} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-4">
                                <HelpSidebar
                                    sections={this.state.sections}
                                    type={this.props.type} />
                            </div>
                            <div className="col-md-8">
                                {this.props.history === 'technical' &&
                                <TechnicalHistoryContent />}
                                {this.props.history === 'release' &&
                                <HistoryContent />}
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

HelpPage.propTypes = propTypes;
HelpPage.defaultProps = defaultProps;
