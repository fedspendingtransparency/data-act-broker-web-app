/**
 * FileTypeSelect.jsx
 * Created by Alisa Burdeyny 04/15/24
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    fileType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default class FileTypeSelect extends React.Component {
    constructor(props) {
        super(props);

        this.pickedTypeA = this.pickedType.bind(this, 'A');
        this.pickedTypeBOC = this.pickedType.bind(this, 'BOC');
    }

    pickedType(type) {
        this.props.onChange(type);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12 text-left usa-da-file-generation-type">
                    <div className="usa-da-file-generation-type-group">
                        <input
                            type="radio"
                            id="detached-generation-file-type-a"
                            name="file-type"
                            value="A"
                            onChange={this.pickedTypeA}
                            checked={this.props.fileType === 'A'} />
                        <label htmlFor="detached-generation-file-type-a">
                            File A
                            <div className="subtype-description">
                                Generate File A outside of a submission.
                            </div>
                        </label>
                    </div>

                    <div className="usa-da-file-generation-type-group">
                        <input
                            type="radio"
                            id="detached-generation-file-type-boc"
                            name="file-type"
                            value="BOC"
                            onChange={this.pickedTypeBOC}
                            checked={this.props.fileType === 'BOC'} />
                        <label htmlFor="detached-generation-file-type-boc">
                            GTAS Comparison Report
                            <div className="subtype-description">
                                Compare published data from Data Broker and GTAS.
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

FileTypeSelect.propTypes = propTypes;
