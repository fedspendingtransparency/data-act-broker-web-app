/**
 * RevertToCertifiedContainer.jsx
 * Created by Lizzie Salita 3/16/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { revertToCertified } from 'helpers/reviewHelper';
import RevertToCertified from 'components/reviewData/RevertToCertified';

const propTypes = {
    submission: PropTypes.object
};

export class RevertToCertifiedContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            message: ''
        };

        this.revert = this.revert.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.submission, this.props.submission)) {
            this.reset();
        }
    }

    reset() {
        this.setState({
            loading: false,
            error: '',
            message: ''
        });
    }

    revert() {
        this.setState({
            loading: true,
            error: '',
            message: ''
        });
        revertToCertified(this.props.submission.id)
            .then((data) => {
                this.setState({
                    loading: false,
                    message: data.message
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    loading: false,
                    error: error.message
                });
            });
    }

    render() {
        return (
            <RevertToCertified
                {...this.state}
                revert={this.revert}
                disabled={this.props.submission.publishStatus !== 'updated'} />
        );
    }
}

RevertToCertifiedContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    submission: state.submission,
    session: state.session
});

export default connect(
    mapStateToProps
)(RevertToCertifiedContainer);
