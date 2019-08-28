/**
  * RevalidateButtons.jsx
  * Created by Nipun Monga 02/27/17
  */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    closeModal: PropTypes.func,
    clickedRevalidateButton: PropTypes.func
};

const defaultProps = {
    closeModal: null,
    clickedRevalidateButton: null
};

export default class RevalidateButtons extends React.Component {
    render() {
        return (
            <div className="revalidate-content">
                <h6>Are you sure you want to revalidate your submission?</h6>
                <p>Revalidation cannot be undone and will trigger the following:</p>
                <ul>
                    <li>You will be redirected to the initial submission phase, where Files A, B, and C will
                        automatically be revalidated.
                    </li>
                    <li>Files D1, D2, E and F must be regenerated.</li>
                    <li>Cross-file validations must be run again.</li>
                </ul>
                <p>Revalidation will not alter a previously-certified submission, until and if you certify the
                    revalidated submission.
                </p>
                <div className="row">
                    <div className="col-md-6 mb-10">
                        <button
                            onClick={this.props.clickedRevalidateButton}
                            className="usa-da-button btn-full revalidate-button"
                            id="revalidate-button">
                            Revalidate
                        </button>
                    </div>
                    <div className="col-md-6 mb-10">
                        <button onClick={this.props.closeModal} className="usa-da-button btn-full cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

RevalidateButtons.propTypes = propTypes;
RevalidateButtons.defaultProps = defaultProps;
