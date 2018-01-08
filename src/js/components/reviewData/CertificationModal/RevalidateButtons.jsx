/**
  * RevalidateButtons.jsx
  * Created by Nipun Monga 02/27/17
  */

import React, { PropTypes } from 'react';

const propTypes = {
    closeModal: PropTypes.func,
    clickedRevalidateButton: PropTypes.func,
    revalidationThreshold: PropTypes.string
};

const defaultProps = {
    closeModal: null,
    clickedRevalidateButton: null,
    revalidationThreshold: ''
};

export default class RevalidateButtons extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 mb-10 text-center" id="certify-check">
                        This submission was created prior to {this.props.revalidationThreshold}.
                        Please revalidate this submission before certifying it.
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-10">
                        <button
                            onClick={this.props.clickedRevalidateButton}
                            className="usa-da-button btn-full btn-primary">
                            Revalidate Submission
                        </button>
                    </div>
                    <div className="col-md-6 mb-10">
                        <button onClick={this.props.closeModal} className="usa-da-button btn-full decline-button">
                            Don't Revalidate
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

RevalidateButtons.propTypes = propTypes;
RevalidateButtons.defaultProps = defaultProps;
