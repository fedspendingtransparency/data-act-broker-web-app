/**
 * ResourcesPage.jsx
 * Created by Emily Gullo 9/27/16
 **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import HelpNav from './helpNav.jsx';
import ResourcesContent from './resourcesContent.jsx';
import Banner from '../SharedComponents/Banner.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import * as HelpHelper from '../../helpers/helpHelper.js';

export default class ResourcesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: props.route.type
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.route.type !== this.state.type) {
            this.setState({
                type: nextProps.route.type
            });
        }
    }

    render() {
        const resources = this.props.type === 'fabs' ? '#/FABSResources' : '#/resources';
        const activeTab = this.props.type === 'fabs' ? 'FABSHelp' : 'help';
        const color = this.state.type === 'fabs' ? 'teal' : 'dark';
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab={activeTab} type={this.props.type} logoOnly={this.props.helpOnly} />
                    <div className={"usa-da-content-" + color + " mb-60"}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                        {this.props.type.toUpperCase()} | Resources
                                        <HelpNav selected="Resources" type={this.props.type} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner />
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-12">
                                <ResourcesContent type={this.state.type} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <div className="usa-da-help-top-button">
                    <a href={resources + "?section=top"} aria-label="Back to top">
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
