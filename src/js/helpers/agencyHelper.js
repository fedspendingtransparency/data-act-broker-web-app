import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchAgencies = () => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}list_agencies/`)
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body.cgac_agency_list.concat(res.body.frec_agency_list));
            }
        });

    return deferred.promise;
};

export const fetchAllAgencies = () => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}list_all_agencies/`)
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body.agency_list.concat(res.body.shared_agency_list));
            }
        });

    return deferred.promise;
};

export const fetchSubTierAgencies = () => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}list_sub_tier_agencies/`)
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body.sub_tier_agency_list);
            }
        });

    return deferred.promise;
};
