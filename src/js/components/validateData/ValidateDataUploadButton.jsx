/**
  * ValidateDataUploadButton.jsx
  * Created by Kevin Li 4/1/2016
  */

import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const propTypes = {
    onDrop: PropTypes.func,
    optional: PropTypes.bool,
    text: PropTypes.string,
    additionalClasses: PropTypes.string
};

const defaultProps = {
    onDrop: () => {},
    optional: false,
    text: 'Upload Corrected File',
    additionalClasses: ' btn-danger-outline'
};

export default class ValidateDataUploadButton extends React.Component {
    addedFile(files) {
        this.props.onDrop(files[0]);
    }

    render() {
        let optionalUpload = '';
        if (this.props.optional) {
            optionalUpload = ' btn-optional';
        }

        return (
            <Dropzone onDrop={this.addedFile.bind(this)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps({
                            className: `usa-da-button btn-full${optionalUpload}${this.props.additionalClasses}`
                        })}>
                            <input {...getInputProps({multiple: false})} />
                            {this.props.text}
                        </div>
                    </section>
                )}
            </Dropzone>
        );
    }
}

ValidateDataUploadButton.propTypes = propTypes;
ValidateDataUploadButton.defaultProps = defaultProps;
