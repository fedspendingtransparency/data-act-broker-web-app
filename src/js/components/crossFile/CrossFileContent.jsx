/**
  * CrossFileContent.jsx
  * Created by Kevin Li 6/14/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ProgressBar from 'components/SharedComponents/ProgressBar';
import { convertToLocalDate } from 'helpers/util';
import CrossFileItem from './CrossFileItem';
import CrossFileOverlay from './CrossFileOverlay';

const propTypes = {
    reloadData: PropTypes.func,
    uploadFiles: PropTypes.func,
    submission: PropTypes.object,
    submissionID: PropTypes.string,
    publishStatus: PropTypes.string,
    progress: PropTypes.number
};

const defaultProps = {
    reloadData: null,
    uploadFiles: null,
    submission: null,
    publishStatus: '',
    progress: 0
};

export default class CrossFileContent extends React.Component {
    constructor(props) {
        super(props);

        this.allowableStates = ['finished', 'uploading', 'prepare', 'failed'];

        this.state = {
            crossFileItems: [],
            overlay: 'loading'
        };
    }

    componentDidMount() {
        this.crossFileItems();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.submission, this.props.submission)) {
            this.crossFileItems();
        }
    }

    crossFileItems() {
        const items = [];
        const crossFileKeys = this.props.submission.crossFileOrder;
        let overlayMode = 'loading';
        let i = 0;
        crossFileKeys.forEach((pairMeta) => {
            const pairKey = pairMeta.key;

            let status = 'loading';
            let errors = 0;
            let warnings = 0;

            if (Object.prototype.hasOwnProperty.call(this.props.submission.crossFile.errors, pairKey)) {
                status = 'error';
                this.props.submission.crossFile.errors[pairKey].forEach((error) => {
                    errors += parseInt(error.occurrences, 10);
                });
                overlayMode = 'errors';
            }

            if (Object.prototype.hasOwnProperty.call(this.props.submission.crossFile.warnings, pairKey)) {
                if (status === 'loading') {
                    status = 'warning';
                }
                this.props.submission.crossFile.warnings[pairKey].forEach((warning) => {
                    warnings += parseInt(warning.occurrences, 10);
                });

                if (overlayMode !== 'errors') {
                    overlayMode = 'warnings';
                }
            }
            if (_.indexOf(this.allowableStates, this.props.submission.state) > -1) {
                if (status === 'loading') {
                    status = 'success';
                }

                if (overlayMode === 'loading') {
                    overlayMode = 'success';
                }
            }
            if (this.props.submission.state === 'failed') {
                overlayMode = 'failed';
                status = 'failed';
            }

            // each pair should have easy top-level access to the pair's occurrence counts
            const counts = {
                errors,
                warnings
            };

            items.push(<CrossFileItem
                key={i}
                status={status}
                meta={pairMeta}
                counts={counts}
                {...this.props}
                forceUpdate={this.props.reloadData} />);
            i += 1;
        });

        this.setState({
            crossFileItems: items,
            overlay: overlayMode
        });
    }

    render() {
        const isLoading = _.indexOf(this.allowableStates, this.props.submission.state) === -1;

        let loadingClass = '';
        let progress = null;
        if (isLoading) {
            loadingClass = ' usa-da-gathering-data';
            progress = <ProgressBar progress={this.props.progress} />;
        }

        if (this.props.submission.state === 'finished' && this.props.submission.crossFile.lastValidated !== undefined) {
            progress = (
                <div className="last-validated">
                    Last Validated: {convertToLocalDate(this.props.submission.crossFile.lastValidated, true, '/')}
                </div>
            );
        }

        return (
            <div>
                <div className="container center-block with-overlay">
                    <div className={`usa-da-cross-file${loadingClass}`}>
                        <div className="row usa-da-submission-instructions">
                            <div className="col-md-12">
                                <p>
                                    Cross-file validation will now be performed on some of your files. As before, if any
                                    errors are found they will be displayed below.
                                </p>
                            </div>
                        </div>

                        {progress}

                        {this.state.crossFileItems}

                    </div>
                </div>
                <CrossFileOverlay
                    {...this.props}
                    mode={this.state.overlay}
                    loading={isLoading}
                    uploadFiles={this.props.uploadFiles} />
            </div>
        );
    }
}

CrossFileContent.propTypes = propTypes;
CrossFileContent.defaultProps = defaultProps;
