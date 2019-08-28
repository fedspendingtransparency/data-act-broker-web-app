/**
  * ReplacementButton.jsx
  * Created by Kevin Li 6/30/16
  */
import React from 'react'; 
import PropTypes from 'prop-types';
import * as Icons from '../../SharedComponents/icons/Icons';

const propTypes = {
    buttonClicked: PropTypes.func,
    expanded: PropTypes.bool
};

const defaultProps = {
    buttonClicked: null,
    expanded: false
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
                    <button className="usa-da-icon" onClick={this.props.buttonClicked}>
                        {icon}
                    </button>
                </div>
            </div>
        );
    }
}

ReplacementButton.propTypes = propTypes;
ReplacementButton.defaultProps = defaultProps;
