import Request from './sessionSuperagent.js';
import Q from 'q';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as sessionActions from '../redux/actions/sessionActions.js';

export const setSkipGuide = (skipGuide) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;

    Request.post(kGlobalConstants.API + 'set_skip_guide/')
        .send({ skip_guide: skipGuide })
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                // Only skip the guide if the user wants to skip the guide
                if (skipGuide === true) {
                    const action = sessionActions.setSkipGuide(skipGuide);
                    store.dispatch(action);
                }

                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const getSubmissionPage = (submissionId) => {
    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'check_current_page/?submission_id=' + submissionId)
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                // Only skip the guide if the user wants to skip the guide
                let pages = [
                    '/404',
                    '/validateData/' + submissionId,
                    '/generateFiles/' + submissionId,
                    '/validateCrossFile/' + submissionId,
                    '/generateEF/' + submissionId,
                    '/reviewData/' + submissionId,
                    '/FABSaddData/' + submissionId
                ];
                let index = parseInt(res.body.step, 10);
                let response = {
                    url: pages[index],
                    page: index
                };

                deferred.resolve(response);
            }
        });

    return deferred.promise;
};
