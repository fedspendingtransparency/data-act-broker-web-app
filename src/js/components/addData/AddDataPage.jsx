/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
*/

import React from 'react';
import PropTypes from 'prop-types';
import AddDataContainer from 'containers/addData/AddDataContainer';
import Footer from 'components/SharedComponents/FooterComponent';
import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Banner from 'components/SharedComponents/Banner';
import SubmissionHeader from 'components/submission/SubmissionHeader';
import AddDataMeta from './AddDataMeta';

const propTypes = {
    updateMetaData: PropTypes.func,
    type: PropTypes.oneOf(['dabs', 'fabs']),
    submission: PropTypes.object
};

const defaultProps = {
    updateMetaData: null,
    submission: null
};

export default class AddDataPage extends React.Component {
    render() {
        let bodyComponent = null;

        if (!this.props.submission.meta.agency) {
            bodyComponent = <AddDataMeta updateMetaData={this.props.updateMetaData} />;
        }
        else {
            bodyComponent = <AddDataContainer metaData={this.props.submission.meta} />;
        }

        return (
            <div className="usa-da-add-data-page">
                <div className="usa-da-site_wrap">
                    <Navbar activeTab="submissionGuide" type={this.props.type} />
                    <SubmissionHeader />
                    <Banner type="dabs" />
                    {bodyComponent}
                </div>
                <Footer />
            </div>
        );
    }
}

AddDataPage.propTypes = propTypes;
AddDataPage.defaultProps = defaultProps;
