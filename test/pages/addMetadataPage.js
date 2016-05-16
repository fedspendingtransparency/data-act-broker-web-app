const globals = require('../globals.js');

const commands = {
	fillMetadata(agency, start, end) {
		return this
			.waitForElementVisible('@agencyField')
			.setValue('@agencyField', agency)
			.click('@header')
			.setValue('@startDateField', start)
			.click('@header')
			.setValue('@endDateField', end)
			.click('@metaSubmit');
	}
}


module.exports = {
	url: () => { 
		return globals.baseUrl + '#/addData'; 
	},
	commands: [commands],
	elements: {
		header: {
			selector: "div.usa-da-page-title"
		},
		agencyField: {
			selector: "div[data-testid='agencytypeahead'] input[type=text]"
		},
		startDateField: {
			selector: "div.usa-da-startDate input[type=text]"
		},
		endDateField: {
			selector: "div.usa-da-endDate input[type=text]"
		},
		metaSubmit: {
			selector: "div[data-testid='submitbutton'] button"
		},
		appropriationsUpload: {
			selector: "div[data-testid='upload-appropriations'] input"
		}
	}
}