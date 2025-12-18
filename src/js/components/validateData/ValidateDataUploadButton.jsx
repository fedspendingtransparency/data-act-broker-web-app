/**
  * ValidateDataUploadButton.jsx
  * Created by Kevin Li 4/1/2016
  */

import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const propTypes = {
    onDrop: PropTypes.func,
    optional: PropTypes.bool,
    text: PropTypes.string,
    additionalClasses: PropTypes.string
};

const ValidateDataUploadButton = ({
    onDrop = () => {}, optional = false, text = 'Upload Corrected File', additionalClasses = ' btn-danger-outline'
}) => {
    const addedFile = (files) => {
        onDrop(files[0]);
    };

    let optionalUpload = '';
    if (optional) {
        optionalUpload = ' btn-optional';
    }

    return (
        <Dropzone onDrop={addedFile}>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps({
                        className: `usa-da-button btn-full${optionalUpload}${additionalClasses}`
                    })}>
                        <input {...getInputProps({multiple: false})} />
                        {text}
                    </div>
                </section>
            )}
        </Dropzone>
    );
};

ValidateDataUploadButton.propTypes = propTypes;
export default ValidateDataUploadButton;
