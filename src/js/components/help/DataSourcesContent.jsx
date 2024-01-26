/**
 * DataSourcesContent.jsx
 * Created by Alisa Burdeyny 9/03/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import DataSourcesItem from 'components/help/DataSourcesItem';
import { kGlobalConstants } from '../../GlobalConstants';

const propTypes = {
    updateDates: PropTypes.object
};

const defaultProps = {
    updateDates: {}
};

export default class DataSourcesContent extends React.Component {
    render() {
        const fileLoc = kGlobalConstants.PROD ? 'files' : 'files-nonprod';
        // This doesn't fit on the line
        // TODO: swap back to these versions of the consts once we start pulling the new data again
        // const cityURL = 'https://prd-tnm.s3.amazonaws.com/StagedProducts/GeographicNames/FederalCodes/' +
        //     'FedCodes_National_Text.zip';
        // const cityTxtURL = `https://${fileLoc}.usaspending.gov/reference_data/FederalCodes_National.txt`;
        // const countyURL = 'https://prd-tnm.s3.amazonaws.com/StagedProducts/GeographicNames/Topical/' +
        //     'GovernmentUnits_National_Text.zip';
        // const countyTxtURL = `https://${fileLoc}.usaspending.gov/reference_data/GovernmentUnits_National.txt`;
        const cityURL = 'https://www.usgs.gov/core-science-systems/ngp/board-on-geographic-names/download-gnis-data';
        const cityTxtURL = `https://${fileLoc}.usaspending.gov/reference_data/NationalFedCodes.txt`;
        const countyURL = 'https://geonames.usgs.gov/docs/stategaz/GOVT_UNITS.zip';
        const countyTxtURL = `https://${fileLoc}.usaspending.gov/reference_data/GOVT_UNITS.txt`;
        const countryURL = 'https://nsgreg.nga.mil/registries/browse/results.jsp?registryType=genc&' +
            'registerField=IE4&browseType=genc';
        return (
            <div className="usa-da-help-content">
                <div className="data-sources-page">
                    <h2>Data Sources</h2>
                    <DataSourcesItem
                        title="Assistance Listings"
                        uses="FABS validations and derivations"
                        description={"A list of current and past financial assistance programs broken up by agency" +
                            " and with associated metadata. Program data is  updated as needed (e.g., when new" +
                            " programs are created) and at least yearly as part of an annual required update."}
                        source={
                            <p>
                                The General Services Administration (GSA) Integrated Award Environment (IAE) loads a
                                weekly USAspending Assistance Listing file to SAM.gov AWS S3 bucket and we load each new
                                file into the Broker when it becomes available. The file is complete and includes
                                retired Assistance Listings (including deactivation date). The latest file loaded into
                                the Broker can be downloaded at:&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://${fileLoc}.usaspending.gov/reference_data/assistance_listing.csv`}>
                                    https://{fileLoc}.usaspending.gov/reference_data/assistance_listing.csv
                                </a>
                                .
                            </p>}
                        updatedAt={this.props.updateDates.cfda} />

                    <DataSourcesItem
                        title="Agency"
                        uses={"Creating submissions, DABS File D1/D2 generation, FABS validations and derivations," +
                            " and USAspending derivations"}
                        description="A hierarchical list of toptier and subtier agencies and associated metadata."
                        source={
                            <p>
                                Updated periodically (e.g., due to changes in the IAE Federal Hierarchy or the A-11
                                Circular Appendix C). The latest file loaded into the Broker can be downloaded at&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://${fileLoc}.usaspending.gov/reference_data/agency_codes.csv`}>
                                    https://{fileLoc}.usaspending.gov/reference_data/agency_codes.csv
                                </a>
                                .
                            </p>}
                        updatedAt={this.props.updateDates.agency} />

                    <DataSourcesItem
                        title="Central Accounting Reporting System (CARS)/ Treasury Account Symbols (TAS)"
                        uses="DABS validations and USAspending derivations"
                        description={"Treasury Account Symbols are the account identification codes assigned by the" +
                            " Department of the Treasury to individual appropriation, receipt, or other fund" +
                            " accounts. All financial transactions of the Federal Government are classified by TAS" +
                            " for reporting to the Department of the Treasury and the Office of Management and" +
                            " Budget. This file includes a list of TAS and associated metadata."}
                        source={
                            <p>
                                This file is manually placed into a shared S3 bucket by FRB and translated into a
                                CSV by the Broker. New files are received up to daily during the GTAS window each
                                period. The latest file loaded into the Broker can be downloaded at&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://${fileLoc}.usaspending.gov/reference_data/cars_tas.csv`}>
                                    https://{fileLoc}.usaspending.gov/reference_data/cars_tas.csv
                                </a>
                                .
                            </p>}
                        updatedAt={this.props.updateDates.tas} />

                    <DataSourcesItem
                        title="City"
                        uses="FABS validations and derivations"
                        description={"A list of cities in the United States/territories and associated metadata," +
                            " including the 5 character identifying codes and the states and counties they are part" +
                            " of."}
                        source={
                            <p>
                                Zip obtained from&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={cityURL}>
                                    {cityURL}
                                </a>
                                &nbsp;and updated monthly if new data is available. The latest file loaded into the
                                Broker can be downloaded at&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={cityTxtURL}>
                                    {cityTxtURL}
                                </a>
                                . NOTE: The complete set of codes is present in this file, including FEATURE_CLASS
                                values that are not used in the Broker. The Broker database only loads and accepts from
                                users those codes with a FEATURE_CLASS of Civil, Census, Locale, and Populated Place.
                            </p>}
                        updatedAt={this.props.updateDates.city} />

                    <DataSourcesItem
                        title="Congressional District"
                        uses="FABS validations and derivations"
                        description={"A two digit code indicating the congressional district along with associated" +
                            " metadata including the state it is tied to."}
                        source={
                            <div>
                                <p>
                                    The set of congressional districts is automatically updated based on data from
                                    USPS’s Postal Pro products that we purchase (see ’Zip Code’ entry for more information).
                                    In practice, the list of congressional districts only change every ten years on the
                                    first election after a new census. Our table also includes historical congressional
                                    districts from the 2000 census that no longer exist but that are still relevant to open
                                    awards.
                                </p>
                                <p>
                                    The latest Broker file can be downloaded at&nbsp;
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://${fileLoc}.usaspending.gov/reference_data/` +
                                            `state_congressional.csv`}>
                                        https://{fileLoc}.usaspending.gov/reference_data/state_congressional.csv
                                    </a>
                                    . It includes the code, state code, and the &#34;census_year&#34; column. If the &#34;census_year&#34; column is:
                                    <ul>
                                        <li>blank, that CD has existed since a previous census and is still active.</li>
                                        <li>before the most recent census (ex. 2000 or 2010), those CDs are no longer active but maintained in the file for older validations.</li>
                                        <li>the most recent census (ex. 2020), these CDs were added based on the most recent census.</li>
                                    </ul>
                                </p>
                            </div>}
                        updatedAt={this.props.updateDates.congressional_district} />

                    <DataSourcesItem
                        title="Country Code"
                        uses="FABS validations and derivations"
                        description={"All current countries as recognized under the GENC standard along with their" +
                            " two- and three-character abbreviations."}
                        source={
                            <p>
                                Gathered weekly from the NSG Standards Registry API. The data is only updated if changes
                                have occurred and reflects the following table:&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={countryURL}>
                                    {countryURL}
                                </a>
                                . The latest Broker file can be downloaded at&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://${fileLoc}.usaspending.gov/reference_data/country_codes.csv`}>
                                    https://{fileLoc}.usaspending.gov/reference_data/country_codes.csv
                                </a>
                                .
                            </p>}
                        updatedAt={this.props.updateDates.country_code} />

                    <DataSourcesItem
                        title="County"
                        uses="FABS validations and derivations"
                        description={"A list of all counties in the US and its territories, including their name," +
                            " code, and the state to which they belong."}
                        source={
                            <p>
                                Zip obtained from&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={countyURL}>
                                    {countyURL}
                                </a>
                                &nbsp;and updated monthly if new data is available. The latest file loaded into the
                                Broker can be downloaded at&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={countyTxtURL}>
                                    {countyTxtURL}
                                </a>
                                .
                            </p>}
                        updatedAt={this.props.updateDates.county_code} />

                    <DataSourcesItem
                        title="Disaster Emergency Fund Codes (DEFC)"
                        uses="DABS validations and USAspending derivations"
                        description={"A list of disaster emergency fund codes that have been created for budgetary" +
                            " tracking pursuant to the Balanced Budget and Emergency Deficit Control Act of 1985" +
                            " (BBEDCA), and additionally for certain non-BBEDCA tracking of prominent supplementary" +
                            " spending bills such as the CARES Act or the Infrastructure Investment and Jobs Act." +
                            " DEFC are used to track these supplemental appropriations from their initial" +
                            " appropriation down to obligation and outlay (including at the award level) in both" +
                            " GTAS and USAspending reporting."}
                        source={
                            <p>
                                The DEFC table is manually maintained and updated any time OMB issues a new Disaster
                                Emergency Fund Code. The authoritative list of OMB codes is&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://community.max.gov/x/cYW9V">
                                    here
                                </a>
                                . There is sometimes a bit of lag between when the code is issued and its
                                integration into the Broker, but the codes will always be added before the relevant
                                DABS window when they can first be used. The complete table currently in use by the
                                Broker can be downloaded here:&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://${fileLoc}.usaspending.gov/reference_data/def_codes.csv`}>
                                    https://{fileLoc}.usaspending.gov/reference_data/def_codes.csv
                                </a>
                                .
                            </p>}
                        updatedAt={this.props.updateDates.defc} />

                    <DataSourcesItem
                        title="Executive Compensation"
                        uses="Appending executive compensation information to all awards on USAspending"
                        description={"For SAM-registered entities that meet certain criteria outlined in FFATA, the" +
                            " names and yearly income of the five most highly compensated employees."}
                        source={
                            <p>SAM.gov monthly and daily files from their site. File is FOUO so is not available
                                for download.
                            </p>}
                        updatedAt={this.props.updateDates.executive_compensation} />

                    <DataSourcesItem
                        title="FPDS"
                        uses="DABS D1 file and USAspending"
                        description="All transactions for IDV and Contract Awards."
                        source={
                            <p>
                                The daily FPDS update/delete Atom feeds, which contain updates made during the
                                previous day in FPDS. Specific entries can be searched for on their website at&nbsp;
                                <a target="_blank" rel="noopener noreferrer" href="https://fpds.gov">
                                    https://fpds.gov
                                </a>
                                . Data is not available for download on this page, but the data can be found on
                                USAspending or in D1 file generation elsewhere on the Broker.
                            </p>}
                        updatedAt={this.props.updateDates.fpds} />

                    <DataSourcesItem
                        title="GTAS/SF-133"
                        uses="DABS validations"
                        description={"Detailed information about the balances of each TAS, as well as a breakdown of" +
                            " those balances by Disaster Emergency Fund Code (DEFC)."}
                        source={
                            <p>This file is manually placed into a shared S3 bucket by FRB and translated into a CSV
                                by the Broker on a daily basis during the GTAS window each period.
                            </p>}
                        updatedAt={this.props.updateDates.gtas} />

                    <DataSourcesItem
                        title="Object Class"
                        uses="DABS validations and USAspending derivations"
                        description={"Categories in a classification system that presents obligations by the items" +
                            " or services purchased by the Federal Government. Each specific object class is defined" +
                            " in OMB Circular A-11 § 83.6."}
                        source={
                            <p>
                                OMB Circular A-11 object classes manually encoded in CSV form and updated as needed.
                                The latest Broker file can be downloaded at&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://${fileLoc}.usaspending.gov/reference_data/object_class.csv`}>
                                    https://{fileLoc}.usaspending.gov/reference_data/object_class.csv
                                </a>
                                .
                            </p>}
                        updatedAt={this.props.updateDates.object_class} />

                    <DataSourcesItem
                        title="Office"
                        uses="FABS validations and derivations"
                        description={"The offices listed under each agency and subtier agency and associated metadata" +
                            " including  code, name, office type, hierarchy, etc."}
                        source={
                            <p>The Federal Hierarchy FOUO API maintained by GSA. Data is FOUO so is not available
                                for download.
                            </p>}
                        updatedAt={this.props.updateDates.office} />

                    <DataSourcesItem
                        title="Program Activity"
                        uses="DABS validations"
                        description={"A specific activity or project as listed in the program and financing schedules" +
                            " of the annual budget of the United States Government."}
                        source={
                            <p>
                                OMB conducts a monthly MAX Collect exercise to update this data, which is available
                                here:&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://community.max.gov/x/r4NkS">
                                    https://community.max.gov/x/r4NkS
                                </a>
                                . When any updates are available, OMB MAX places that data into an S3 bucket for
                                Broker to process on a daily basis (containing updates from the previous day). The
                                latest file loaded by the Broker is available here:&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://${fileLoc}.usaspending.gov/reference_data/program_activity.csv`}>
                                    https://{fileLoc}.usaspending.gov/reference_data/program_activity.csv
                                </a>
                                .
                            </p>}
                        updatedAt={this.props.updateDates.program_activity} />

                    <DataSourcesItem
                        title="State"
                        uses="FABS validations and derivations"
                        description="The name, abbreviation, and FIPS code for all states in the US."
                        source={
                            <p>
                                A manually compiled list of US states and territories. The latest file loaded by the
                                Broker is available at&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://${fileLoc}.usaspending.gov/reference_data/state_list.csv`}>
                                    https://{fileLoc}.usaspending.gov/reference_data/state_list.csv
                                </a>
                                .
                            </p>}
                        updatedAt={this.props.updateDates.state_code} />

                    <DataSourcesItem
                        title="Subaward"
                        uses=" DABS File F and USAspending"
                        description={"Subcontract and subgrant data reported to the FFATA Subaward Reporting System" +
                            " (FSRS) run by the GSA IAE by prime awardees that meet the reporting requirements."}
                        source={
                            <p>Loaded in from the FSRS API on a daily basis. Loads contain updates from the previous
                                day in FSRS. Data is not available for download on this page, but the data can be found
                                on USAspending or in  File F generation elsewhere on the Broker.
                            </p>}
                        updatedAt={this.props.updateDates.subaward} />

                    <DataSourcesItem
                        title="UEI"
                        uses="FABS validations and derivations"
                        description={"The unique identification number for an awardee or recipient and associated" +
                            " metadata, including any parent organization. The identifier is the 12 character" +
                            " government-owned Unique Entity Identifier (UEI)."}
                        source={
                            <p>SAM.gov monthly and daily files from their site. Daily files contain actions from the
                                previous day in SAM. File is FOUO so is not available for download.
                            </p>}
                        updatedAt={this.props.updateDates.recipient} />

                    <DataSourcesItem
                        title="Zip Code"
                        uses="FABS validations and derivations"
                        description={"Five or nine digit zip codes issued by the US Postal Service, and associated" +
                            " metadata such as the congressional district, city, and county tied to the zip code."}
                        source={
                            <p>Set of zip code data files purchased from USPS via their Postal Pro Product. Data is
                                proprietary so is not available for download on this page.
                            </p>}
                        updatedAt={this.props.updateDates.zip_code} />
                </div>
            </div>
        );
    }
}

DataSourcesContent.propTypes = propTypes;
DataSourcesContent.defaultProps = defaultProps;
