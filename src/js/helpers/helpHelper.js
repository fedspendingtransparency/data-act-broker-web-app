import Q from 'q';
import Request from './sessionSuperagent';
import { kGlobalConstants } from '../GlobalConstants';

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

const loadHistory = () => {
    const deferred = Q.defer();

    Request.get('/help/history.md')
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                const output = parseMarkdown(res.text);
                deferred.resolve(output);
            }
        });


    return deferred.promise;
};

const loadTechnicalHistory = () => {
    const deferred = Q.defer();

    Request.get('/help/technicalHistory.md')
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                const output = parseMarkdown(res.text);
                deferred.resolve(output);
            }
        });

    return deferred.promise;
};

const loadChangelog = () => {
    const deferred = Q.defer();

    Request.get('/help/changelog.md')
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                const output = parseMarkdown(res.text);
                deferred.resolve(output);
            }
        });

    return deferred.promise;
};

const loadTechnicalNotes = () => {
    const deferred = Q.defer();

    Request.get('/help/technical.md')
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                const output = parseMarkdown(res.text);
                deferred.resolve(output);
            }
        });

    return deferred.promise;
};

export const loadHelp = () => {
    const deferred = Q.defer();

    const output = {
        body: '',
        sections: [],
        history: '',
        historySections: []
    };

    loadChangelog()
        .then((data) => {
            output.body = data.body;
            output.sections = data.sections;
            return loadHistory();
        })
        .then((data) => {
            output.history = data.body;
            output.historySections = data.sections;

            deferred.resolve(output);
        })
        .catch((err) => {
            deferred.reject(err);
        });

    return deferred.promise;
};

export const loadTechnical = () => {
    const deferred = Q.defer();

    const output = {
        body: '',
        sections: [],
        history: '',
        historySections: []
    };

    loadTechnicalNotes()
        .then((data) => {
            output.body = data.body;
            output.sections = data.sections;
            return loadTechnicalHistory();
        })
        .then((data) => {
            output.history = data.body;
            output.historySections = data.sections;

            deferred.resolve(output);
        })
        .catch((err) => {
            deferred.reject(err);
        });

    return deferred.promise;
};

const loadResourcesFile = () => {
    const deferred = Q.defer();

    Request.get('/help/resources.md')
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                const output = parseMarkdown(res.text);
                deferred.resolve(output);
            }
        });

    return deferred.promise;
};

export const loadResources = () => {
    const deferred = Q.defer();

    const output = {
        html: '',
        sections: []
    };

    loadResourcesFile()
        .then((data) => {
            output.html = data.body;
            output.sections = data.sections;
        })
        .then(() => {
            deferred.resolve(output);
        })
        .catch((err) => {
            deferred.reject(err);
        });

    return deferred.promise;
};

export const rawFilesDrilldown = (type = '', agency = null, year = null, period = null) => {
    const deferred = Q.defer();
    let params = `type=${type}`;
    if (agency !== null) {
        params += `&agency=${agency}`;
    }
    if (year !== null) {
        params += `&year=${year}`;
    }
    if (period !== null) {
        params += `&period=${period}`;
    }

    Request.get(`${kGlobalConstants.API}list_latest_published_files/?${params}`)
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const downloadPublishedFile = (publishedFilesId = 0) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}get_submitted_published_file/?published_files_history_id=${publishedFilesId}`)
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const getDataSources = () => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}list_data_sources`)
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};
