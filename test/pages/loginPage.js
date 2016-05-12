const globals = require('../globals.js');

const loginCommands = {
	login(email, password) {
		return this
			.waitForElementVisible('@emailInput')
			.setValue('@emailInput', email)
			.setValue('@passInput', password)
			.waitForElementVisible('@loginButton')
			.click('@loginButton')
	}
}

module.exports = {
	url: () => { 
		return globals.baseUrl + '#/login'; 
	},
	commands: [loginCommands],
	elements: {
		emailInput: {
			selector: 'input[id=username]'
		},
		passInput: {
			selector: 'input[id=password]'
		},
		loginButton: {
			selector: 'button[data-testid=signin]'
		},
		errorMessage: {
			selector: 'p[data-testid=errormessage]'
		}
	}
}