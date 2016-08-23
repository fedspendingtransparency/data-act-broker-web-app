import Request from './sessionSuperagent.js';
import Q from 'q';
import Cookies from 'js-cookie';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';

export const fetchSubmissionMetadata = (submissionId) => {

    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'check_status/')
            .send({'submission_id': submissionId})
            .end((errFile, res) => {
                if (errFile) {
                    deferred.reject(res);
                }
                else {
                    deferred.resolve(res.body);
                }

            });

    return deferred.promise;
}

export const generateFile = (type, submissionId, start, end) => {

    const deferred = Q.defer();

    // Request.post(kGlobalConstants.API + 'generate_file/')
    Request.post('http://localhost:5000/' + 'generate_file/')
            .send({
                'submission_id': submissionId,
                'file_type': type,
                'start': start,
                'end': end
            })
            .end((errFile, res) => {

                if (errFile) {
                    deferred.reject(res.body);
                }
                else {
                    deferred.resolve(res.body);
                }

            });

    return deferred.promise;

}

export const fetchFile = (type, submissionId) => {
    const deferred = Q.defer();

    // Request.post(kGlobalConstants.API + 'check_generation_status/')
    Request.post('http://localhost:5000/' + 'check_generation_status/')
            .send({
                'submission_id': submissionId,
                'file_type': type
            })
            .end((errFile, res) => {

                if (errFile) {
                    deferred.reject(res.body);
                }
                else {
                    deferred.resolve(res.body);
                }

            });

    return deferred.promise;
}