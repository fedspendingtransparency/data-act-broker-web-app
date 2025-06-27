/**
* UploadFabsFilePage.jsx
* Created by Michael Hess
*/

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router';

import Footer from 'components/SharedComponents/FooterComponent';
import Navbar from 'components/SharedComponents/navigation/NavigationComponent';

import UploadFabsFileMeta from './UploadFabsFileMeta';
import UploadFabsFileValidation from './UploadFabsFileValidation';

const propTypes = {
    setSubmissionId: PropTypes.func,
    setSubmissionState: PropTypes.func,
    history: PropTypes.object,
    type: PropTypes.oneOf(['dabs', 'fabs']),
    submission: PropTypes.object
};

const defaultProps = {
    setSubmissionId: () => {},
    setSubmissionState: () => {},
    history: {},
    submission: {}
};

const UploadFabsFilePage = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        props.setSubmissionId(params.submissionID);
    }, [params.submissionID]);

    const validate = (submissionID) => {
        props.setSubmissionId(submissionID);
        navigate(`/FABSaddData/${submissionID}`);
    };

    let content = null;
    if (params.submissionID) {
        content = (<UploadFabsFileValidation
            {...props}
            submission={props.submission}
            setSubmissionId={props.setSubmissionId} />);
    }
    else {
        content = (<UploadFabsFileMeta
            setSubmissionState={props.setSubmissionState}
            setSubmissionId={props.setSubmissionId}
            history={props.history}
            submission={props.submission}
            validate={validate} />);
    }
    return (
        <div className="usa-da-upload-fabs-file-page">
            <div className="usa-da-site_wrap">
                <div className="usa-da-page-content">
                    <Navbar
                        activeTab="FABSAddData"
                        type={props.type} />
                    <div className="usa-da-upload-fabs-file-page">
                        <div className="usa-da-site_wrap">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

UploadFabsFilePage.propTypes = propTypes;
UploadFabsFilePage.defaultProps = defaultProps;

export default UploadFabsFilePage;
