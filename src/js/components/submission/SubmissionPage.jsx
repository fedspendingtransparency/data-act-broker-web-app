import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import ReviewDataContent from '../reviewData/ReviewLoading.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';

export default class LoadingPage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		let header = 'Your Submission is Loading'
		let message = 'We are gathering your submissions state. Please wait while we gather your data'
		if(this.props.message) {
			message = this.props.message
		}
		if(this.props.header) {
			header = this.props.header
		}
		this.setState({
			message: message,
			header: header
		})
	}

	render() {
		let dummy = {
        	jobs: [],
            cgac_code: '',
            agency_name: '--',
            reporting_period_start_date: null,
            reporting_period_end_date: null,
            number_of_errors: null,
            number_of_rows: null,
            created_on: null,
            ready: false,
            total_obligations: 0,
            total_assistance_obligations: 0,
            total_procurement_obligations: 0,
            file_narrative: {}
        }

		return (
            <div className="usa-da-review-data-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide"/>
                        <AddDataHeader submissionID={this.props.submissionID} load={false}/>
                        <ReviewDataContent {...this.props} data={dummy} submissionID={this.props.submissionID}/>
                    </div>
                </div>
                <Footer />
            </div>
		);
	}
}