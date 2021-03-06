import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchAgencies = (permissionLevel = 'reader', permissionType = 'mixed') => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}list_agencies/?perm_level=${permissionLevel}&perm_type=${permissionType}`)
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

export function getPublishedSubmissions(cgac, frec, year, quarter, isQuarter) {
    const deferred = Q.defer();
    const validCgac = cgac || '';
    const validFrec = frec || '';
    Request.get(`${kGlobalConstants.API}published_submissions/?cgac_code=${validCgac}&frec_code=${validFrec}&` +
                `reporting_fiscal_year=${year}&reporting_fiscal_period=${quarter}&is_quarter=${isQuarter}`)
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body.published_submissions);
            }
        });

    return deferred.promise;
}
