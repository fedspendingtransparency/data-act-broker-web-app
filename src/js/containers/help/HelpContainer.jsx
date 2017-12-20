/**
* HelpPageContainer.jsx
* Created by Nipun Monga 11/21/16
*/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import HelpPage from '../../components/help/helpPage';
import ResourcesPage from '../../components/help/resourcesPage';
import ValidationRulesTablePage from '../../components/help/validationRulesTablePage';
import PracticesProceduresPage from '../../components/help/practicesProceduresPage';
import HistoryPage from '../../components/help/historyPage';

const propTypes = {
    route: PropTypes.object,
    session: PropTypes.object
};

const defaultProps = {
    route: {},
    session: {}
};

class HelpPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            helpOnly: false,
            type: props.route.type,
            path: 'help'
        };
    }

    componentDidMount() {
        this.checkHelpOnly();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.route.type !== this.state.type || nextProps.route.path !== this.state.path) {
            this.setState({
                type: nextProps.route.type,
                path: nextProps.route.path.toLowerCase()
            });
        }
    }

    componentDidUpdate(prevProps) {
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
        const currentRoute = this.state.path;
        if (currentRoute === 'resources' || currentRoute === 'fabsresources') {
            return (<ResourcesPage
                {...this.props}
                helpOnly={this.state.helpOnly}
                type={this.state.type} />);
        }
        else if (currentRoute === 'validations' || currentRoute === 'fabsvalidations') {
            return (<ValidationRulesTablePage
                {...this.props}
                helpOnly={this.state.helpOnly}
                type={this.state.type} />);
        }
        else if (currentRoute === 'practices' || currentRoute === 'fabspractices') {
            return (<PracticesProceduresPage
                {...this.props}
                helpOnly={this.state.helpOnly}
                type={this.state.type} />);
        }
        else if (currentRoute === 'history' || currentRoute === 'fabshistory') {
            return ((<HistoryPage
                {...this.props}
                history="release"
                helpOnly={this.state.helpOnly}
                type={this.state.type} />));
        }
        else if (currentRoute === 'technicalhistory' || currentRoute === 'fabstechnicalhistory') {
            return (<HistoryPage
                {...this.props}
                history="technical"
                helpOnly={this.state.helpOnly}
                type={this.state.type} />);
        }
        return (<HelpPage
            {...this.props}
            helpOnly={this.state.helpOnly}
            type={this.state.type} />);
    }
}

HelpPageContainer.propTypes = propTypes;
HelpPageContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session })
)(HelpPageContainer);
