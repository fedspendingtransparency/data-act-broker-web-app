import { dispatch } from 'redux';

export const checkDabsPermissions = (session) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    let aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].permission != 'fabs') {
            return true;
        }
    }
    return false;
}

export const checkDabsWriterPerms = (session) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    let aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].permission === 'writer' || aff[i].permission === 'submitter') {
            return true;
        }
    }
    return false;
}

export const checkFabsWriterPerms = (session) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    let aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].permission === 'fabs') {
            return true;
        }
    }
    return false;
}

export const checkDabsAgencyPermissions = (session, agency_name) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    let aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].agency_name === agency_name && (aff[i].permission === 'reader' || aff[i].permission === 'submitter')) {
            return true;
        }
    }
    return false;
}

export const checkFabsAgencyPermissions = (session, agency_name) => {
    if (session.admin) {
        return true;
    }
    if (!session.user.affiliations || session.user.affiliations.length === 0) {
        return false;
    }
    let aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].agency_name === agency_name && aff[i].permission === 'fabs') {
            return true;
        }
    }
    return false;
}