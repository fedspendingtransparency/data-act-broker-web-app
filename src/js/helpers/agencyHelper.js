import Request from './sessionSuperagent.js';
import Q from 'q';
import _ from 'lodash';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';

export const fetchAgencies = () => {

    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'list_agencies/')
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body['cgac_agency_list']);
            }
        });

    return deferred.promise;
}

export const fetchAgencyName = (cgac) => {
    const deferred = Q.defer();


    fetchAgencies()
        .then((agencies) => {
            const index = _.findIndex(agencies, {cgac_code: cgac});
            if (index > -1) {
                deferred.resolve(agencies[index].agency_name);
            }
            else {
                deferred.resolve("UNKNOWN");
            }
        });

    return deferred.promise;
}

export const fetchSubTierAgencies = () => {

    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'list_sub_tier_agencies/')
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body['sub_tier_agency_list']);
            }
        });

    return deferred.promise;
}

export const fetchSubTierAgencyName = (sub_tier_agency_code) => {
    const deferred = Q.defer();


    fetchAgencies()
        .then((agencies) => {
            const index = _.findIndex(agencies, {sub_tier_agency_code: sub_tier_agency_code});
            if (index > -1) {
                deferred.resolve(agencies[index].sub_tier_agency_name);
            }
            else {
                deferred.resolve("UNKNOWN");
            }
        });

    return deferred.promise;
}