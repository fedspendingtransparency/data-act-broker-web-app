/**
 * CorrectButtonCornerOverlay.jsx
 * Created by Mike Bray 6/21/16
 */

import React, { PropTypes } from 'react';

import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    buttonClicked: PropTypes.func
};

const defaultProps = {
    buttonClicked: () => {}
};

export default class CorrectButtonCornerOverlay extends React.Component {
    render() {
        return (
            <div className="usa-da-validate-corrected-file-holder">
                <div className="corner-overlay">
                    <div
                        role="button"
                        tabIndex={0}
                        className="usa-da-icon"
                        onKeyDown={this.props.buttonClicked}
                        onClick={this.props.buttonClicked}>
                        <Icons.Trash />
                    </div>
                </div>
            </div>
        );
    }
}

CorrectButtonCornerOverlay.propTypes = propTypes;
CorrectButtonCornerOverlay.defaultProps = defaultProps;
