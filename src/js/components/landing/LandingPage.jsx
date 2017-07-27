/**
* LandingPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import LandingContentContainer from '../../containers/landing/LandingContentContainer.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.route)
        this.state = {
            'type': this.props.route ? this.props.route.type : 'home'
        }
    }

    componentWillReceiveProps(nextProps) {
        let type = null;
        if(nextProps.route && this.state.type !== nextProps.route.type){
            type = nextProps.route.type;
        }
        if(type && type != this.state.type) {
            this.setState({
                'type': type
            })
        }
    }

    render() {
        let activeTab = this.state.type === 'fabs' ? 'detachedLanding' : 'landing';

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
