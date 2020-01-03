/**
* HelpPageContainer.jsx
* Created by Nipun Monga 11/21/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import HelpPage from 'components/help/helpPage';
import ResourcesPage from 'components/help/resourcesPage';
import HistoryPage from 'components/help/historyPage';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs']),
    path: PropTypes.string,
    session: PropTypes.object
};

const defaultProps = {
    session: {}
};

class HelpPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            helpOnly: false,
            type: props.type,
            path: 'help'
        };
    }

    componentDidMount() {
        this.setHelpRoute();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
            this.setHelpRoute();
        }
    }

    setHelpRoute() {
        if (this.props.type !== this.state.type || this.props.path !== this.state.path) {
            this.setState({
                type: this.props.type,
                path: this.props.path.toLowerCase(),
                helpOnly: this.props.session.user.helpOnly
            });
        }
    }

    render() {
        const currentRoute = this.state.path;
        if (currentRoute === 'resources' || currentRoute === 'fabsresources') {
            return (<ResourcesPage
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
