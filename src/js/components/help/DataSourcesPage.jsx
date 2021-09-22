/**
 * DataSourcesPage.jsx
 * Created by Alisa Burdeyny 9/22/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as HelpHelper from 'helpers/helpHelper';

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Banner from 'components/SharedComponents/Banner';
import Footer from 'components/SharedComponents/FooterComponent';
import DataSourcesContent from 'components/help/DataSourcesContent';
import HelpNav from './helpNav';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs']),
    helpOnly: PropTypes.bool
};

const defaultProps = {
    type: '',
    helpOnly: false
};

export default class RawFilesPage extends React.Component {
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
                                        {this.props.type.toUpperCase()} | Data Sources
                                        <HelpNav selected="Data Sources" type={this.props.type} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner type={this.props.type} />
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-12">
                                <DataSourcesContent />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

RawFilesPage.propTypes = propTypes;
RawFilesPage.defaultProps = defaultProps;
