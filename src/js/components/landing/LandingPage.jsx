/**
* LandingPage.jsx
* Created by Katie Rose 12/7/15
**/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import LandingContentContainer from '../../containers/landing/LandingContentContainer.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

const propTypes = {
    route: PropTypes.object
};

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.route ? this.props.route.type : 'home'
        };
    }

    componentWillReceiveProps(nextProps) {
        let type = null;
        if (nextProps.route && this.state.type !== nextProps.route.type) {
            type = nextProps.route.type;
        }
        if (type && type !== this.state.type) {
            this.setState({
                type
            });
        }
    }

    render() {
        const activeTab = this.state.type === 'fabs' ? 'FABSlanding' : 'landing';

        return (
            <div>
                <div className="usa-da-site_wrap">
                    <div className="usa-da-landing-page">
                        <div className="usa-da-page-content">
                            <Navbar activeTab={activeTab} type={this.state.type} />
                            <LandingContentContainer type={this.state.type}/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

LandingPage.propTypes = propTypes;
