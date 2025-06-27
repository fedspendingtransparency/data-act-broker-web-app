/**
  * DashboardPage.jsx
  * Created by Lizzie Salita 9/24/19
  */

import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import Banner from 'components/SharedComponents/Banner';
import TabItem from 'components/SharedComponents/TabItem';
import DashboardContentContainer from 'containers/dashboard/DashboardContentContainer';
import PeriodFilterContainer from 'containers/dashboard/filters/PeriodFilterContainer';
import DashboardAgencyFilterContainer from 'containers/dashboard/filters/DashboardAgencyFilterContainer';
import FyFilterContainer from 'containers/dashboard/filters/FyFilterContainer';
import FileFilterContainer from 'containers/dashboard/filters/FileFilterContainer';
import RulesFilterContainer from 'containers/dashboard/filters/RulesFilterContainer';
import CreatedByContainer from 'containers/dashboard/filters/CreatedByFilterContainer';
import LastModifiedFilterContainer from 'containers/dashboard/filters/LastModifiedFilterContainer';
import SubmissionIdFilterContainer from 'containers/dashboard/filters/SubmissionIdFilterContainer';
import FilterSidebar from './FilterSidebar';

const filters = {
    historical: [
        {
            name: 'Agency',
            required: true,
            component: DashboardAgencyFilterContainer,
            description: 'Select a specific agency to filter your search.',
            altDescription: 'The agency to which you are assigned.'
        },
        {
            name: 'Reporting Period',
            subOptions: [
                {
                    name: 'Fiscal Years',
                    required: true,
                    component: FyFilterContainer,
                    description: 'Select the applicable fiscal year(s).'
                },
                {
                    name: 'Period Comparison',
                    component: PeriodFilterContainer,
                    description: 'Compare a single reporting period year-over-year.'
                }
            ]
        },
        {
            name: 'Validation Rules',
            subOptions: [
                {
                    name: 'Files',
                    required: true,
                    component: FileFilterContainer,
                    description: 'Select single file or cross-file.'
                },
                {
                    name: 'Filter by Rules',
                    component: RulesFilterContainer,
                    description: 'Enter specific codes to filter your search.'
                }
            ]
        }
    ],
    active: [
        {
            name: 'Agency',
            required: true,
            component: DashboardAgencyFilterContainer,
            description: 'Select a specific agency to filter your search.',
            altDescription: 'The agency to which you are assigned.'
        },
        {
            name: 'Created By',
            component: CreatedByContainer,
            description: 'Search by the name of the person who created the file.'
        },
        {
            name: 'Last Modified',
            component: LastModifiedFilterContainer,
            description: 'Select the submission date range.'
        },
        {
            name: 'Submission ID',
            component: SubmissionIdFilterContainer,
            description: 'Enter the submission ID number.'
        },
        {
            name: 'Validation Rules',
            required: true,
            component: FileFilterContainer,
            description: 'Select one file or cross-file.'
        }
    ]
};

const DashboardPage = () => {
    const params = useParams();
    const activeTab = params.type && params.type.toLowerCase();
    if (!activeTab) {
        // Redirect /dashboard to Active
        return <Navigate to="/dashboard/active" />;
    }
    else if (!(activeTab === 'historical' || activeTab === 'active')) {
        // Redirect invalid params to 'Page Not Found'
        return <Navigate to="/404" />;
    }
    
    return (
        <div>
            <div className="usa-da-site_wrap usa-da-dashboard-page">
                <Navbar type="dabs" activeTab="dashboard" />
                <main>
                    <div className="usa-da-content-dark">
                        <div className="container">
                            <div className="row usa-da-page-title">
                                <div className="col-md-12">
                                    <h1 className="display-2">DABS Dashboard</h1>
                                </div>
                            </div>
                        </div>
                        <div className="tabs tabs_dark">
                            <div className="tabs__content">
                                <TabItem
                                    label="Active"
                                    id="active"
                                    link="/dashboard/active"
                                    active={activeTab === 'active'} />
                                <TabItem
                                    label="Historical"
                                    id="historical"
                                    link="/dashboard/historical"
                                    active={activeTab === 'historical'} />
                            </div>
                        </div>
                    </div>
                    <Banner type="dabs" />
                    <div className="dashboard-page">
                        <div className="dashboard-page__wrapper">
                            <div className="dashboard-page__filters">
                                <FilterSidebar type={activeTab} filters={filters[activeTab]} />
                            </div>
                            <DashboardContentContainer type={activeTab} />
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
