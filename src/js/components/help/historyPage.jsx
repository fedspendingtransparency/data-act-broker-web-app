/**
 * HistoryPage.jsx
 * Created by Emily Gullo 9/27/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as HelpHelper from 'helpers/helpHelper';
import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import HelpSidebar from './helpSidebar';
import HistoryContent from './historyContent';
import HelpNav from './helpNav';

const propTypes = {
    history: PropTypes.string,
    type: PropTypes.string,
    helpOnly: PropTypes.bool
};

const defaultProps = {
    history: '',
    type: '',
    helpOnly: false
};

export default class HistoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = true;

        this.state = {
            history: '',
            title: '',
            clSections: [],
            tSections: []
        };
    }

    componentDidMount() {
        this.isUnmounted = false;
        this.loadChangelog();
        this.loadTechnical();
    }

    componentDidUpdate() {
        if (!this.isUnmounted && this.props.history) {
            this.loadChangelog();
            this.loadTechnical();
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    loadChangelog() {
        HelpHelper.loadHelp()
            .then((output) => {
                this.setState({
                    clSections: output.sections
                });

                if (this.props.history === 'release') {
                    this.setState({
                        history: output.history,
                        title: 'Release Notes Archive'
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    loadTechnical() {
        HelpHelper.loadTechnical()
            .then((output) => {
                this.setState({
                    tSections: output.sections
                });
                if (this.props.history === 'technical') {
                    this.setState({
                        history: output.history,
                        title: 'Technical Notes Archive'
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
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
                                    changeSections={this.state.clSections}
                                    technicalSections={this.state.tSections}
                                    sections={this.state.sections}
                                    type={this.props.type} />
                            </div>
                            <div className="col-md-8">
                                <HistoryContent history={this.state.history} title={this.state.title} />
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
