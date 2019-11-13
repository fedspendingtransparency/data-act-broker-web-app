/**
  * AgencyDataDashboardPage.jsx
  * Created by Lizzie Salita 9/24/19
  */

import React from 'react';
import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import QuarterFilterContainer from 'containers/dashboard/filters/QuarterFilterContainer';
import FyFilterContainer from 'containers/dashboard/filters/FyFilterContainer';
import FileFilterContainer from 'containers/dashboard/filters/FileFilterContainer';
import RulesFilterContainer from 'containers/dashboard/filters/RulesFilterContainer';
import DashboardTab from './DashboardTab';
import FilterSidebar from './FilterSidebar';
import DashboardSummary from './DashboardSummary';

const filters = [
    {
        name: 'Fiscal Years',
        required: true,
        component: FyFilterContainer,
        description: 'Select the applicable fiscal year(s).'
    },
    {
        name: 'Quarters',
        required: true,
        component: QuarterFilterContainer,
        description: 'Select the applicable quarter(s).'
    },
    {
        name: 'Files',
        required: true,
        component: FileFilterContainer,
        description: 'Select one file or cross-file.'
    },
    {
        name: 'Rules',
        required: false,
        component: RulesFilterContainer,
        description: 'Enter specific codes to filter your search.'
    }
];

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
                            <div className="row usa-da-page-title">
                                <div className="col-md-12">
                                    <h1 className="display-2">DABS Dashboard</h1>
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
                    <div className="dashboard-page">
                        <div className="dashboard-page__filters">
                            <FilterSidebar filters={filters} />
                        </div>
                        <div className="dashboard-page__content">
                            <h2>Historical Data Summary</h2>
                            <hr />
                            <DashboardSummary filters={filters} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
