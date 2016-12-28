const globals = require('../globals.js');


module.exports = {
	url: () => { 
		return globals.baseUrl + '#/'; 
	},
	commands: [],
	elements: {
		pageTitle: {
			selector: '.usa-da-content-landing .mb-50 .display-2'
		},
		userButton: {
			selector: '.usa-da-top-head a.usa-da-header-link.dropdown-toggle'
		},
		navAddDataLink: {
			selector: 'a.usa-da-header-link[href=\'#/addData\']'
		}
	}
}