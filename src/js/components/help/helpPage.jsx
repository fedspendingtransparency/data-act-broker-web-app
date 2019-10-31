/**
 * HelpPage.jsx
 * Created by Mike Bray 4/1/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import HelpSidebar from './helpSidebar';
import HelpContent from './helpContent';
import HelpNav from './helpNav';
import Footer from '../SharedComponents/FooterComponent';
import Banner from '../SharedComponents/Banner';

import * as Icons from '../SharedComponents/icons/Icons';

import * as HelpHelper from '../../helpers/helpHelper';

const propTypes = {
    location: PropTypes.object,
    type: PropTypes.string,
    helpOnly: PropTypes.bool
};

const defaultProps = {
    location: null,
    type: '',
    helpOnly: false
};

export default class HelpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changelog: '',
            technical: '',
            clSections: [],
            tSections: []
        };
    }

    componentDidMount() {
        this.loadChangelog();
        this.loadTechnical();
    }

    loadChangelog() {
        HelpHelper.loadHelp()
            .then((output) => {
                this.setState({
                    changelog: output.html,
                    clSections: output.sections
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    loadTechnical() {
        HelpHelper.loadTechnical()
            .then((output) => {
                this.setState({
                    technical: output.html,
                    tSections: output.sections
                });
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
        const help = this.props.type === 'fabs' ? 'FABShelp' : 'help';
        const color = this.props.type === 'fabs' ? 'teal' : 'dark';
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
                        <Banner />
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-4">
                                <HelpSidebar
                                    changeSections={this.state.clSections}
                                    technicalSections={this.state.tSections}
                                    helpOnly={this.props.helpOnly}
                                    type={this.props.type} />
                            </div>
                            <div className="col-md-8">
                                <HelpContent
                                    section={this.props.location.query.section}
                                    helpOnly={this.props.helpOnly}
                                    changelog={this.state.changelog}
                                    technical={this.state.technical} />
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
