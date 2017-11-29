/**
  * ReplacementButton.jsx
  * Created by Kevin Li 6/30/16
  */
import React, { PropTypes } from 'react';
import * as Icons from '../../SharedComponents/icons/Icons';

const propTypes = {
    buttonClicked: PropTypes.func,
    expanded: PropTypes.bool
};

export default class ReplacementButton extends React.Component {
    render() {
        let icon = <Icons.Trash />;
        if (this.props.expanded) {
            icon = <Icons.Times />;
        }

        return (
            <div className="usa-da-validate-corrected-file-holder">
                <div className="corner-overlay">
                    <div className="usa-da-icon" onClick={this.props.buttonClicked}>
                        {icon}
                    </div>
                </div>
            </div>
        );
    }
}

ReplacementButton.propTypes = propTypes;
