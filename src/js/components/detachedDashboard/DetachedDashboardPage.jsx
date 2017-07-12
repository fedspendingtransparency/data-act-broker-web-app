/**
  * DetachedDashboardPage.jsx
  * Created by Daniel Boos 6/29/17
  **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import DetachedDashboardContainer from '../../containers/detachedDashboard/DetachedDashboardContainer.jsx';

export default class DetachedDashboardPage extends React.Component {
    render() {
        return (
            <div>
                <div className="usa-da-site_wrap usa-da-dashboard-page">
                    <Navbar activeTab="dashboard"/>
                    <div className="usa-da-content-dark">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                        Detached Submission Dashboard
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DetachedDashboardContainer />
                </div>
                <Footer />
            </div>
		)
	}
}