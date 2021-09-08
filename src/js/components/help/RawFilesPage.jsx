/**
 * RawFilesPage.jsx
 * Created by Alisa Burdeyny 9/03/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as HelpHelper from 'helpers/helpHelper';

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Banner from 'components/SharedComponents/Banner';
import Footer from 'components/SharedComponents/FooterComponent';
import HelpNav from './helpNav';
import RawFilesContent from 'components/help/RawFilesContent';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs']),
    helpOnly: PropTypes.bool
};

const defaultProps = {
    type: '',
    helpOnly: false
};

export default class RawFilesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileType: {id: null, label: ''},
            agency: {id: null, label: ''},
            year: {id: null, label: ''},
            period: {id: null, label: ''},
            currentList: [
                {id: 'dabs', label: 'Raw DATA Act Files'},
                {id: 'fabs', label: 'Raw Financial Assistance Files'}
            ]
        };

        this.stateReset = this.stateReset.bind(this);
        this.itemAction = this.itemAction.bind(this);
        this.getDrilldownLevel = this.getDrilldownLevel.bind(this);
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    stateReset(newState) {
        if (newState.fileType.id === null) {
            newState.currentList = [
                {id: 'dabs', label: 'Raw DATA Act Files'},
                {id: 'fabs', label: 'Raw Financial Assistance Files'}
            ];
            this.setState({ ...newState });
        }
        else {
            this.getDrilldownLevel(newState);
        }
    }

    itemAction(level, id, label) {
        if (level === 'download') {
            HelpHelper.downloadPublishedFile(id)
                .then((result) => {
                    window.open(result.url);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            const tmpState = Object.assign({}, this.state);
            tmpState[level] = {id, label};
            this.getDrilldownLevel(tmpState);
        }
    }

    getDrilldownLevel(currState) {
        HelpHelper.rawFilesDrilldown(currState.fileType.id, currState.agency.id, currState.year.id, currState.period.id)
            .then((drilldownList) => {
                currState.currentList = drilldownList;
                this.setState({ ...currState });
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
                                        {this.props.type.toUpperCase()} | Raw Files
                                        <HelpNav selected="Raw Files" type={this.props.type} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner type={this.props.type} />
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-12">
                                <RawFilesContent
                                    {...this.state}
                                    stateReset={this.stateReset}
                                    itemAction={this.itemAction} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <div className="usa-da-help-top-button">
                    <button
                        onClick={this.scrollToTop}
                        aria-label="Back to top">
                        <div className="usa-da-icon">
                            <FontAwesomeIcon icon="angle-up" size="lg" />
                        </div>
                        <span className="hidden-label">Back to top</span>
                    </button>
                </div>
            </div>
        );
    }
}

RawFilesPage.propTypes = propTypes;
RawFilesPage.defaultProps = defaultProps;
