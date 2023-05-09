/**
  * FileWarning.jsx
  * Created by Kevin Li 6/28/16
  */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ReviewHelper from '../../../helpers/reviewHelper';

const propTypes = {
    meta: PropTypes.object,
    submission: PropTypes.object,
    files: PropTypes.array
};

const defaultProps = {
    files: [],
    meta: null,
    submission: null
};

export default class FileWarning extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            affectedPairs: {},
            causedBy: {},
            messages: []
        };
    }

    componentDidMount() {
        this.prepareData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.files, this.props.files) || !_.isEqual(prevProps.submission.crossFileStaging,
            this.props.submission.crossFileStaging)) {
            this.prepareData();
        }
        // Have to do this because the callback in prepareData isn't triggering with a new state
        if (!_.isEqual(prevState.causedBy, this.state.causedBy) || !_.isEqual(prevState.affectedPairs,
            this.state.affectedPairs)) {
            this.generateMessages();
        }
    }

    prepareData() {
        const affectedPairs = {};
        const causedBy = {};

        // determine which other cross-file pairings will be affected by modifying each file
        // additionally, determine in which cross-file pair the file was originally staged for upload
        this.props.files.forEach((fileKey) => {
            affectedPairs[fileKey] = this.pairsAffected(fileKey);
            causedBy[fileKey] = this.props.submission.crossFileStaging[fileKey];
        });

        this.setState({
            affectedPairs,
            causedBy
        });
    }

    pairsAffected(fileKey) {
        // determine which cross file pairs will be affected by modifying the specified file
        const affectedPairs = [];
        this.props.submission.crossFileOrder.forEach((pair) => {
            if (pair.key !== this.props.meta.key) {
                // it's not the current cross file pairing
                if (pair.firstKey === fileKey || pair.secondKey === fileKey) {
                    affectedPairs.push(pair);
                }
            }
        });
        return affectedPairs;
    }

    replacementHereMessage(fileKey) {
        // generate a message indicating what the impact of replacing a file will be
        const file = ReviewHelper.globalFileData[fileKey];

        const count = this.state.affectedPairs[fileKey].length;
        let message = `By overwriting <b>File ${file.letter}</b>, you will also affect ${count
        } other cross-file validation`;
        if (count !== 1) {
            message += 's';
        }
        message += '.';

        if (count === 0) {
            message = '';
        }

        return message;
    }

    replacedElsewhereMessage(fileKey) {
        // generate a message indicating that the file has been staged for upload from another cross-file pair
        const file = ReviewHelper.globalFileData[fileKey];
        const causedByKey = this.state.causedBy[fileKey];
        const firstFile = ReviewHelper.globalFileData[causedByKey.split('-')[0]];
        const secondFile = ReviewHelper.globalFileData[causedByKey.split('-')[1]];

        const pairName = `File ${firstFile.letter}-File ${secondFile.letter}`;

        return `<b>File ${file.letter}</b> will be overwritten using the file selected in the ${pairName
        } cross-file validation.`;
    }

    generateMessages() {
        const messages = [];

        this.props.files.forEach((fileKey) => {
            let message = null;
            if (this.state.causedBy[fileKey] !== this.props.meta.key) {
                message = this.replacedElsewhereMessage(fileKey);
            }
            else {
                message = this.replacementHereMessage(fileKey);
            }

            messages.push(message);
        });


        this.setState({
            messages
        });
    }

    render() {
        let noImpact = true;

        const messages = this.state.messages.map((message, index) => {
            if (message === '') {
                return null;
            }
            noImpact = false;
            return <li key={index} dangerouslySetInnerHTML={{ __html: message }} />;
        });

        let hide = '';
        if (noImpact) {
            hide = ' hide';
        }

        return (
            <div className={`file-warning${hide}`}>
                <div className="icon-wrap">
                    <div className="usa-da-icon">
                        <FontAwesomeIcon icon="info-circle" />
                    </div>
                </div>
                <div className="warning-description">
                    <ul>
                        {messages}
                    </ul>
                </div>
            </div>
        );
    }
}

FileWarning.propTypes = propTypes;
FileWarning.defaultProps = defaultProps;
