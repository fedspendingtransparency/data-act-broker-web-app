/**
 * HelpPage.jsx
 * Created by Mike Bray 4/1/16
 */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import Banner from 'components/SharedComponents/Banner';
import HelpSidebar from './helpSidebar';
import HelpContent from './helpContent';
import HelpNav from './helpNav';

const propTypes = {
    session: PropTypes.object,
    type: PropTypes.oneOf(['dabs', 'fabs']),
    helpOnly: PropTypes.bool,
    changelog: PropTypes.string,
    technical: PropTypes.string,
    latestRelease: PropTypes.string
};

const HelpPage = (props) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const help = props.type === 'fabs' ? 'FABShelp' : 'help';
    const color = props.type === 'fabs' ? 'teal' : 'dark';
    return (
        <div className="usa-da-help-style-page" name="top">
            <div className="usa-da-page-content">
                <Navbar activeTab={help} type={props.type} logoOnly={props.helpOnly} />
                <div className={`usa-da-content-${color} mb-60`}>
                    <div className="container">
                        <div className="row usa-da-page-title">
                            <div className="col-md-12 mt-40 mb-20">
                                <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                    {props.type.toUpperCase()} | Help
                                    <HelpNav selected="Help" type={props.type} session={props.session} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Banner type={props.type} />
                </div>
                <div className="container">
                    <div className="row usa-da-help-page">
                        <div className="col-md-4">
                            <HelpSidebar
                                latestRelease={props.latestRelease}
                                type={props.type} />
                        </div>
                        <div className="col-md-8">
                            <HelpContent
                                changelog={props.changelog}
                                technical={props.technical} />
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

HelpPage.propTypes = propTypes;
export default HelpPage;
