/**
 * HelpPage.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import HelpSidebar from './helpSidebar.jsx';
import HelpContent from './helpContent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

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
        HelpHelper.loadChangelog()
            .then((output) => {
                console.log(output);
                this.setState({
                    changelog: output.html,
                    sections: output.sections
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <div className="usa-da-page-content">
                    <Navbar activeTab="help"/>
                    <div className="usa-da-content-dark mb-60">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-50 mb-30">
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
                                <HelpContent section={this.props.location.query.section} changelog={this.state.changelog} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
