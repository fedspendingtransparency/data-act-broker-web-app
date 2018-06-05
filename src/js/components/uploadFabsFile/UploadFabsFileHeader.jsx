/**
* UploadFabsFileHeader.jsx
* Created by Alisa Burdeyny
*/

import React, { PropTypes } from "react";
import moment from "moment";

const propTypes = {
    details: PropTypes.object
};

const defaultProps = {
    details: {}
};

export default class UploadFabsFileHeader extends React.Component {
    render() {
        let headerDate = null;
        let updated = null;

        if (this.props.details.last_updated) {
            updated = moment.utc(this.props.details.last_updated).local().format("MM/DD/YYYY h:mm a");
        }

        if (this.props.details.agency_name) {
            headerDate = (
                <div className="col-md-2 ">
                    <div className="header-box">
                        <span>
                            Agency: {this.props.details.agency_name}
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
    }
}

UploadFabsFileHeader.propTypes = propTypes;
UploadFabsFileHeader.defaultProps = defaultProps;
