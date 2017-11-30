/**
 * validationRulesTablePage.jsx
 * Created by Emily Gullo 9/2/16
 */

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import HelpNav from './helpNav';
import ValidationRulesTableContent from './validationRulesTableContent';
import Banner from '../SharedComponents/Banner';
import Footer from '../SharedComponents/FooterComponent';

import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    route: PropTypes.object,
    type: PropTypes.string,
    helpOnly: PropTypes.bool
};

const defaultProps = {
    route: null,
    type: '',
    helpOnly: true
};

export default class ValidationRulesTablePage extends React.Component {
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
        const validations = this.props.type === 'fabs' ? '#/FABSValidations' : '#/validations';
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
                                        {this.state.type.toUpperCase()} | Validations
                                        <HelpNav selected="Validations" type={this.props.type} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner />
                    </div>
                    <div className="container">
                        <div className="row usa-da-help-page">
                            <div className="col-md-12">
                                <ValidationRulesTableContent type={this.state.type} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <div className="usa-da-help-top-button">
                    <a href={validations + "?section=top"} aria-label="Back to top">
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

ValidationRulesTablePage.propTypes = propTypes;
ValidationRulesTablePage.defaultProps = defaultProps;
