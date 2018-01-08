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
    const aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].permission === 'fabs') {
            return true;
        }
    }
    return false;
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
    const aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].agency_name === agencyName && aff[i].permission === 'fabs') {
            return true;
        }
    }
    return false;
};
