/**
 * RevertToCertifiedContainer.jsx
 * Created by Lizzie Salita 3/16/20
 */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { revertToCertified } from 'helpers/reviewHelper';
import RevertToCertified from 'components/reviewData/RevertToCertified';

const propTypes = {
    submission: PropTypes.object,
    loadData: PropTypes.func
};

const RevertToCertifiedContainer = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        reset();
    }, [props.submission.id]);

    useEffect(() => {
        if (message !== '') {
            props.loadData();
        }
    }, [message]);

    const reset = () => {
        setLoading(false);
        setError('');
        setMessage('');
    };

    const revert = () => {
        setLoading(true);
        setError('');
        setMessage('');
        revertToCertified(props.submission.id)
            .then((data) => {
                setLoading(false);
                setMessage(data.message);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
                setError(err.message);
            });
    };

    return (
        <RevertToCertified
            loading={loading}
            error={error}
            message={message}
            revert={revert}
            disabled={props.submission.publishStatus !== 'updated' || loading} />
    );
};

RevertToCertifiedContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    submission: state.submission,
    session: state.session
});

export default connect(
    mapStateToProps
)(RevertToCertifiedContainer);
