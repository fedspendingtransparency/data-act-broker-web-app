import Q from 'q';
import Markdown from 'markdown';
import ent from 'ent';
import Request from './sessionSuperagent';

const unescapeInlineHtml = (html) => {
    let tmpHtml = html;
    // find any inline HTML (as denoted by ```!inline-html [CODE] !inline-html```)
    const regex = /<p><code>!inline-html\n[\s\S]*\n!inline-html<\/code><\/p>/;
    const results = regex.exec(tmpHtml);

    // we found inline HTML, unescape it and insert it into the parsed Markdown output
    if (results && results.length > 0) {
        const rawHtml = results[0].substring(21, results[0].length - 23);
        const decodedHtml = ent.decode(rawHtml);
        tmpHtml = tmpHtml.replace(regex, decodedHtml);
    }

    return tmpHtml;
};


const parseMarkdown = (rawText) => {
    const md = Markdown.markdown;

    // generate a tree of the incoming markdown
    const tree = md.parse(rawText);

    const sectionList = [];

    // look for section headers
    tree.forEach((element) => {
        if (Array.isArray(element)) {
            const tmpElement = element;
            const type = tmpElement[0];
            const attributes = tmpElement[1];
            const value = tmpElement[2];
            if (type === "header") {
                // found a header, look for the section markdown attribute
                const regex = /{section=[a-zA-Z0-9]+}/;

                const results = regex.exec(value);
                if (results && results.length > 0) {
                    // get the section URL name by substringing the section markdown
                    const nameValue = results[0].substring(9, results[0].length - 1);

                    // save it as an HTML attribute
                    attributes.name = nameValue;
                    tmpElement[1] = attributes;

                    // replace the section link markdown with an empty string
                    tmpElement[2] = value.replace(regex, '');

                    // also add it as a sidebar item
                    sectionList.push({
                        link: nameValue,
                        name: tmpElement[2]
                    });
                }
            }
        }
    });

    const html = md.renderJsonML(md.toHTMLTree(tree));

    const output = {
        html: unescapeInlineHtml(html),
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
                deferred.resolve(output.html);
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
                deferred.resolve(output.html);
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
        html: '',
        sections: [],
        history: ''
    };

    loadChangelog()
        .then((data) => {
            output.html = data.html;
            output.sections = data.sections;
            return loadHistory();
        })
        .then((data) => {
            output.history = data;

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
        html: '',
        sections: [],
        history: ''
    };

    loadTechnicalNotes()
        .then((data) => {
            output.html = data.html;
            output.sections = data.sections;
            return loadTechnicalHistory();
        })
        .then((data) => {
            output.history = data;

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
            output.html = data.html;
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
