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
        const cityURL = 'https://prd-tnm.s3.amazonaws.com/StagedProducts/GeographicNames/FederalCodes/' +
            'FedCodes_National_Text.zip';
        const cityTxtURL = `https://${fileLoc}.usaspending.gov/reference_data/FederalCodes_National.txt`;
        const countyURL = 'https://prd-tnm.s3.amazonaws.com/StagedProducts/GeographicNames/Topical/' +
            'GovernmentUnits_National_Text.zip';
        const countyTxtURL = `https://${fileLoc}.usaspending.gov/reference_data/GovernmentUnits_National.txt`;
        const countryURL = 'https://nsgreg.nga.mil/registries/browse/results.jsp?registryType=genc&' +
            'registerField=IE4&browseType=genc';
        return (
            <div className="usa-da-help-content">
                <div className="data-sources-page">
                    <h2>Data Sources</h2>
                    <DataSourcesItem
                        title="Assistance Listings (CFDA)"
                        uses="FABS validations and derivations"
                        description={"A list of current and past financial assistance programs broken up by agency" +
                            " and with associated metadata. Program data is  updated as needed (e.g., when new" +
                            " programs are created) and at least yearly as part of an annual required update."}
                        source={
                            <p>
                                The General Services Administration (GSA) Integrated Award Environment (IAE) loads a
                                weekly USAspending Assistance Listing file to SAM.gov AWS S3 bucket and we load each new
                                file into Data Broker when it becomes available. The file is complete and includes
                                retired Assistance Listings (including deactivation date). Data Broker currently uses
                                this Assistance Listing information:&nbsp;
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
                                Circular Appendix C). Data Broker currently uses this agency information:&nbsp;
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
                                CSV by Data Broker. New files are received up to daily during the GTAS window each
                                period. Data Broker currently uses this CARS/TAS information:&nbsp;
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
                                &nbsp;and updated monthly if new data is available. Data Broker currently uses this city
                                information:&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={cityTxtURL}>
                                    {cityTxtURL}
                                </a>
                                . NOTE: The complete set of codes is present in this file, including FEATURE_CLASS
                                values that are not used in Data Broker. Data Broker only loads and accepts from users
                                those codes with a FEATURE_CLASS of Civil, Census, Locale, and Populated Place.
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
                                    The set of congressional districts is automatically updated based on data from the
                                    USPS Postal Pro City State Product (
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://postalpro.usps.com/address-quality/city-state-product">
                                        https://postalpro.usps.com/address-quality/city-state-product
                                    </a>
                                    ). Data Broker uses the City State Product — Detail Record. The layout for this
                                    file is defined in the Address Information System Products Technical Guide (
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://postalpro.usps.com/address-quality/AIS_Products_Technical_Guide">
                                        https://postalpro.usps.com/address-quality/AIS_Products_Technical_Guide
                                    </a>
                                    ). In practice, the list of congressional districts only change every ten years on
                                    the first election after a new census. Our table also includes historical
                                    congressional districts from the 2000 census that no longer exist but that are still
                                    relevant to open awards.
                                </p>
                                <p>
                                    Data Broker currently uses this Congressional District information:&nbsp;
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://${fileLoc}.usaspending.gov/reference_data/` +
                                            `state_congressional.csv`}>
                                        https://{fileLoc}.usaspending.gov/reference_data/state_congressional.csv
                                    </a>
                                    . It includes the code, state code, and the &#34;census_year&#34; column. If
                                    the &#34;census_year&#34; column is:
                                    <ul>
                                        <li>blank, that CD has existed since a previous census and is still active.</li>
                                        <li>
                                            before the most recent census (ex. 2000 or 2010), those CDs are no longer
                                            active but maintained in the file for older validations.
                                        </li>
                                        <li>
                                            the most recent census (ex. 2020), these CDs were added based on the most
                                            recent census.
                                        </li>
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
                                . Data Broker currently uses this country code information:&nbsp;
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
                                &nbsp;and updated monthly if new data is available. Data Broker currently uses this
                                county information:&nbsp;
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
                                The DEFC table is updated any time OMB issues a new Disaster Emergency Fund Code.
                                The authoritative list of OMB codes is&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://community.max.gov/x/cYW9V">
                                    here
                                </a>
                                . The authoritative OMB list is augmented with information from&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.govinfo.gov/app/collection/plaw">
                                    https://www.govinfo.gov/app/collection/plaw
                                </a>
                                . Data Broker currently uses this DEFC information:&nbsp;
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
                        title="Federal Procurement Data System (FPDS)"
                        uses="DABS D1 file and USAspending"
                        description="All transactions for IDV and Contract Awards."
                        source={
                            <p>
                                The daily FPDS update/delete ATOM feeds, which contain updates made during the
                                previous day in FPDS. Specific entries can be searched for on their website at&nbsp;
                                <a target="_blank" rel="noopener noreferrer" href="https://fpds.gov">
                                    https://fpds.gov
                                </a>
                                . More information about the ATOM feed is available online:&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.fpds.gov/fpdsng_cms/index.php/en/worksite.html">
                                    https://www.fpds.gov/fpdsng_cms/index.php/en/worksite.html
                                </a>
                                . Data is not available for download on this page, but the data can be found on
                                USAspending or in D1 file generation elsewhere on Data Broker.
                            </p>}
                        updatedAt={this.props.updateDates.fpds} />

                    <DataSourcesItem
                        title="Funding Opportunity Number"
                        uses="FABS Validations"
                        description={"A number created by a federal agency to identify a grant opportunity within" +
                            " the Grants.gov system."}
                        source={
                            <p>
                                <a target="_blank" rel="noopener noreferrer" href="http://grants.gov/">
                                    Grants.gov
                                </a>
                                &nbsp;publishes FONs on&nbsp;
                                <a target="_blank" rel="noopener noreferrer" href="https://grants.gov/search-grants">
                                    https://grants.gov/search-grants
                                </a>
                                . Data Broker uses an API exposed on this page to download all FONs daily. Data Broker
                                currently uses this Funding Opportunity Number information:&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://${fileLoc}.usaspending.gov/reference_data/` +
                                        "funding_opportunity_numbers.csv"}>
                                    https://{fileLoc}.usaspending.gov/reference_data/funding_opportunity_numbers.csv
                                </a>.
                            </p>}
                        updatedAt={this.props.updateDates.funding_opportunity_number} />

                    <DataSourcesItem
                        title="GTAS/SF-133"
                        uses="DABS validations"
                        description={"Detailed information about the balances of each TAS, as well as a breakdown of" +
                            " those balances by Disaster Emergency Fund Code (DEFC)."}
                        source={
                            <p>
                                This file is manually placed into a shared S3 bucket by the Federal Reserve Bank and
                                translated into a CSV by Data Broker on a daily basis during the GTAS window each
                                period. The GTAS Comparison report uses data from the &quot;OMB Bulk File Extract
                                Expenditure TAS&quot; report from&nbsp;
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.gtas.for.fiscal.treasury.gov/gtas-ui/home">
                                    https://www.gtas.for.fiscal.treasury.gov/gtas-ui/home
                                </a>.
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
                                Data Broker currently uses this Object Class information:&nbsp;
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
                            <p>
                                Data Broker uses the&nbsp;
                                <a target="_blank" rel="noopener noreferrer" href="http://sam.gov/">
                                    SAM.gov
                                </a>
                                &nbsp;FH FOUO API (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://open.gsa.gov/api/fh-fouo-api/">
                                    https://open.gsa.gov/api/fh-fouo-api/
                                </a>
                                ) to load office data nightly. More information about the elements in this API is
                                available in the SAM Functional Data Dictionary (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"https://open.gsa.gov/api/entity-api/v1/SAM%20Functional%20Data%20" +
                                       "Dictionary.pdf"}>
                                    https://open.gsa.gov/api/entity-api/v1/SAM%20Functional%20Data%20Dictionary.pdf
                                </a>
                                ). This data is For Official Use Only (FOUO) and is thus not available for download on
                                this page.
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
                                . When any updates are available, OMB MAX places that data into an S3 bucket for Data
                                Broker to process on a daily basis (containing updates from the previous day). Data
                                Broker currently uses this Program Activity information:&nbsp;
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
                        title="Program Activity Reporting Key (PARK)"
                        uses="DABS validations"
                        description={"The Program Activity Reporting Key (PARK) is a unique identifier assigned by" +
                            " OMB used for tracking Program Activity by TAS and used for mapping records to the" +
                            " USAspending display. This unique code identifies specific activity or project as listed" +
                            " in the program and financing schedules of the annual budget of the United States" +
                            " Government."}
                        source={
                            <p>(Not determined yet as of 2.14.25)</p>}
                        updatedAt={this.props.updateDates.park} />

                    <DataSourcesItem
                        title="State/Territory"
                        uses="FABS validations and derivations"
                        description="The name, abbreviation, and FIPS code for all states and territories in the US."
                        source={
                            <p>
                                A manually compiled list of US states and territories. Data Broker currently uses this
                                state/territory information:&nbsp;
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
                                on USAspending or in  File F generation elsewhere on Data Broker.
                            </p>}
                        updatedAt={this.props.updateDates.subaward} />

                    <DataSourcesItem
                        title="Unique Entity Identifier (UEI) and Business Name"
                        uses="FABS validations and derivations"
                        description={"The unique identification number for an awardee or recipient and associated" +
                            " metadata, including any parent organization. The identifier is the 12 character" +
                            " government-owned Unique Entity Identifier (UEI)."}
                        source={
                            <p>
                                Data Broker uses the&nbsp;
                                <a target="_blank" rel="noopener noreferrer" href="http://sam.gov/">
                                    SAM.gov
                                </a>
                                &nbsp;Entity/Exclusions Extracts Download APIs (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://open.gsa.gov/api/sam-entity-extracts-api/">
                                    https://open.gsa.gov/api/sam-entity-extracts-api/
                                </a>
                                ) to load UEI and business name data nightly. More information about the elements in
                                this API is available in the SAM Functional Data Dictionary (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"https://open.gsa.gov/api/entity-api/v1/" +
                                        "SAM%20Functional%20Data%20Dictionary.pdf"}>
                                    https://open.gsa.gov/api/entity-api/v1/SAM%20Functional%20Data%20Dictionary.pdf
                                </a>
                                ). Data is FOUO so is not available for download.<br /><br />

                                Data Broker loads SAM.gov monthly and daily files from their site. Daily files contain
                                actions from the previous day in SAM. This data is For Official Use Only (FOUO) and is
                                thus not available for download on this page.
                            </p>}
                        updatedAt={this.props.updateDates.recipient} />

                    <DataSourcesItem
                        title="Zip Code"
                        uses="FABS validations and derivations"
                        description={"Five or nine digit zip codes issued by the US Postal Service, and associated" +
                            " metadata such as the congressional district, city, and county tied to the zip code."}
                        source={
                            <p>
                                Zip codes are automatically updated based on data from the USPS Postal Pro City State
                                Product (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://postalpro.usps.com/address-quality/city-state-product">
                                    https://postalpro.usps.com/address-quality/city-state-product
                                </a>
                                ) and ZIP + 4&reg; Product (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://postalpro.usps.com/address-quality-solutions/zip-4-product">
                                    https://postalpro.usps.com/address-quality-solutions/zip-4-product
                                </a>
                                ). Data Broker uses the City State Product — Detail Record and the ZIP + 4 Product —
                                Detail Record. The layout for these files is defined in the Address Information System
                                Products Technical Guide (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://postalpro.usps.com/address-quality/AIS_Products_Technical_Guide">
                                    https://postalpro.usps.com/address-quality/AIS_Products_Technical_Guide
                                </a>). This data is proprietary and is thus not available for download on this page.
                            </p>}
                        updatedAt={this.props.updateDates.zip_code} />
                </div>
            </div>
        );
    }
}

DataSourcesContent.propTypes = propTypes;
DataSourcesContent.defaultProps = defaultProps;
