/**
 * practicesProceduresPage.jsx
 * Created by Emily Gullo 9/2/16
 */

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import PracticesProceduresContent from './practicesProceduresContent';
import Banner from '../SharedComponents/Banner';
import Footer from '../SharedComponents/FooterComponent';

import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    type: PropTypes.string,
    helpOnly: PropTypes.bool
};

const defaultProps = {
    type: '',
    helpOnly: false
};

export default class PracticesProceduresPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const practices = this.props.type === 'fabs' ? '#/FABSPractices' : '#/practices';
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
                                </div>
                            </div>
                        </div>
                        <Banner />
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-12">
                                <PracticesProceduresContent />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <div className="usa-da-help-top-button">
                    <a href={practices + "?section=top"} aria-label="Back to top">
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

PracticesProceduresPage.propTypes = propTypes;
PracticesProceduresPage.defaultProps = defaultProps;
