/**
  * PublishModal.jsx
  * Created by Minahm Kim 8/3/17
  */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    closeModal: PropTypes.func,
    submit: PropTypes.func,
    rows: PropTypes.object,
    isOpen: PropTypes.bool,
    published: PropTypes.string
};

const defaultProps = {
    closeModal: () => {},
    submit: () => {},
    rows: {},
    isOpen: false,
    published: false
};

export default class PublishModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            certified: false,
            showProgress: false,
            closeable: true,
            errorMessage: "",
            rows: this.props.rows
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.rows !== nextProps) {
            this.setState({
                rows: nextProps.rows,
                certified: nextProps.published
            });
        }
    }

    closeModal(e) {
        if (e) {
            e.preventDefault();
        }

        if (!this.state.closeable) {
            return;
        }

        // reset the modal if closed
        this.setState({
            showProgress: false,
            certified: false,
            errorMessage: ''
        }, () => {
            this.props.closeModal();
        });
    }

    render() {
        const publishable = this.state.rows.valid_rows !== 0;

        let message = (
            <p>
                This will publish the {this.state.rows.valid_rows} data rows that have passed validation out
                of a total of {this.state.rows.total_rows} data rows in your FABS file
            </p>);

        let action = (
            <button
                id="publish-button"
                onClick={this.props.submit.bind(this)}
                className="us-da-button col-sm-6">
                Publish
            </button>);

        if (!publishable) {
            message = (
                <p>
                    Your file cannot be published because none of your records passed validation. Please correct your
                    file and resubmit it.
                </p>);
            action = <button id="publish-button" className="us-da-disabled-button col-sm-6">No Valid Rows</button>;
        }

        let hideClose = "";
        if (!this.state.closeable) {
            hideClose = " hide";
        }

        let error = '';
        if (this.state.errorMessage) {
            error = <div className="alert alert-danger text-center" role="alert">{this.state.errorMessage}</div>;
        }

        // adding this because the linter doesn't like when we just pass true
        const trueProps = true;

        return (
            <Modal
                mounted={this.props.isOpen}
                onExit={this.closeModal.bind(this)}
                underlayClickExits={this.state.closeable}
                verticallyCenter={trueProps}
                titleId="usa-da-certify-modal">
                <div className="usa-da-modal-page">
                    <div
                        id="usa-da-certify-modal"
                        className="usa-da-certify-modal">
                        <div className={`usa-da-certify-modal-close usa-da-icon usa-da-icon-times${hideClose}`}>
                            <button onClick={this.closeModal.bind(this)}> <Icons.Times /> </button>
                        </div>

                        <div className="usa-da-certify-modal-content">
                            <div className="row">
                                <div className="col-md-12 title-field">
                                    <h6>Are you sure you want to publish your data to
                                        <a
                                            href="http://www.usaspending.gov"
                                            rel="noopener noreferrer"
                                            target="_blank">
                                            USAspending.gov
                                        </a>?
                                    </h6>
                                    {message}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12" />
                            </div>
                            <div className="row">
                                {action}
                                <div className="col-sm-6">
                                    <button
                                        onClick={this.closeModal.bind(this)}
                                        className={`usa-da-button btn-warning btn-full${hideClose}`}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            {error}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

PublishModal.propTypes = propTypes;
PublishModal.defaultProps = defaultProps;
