/**
 * DataSourcesContent.jsx
 * Created by Alisa Burdeyny 9/03/21
 */

import React from 'react';
import DataSourcesItem from 'components/help/DataSourcesItem';

export default class DataSourcesContent extends React.Component {
    render() {
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
                        source={<p>The General Services Administration (GSA) Integrated Award Environment (IAE) loads a
                            weekly USAspending Assistance Listing file to SAM.gov AWS S3 bucket and we load each new
                            file into the Broker when it becomes available. The file is complete and includes
                            retired Assistance Listings (including deactivation date). The latest file loaded into the
                            Broker can be downloaded at:&nbsp;
                            <a target="_blank" href="https://files.usaspending.gov/reference_data/cfda.csv">
                                https://files.usaspending.gov/reference_data/cfda.csv
                            </a>.</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Agency"
                        uses={"Creating submissions, DABS File D1/D2 generation, FABS validations and derivations," +
                            " and USAspending derivations"}
                        description="A hierarchical list of toptier and subtier agencies and associated metadata."
                        source={<p>Updated periodically (e.g., due to changes in the IAE Federal Hierarchy or the A-11
                            Circular Appendix C). The latest file loaded into the Broker can be downloaded at&nbsp;
                            <a target="_blank" href="https://files.usaspending.gov/reference_data/agency_codes.csv">
                                https://files.usaspending.gov/reference_data/agency_codes.csv
                            </a>.</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Central Accounting Reporting System (CARS)/ Treasury Account Symbols (TAS)"
                        uses="DABS validations and USAspending derivations"
                        description={"Treasury Account Symbols are the account identification codes assigned by the" +
                            " Department of the Treasury to individual appropriation, receipt, or other fund" +
                            " accounts. All financial transactions of the Federal Government are classified by TAS" +
                            " for reporting to the Department of the Treasury and the Office of Management and" +
                            " Budget. This file includes a list of TAS and associated metadata."}
                        source={<p>This file is manually placed into a shared S3 bucket by FRB and translated into a
                            CSV by the Broker. New files are received up to daily during the GTAS window each period.
                            The latest file loaded into the Broker can be downloaded at [LINK].</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="City"
                        uses="FABS validations and derivations"
                        description={"A list of cities in the United States/territories and associated metadata," +
                            " including the 5 character identifying codes and the states and counties they are part" +
                            " of."}
                        source={<p>Zip obtained from&nbsp;
                            <a target="_blank"
                                href="https://www.usgs.gov/core-science-systems/ngp/board-on-geographic-names/download-gnis-data">
                                https://www.usgs.gov/core-science-systems/ngp/board-on-geographic-names/download-gnis-data
                            </a> and updated monthly if new data is available. The latest file loaded into the Broker
                            can be downloaded at [LINK].</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Congressional District"
                        uses="FABS validations and derivations"
                        description={"A two digit code indicating the congressional district along with associated" +
                            " metadata including the state it is tied to."}
                        source={<p>The set of congressional districts is automatically updated based on data from
                            USPS’s Postal Pro products that we purchase (see ‘Zip Code’ entry for more information). In
                            practice, the list of congressional districts only change every ten years on the first
                            election after a new census. Our table also includes historical congressional districts
                            from the 2000 census that no longer exist but that are still relevant to open awards. The
                            latest Broker file can be downloaded at [LINK].</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Country Code"
                        uses="FABS validations and derivations"
                        description={"All current countries as recognized under the GENC standard along with their" +
                            " two- and three-character abbreviations."}
                        source={<p>A manually compiled CSV sourced from this URL that is updated as needed:&nbsp;
                            <a target="_blank" href="https://nsgreg.nga.mil/genc/discovery">
                                https://nsgreg.nga.mil/genc/discovery
                            </a> The latest Broker file can be downloaded at [LINK]. </p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="County"
                        uses="FABS validations and derivations"
                        description={"A list of all counties in the US and its territories, including their name," +
                            " code, and the state to which they belong."}
                        source={<p>Zip obtained from&nbsp;
                            <a target="_blank" href="https://geonames.usgs.gov/docs/stategaz/GOVT_UNITS.zip">
                                https://geonames.usgs.gov/docs/stategaz/GOVT_UNITS.zip
                            </a> and loaded manually as needed. The latest file loaded into the Broker can be
                            downloaded at [LINK]. </p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="DUNS/UEI"
                        uses="FABS validations and derivations"
                        description={"The unique identification number for an awardee or recipient and associated" +
                            " metadata, including any parent organization. Prior to April 4th, 2022, the identifier" +
                            " is the 9-digit number assigned by Dun & Bradstreet referred to as the DUNS number." +
                            " After April 4th, 2022, the identifier is the 12 character government-owned Unique" +
                            " Entity Identifier (UEI)."}
                        source={<p>SAM.gov monthly and daily files from their site. Daily files contain actions from the
                            previous day in SAM. File is FOUO so is not available for download.</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Executive Compensation"
                        uses="Appending executive compensation information to all awards on USAspending"
                        description={"For SAM-registered entities that meet certain criteria outlined in FFATA, the" +
                            " names and yearly income of the five most highly compensated employees."}
                        source={<p>SAM.gov monthly and daily files from their site. File is FOUO so is not available
                            for download.</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="FPDS"
                        uses="DABS D1 file and USAspending"
                        description="All transactions for IDV and Contract Awards."
                        source={<p>: The daily FPDS update/delete Atom feeds, which contain updates made during the
                            previous day in FPDS. Specific entries can be searched for on their website at&nbsp;
                            <a target="_blank" href="https://fpds.gov">https://fpds.gov</a>. Data is not available for
                            download on this page, but the data can be found on USAspending or in D1 file generation
                            elsewhere on the Broker.</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="GTAS/SF-133"
                        uses="DABS validations"
                        description={"Detailed information about the balances of each TAS, as well as a breakdown of" +
                            " those balances by Disaster Emergency Fund Code (DEFC)."}
                        source={<p>This file is manually placed into a shared S3 bucket by FRB and translated into a CSV
                            by the Broker on a daily basis during the GTAS window each period.</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Object Class"
                        uses="DABS validations and USAspending derivations"
                        description={"Categories in a classification system that presents obligations by the items" +
                            " or services purchased by the Federal Government. Each specific object class is defined" +
                            " in OMB Circular A-11 § 83.6."}
                        source={<p>OMB Circular A-11 object classes manually encoded in CSV form and updated as needed.
                            The latest Broker file can be downloaded at [LINK].</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Office"
                        uses="FABS validations and derivations"
                        description={"The offices listed under each agency and subtier agency and associated metadata" +
                            " including  code, name, office type, hierarchy, etc."}
                        source={<p>The Federal Hierarchy FOUO API maintained by GSA. Data is FOUO so is not available
                            for download.</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Program Activity"
                        uses="DABS validations"
                        description={"A specific activity or project as listed in the program and financing schedules" +
                            " of the annual budget of the United States Government."}
                        source={<p>OMB conducts a monthly MAX Collect exercise to update this data, which is available
                            here:&nbsp;
                            <a target="_blank" href="https://community.max.gov/x/r4NkS">
                                https://community.max.gov/x/r4NkS
                            </a>. When any updates are available, OMB MAX places that data into an S3 bucket for Broker
                            to process on a daily basis (containing updates from the previous day). The latest file
                            loaded by the Broker is available here:&nbsp;
                            <a target="_blank" href="https://files.usaspending.gov/reference_data/program_activity.csv">
                                https://files.usaspending.gov/reference_data/program_activity.csv
                            </a>.</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="State"
                        uses="FABS validations and derivations"
                        description="The name, abbreviation, and FIPS code for all states in the US."
                        source={<p>A manually compiled list of US states and territories. The latest file loaded by the
                            Broker is available at [LINK].</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Subaward"
                        uses=" DABS File F and USAspending"
                        description={"Subcontract and subgrant data reported to the FFATA Subaward Reporting System" +
                            " (FSRS) run by the GSA IAE by prime awardees that meet the reporting requirements."}
                        source={<p>Loaded in from the FSRS API on a daily basis. Loads contain updates from the previous
                            day in FSRS. Data is not available for download on this page, but the data can be found on
                            USAspending or in  File F generation elsewhere on the Broker.</p>}
                        updatedAt={undefined} />

                    <DataSourcesItem
                        title="Zip Code"
                        uses="FABS validations and derivations"
                        description={"Five or nine digit zip codes issued by the US Postal Service, and associated" +
                            " metadata such as the congressional district, city, and county tied to the zip code."}
                        source={<p>Set of zip code data files purchased from USPS via their Postal Pro Product. Data is
                            proprietary so is not available for download on this page.</p>}
                        updatedAt={undefined} />
                </div>
            </div>
        );
    }
}
