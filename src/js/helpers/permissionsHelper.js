export const checkPermissions = (session) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    const aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].permission === 'writer' || aff[i].permission === 'submitter') {
            return true;
        }
    }
    return false;
};

export const checkFabsPermissions = (session) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    const { affiliations } = session.user;
    return !!(affiliations.find((affiliation) => affiliation.permission === 'fabs' || affiliation.permission === 'editfabs'));
};

export const checkFabsPublishPermissions = (session) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    const { affiliations } = session.user;
    return !!(affiliations.find((affiliation) => affiliation.permission === 'fabs'));
};

export const checkAgencyPermissions = (session, agencyName) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    const aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].agency_name === agencyName && (aff[i].permission === 'writer' ||
            aff[i].permission === 'submitter')) {
            return true;
        }
    }
    return false;
};

export const checkFabsAgencyPermissions = (session, agencyName) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    const { affiliations } = session.user;
    return !!(affiliations.find((affiliation) =>
        affiliation.agency_name === agencyName && (affiliation.permission === 'fabs' || affiliation.permission === 'editfabs')
    ));
};

export const checkAffiliations = (session, affil, agencyName) => {
    const affiliations = session.user.affiliations;
    for (let i = 0; i < affiliations.length; i++) {
        if (affiliations[i].agency_name === agencyName) {
            if (affiliations[i].permission === affil) {
                return true;
            }
        }
    }
    return false;
};

export const checkSubmitterAffiliations = (session) => {
    if (session.user.website_admin) {
        return true;
    }
    const affiliations = session.user.affiliations;
    for (let i = 0; i < affiliations.length; i++) {
        if (affiliations[i].permission === 'submitter') {
            return true;
        }
    }
    return false;
}
