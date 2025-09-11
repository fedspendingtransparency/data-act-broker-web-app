/**
 * HistoryPage.jsx
 * Created by Emily Gullo 9/27/16
 */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import HelpSidebar from './helpSidebar';
import HistoryContent from './historyContent';
import HelpNav from './helpNav';

const propTypes = {
    session: PropTypes.object,
    history: PropTypes.oneOf(['release', 'technical']),
    type: PropTypes.oneOf(['dabs', 'fabs']),
    helpOnly: PropTypes.bool,
    latestRelease: PropTypes.string,
    technicalHistory: PropTypes.string,
    releaseHistory: PropTypes.string
};

const HistoryPage = (props) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const activeTab = props.type === 'fabs' ? 'FABSHelp' : 'help';
    const color = props.type === 'fabs' ? 'teal' : 'dark';
    const title = props.history === 'technical' ? 'Technical Notes Archive' : 'Release Notes Archive';
    const history = props.history === 'technical' ? props.technicalHistory : props.releaseHistory;
    return (
        <div className="usa-da-help-style-page" name="top">
            <div className="usa-da-page-content">
                <Navbar activeTab={activeTab} type={props.type} logoOnly={props.helpOnly} />
                <div className={`usa-da-content-${color} mb-60`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mt-40 mb-20">
                                <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                    Help | Data Broker
                                    <HelpNav selected="Help" type={props.type} session={props.session} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row usa-da-help-page">
                        <div className="col-md-4">
                            <HelpSidebar
                                latestRelease={props.latestRelease}
                                type={props.type} />
                        </div>
                        <div className="col-md-8">
                            <HistoryContent history={history} title={title} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <div className="usa-da-help-top-button">
                <button
                    onClick={scrollToTop}
                    aria-label="Back to top">
                    <div className="usa-da-icon">
                        <FontAwesomeIcon icon="angle-up" className="angle-up-icon" size="lg" />
                    </div>
                    <span className="hidden-label">Back to top</span>
                </button>
            </div>
        </div>
    );
};

HistoryPage.propTypes = propTypes;
export default HistoryPage;
