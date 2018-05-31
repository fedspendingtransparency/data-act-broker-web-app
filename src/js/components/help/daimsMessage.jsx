/**
 * daimsMessage.jsx
 * Created by Minahm Kim 6/30/2017
 */

import React, { PropTypes } from 'react';

const propTypes = {
    type: PropTypes.string
};

const defaultProps = {
    type: ''
};

export default class DaimsMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let type = 'DABS submissions (including submissions of earlier quarters)';
        const version = 'v1.2';
        if (this.props.type === 'fabs') {
            type = 'FABS submissions';
        }

        return (
            <div className="daims">
                <span className="daims-header">May 18th, 2018: </span>
                <span className="daims-message">
                    Treasury implemented the DATA Act Information Model Schema (DAIMS) v1.2, a minor update to the
                    schema. With the implementation of DAIMS v1.2, all {type} must conform to its
                    specifications. Find out more about the requirements of DAIMS {version}
                    <a className="daims-link" href="https://community.max.gov/x/Dwn4Tg"> here</a>.
                </span>
            </div>
        );
    }
}

DaimsMessage.propTypes = propTypes;
DaimsMessage.defaultProps = defaultProps;
