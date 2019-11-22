/**
 * DashboardTableModal.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import RadioGroup from 'components/SharedComponents/RadioGroup';
import { timingSafeEqual } from 'crypto';

const propTypes = {
    data: PropTypes.object,
    downloadFile: PropTypes.func.isRequired
};

const defaultProps = {
    data: {}
};

export default class DashboardTableModal extends React.Component {
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
            this.updateFileLabel('');
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
                        columns={[radioColumn]} />
                </div>);
        }
        return (
            <div>
                <h4>{this.props.data.fileLabel.toUpperCase()}</h4>
                <hr />
                <div className="left-modal-col">
                    <h5>Details</h5>
                    {fileList}
                    <button onClick={this.downloadFile}>Download</button>
                </div>
                <div className="right-modal-col">
                    <h5>Rule Description</h5>
                    <p>{this.props.data.ruleDescription}</p>
                </div>
            </div>
        );
    }
}

DashboardTableModal.defaultProps = defaultProps;
DashboardTableModal.propTypes = propTypes;
