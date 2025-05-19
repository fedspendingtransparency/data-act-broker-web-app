import { apiRequest } from './apiRequest';

export const parseAgencies = (agencyResults, listType = 'perm') => {
    // parsing either permission-level lists or full agency lists
    if (listType === 'perm') {
        return agencyResults.data.cgac_agency_list.concat(agencyResults.data.frec_agency_list);
    }
    
    return agencyResults.data.agency_list.concat(agencyResults.data.shared_agency_list);
};

export const fetchAgencies = (permissionLevel = 'reader', permissionType = 'mixed') => {
    const req = apiRequest({
        url: 'list_agencies/',
        params: {
            'perm_level': permissionLevel,
            'perm_type': permissionType
        }
    });

    return req.promise;
};

export const fetchAllAgencies = () => {
    const req = apiRequest({
        url: 'list_all_agencies/'
    });

    return req.promise;
};

export const fetchSubTierAgencies = () => {
    const req = apiRequest({
        url: 'list_sub_tier_agencies/'
    });

    return req.promise;
};

export const getPublishedSubmissions = (cgac, frec, year, quarter, isQuarter) => {
    const req = apiRequest({
        url: 'published_submissions/',
        params: {
            'cgac_code': cgac || '',
            'frec_code': frec || '',
            'reporting_fiscal_year': year,
            'reporting_fiscal_period': quarter,
            'is_quarter': isQuarter
        }
    });

    return req.promise;
};
