/**
  * HistoryPage.jsx
  * Created by Minahm Kim 06/08/17
  */

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import Footer from '../SharedComponents/FooterComponent';
import HistoryTable from './HistoryTable';
import HistoryHeader from './HistoryHeader';

const propTypes = {
    submissionID: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    submissionID: '',
    type: ''
};

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
                    <HistoryHeader submissionID={this.props.submissionID} />
                    <HistoryTable submissionID={this.props.submissionID} />
                </div>
                <Footer />
            </div>
        );
    }
}

HistoryPage.propTypes = propTypes;
HistoryPage.defaultProps = defaultProps;
