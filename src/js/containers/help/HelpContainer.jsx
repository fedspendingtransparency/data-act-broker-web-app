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

    componentWillReceiveProps(nextProps) {
        if (nextProps.route.type !== this.state.type) {
            this.setState({
                type: nextProps.route.type
            });
        }
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
        let currentRoute = this.props.route.path.toLowerCase();
       if (currentRoute == 'help' || currentRoute == 'fabshelp') {
            return <HelpPage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
       }
       else if (currentRoute == 'resources' || currentRoute == 'fabsresources') {
            return <ResourcesPage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
       }
       else if (currentRoute == 'validations' || currentRoute == 'fabsvalidations') {
            return <ValidationRulesTablePage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
        else if (currentRoute == 'practices' || currentRoute == 'fabspractices') {
            return <PracticesProceduresPage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
        else if (currentRoute == 'history' || currentRoute == 'fabshistory') {
            return <HistoryPage {...this.props} history='release' helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
        else if (currentRoute == 'technicalhistory' || currentRoute == 'fabstechnicalhistory') {
            return <HistoryPage {...this.props} history='technical' helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
    }
}

export default connect(
    state => ({ session: state.session })
)(HelpPageContainer)
