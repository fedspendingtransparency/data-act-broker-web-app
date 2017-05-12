import Request from './sessionSuperagent.js';
import Q from 'q';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as sessionActions from '../redux/actions/sessionActions.js';

export const setSkipGuide = (skip_guide) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;

    Request.post(kGlobalConstants.API + 'set_skip_guide/')
        .send({skip_guide: skip_guide})
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                // Only skip the guide if the user wants to skip the guide
                if (skip_guide == true) {
                    const action = sessionActions.setSkipGuide(skip_guide);
                    store.dispatch(action);
                }

                deferred.resolve(res.body);
            }

        });

    return deferred.promise;
}

export const getSubmissionPage = (submission_id) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    console.log(submission_id)

    Request.get(kGlobalConstants.API + 'check_current_page/?submission_id=' + submission_id)
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            } else {
                // Only skip the guide if the user wants to skip the guide
                let pages = [
                    '#/landing',
                    '#/validateData/'+submission_id,
                    '#/generateFiles/'+submission_id,
                    '#/validateCrossFile/'+submission_id,
                    '#/generateEF/'+submission_id,
                    '#/reviewData/'+submission_id
                ]
                let index = parseInt(res.text);

                deferred.resolve(pages[index]);
            }

        });

    return deferred.promise;
}