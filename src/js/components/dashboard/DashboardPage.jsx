/**
  * AgencyDataDashboardPage.jsx
  * Created by Lizzie Salita 9/24/19
  */

import React from 'react';
import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import Banner from 'components/SharedComponents/Banner';
import DashboardTab from './DashboardTab';

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'historical'
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }
    setActiveTab(type) {
        this.setState({
            activeTab: type
        });
    }
    render() {
        return (
            <div>
                <div className="usa-da-site_wrap usa-da-dashboard-page">
                    <Navbar type="dabs" activeTab="dashboard" />
                    <div className="usa-da-content-dark">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="display-2">
                                        DABS Dashboard
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-tabs">
                            <div className="dashboard-tabs__content">
                                <DashboardTab
                                    label="Active"
                                    type="active"
                                    disabled
                                    active={this.state.activeTab === 'active'}
                                    setActiveTab={this.setActiveTab} />
                                <DashboardTab
                                    label="Historical"
                                    type="historical"
                                    active={this.state.activeTab === 'historical'}
                                    setActiveTab={this.setActiveTab} />
                            </div>
                        </div>
                    </div>
                    <Banner type="dabs" />
                </div>
                <Footer />
            </div>
        );
    }
}
