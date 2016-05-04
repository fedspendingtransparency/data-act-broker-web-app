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
		adminButton: {
			selector: '.usa-da-top-head a.usa-da-header-link.usa-da-user-info[href=\'#/admin\']'
		},
		userButton: {
			selector: '.usa-da-top-head a.usa-da-header-link.dropdown-toggle'
		}
	}
}