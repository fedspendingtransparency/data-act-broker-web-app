/**
 * HistoryPage.jsx
 * Created by Emily Gullo 9/27/16
 */

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import HelpSidebar from './helpSidebar.jsx';
import HistoryContent from './historyContent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import HelpNav from './helpNav.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as HelpHelper from '../../helpers/helpHelper.js';

const propTypes = {
    history: PropTypes.object,
    type: PropTypes.string,
    helpOnly: PropTypes.bool
};

export default class HelpPage extends React.Component {
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

    componentWillReceiveProps() {
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

    render() {
        const history = this.props.type === 'fabs' ? '#/FABSHistory' : '#/history';
        const activeTab = this.props.type === 'fabs' ? 'FABSHelp' : 'help';
        const color = this.props.type === 'fabs' ? 'teal' : 'dark';
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab={activeTab} type={this.props.type} logoOnly={this.props.helpOnly} />
                    <div className={"usa-da-content-" + color + " mb-60"}>
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
                                <HelpSidebar changeSections={this.state.clSections}
                                    technicalSections={this.state.tSections}sections={this.state.sections}
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
                    <a href={history + "?section=top"} aria-label="Back to top">
                        <div className="usa-da-icon">
                            <Icons.AngleUp alt="Arrow pointing up" />
                        </div>
                        <span className="hidden-label">Back to top</span>
                    </a>
                </div>
            </div>
        );
    }
}

HelpPage.propTypes = propTypes;
