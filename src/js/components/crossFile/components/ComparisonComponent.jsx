/**
  * ComparisonComponent.jsx
  * Created by Kevin Li 6/14/16
  */

import React, { PropTypes } from 'react';
import * as Icons from '../../SharedComponents/icons/Icons';

const propTypes = {
    type: PropTypes.string
};

const defaultProps = {
    type: 'error'
};

export default class ComparisonComponent extends React.Component {
    render() {
        let icon = <Icons.ExclamationCircle />;
        if (this.props.type === 'success') {
            icon = <Icons.CheckCircle />;
        }
        else if (this.props.type === 'warning') {
            icon = <Icons.ExclamationCircle />;
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
