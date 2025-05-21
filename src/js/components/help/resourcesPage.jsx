/**
 * ResourcesPage.jsx
 * Created by Emily Gullo 9/27/16
 */

import React from 'react';
import PropTypes from 'prop-types';

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Banner from 'components/SharedComponents/Banner';
import Footer from 'components/SharedComponents/FooterComponent';
import HelpNav from './helpNav';
import ResourcesContent from './resourcesContent';

const propTypes = {
    session: PropTypes.object,
    type: PropTypes.oneOf(['dabs', 'fabs']),
    helpOnly: PropTypes.bool
};

const defaultProps = {
    session: {},
    type: '',
    helpOnly: false
};

export default class ResourcesPage extends React.Component {
    render() {
        const activeTab = this.props.type === 'fabs' ? 'FABSHelp' : 'help';
        const color = this.props.type === 'fabs' ? 'teal' : 'dark';
        return (
            <div className="usa-da-help-style-page" name="top">
                <div className="usa-da-page-content">
                    <Navbar activeTab={activeTab} type={this.props.type} logoOnly={this.props.helpOnly} />
                    <div className={`usa-da-content-${color} mb-60`}>
                        <div className="container">
                            <div className="row usa-da-page-title">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                        {this.props.type.toUpperCase()} | Resources
                                        <HelpNav
                                            selected="Resources"
                                            type={this.props.type}
                                            session={this.props.session} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner type={this.props.type} />
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-12">
                                <ResourcesContent type={this.props.type} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

ResourcesPage.propTypes = propTypes;
ResourcesPage.defaultProps = defaultProps;
