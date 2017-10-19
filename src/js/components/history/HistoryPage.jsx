/**
  * HistoryPage.jsx
  * Created by Minahm Kim 06/08/17
  **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import HistoryTable from './HistoryTable.jsx';
import HistoryHeader from './HistoryHeader.jsx';

export default class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="usa-da-site_wrap usa-da-history-page">
                    <Navbar activeTab="dashboard" type={this.props.type} />
                    <div className="usa-da-content-dark">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mt-40 mb-20">
                                    <div className="display-2" data-contentstart="start">
                                        Submission History
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <HistoryHeader submissionID={this.props.submissionID}/>
                    <HistoryTable submissionID={this.props.submissionID}/>
                </div>
                <Footer />
            </div>
        );
    }
}
