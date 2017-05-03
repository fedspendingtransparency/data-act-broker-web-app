import { dispatch } from 'redux';

export const checkPermissions = (session) => {
    if (session.admin) {
        return true;
    }
    if (session.user.affiliations || session.user.affiliations.length == 0) {
        return false;
    }
    let aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if (aff[i].permission != 'reader') {
            return true;
        }
    }
    return false;
}

export const checkAgencyPermissions = (session, agency_name) => {
    if (session.admin) {
        return true;
    }
    if (session.user.affiliations || session.user.affiliations.length == 0) {
        return false;
    }
    let aff = session.user.affiliations;
    for (let i = 0; i < aff.length; i++) {
        if(aff[i].agency_name === agency_name){
                return (aff[i].permission !== 'reader')
            }
    }
    return false;
}