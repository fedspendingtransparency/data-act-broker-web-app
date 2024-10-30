/**
 * DetachedFilesFYPContainer.jsx
 * Created by Lizzie Salita 11/5/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';
import * as GenerateFilesHelper from '../../helpers/generateFilesHelper';

import DetachedFilesFYP from '../../components/generateDetachedFiles/DetachedFilesFYP';

const timerDuration = 10;

const propTypes = {
    session: PropTypes.object
};

const defaultProps = {
    session: null
};

export class DetachedFilesFYPContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileType: 'A',
            fileLabel: 'File A',
            fileTitle: 'File A: Appropriations Accounts',
            errorType: '',
            errorMessage: '',
            status: '',
            showDownload: false,
            jobId: null
        };

        this.generateFYPFile = this.generateFYPFile.bind(this);
        this.fileTypeChanged = this.fileTypeChanged.bind(this);
    }

    clickedDownload() {
        GenerateFilesHelper.fetchDetachedFileUrl(this.state.jobId)
            .then((result) => {
                window.open(result.url);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    generateFYPFile(agency, codeType, period, fy) {
        this.setState({
            status: 'generating',
            errorType: '',
            errorMessage: ''
        });

        const params = {
            file_type: this.state.fileType,
            cgac_code: codeType !== 'frec_code' ? agency : '',
            frec_code: codeType === 'frec_code' ? agency : '',
            year: fy,
            period
        };

        GenerateFilesHelper.generateDetachedFile(params)
            .then((response) => {
                this.parseFileState(response);
            })
            .catch((err) => {
                console.error(err);
                this.parseFileState(err);
            });
    }

    fileTypeChanged(fileType) {
        let fileLabel = '';
        let fileTitle = '';
        if (fileType === 'A') {
            fileLabel = 'File A';
            fileTitle = 'File A: Appropriations Accounts';
        }
        else if (fileType === 'BOC') {
            fileLabel = 'GTAS Comparison Report';
            fileTitle = 'GTAS Comparison Report';
        }
        this.setState({
            fileType,
            fileLabel,
            fileTitle,
            errorType: '',
            errorMessage: '',
            status: '',
            showDownload: false,
            jobId: null
        });
    }

    checkFileStatus(jobId) {
    // callback to check file status
        GenerateFilesHelper.fetchDetachedFile(jobId)
            .then((response) => {
                if (this.isUnmounted) {
                    return;
                }

                this.parseFileState(response);
            })
            .catch((err) => {
                console.error(err);
                this.parseFileState(err);
            });
    }

    parseFileState(data) {
        let runCheck = true;

        if (data.httpStatus === 401) {
            // don't run the check again if it failed
            runCheck = false;

            this.setState({
                errorType: 'Permission Error',
                errorMessage: data.message,
                status: ''
            });
        }
        else if (data.httpStatus === 400) {
            // don't run the check again if it failed
            runCheck = false;

            this.setState({
                errorType: 'Generation Error',
                errorMessage: data.message,
                status: ''
            });
        }
        else if (data.status === 'failed' || data.status === 'invalid') {
            // don't run the check again if it failed
            runCheck = false;

            const message = data.message || `${this.state.fileLabel} could not be generated.`;

            this.setState({
                status: data.status,
                errorType: `${this.state.fileLabel} Error`,
                errorMessage: message
            });
        }
        else if (data.status === 'finished') {
            // don't run the check again if it's done
            runCheck = false;

            this.setState({
                errorType: '',
                errorMessage: '',
                status: 'done',
                showDownload: true,
                jobId: data.job_id
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
        let description = (
            <div>
                <p>
                    Select a Fiscal Year, Period, and Agency, and Data Broker will generate a provisional File A for
                    that agency. You are responsible for reviewing and amending (e.g., if any TAS need to be added or
                    deleted) the generated File A for accuracy and completeness before certifying to it in any
                    submission.
                </p>
                <p>
                    File A generation changes nothing about the existing DABS submission process (including validation,
                    cross-file validation, and certification), other than facilitating reconciliation and providing a
                    starting point for agency submissions. File A is generated outside the submission context. Data
                    Broker will not automatically attach it to any submission.
                </p>
                <p>
                    Consistent with Data Accountability Broker Submissions (DABS) guidelines, generated files are at
                    the &apos;agency-wide level&apos; the goal is to include all accounts for a given agency that are
                    appropriate for DABS submissions. Financing accounts are automatically excluded, and child
                    allocation accounts are bucketed with the child agency. File A is generated based on GTAS SF-133
                    data, which GTAS provides to Data Broker on a daily basis during any reporting/revision windows
                    (note that it will take up to 24 hours for changes agencies make in GTAS to be reflected in Data
                    Broker). For a more detailed explanation of the approach for generating File A, see the Practices
                    and Procedures document available on the&nbsp;
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={"https://fiscal.treasury.gov/data-transparency/" +
                            "GSDM-current.html"}>
                        GSDM
                    </a>
                    &nbsp;page of the Data Transparency site of the Bureau of the Fiscal Service.
                </p>
                <p>
                    Note: Periods are available to generate starting on the 1st of the following month (for example,
                    P02 data will be available to generate starting Dec 1). However, until the GTAS window for a given
                    period is complete, File A data is subject to change and may need to be regenerated in order to
                    reflect the final state of GTAS data after the window closes.

                    While Period 01 data is automatically included with data from later periods (because File A data is
                    cumulative within the Fiscal year), it is not selectable on its own and therefore will not be
                    visible until Dec 1 with Period 02.
                </p>
                <p>
                    Note: The generated File A column GTASStatus contains the status of each TAS in the GTAS system.
                    This data element is for information only. It is not a GSDM data element, and is not required for
                    any File A submissions.
                </p>
            </div>
        );
        if (this.state.fileType === 'BOC') {
            description = (
                <div>
                    <p>
                        This resource can be used to help ensure federal spending transparency data aligns with
                        accounting data by comparing GTAS published data with File B published data. Agencies are
                        encouraged to examine non-zero values in the column DollarAmountGTASSubDataBroker to study
                        differences between the data reported to these systems.
                    </p>
                    <p>
                        Pre-FY25 reports may include misleading PYA information.
                    </p>
                    <p>
                        This report aggregates File B data by TAS, ObjectClass, ByDirectReimbursableFundingSource,
                        DisasterEmergencyFundCode, USSGL, and Begin End Indicator (Fiscal Year Begin (FYB) or Current
                        Period End (CPE)). Note that this report does not aggregate to any Program Activity element.
                    </p>
                    <p>
                        This report uses a different format than File B. File B has a &quot;wide&quot; format with
                        separate columns for relevant combinations of USSGL and Begin End Indicator. This report
                        presents information in a &quot;long&quot; format by creating two separate columns to store
                        these values: USSGLAccountNumber and  BeginEndIndicator. The column DollarAmountDataBroker
                        contains the published File B dollar value for the associated combination of categories. The
                        DollarAmountGTAS column contains the published GTAS dollar value for the associated combination
                        of categories. The column DollarAmountGTASSubDataBroker is calculated by subtracting
                        DollarAmountDataBroker from DollarAmountGTAS. The column FileBRows contains the associated row
                        numbers from the published File B that shares a combination of TAS, ObjectClass,
                        ByDirectReimbursableFundingSource, and DisasterEmergencyFundCode. Since multiple File B rows may
                        share these elements with different Program Activity elements, FileBRows is represented as a
                        comma separated list.
                    </p>
                    <p>
                        This report sources GTAS data from the “OMB Bulk File Extract Expenditure TAS” report from&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.gtas.for.fiscal.treasury.gov/gtas-ui/home">
                            https://www.gtas.for.fiscal.treasury.gov/gtas-ui/home
                        </a> and removes records with Availability Type Code F or C.
                    </p>
                </div>
            );
        }
        return (
            <DetachedFilesFYP
                {...this.props}
                {...this.state}
                generateFYPFile={this.generateFYPFile}
                clickedDownload={this.clickedDownload.bind(this)}
                fileTypeChanged={this.fileTypeChanged}
                description={description} />
        );
    }
}

DetachedFilesFYPContainer.propTypes = propTypes;
DetachedFilesFYPContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(DetachedFilesFYPContainer);
