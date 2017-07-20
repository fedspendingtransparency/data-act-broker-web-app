/**
 * HelpPage.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import _ from 'lodash';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import HelpSidebar from './helpSidebar.jsx';
import HelpContent from './helpContent.jsx';
import HelpNav from './helpNav.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as HelpHelper from '../../helpers/helpHelper.js';

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
                console.log(err);
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
                console.log(err);
            });
    }

    render() {
        const help = this.props.type === 'fabs' ? '#/detachedHelp' : '#/help';
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab="help" logoOnly={this.props.helpOnly} type={this.props.type} />
                    <div className="usa-da-content-dark mb-60">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>Help | DATA Act Broker
										<HelpNav selected="Help" type={this.props.type} />
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-4">
                                <HelpSidebar changeSections={this.state.clSections} technicalSections={this.state.tSections} helpOnly={this.props.helpOnly} type={this.props.type} />
                            </div>
                            <div className="col-md-8">
                                <HelpContent section={this.props.location.query.section} helpOnly={this.props.helpOnly} changelog={this.state.changelog} technical={this.state.technical} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <div className="usa-da-help-top-button">
                    <a href={help+"?section=top"} aria-label="Back to top">
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
