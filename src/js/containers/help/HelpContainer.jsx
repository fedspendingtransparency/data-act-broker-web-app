/**
* HelpPageContainer.jsx
* Created by Nipun Monga 11/21/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HelpPage from 'components/help/helpPage';
import ResourcesPage from 'components/help/resourcesPage';
import HistoryPage from 'components/help/historyPage';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs']),
    path: PropTypes.string,
    session: PropTypes.object
};

const defaultProps = {
    path: '/help',
    session: {}
};

class HelpPageContainer extends React.Component {
    render() {
        const currentRoute = this.props.path.toLowerCase();
        const helpOnly = this.props.session.user.helpOnly;
        if (currentRoute === '/resources' || currentRoute === '/fabsresources') {
            return (<ResourcesPage
                {...this.props}
                helpOnly={helpOnly}
                type={this.props.type} />);
        }
        else if (currentRoute === '/history' || currentRoute === '/fabshistory') {
            return ((<HistoryPage
                {...this.props}
                history="release"
                helpOnly={helpOnly}
                type={this.props.type} />));
        }
        else if (currentRoute === '/technicalhistory' || currentRoute === '/fabstechnicalhistory') {
            return (<HistoryPage
                {...this.props}
                history="technical"
                helpOnly={helpOnly}
                type={this.props.type} />);
        }
        return (<HelpPage
            {...this.props}
            helpOnly={helpOnly}
            type={this.props.type} />);
    }
}

HelpPageContainer.propTypes = propTypes;
HelpPageContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session })
)(HelpPageContainer);
