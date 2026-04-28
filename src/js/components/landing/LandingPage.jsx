/**
* LandingPage.jsx
* Created by Katie Rose 12/7/15
*/

import PropTypes from 'prop-types';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import LandingContentContainer from '../../containers/landing/LandingContentContainer';
import Footer from '../SharedComponents/FooterComponent';

const propTypes = {
    type: PropTypes.oneOf(['home', 'fabs', 'dabs'])
};

const LandingPage = ({type = 'home'}) => {
    const activeTab = type === 'fabs' ? 'FABSlanding' : 'landing';

    return (
        <div>
            <div className="usa-da-site_wrap">
                <div className="usa-da-landing-page">
                    <div className="usa-da-page-content">
                        <Navbar activeTab={activeTab} type={type} />
                        <LandingContentContainer type={type} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

LandingPage.propTypes = propTypes;
export default LandingPage;
