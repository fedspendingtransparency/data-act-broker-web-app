/**
* UploadFabsFileHeader.jsx
* Created by Alisa Burdeyny
*/

import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
    details: PropTypes.object
};

const UploadFabsFileHeader = ({details = {}}) => {
    let headerDate = null;
    let updated = null;

    if (details.last_updated) {
        updated = moment.utc(details.last_updated).local().format('MM/DD/YYYY h:mm a');
    }

    if (details.agency_name) {
        headerDate = (
            <div className="col-md-2 ">
                <div className="header-box">
                    <span>
                        Agency: {details.agency_name}
                    </span>
                    <br />
                    <span>
                        Last Modified: {updated}
                    </span>
                </div>
            </div>);
    }

    return (
        <div className="usa-da-content-teal">
            <div className="container">
                <div className="row usa-da-page-title">
                    <div className="col-md-10 mt-40 mb-20">
                        <div className="display-2">
                            Upload FABS Data
                        </div>
                    </div>
                    {headerDate}
                </div>
            </div>
        </div>
    );
};

UploadFabsFileHeader.propTypes = propTypes;
export default UploadFabsFileHeader;
