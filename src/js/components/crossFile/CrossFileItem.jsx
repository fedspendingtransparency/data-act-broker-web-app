/**
  * CrossFileItem.jsx
  * Created by Kevin Li 6/14/16
  **/

import React, { PropTypes } from 'react';
import FileComponent from './components/FileComponent.jsx';
import ComparisonComponent from './components/ComparisonComponent.jsx';
import LoadingComponent from './components/LoadingComponent.jsx';
import ErrorBox from './components/ErrorBox.jsx';
import ReplacementBox from './components/ReplacementBox.jsx';

const propTypes = {
    meta: PropTypes.object,
    status: PropTypes.string
};

const defaultProps = {
    type: 'loading',
    firstFile: null,
    secondFile: null,
    meta: {
        firstKey: '',
        firstName: '',
        firstType: '',
        secondKey: '',
        secondName: '',
        secondType: ''
    }
};

export default class CrossFileItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadBox: false
        };
    }

    componentDidUpdate(prevProps) {
        // force the upload box to close if a new upload occurs
        if (this.props.status !== prevProps.status) {
            this.setState({
                uploadBox: false
            });
        }
    }

    toggleUploadBox() {
        this.setState({
            uploadBox: !this.state.uploadBox
        });
    }

    render() {
        let detailBox = null;
        let middle = <ComparisonComponent type={this.props.status} />;
        if (this.props.status === 'error' || this.props.status === 'warning') {
            detailBox = <ErrorBox {...this.props} />;
        }
        else if (this.state.uploadBox) {
            detailBox = <ReplacementBox {...this.props} />;
        }

        if (this.props.status === 'loading') {
            middle = <LoadingComponent />;
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="usa-da-cross-file-group">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="usa-da-cross-file-item">
                                    <div className="file-left">
                                        <FileComponent fileType={this.props.meta.firstType}
                                            name={this.props.meta.firstName} fileKey={this.props.meta.firstKey}
                                            toggleUploadBox={this.toggleUploadBox.bind(this)}
                                            expanded={this.state.uploadBox} {...this.props} />
                                    </div>
                                    <div className="file-compare">
                                        {middle}
                                    </div>
                                    <div className="file-right">
                                        <FileComponent fileType={this.props.meta.secondType}
                                            name={this.props.meta.secondName} fileKey={this.props.meta.secondKey}
                                            toggleUploadBox={this.toggleUploadBox.bind(this)}
                                            expanded={this.state.uploadBox} {...this.props} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {detailBox}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CrossFileItem.propTypes = propTypes;
CrossFileItem.defaultProps = defaultProps;
