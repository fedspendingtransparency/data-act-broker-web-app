/**
  * ComparisonComponent.jsx
  * Created by Kevin Li 6/14/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    type: PropTypes.string
};

const defaultProps = {
    type: 'error'
};

export default class ComparisonComponent extends React.Component {
    render() {
        let icon = <FontAwesomeIcon icon="exclamation-circle" />;
        if (this.props.type === 'success') {
            icon = <FontAwesomeIcon icon="check-circle" />;
        }

        return (
            <div className="usa-da-item-comparison">
                <div className="under-layer">
                    <div className="line" />
                </div>

                <div className="center-item">
                    <div className="circle">
                        <div className={`usa-da-icon ${this.props.type}`}>
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ComparisonComponent.propTypes = propTypes;
ComparisonComponent.defaultProps = defaultProps;
