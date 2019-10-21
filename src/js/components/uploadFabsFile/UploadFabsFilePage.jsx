/**
* UploadFabsFilePage.jsx
* Created by MichaelHess
*/

import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';

import Footer from '../SharedComponents/FooterComponent';
import Navbar from '../SharedComponents/navigation/NavigationComponent';

import UploadFabsFileMeta from './UploadFabsFileMeta';
import UploadFabsFileValidation from './UploadFabsFileValidation';

const propTypes = {
    setSubmissionId: PropTypes.func,
    setSubmissionState: PropTypes.func,
    history: PropTypes.object,
    params: PropTypes.object,
    route: PropTypes.object,
    submission: PropTypes.object
};

const defaultProps = {
    setSubmissionId: () => {},
    setSubmissionState: () => {},
    history: {},
    params: {},
    route: {},
    submission: {}
};

export default class UploadFabsFilePage extends React.Component {
    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { params } = this.props;
        if (params.submissionID !== prevProps.params.submissionID) {
            this.props.setSubmissionId(params.submissionID);
        }
    }

    validate(submissionID) {
        this.props.setSubmissionId(submissionID);
        hashHistory.push(`/FABSaddData/${submissionID}`);
    }

    render() {
        let content = null;
        if (this.props.params.submissionID) {
            content = (<UploadFabsFileValidation
                {...this.props}
                submission={this.props.submission}
                setSubmissionId={this.props.setSubmissionId} />);
        }
        else {
            content = (<UploadFabsFileMeta
                setSubmissionState={this.props.setSubmissionState}
                setSubmissionId={this.props.setSubmissionId}
                history={this.props.history}
                submission={this.props.submission}
                validate={this.validate} />);
        }
        return (
            <div className="usa-da-upload-fabs-file-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar
                            activeTab="FABSAddData"
                            type={this.props.route.type} />
                        <div className="usa-da-upload-fabs-file-page">
                            <div className="usa-da-site_wrap">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

UploadFabsFilePage.propTypes = propTypes;
UploadFabsFilePage.defaultProps = defaultProps;
