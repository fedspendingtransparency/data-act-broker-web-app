/**
  * AgencyDataDashboardPage.jsx
  * Created by Lizzie Salita 9/24/19
  */

import React from 'react';
import Navbar from 'components/SharedComponents/navigation/NavigationComponent'; 
import Footer from 'components/SharedComponents/FooterComponent';
import Banner from 'components/SharedComponents/Banner';

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'historical'
        };
    }
    render() {
        return (
            <div>
                <div className="usa-da-site_wrap usa-da-agency-data-dashboard-page">
                    <Navbar type="dabs" />
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
                    </div>
                    <Banner type="dabs" />
                </div>
                <Footer />
            </div>
        );
    }
}
