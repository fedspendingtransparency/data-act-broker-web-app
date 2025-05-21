/**
* HelpPageContainer.jsx
* Created by Nipun Monga 11/21/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as HelpHelper from 'helpers/helpHelper';
import HelpPage from 'components/help/helpPage';
import ResourcesPage from 'components/help/resourcesPage';
import HistoryPage from 'components/help/historyPage';
import RawFilesPage from 'components/help/RawFilesPage';
import DataSourcesPage from 'components/help/DataSourcesPage';

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
    constructor(props) {
        super(props);

        this.state = {
            changelog: '',
            technical: '',
            clSections: [],
            tSections: [],
            technicalHistory: '',
            releaseHistory: ''
        };
    }

    componentDidMount() {
        this.loadChangelog();
        this.loadTechnical();
    }

    loadChangelog() {
        const output = {
            body: '',
            sections: [],
            history: '',
            historySections: []
        };

        HelpHelper.loadChangelog()
            .then((res) => {
                const data = HelpHelper.parseMarkdown(res.data);
                output.body = data.body;
                output.sections = data.sections;
                return HelpHelper.loadHistory();
            })
            .then((res) => {
                const data = HelpHelper.parseMarkdown(res.data);
                output.history = data.body;
                output.historySections = data.sections;
                this.setState({
                    changelog: output.body,
                    clSections: output.sections,
                    releaseHistory: output.history
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    loadTechnical() {
        const output = {
            body: '',
            sections: [],
            history: '',
            historySections: []
        };

        HelpHelper.loadTechnicalNotes()
            .then((res) => {
                const data = HelpHelper.parseMarkdown(res.data);
                output.body = data.body;
                output.sections = data.sections;
                return HelpHelper.loadTechnicalHistory();
            })
            .then((res) => {
                const data = HelpHelper.parseMarkdown(res.data);
                output.history = data.body;
                output.historySections = data.sections;
    
                this.setState({
                    technical: output.body,
                    tSections: output.sections,
                    technicalHistory: output.history
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        const currentRoute = this.props.path.toLowerCase();
        const helpOnly = this.props.session.user.helpOnly;
        if (currentRoute === '/resources' || currentRoute === '/fabsresources') {
            return (<ResourcesPage
                {...this.props}
                {...this.state}
                helpOnly={helpOnly} />);
        }
        else if (currentRoute === '/rawfiles' || currentRoute === '/fabsrawfiles') {
            return (<RawFilesPage
                {...this.props}
                {...this.state}
                helpOnly={helpOnly} />);
        }
        else if (currentRoute === '/datasources' || currentRoute === '/fabsdatasources') {
            return (<DataSourcesPage
                {...this.props}
                {...this.state}
                helpOnly={helpOnly} />);
        }
        else if (currentRoute === '/history' || currentRoute === '/fabshistory') {
            return (<HistoryPage
                {...this.props}
                {...this.state}
                history="release"
                helpOnly={helpOnly} />);
        }
        else if (currentRoute === '/technicalhistory' || currentRoute === '/fabstechnicalhistory') {
            return (<HistoryPage
                {...this.props}
                {...this.state}
                history="technical"
                helpOnly={helpOnly} />);
        }
        return (<HelpPage
            {...this.props}
            {...this.state}
            helpOnly={helpOnly} />);
    }
}

HelpPageContainer.propTypes = propTypes;
HelpPageContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session })
)(HelpPageContainer);
