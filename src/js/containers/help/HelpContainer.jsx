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
          helpOnly: false
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
        let isHelpOnly = false;
        if (!this.props.session.user.permission) {
            isHelpOnly = true;
        }
        this.setState({
            helpOnly: isHelpOnly
        });
    }

    render() {
       if (this.props.route.path == 'help') {
           return (
                <HelpPage {...this.props} helpOnly={this.state.helpOnly} />
             );
       }
       else if (this.props.route.path == 'resources') {
           return (
                <ResourcesPage {...this.props} helpOnly={this.state.helpOnly} />
             );
       }
       else if (this.props.route.path == 'validations') {
            return (
                <ValidationRulesTablePage {...this.props} helpOnly={this.state.helpOnly} />
            );
        }
        else if (this.props.route.path == 'practices') {
            return (
                <PracticesProceduresPage {...this.props} helpOnly={this.state.helpOnly} />
            );
        }
        else if (this.props.route.path == 'history') {
            return (
                <HistoryPage {...this.props} helpOnly={this.state.helpOnly} />
            );
        }
    }
}

export default connect(
    state => ({ session: state.session })
)(HelpPageContainer)