import Request from './sessionSuperagent.js';
import Q from 'q';
import Markdown from 'markdown';

const parseMarkdown = (rawText) => {
	const md = Markdown.markdown;

	// generate a tree of the incoming markdown
	const tree = md.parse(rawText);

	const sectionList = [];

	// look for section headers
	tree.forEach((element) => {
		if (Array.isArray(element)) {
			const type = element[0];
			const attributes = element[1];
			const value = element[2];
			if (type == "header") {

				// found a header, look for the section markdown attribute
				const regex = /{section=[a-zA-Z0-9]+}/;

				const results = regex.exec(value);
				if (results.length > 0) {
					// get the section URL name by substringing the section markdown
					const nameValue = results[0].substring(9, results[0].length - 1);

					// save it as an HTML attribute
					attributes.name = nameValue;
					element[1] = attributes;

					// replace the section link markdown with an empty string
					element[2] = value.replace(regex, '');

					// also add it as a sidebar item
					sectionList.push({
						link: nameValue,
						name: element[2]
					});
				}

			}
		}
	});

	const output = {
		html: md.renderJsonML(md.toHTMLTree(tree)),
		sections: sectionList
	};

	return output;
}

export const loadChangelog = () => {

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
}