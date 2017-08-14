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
       if (currentRoute == 'help' || currentRoute == 'FABSHelp'.toLowerCase()) {
            return <HelpPage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
       }
       else if (currentRoute == 'resources' || currentRoute == 'FABSResources'.toLowerCase()) {
            return <ResourcesPage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
       }
       else if (currentRoute == 'validations' || currentRoute == 'FABSValidations'.toLowerCase()) {
            return <ValidationRulesTablePage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
        else if (currentRoute == 'practices' || currentRoute == 'FABSPractices'.toLowerCase()) {
            return <PracticesProceduresPage {...this.props} helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
        else if (currentRoute == 'history' || currentRoute == 'FABSHistory'.toLowerCase()) {
            return <HistoryPage {...this.props} history='release' helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
        else if (currentRoute == 'technicalHistory' || currentRoute == 'FABSTechnicalHistory'.toLowerCase()) {
            return <HistoryPage {...this.props} history='technical' helpOnly={this.state.helpOnly} type={this.state.type} />;
        }
    }
}

export default connect(
    state => ({ session: state.session })
)(HelpPageContainer)
