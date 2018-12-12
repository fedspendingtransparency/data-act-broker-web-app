/**
 * DetachedFileA.jsx
 * Created by Lizzie Salita 11/5/18
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import Footer from '../SharedComponents/FooterComponent';
import AgencyListContainer from '../../containers/SharedContainers/AgencyListContainer';

import { defaultPeriods, availablePeriodsInFY } from '../../helpers/periodPickerHelper';

import * as Icons from '../SharedComponents/icons/Icons';
import * as utils from '../../helpers/util';
import PeriodPicker from './PeriodPicker';
import GenerateButton from './GenerateButton';
import DownloadFile from './DownloadFile';

const initialPeriod = defaultPeriods();

const propTypes = {
    route: PropTypes.object,
    agencyList: PropTypes.object,
    generateFileA: PropTypes.func,
    status: PropTypes.string,
    errorType: PropTypes.string,
    errorMessage: PropTypes.string,
    url: PropTypes.string
};

const defaultProps = {
    route: null,
    agencyList: [],
    generateFileA: () => {},
    status: '',
    errorType: '',
    errorMessage: '',
    url: ''
};

export default class DetachedFileA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agency: '',
            codeType: 'cgac',
            agencyError: false,
            unavailablePeriod: initialPeriod.unavailablePeriod,
            period: initialPeriod.period,
            fy: `${initialPeriod.year}`,
            clickedFields: null
        };

        this.handleAgencyChange = this.handleAgencyChange.bind(this);
        this.pickedYear = this.pickedYear.bind(this);
        this.pickedPeriod = this.pickedPeriod.bind(this);
        this.generate = this.generate.bind(this);
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
        const fyAvailablePeriods = availablePeriodsInFY(fy);
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
        const agencyName = _.find(this.props.agencyList.agencies, { cgac_code: `${this.state.agency}` }).agency_name || 'Unknown Agency';
        const fileInfo = `${agencyName} | FY ${this.state.fy} | 01 October - ${utils.getPeriodTextFromValue(this.state.period)}`;
        this.setState({
            clickedFields: fileInfo
        });
        this.props.generateFileA(this.state.agency, this.state.codeType, parseInt(this.state.period, 10), parseInt(this.state.fy, 10));
    }

    render() {
        let agencyIcon = <Icons.Building />;
        let agencyClass = '';
        if (this.state.agencyError) {
            agencyIcon = <Icons.Building />;
            agencyClass = ' error usa-da-form-icon';
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
                        <Navbar activeTab="submissionGuide" type={this.props.route.type} />
                        <div className="usa-da-content-dark">
                            <div className="container">
                                <div className="row usa-da-page-title">
                                    <div className="col-lg-12 mt-40 mb-20">
                                        <div className="display-2">Generate and Download File A</div>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                                    {agencyIcon}
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
                                                    hours for changes agencies make in GTAS to be reflected in the Broker).
                                                    For a more detailed explanation of the approach for generating File
                                                    A, see the Practices and Procedures document available on the&nbsp;
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://fiscal.treasury.gov/fsservices/
                                                        gov/data-trans/dt-daims.htm">
                                                        DAIMS
                                                    </a>
                                                    &nbsp;page of the Data Transparency site of the
                                                    Bureau of the Fiscal Service.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="file-a-section">
                                            <div className="file-a-section__label">
                                                File A: Appropriations Accounts
                                            </div>

                                            <div className="file-a-section__date">
                                                <PeriodPicker
                                                    periodArray={this.state.periodArray}
                                                    passedPeriod={this.state.period}
                                                    pickedYear={this.pickedYear}
                                                    pickedPeriod={this.pickedPeriod}
                                                    fy={this.state.fy} />
                                            </div>
                                        </div>
                                        <DownloadFile
                                            fileInfo={this.state.clickedFields}
                                            label="File A: Appropriations Accounts"
                                            errorType={this.props.errorType}
                                            errorMessage={this.props.errorMessage}
                                            url={this.props.url} />
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
