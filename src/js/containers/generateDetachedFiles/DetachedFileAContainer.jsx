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
            errorType: '',
            errorMessage: '',
            status: '',
            url: ''
        };

        this.request = null;

        this.generateFileA = this.generateFileA.bind(this);
    }

    generateFileA(agency, codeType, quarter, fy) {
        this.setState({
            status: 'generating'
        });

        const params = {
            file_type: 'A',
            cgac_code: codeType !== 'frec_code' ? agency : '',
            frec_code: codeType === 'frec_code' ? agency : '',
            quarter: `Q${quarter}/${fy}`
        };

        GenerateFilesHelper.generateDetachedFile(params)
            .then((response) => {
                this.parseFileState(response);
            })
            .catch(() => {
                this.setState({
                    status: 'failed',
                    errorType: 'Request Error',
                    errorMessage: 'There was a problem with the request.'
                });
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

    render() {
        return (
            <DetachedFileA
                {...this.props}
                {...this.state}
                generateFileA={this.generateFileA} />
        );
    }
}

DetachedFileAContainer.propTypes = propTypes;
DetachedFileAContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(DetachedFileAContainer);
