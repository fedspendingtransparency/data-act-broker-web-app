import Request from './sessionSuperagent.js';
import Q from 'q';
import Cookies from 'js-cookie';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';

export const fetchAgencies = () => {
    const deferred = Q.defer();

    // Request.get(kGlobalConstants.API + 'list_agencies/')
    //     .send()
    //     .end((err, res) => {
    //         if (err) {
    //             deferred.reject(err);
    //         }
    //         else {
    //             deferred.resolve(res.body['cgac_agency_list']);
    //         }
    //     });


    const res = {
        body: {
            cgac_agency_list: [
                {
                    agency_name: 'Department of Defense',
                    cgac_code: '001'
                },
                {
                    agency_name: 'Department of State',
                    cgac_code: '002'
                },
                {
                    agency_name: 'Department of Justice',
                    cgac_code: '003'
                }
            ]
        }
    };

    setTimeout(() => {
        deferred.resolve(res.body['cgac_agency_list']);
    }, 500);

    return deferred.promise;
}