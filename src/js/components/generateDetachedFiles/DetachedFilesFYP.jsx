/**
 * DetachedFilesFYP.jsx
 * Created by Lizzie Salita 11/5/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import Banner from 'components/SharedComponents/Banner';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import Footer from '../SharedComponents/FooterComponent';
import AgencyListContainer from '../../containers/SharedContainers/AgencyListContainer';

import { defaultPeriods, availablePeriodsInFY } from '../../helpers/periodPickerHelper';

import * as utils from '../../helpers/util';
import GenerateButton from './GenerateButton';
import FileTypeSelect from './FileTypeSelect';
import DownloadFile from './DownloadFile';
import FYPicker from './FYPicker';
import PeriodPicker from './PeriodPicker';

const initialPeriod = defaultPeriods(true);

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs']),
    clickedDownload: PropTypes.func,
    generateFYPFile: PropTypes.func,
    fileTypeChanged: PropTypes.func,
    status: PropTypes.string,
    errorType: PropTypes.string,
    errorMessage: PropTypes.string,
    showDownload: PropTypes.bool,
    fileType: PropTypes.string,
    fileLabel: PropTypes.string,
    fileTitle: PropTypes.string,
    description: PropTypes.element
};

const defaultProps = {
    clickedDownload: null,
    generateFYPFile: () => { },
    fileTypeChanged: () => { },
    status: '',
    errorType: '',
    errorMessage: '',
    showDownload: false,
    fileType: '',
    fileLabel: '',
    fileTitle: '',
    description: null
};

export default class DetachedFilesFYP extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agency: '',
            agencyName: '',
            codeType: 'cgac',
            agencyError: false,
            period: initialPeriod.period,
            fy: `${initialPeriod.year}`,
            periodArray: initialPeriod.periodArray,
            downloadFields: null
        };

        this.handleAgencyChange = this.handleAgencyChange.bind(this);
        this.pickedYear = this.pickedYear.bind(this);
        this.pickedPeriod = this.pickedPeriod.bind(this);
        this.generate = this.generate.bind(this);
    }

    handleAgencyChange(agency, codeType, isValid, agencyName) {
        // display or hide file generation based on agency validity and set agency
        if (agency !== '' && isValid) {
            this.setState({
                agency,
                agencyName,
                codeType,
                agencyError: false
            });
        }
        else {
            this.setState({
                agency: '',
                agencyName: '',
                codeType: null,
                agencyError: true
            });
        }
    }

    pickedYear(fy) {
        const fyAvailablePeriods = availablePeriodsInFY(fy, true);
        this.setState({
            periodArray: fyAvailablePeriods.periodArray,
            period: fyAvailablePeriods.period,
            fy
        });
    }

    pickedPeriod(period) {
        this.setState({
            period
        });
    }

    generate() {
        // it's not possible to not start with October so we will always have the first period be 1
        const minPeriod = utils.getPeriodTextFromValue(1);
        const maxPeriod = utils.getPeriodTextFromValue(this.state.period);

        this.setState({
            downloadFields: `${this.state.agencyName} | FY ${this.state.fy} | ${minPeriod} - ${maxPeriod}`
        });
        this.props.generateFYPFile(this.state.agency, this.state.codeType, this.state.period,
            parseInt(this.state.fy, 10));
    }

    render() {
        let agencyClass = '';
        if (this.state.agencyError) {
            agencyClass = ' error';
        }

        let submissionLink = null;
        if (this.props.status === 'done' && this.props.fileType !== 'BOC') {
            submissionLink = (
                <div className="submission-link">
                    <Link to="/submissionGuide">
                        Start a new submission
                    </Link>
                </div>
            );
        }

        return (
            <div className="usa-da-detached-files-fyp-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide" type={this.props.type} />
                        <div className="usa-da-content-dark">
                            <div className="container">
                                <div className="row usa-da-page-title">
                                    <div className="col-lg-12 mt-40 mb-20">
                                        <div className="display-2">Generate Fiscal Year Period Files</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner type="dabs" />

                        <div className="container center-block">
                            <div className="row text-center usa-da-select-agency">
                                <div className="col-lg-offset-2 col-lg-8 mt-60 mb-60">
                                    <div className="detached-heading">
                                        Please begin by telling us about the file you would like to generate.
                                    </div>
                                    <div className="select-agency-holder">
                                        <div className="row usa-da-select-file-type-label">
                                            Select the type of file you would like to generate.
                                        </div>
                                        <FileTypeSelect
                                            fileType={this.props.fileType}
                                            onChange={this.props.fileTypeChanged} />
                                        <div className="row usa-da-select-agency-label">
                                            The generated file will be used when submitting data for...
                                        </div>
                                        <div className="row">
                                            <div
                                                className="col-sm-12 col-md-12 typeahead-holder"
                                                data-testid="agencytypeahead">
                                                <AgencyListContainer
                                                    placeholder="Enter the name of the reporting agency"
                                                    onSelect={this.handleAgencyChange}
                                                    customClass={agencyClass} />
                                                <div className={`usa-da-icon usa-da-form-icon${agencyClass}`}>
                                                    <FontAwesomeIcon icon={['far', 'building']} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="description">
                                            <div className="description__content">
                                                {this.props.description}
                                            </div>
                                        </div>
                                        <div className="files-fyp-section">
                                            <div className="files-fyp-section__label">
                                                {this.props.fileTitle}
                                            </div>

                                            <div className="files-fyp-section__date">
                                                <FYPicker
                                                    fy={`${this.state.fy}`}
                                                    pickedYear={this.pickedYear} />
                                                <PeriodPicker
                                                    period={this.state.period}
                                                    periodArray={this.state.periodArray}
                                                    pickedPeriod={this.pickedPeriod} />

                                            </div>
                                        </div>
                                        <DownloadFile
                                            fileInfo={this.state.downloadFields}
                                            label={this.props.fileTitle}
                                            errorType={this.props.errorType}
                                            errorMessage={this.props.errorMessage}
                                            clickedDownload={this.props.clickedDownload}
                                            showDownload={this.props.showDownload}
                                            status={this.props.status} />
                                        <GenerateButton
                                            agency={this.state.agency}
                                            generate={this.generate}
                                            status={this.props.status}
                                            fileLabel={this.props.fileLabel} />
                                        {submissionLink}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

DetachedFilesFYP.propTypes = propTypes;
DetachedFilesFYP.defaultProps = defaultProps;
