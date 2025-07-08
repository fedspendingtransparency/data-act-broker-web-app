/**
 * SubmissionContainer.jsx
 * Created by Minahm Kim 6/29/17
 */

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router';

import * as SubmissionGuideHelper from 'helpers/submissionGuideHelper';
import { routes } from 'dataMapping/dabs/submission';
import SubmissionPage from 'components/submission/SubmissionPage';

const SubmissionContainer = () => {
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectPath, setRedirectPath] = useState('');
    const params = useParams();

    useEffect(() => {
        getOriginalStep();
    }, []);

    const getOriginalStep = () => {
        SubmissionGuideHelper.getSubmissionPage(params.submissionID)
            .then((res) => {
                const originalStep = parseInt(res.data.step, 10);
                setLoading(false);
                if (originalStep === 6) {
                    setHasError(true);
                    setErrorMessage('This is a FABS ID. Please navigate to FABS.');
                }
                else {
                    setHasError(false);
                    setErrorMessage('');
                    setRedirectPath(routes[originalStep - 1]);
                }
            })
            .catch((err) => {
                setLoading(false);
                setHasError(true);
                setErrorMessage(err.response.data.message);
            });
    };

    if (redirectPath) {
        return <Navigate to={`/submission/${params.submissionID}/${redirectPath}`} />;
    }

    return (
        <SubmissionPage
            submissionID={params.submissionID}
            loading={loading}
            error={hasError}
            errorMessage={errorMessage} />
    );
};

export default connect(
    (state) => ({
        session: state.session
    })
)(SubmissionContainer);
