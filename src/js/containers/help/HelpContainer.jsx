/**
* HelpPageContainer.jsx
* Created by Nipun Monga 11/21/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HelpPage from '../../components/help/helpPage.jsx';
import ResourcesPage from '../../components/help/resourcesPage.jsx';
import ValidationRulesTablePage from '../../components/help/validationRulesTablePage.jsx';
import PracticesProceduresPage from '../../components/help/practicesProceduresPage.jsx';
import HistoryPage from '../../components/help/historyPage.jsx';


class HelpPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            helpOnly: false,
            type: props.route.type
        };
    }

    componentDidMount() {
        this.checkHelpOnly();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps, this.props)) {
            this.checkHelpOnly();
        }
    }

    checkHelpOnly() {
        this.setState({
            helpOnly: this.props.session.user.helpOnly
        });
    }

    render() {
       if (this.props.route.path == 'help' || this.props.route.path == 'detachedHelp') {
            return <HelpPage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
       }
       else if (this.props.route.path == 'resources' || this.props.route.path == 'detachedResources') {
            return <ResourcesPage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
       }
       else if (this.props.route.path == 'validations' || this.props.route.path == 'detachedValidations') {
            return <ValidationRulesTablePage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
        else if (this.props.route.path == 'practices' || this.props.route.path == 'detachedPractices') {
            return <PracticesProceduresPage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
        else if (this.props.route.path == 'history' || this.props.route.path == 'detachedHistory') {
            return <HistoryPage {...this.props} history='release' helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
        else if (this.props.route.path == 'technicalHistory' || this.props.route.path == 'detachedTechnicalHistory') {
            return <HistoryPage {...this.props} history='technical' helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
    }
}

export default connect(
    state => ({ session: state.session })
)(HelpPageContainer)
