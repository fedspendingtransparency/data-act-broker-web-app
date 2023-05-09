/**
 * DetachedFileA.jsx
 * Created by Lizzie Salita 11/5/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from 'components/SharedComponents/Banner';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import Footer from '../SharedComponents/FooterComponent';
import AgencyListContainer from '../../containers/SharedContainers/AgencyListContainer';

import { defaultPeriods, availablePeriodsInFY } from '../../helpers/periodPickerHelper';

import * as utils from '../../helpers/util';
import GenerateButton from './GenerateButton';
import DownloadFile from './DownloadFile';
import FYPicker from './FYPicker';
import PeriodPicker from './PeriodPicker';

const initialPeriod = defaultPeriods(true);

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs']),
    clickedDownload: PropTypes.func,
    generateFileA: PropTypes.func,
    status: PropTypes.string,
    errorType: PropTypes.string,
    errorMessage: PropTypes.string,
    showDownload: PropTypes.bool
};

const defaultProps = {
    clickedDownload: null,
    generateFileA: () => { },
    status: '',
    errorType: '',
    errorMessage: '',
    showDownload: false
};

export default class DetachedFileA extends React.Component {
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
        this.props.generateFileA(this.state.agency, this.state.codeType, this.state.period,
            parseInt(this.state.fy, 10));
    }

    render() {
        let agencyClass = '';
        if (this.state.agencyError) {
            agencyClass = ' error';
        }

        let submissionLink = null;
        if (this.props.status === 'done') {
            submissionLink = (
                <div className="submission-link">
                    <a href="/#/submissionGuide">
                        Start a new submission
                    </a>
                </div>
            );
        }

        return (
            <div className="usa-da-detached-file-a-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide" type={this.props.type} />
                        <div className="usa-da-content-dark">
                            <div className="container">
                                <div className="row usa-da-page-title">
                                    <div className="col-lg-12 mt-40 mb-20">
                                        <div className="display-2">Generate and Download File A</div>
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
                                                <p>
                                                    Select a Fiscal Year, Period, and Agency, and the Broker will
                                                    generate a provisional File A for that agency. You are responsible
                                                    for reviewing and amending (e.g., if any TAS need to be added or
                                                    deleted) the generated File A for accuracy and completeness before
                                                    certifying to it in any submission.
                                                </p>
                                                <p>
                                                    File A generation changes nothing about the existing DABS
                                                    submission process (including validation, cross-file validation,
                                                    and certification), other than facilitating reconciliation and
                                                    providing a starting point for agency submissions. File A is
                                                    generated outside the submission context. The Broker will not
                                                    automatically attach it to any submission.
                                                </p>
                                                <p>
                                                    Consistent with DATA Act Broker Quarterly Submissions (DABS)
                                                    guidelines, generated files are at the &apos;agency-wide level&apos;
                                                    the goal is to include all accounts for a given agency that are
                                                    appropriate for DATA Act submissions. Financing accounts are
                                                    automatically excluded, and child allocation accounts are bucketed
                                                    with the child agency. File A is generated based on GTAS SF-133
                                                    data, which GTAS provides to the Broker on a daily basis during any
                                                    reporting/revision windows (note that it will take up to 24
                                                    hours for changes agencies make in GTAS to be reflected in the
                                                    Broker). For a more detailed explanation of the approach for
                                                    generating File A, see the Practices and Procedures document
                                                    available on the&nbsp;
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={"https://fiscal.treasury.gov/data-transparency/" +
                                                            "DAIMS-current.html"}>
                                                        DAIMS
                                                    </a>
                                                    &nbsp;page of the Data Transparency site of the
                                                    Bureau of the Fiscal Service.
                                                </p>
                                                <p>
                                                    Note: Periods are available to generate starting on the 1st of the
                                                    following month (for example, P02 data will be available to generate
                                                    starting Dec 1). However, until the GTAS window for a given period
                                                    is complete, File A Data is subject to change and may need to be
                                                    regenerated in order to reflect the final state of GTAS data after
                                                    the window closes.

                                                    While Period 01 data is automatically included with data from later
                                                    periods (because File A Data is cumulative within the Fiscal year),
                                                    it is not selectable on its own and therefore will not be visible
                                                    until Dec 1 with Period 02.
                                                </p>
                                                <p>
                                                    Note: The generated file A column GTASStatus contains the status of
                                                    each TAS in the GTAS system. This data element is for information
                                                    only. It is not a DAIMS data element, and is not required for any
                                                    File A submissions.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="file-a-section">
                                            <div className="file-a-section__label">
                                                File A: Appropriations Accounts
                                            </div>

                                            <div className="file-a-section__date">
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
                                            label="File A: Appropriations Accounts"
                                            errorType={this.props.errorType}
                                            errorMessage={this.props.errorMessage}
                                            clickedDownload={this.props.clickedDownload}
                                            showDownload={this.props.showDownload}
                                            status={this.props.status} />
                                        <GenerateButton
                                            agency={this.state.agency}
                                            generate={this.generate}
                                            status={this.props.status} />
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

DetachedFileA.propTypes = propTypes;
DetachedFileA.defaultProps = defaultProps;
