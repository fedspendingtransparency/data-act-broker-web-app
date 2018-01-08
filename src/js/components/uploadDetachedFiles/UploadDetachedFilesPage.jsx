/**
* UploadDetachedFilesPage.jsx
* Created by MichaelHess
*/

import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';

import Footer from '../SharedComponents/FooterComponent';
import Navbar from '../SharedComponents/navigation/NavigationComponent';

import UploadDetachedFileMeta from './UploadDetachedFileMeta';
import UploadDetachedFileValidation from './UploadDetachedFileValidation';

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

export default class UploadDetachedFilesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMeta: true
        };
    }

    componentDidMount() {
        let showMeta = true;
        if (this.props.params.submissionID) {
            this.props.setSubmissionId(this.props.params.submissionID);
            showMeta = false;
        }
        if (this.state.showMeta !== showMeta) {
            this.updateMeta(showMeta);
        }
    }

    componentWillReceiveProps(nextProps) {
        let showMeta = false;
        if (nextProps.params.submissionID && this.state.showMeta) {
            this.props.setSubmissionId(this.props.params.submissionID);
        }
        else if (!nextProps.params.submissionID) {
            showMeta = true;
        }
        if (this.state.showMeta !== showMeta) {
            this.updateMeta(showMeta);
        }
    }

    updateMeta(meta) {
        this.setState({
            showMeta: meta
        });
    }

    validate(submissionID) {
        this.props.setSubmissionId(submissionID);
        hashHistory.push('/FABSaddData/' + submissionID);
        this.setState({
            showMeta: false
        });
    }

    render() {
        let content = null;
        if (!this.state.showMeta) {
            content = (<UploadDetachedFileValidation
                {...this.props}
                submission={this.props.submission}
                setSubmissionId={this.props.setSubmissionId.bind(this)} />);
        }
        else {
            content = (<UploadDetachedFileMeta
                setSubmissionState={this.props.setSubmissionState}
                setSubmissionId={this.props.setSubmissionId.bind(this)}
                history={this.props.history}
                submission={this.props.submission}
                validate={this.validate.bind(this)} />);
        }

        return (
            <div className="usa-da-upload-detached-files-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar
                            activeTab="FABSAddData"
                            type={this.props.route.type} />
                        <div className="usa-da-upload-detached-files-page">
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

UploadDetachedFilesPage.propTypes = propTypes;
UploadDetachedFilesPage.defaultProps = defaultProps;
