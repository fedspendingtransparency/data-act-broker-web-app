/**
  * SubmissionsTablePage.jsx
  * Created by Kevin Li 10/21/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import SubmissionsTableContainer from 'containers/submissionsTable/SubmissionsTableContainer';
import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Footer from 'components/SharedComponents/FooterComponent';
import Banner from 'components/SharedComponents/Banner';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs'])
};

export default class SubmissionsTablePage extends React.Component {
    render() {
        const isFabs = this.props.type === 'fabs';
        const color = isFabs ? 'teal' : 'dark';
        const header = isFabs ? 'FABS Submission Table' : 'DABS Submission Table';
        const activeTab = isFabs ? 'FABSsubmissionTable' : 'submissionTable';
        return (
            <div>
                <div className="usa-da-site_wrap usa-da-submissions-table-page">
                    <Navbar activeTab={activeTab} type={this.props.type} />
                    <div className={`usa-da-content-${color}`}>
                        <div className="container">
                            <div className="row usa-da-page-title">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start" tabIndex={-1}>
                                        {header}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Banner type={this.props.type} />
                    <SubmissionsTableContainer type={this.props.type} />
                </div>
                <Footer />
            </div>
        );
    }
}

SubmissionsTablePage.propTypes = propTypes;
