/**
 * DashboardTableModal.jsx
 * Created by Alisa Burdeyny 04/02/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RadioGroup from 'components/SharedComponents/RadioGroup';

const propTypes = {
    data: PropTypes.object,
    downloadFile: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool
};

const defaultProps = {
    data: {},
    isOpen: false
};

export default class ActiveDashboardTableModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileLabel: ''
        };

        this.updateFileLabel = this.updateFileLabel.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    componentDidMount() {
        if (this.props.data.fileTypes.length === 1) {
            this.updateFileLabel(this.props.data.fileTypes[0]);
        }
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.data, prevProps.data)) {
            if (this.props.data.fileTypes.length === 1) {
                this.updateFileLabel(this.props.data.fileTypes[0]);
            }
            else {
                this.updateFileLabel('');
            }
        }
    }

    updateFileLabel(fileLabel) {
        this.setState({
            fileLabel
        });
    }

    downloadFile() {
        this.props.downloadFile(this.state.fileLabel, this.props.data.submissionId);
    }

    render() {
        let fileList = null;
        if (this.props.data.fileTypes.length > 1) {
            const radioColumn = this.props.data.fileTypes.map((fileType) => (
                {
                    value: fileType,
                    label: `File ${fileType}`
                }
            ));
            fileList = (
                <div>
                    <h5>File Name</h5>
                    <RadioGroup
                        onChange={this.updateFileLabel}
                        currentValue={this.state.fileLabel}
                        columns={[radioColumn]}
                        pageSection="modal" />
                </div>);
        }

        return (
            <Modal
                mounted={this.props.isOpen}
                onExit={this.props.closeModal}
                verticallyCenter
                underlayClickExits
                initialFocus="#close-button"
                titleId="dashboard-page-rule-modal">
                <div className="usa-da-modal-page">
                    <div id="dashboard-page-rule-modal" className="dashboard-page__modal">
                        <button
                            id="close-button"
                            className="close-button"
                            onClick={this.props.closeModal}
                            aria-label="close-modal-button">
                            <FontAwesomeIcon icon="xmark" />
                        </button>
                        <h4>{this.props.data.fileLabel.toUpperCase()}</h4>
                        <hr />
                        <div className="row">
                            <div className="left-modal-col col-md-6">
                                <h5>Details</h5>
                                <div className="detail-row">
                                    <div className="detail-name">
                                        Rule
                                    </div>
                                    <div className="detail-content">
                                        {this.props.data.ruleLabel}
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-name">
                                        Number of Instances
                                    </div>
                                    <div className="detail-content">
                                        {this.props.data.instanceCount}
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-name">
                                        Category
                                    </div>
                                    <div className="detail-content capitalized">
                                        {this.props.data.category}
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-name">
                                        Impact
                                    </div>
                                    <div className="detail-content capitalized">
                                        {this.props.data.impact}
                                    </div>
                                </div>
                                {fileList}
                                <button
                                    onClick={this.downloadFile}
                                    className="download-button"
                                    disabled={this.state.fileLabel === ''}>
                                    Download
                                </button>
                            </div>
                            <div className="right-modal-col col-md-6">
                                <h5>Rule Description</h5>
                                <p>{this.props.data.ruleDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

ActiveDashboardTableModal.defaultProps = defaultProps;
ActiveDashboardTableModal.propTypes = propTypes;
