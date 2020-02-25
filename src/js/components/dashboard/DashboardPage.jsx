/**
  * DashboardPage.jsx
  * Created by Lizzie Salita 9/24/19
  */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import Banner from 'components/SharedComponents/Banner';
import DashboardContentContainer from 'containers/dashboard/DashboardContentContainer';
import QuarterFilterContainer from 'containers/dashboard/filters/QuarterFilterContainer';
import DashboardAgencyFilterContainer from 'containers/dashboard/filters/DashboardAgencyFilterContainer';
import FyFilterContainer from 'containers/dashboard/filters/FyFilterContainer';
import FileFilterContainer from 'containers/dashboard/filters/FileFilterContainer';
import RulesFilterContainer from 'containers/dashboard/filters/RulesFilterContainer';
import CreatedByContainer from 'containers/dashboard/filters/CreatedByFilterContainer';
import LastModifiedFilterContainer from 'containers/dashboard/filters/LastModifiedFilterContainer';
import SubmissionIdFilterContainer from 'containers/dashboard/filters/SubmissionIdFilterContainer';
import DashboardTab from './DashboardTab';
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
            name: 'Validation Rules',
            required: true,
            component: FileFilterContainer,
            description: 'Select one file or cross-file.'
        },
        {
            name: 'Rules',
            component: RulesFilterContainer,
            description: 'Enter specific codes to filter your search.'
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

const propTypes = {
    computedMatch: PropTypes.object
};

export default class DashboardPage extends React.Component {
    render() {
        const activeTab = this.props.computedMatch.params.type && this.props.computedMatch.params.type.toLowerCase();
        if (!activeTab) {
            // Redirect /dashboard to Historical
            // TODO change to active
            return <Redirect to="/dashboard/historical" />;
        }
        else if (!(activeTab === 'historical' || activeTab === 'active')) {
            // Redirect invalid params to 'Page Not Found'
            return <Redirect to="/404" />;
        }
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
                                    active={activeTab === 'active'} />
                                <DashboardTab
                                    label="Historical"
                                    type="historical"
                                    active={activeTab === 'historical'} />
                            </div>
                        </div>
                    </div>
                    <Banner />
                    <div className="dashboard-page">
                        <div className="dashboard-page__wrapper">
                            <div className="dashboard-page__filters">
                                <FilterSidebar type={activeTab} filters={filters[activeTab]} />
                            </div>
                            <div className="dashboard-page__content">
                                <DashboardContentContainer type={activeTab} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

DashboardPage.propTypes = propTypes;
