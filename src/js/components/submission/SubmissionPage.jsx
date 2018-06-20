import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import ReviewDataContent from '../reviewData/ReviewLoading';
import Footer from '../SharedComponents/FooterComponent';
import AddDataHeader from './../addData/AddDataHeader';

const propTypes = {
    route: PropTypes.object,
    submissionID: PropTypes.string
};

const defaultProps = {
    route: {},
    submissionID: ''
};

export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dummy = {
            jobs: [],
            cgac_code: '',
            frec_code: '',
            agency_name: '--',
            reporting_period_start_date: null,
            reporting_period_end_date: null,
            number_of_rows: null,
            number_of_warnings: null,
            created_on: null,
            ready: false,
            total_obligations: 0,
            total_assistance_obligations: 0,
            total_procurement_obligations: 0,
            file_narrative: {}
        };

        return (
            <div className="usa-da-review-data-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide" type={this.props.route.type} />
                        <AddDataHeader submissionID={this.props.submissionID} />
                        <ReviewDataContent {...this.props} data={dummy} submissionID={this.props.submissionID} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

LoadingPage.propTypes = propTypes;
LoadingPage.defaultProps = defaultProps;
