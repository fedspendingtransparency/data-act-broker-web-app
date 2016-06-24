/**
 * HelpPage.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import HelpSidebar from './helpSidebar.jsx';
import HelpContent from './helpContent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as HelpHelper from '../../helpers/helpHelper.js';

export default class HelpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changelog: '',
            sections: []
        };
    }

    componentDidMount() {
        this.loadChangelog();
    }

    loadChangelog() {
        HelpHelper.loadHelp()
            .then((output) => {
                this.setState({
                    changelog: output.html,
                    sections: output.sections,
                    history: output.history
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab="help"/>
                    <div className="usa-da-content-dark mb-60">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2">Help | DATA Act Broker - Alpha Release</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-4">
                                <HelpSidebar sections={this.state.sections} />
                            </div>
                            <div className="col-md-8">
                                <HelpContent section={this.props.location.query.section} changelog={this.state.changelog} history={this.state.history} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <div className="usa-da-help-top-button">
                    <a href="#/help?section=top">
                        <div className="usa-da-icon">
                            <Icons.AngleUp />
                        </div>
                        <span className="hidden-label">Back to top</span>
                    </a>
                </div>
            </div>
        );
    }
}
