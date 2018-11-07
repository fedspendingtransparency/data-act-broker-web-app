/**
 * DetachedFileAContainer.jsx
 * Created by Lizzie Salita 11/5/18
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';
import * as GenerateFilesHelper from '../../helpers/generateFilesHelper';

import DetachedFileA from '../../components/generateDetachedFiles/DetachedFileA';

const timerDuration = 10;

const propTypes = {
    session: PropTypes.object
};

const defaultProps = {
    session: null
};

export class DetachedFileAContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agency: '',
            codeType: 'cgac',
            agencyError: false,
            fy: '2019',
            quarter: 1,
            errorType: '',
            errorMessage: '',
            status: '',
            url: ''
        };

        this.request = null;

        this.generateFileA = this.generateFileA.bind(this);
        this.handleAgencyChange = this.handleAgencyChange.bind(this);
        this.pickedYear = this.pickedYear.bind(this);
        this.pickedQuarter = this.pickedQuarter.bind(this);
    }

    updateError(message = '') {
        // Show any error that occurs at any point during file upload
        this.setState({
            error: message
        });
    }

    generateFileA() {
        this.setState({
            status: 'generating'
        });

        const params = {
            agency: this.state.agency,
            fy: this.state.fy,
            quarter: this.state.quarter
        };

        GenerateFilesHelper.generateDetachedFile(params)
            .then((response) => {
                this.parseFileState(response);
            });
    }

    parseFileState(data) {
        let runCheck = true;

        if (data.httpStatus === 401) {
            // don't run the check again if it failed
            runCheck = false;

            this.setState({
                errorType: 'Permission Error',
                errorMessage: data.message
            });
        }
        else if (data.status === 'failed' || data.status === 'invalid') {
            // don't run the check again if it failed
            runCheck = false;

            const message = data.message || 'File A could not be generated.';

            this.setState({
                errorType: 'File A Error',
                errorMessage: message
            });
        }
        else if (data.status === 'finished') {
            // don't run the check again if it's done
            runCheck = false;

            this.setState({
                errorType: '',
                errorMessage: ''
            });

            this.setState({
                status: 'done',
                url: data.url
            });
        }
        if (runCheck) {
            // wait 5 seconds and check the file status again
            window.setTimeout(() => {
                this.checkFileStatus(data.job_id);
            }, timerDuration * 1000);
        }
    }

    handleAgencyChange(agency, codeType, isValid) {
        // display or hide file generation based on agency validity and set agency
        if (agency !== '' && isValid) {
            this.setState({
                agency,
                codeType,
                agencyError: false
            });
        }
        else {
            this.setState({
                agency: '',
                codeType: null,
                agencyError: true
            });
        }
    }

    pickedYear(fy) {
        this.setState({
            fy
        });
    }

    pickedQuarter(quarter) {
        this.setState({
            quarter
        });
    }

    render() {
        return (
            <DetachedFileA
                {...this.props}
                generateFileA={this.generateFileA}
                handleAgencyChange={this.handleAgencyChange}
                agencyError={this.state.agencyError}
                status={this.state.status}
                pickedYear={this.pickedYear}
                pickedQuarter={this.pickedQuarter}
                fy={this.state.fy}
                quarter={this.state.quarter} />
        );
    }
}

DetachedFileAContainer.propTypes = propTypes;
DetachedFileAContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(DetachedFileAContainer);
