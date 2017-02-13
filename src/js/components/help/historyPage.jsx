/**
 * HistoryPage.jsx
 * Created by Emily Gullo 9/27/16
 **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import HelpSidebar from './helpSidebar.jsx';
import HistoryContent from './historyContent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import HelpNav from './helpNav.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as HelpHelper from '../../helpers/helpHelper.js';

export default class HelpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: '',
            title: '',
            clSections: [],
            tSections: [],
            mounted: true
        };
    }

    componentDidMount() {
        this.loadChangelog();
        this.loadTechnical()
        this.setState({mounted: false});
    }
    componentWillUnmount(){
        this.setState({mounted: false})
    }

	componentDidUpdate() {
        if(this.state.mounted){
            this.loadChangelog();
            this.loadTechnical()
        }
    }

    loadChangelog() {
        HelpHelper.loadHelp()
            .then((output) => {
                this.setState({
                    clSections: output.sections
                });

                if(this.props.history=='release'){
                    this.setState({
                        history: output.history,
                        title: 'Release Notes Archive'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    loadTechnical() {
        HelpHelper.loadTechnical()
            .then((output) => {
                this.setState({
                    tSections: output.sections
                });
                if(this.props.history=='technical'){
                    this.setState({
                        history: output.history,
                        title: 'Technical Notes Archive'
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab="help" logoOnly={this.props.helpOnly} />
                    <div className="usa-da-content-dark mb-60">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>Help | DATA Act Broker</div>
                                    <HelpNav selected="Help" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
							<div className="col-md-4">
                                <HelpSidebar changeSections={this.state.clSections} technicalSections={this.state.tSections} sections={this.state.sections}/>
                            </div>
                            <div className="col-md-8">
                                <HistoryContent history={this.state.history} title={this.state.title}/>
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
