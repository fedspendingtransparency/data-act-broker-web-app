import { apiRequest } from './apiRequest';

require('../../help/changelog.md');
require('../../help/history.md');
require('../../help/technical.md');
require('../../help/technicalHistory.md');

export const parseMarkdown = (rawText) => {
    const lineRegex = /^.*{section=[a-zA-Z0-9]+}.*$/gm;
    const sectionRegex = /{section=[a-zA-Z0-9]+}/gm;
    const sectionList = [];

    let results = lineRegex.exec(rawText);
    while (results !== null) {
        const link = results[0].substring(results[0].indexOf('=') + 1, results[0].length - 1);
        const name = results[0].replace(sectionRegex, '').replace(/#/g, '').trim();
        sectionList.push({
            link,
            name
        });
        results = lineRegex.exec(rawText);
    }
    const textBody = rawText.replace(sectionRegex, '');
    const output = {
        body: textBody,
        sections: sectionList
    };

    return output;
};

export const loadHistory = () => {
    const req = apiRequest({
        baseURL: '',
        url: '/help/history.md'
    });

    return req.promise;
};

export const loadTechnicalHistory = () => {
    const req = apiRequest({
        baseURL: '',
        url: '/help/technicalHistory.md'
    });

    return req.promise;
};

export const loadChangelog = () => {
    const req = apiRequest({
        baseURL: '',
        url: '/help/changelog.md'
    });

    return req.promise;
};

export const loadTechnicalNotes = () => {
    const req = apiRequest({
        baseURL: '',
        url: '/help/technical.md'
    });

    return req.promise;
};

export const rawFilesDrilldown = (type = '', agency = null, year = null, period = null) => {
    const params = {type};
    if (agency !== null) {
        params['agency'] = agency;
    }
    if (year !== null) {
        params['year'] = year;
    }
    if (period !== null) {
        params['period'] = period;
    }

    const req = apiRequest({
        url: 'list_latest_published_files/',
        params
    });

    return req.promise;
};

export const downloadPublishedFile = (publishedFilesId = 0) => {
    const req = apiRequest({
        url: 'get_submitted_published_file/',
        params: {'published_files_history_id': publishedFilesId}
    });

    return req.promise;
};

export const getDataSources = () => {
    const req = apiRequest({
        url: 'list_data_sources/'
    });

    return req.promise;
};
