/**
 * HistoryPage.jsx
 * Created by Emily Gullo 9/27/16
 **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import HelpSidebar from './helpSidebar.jsx';
import HistoryContent from './historyContent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as HelpHelper from '../../helpers/helpHelper.js';

export default class HelpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: '',
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
                    history: output.history,
					sections: output.sections
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab="help"/>
                    <div className="usa-da-content-dark mb-60">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>Help | DATA Act Broker</div>
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
                                <HistoryContent history={this.state.history}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <div className="usa-da-help-top-button">
                    <a href="#/history?section=top" aria-label="Back to top">
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
