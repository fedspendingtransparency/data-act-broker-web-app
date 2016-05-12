const globals = require('../globals.js');
const path = require('path');

const generateElements = () => {

	const output = {};

	const types = ['appropriations', 'program_activity', 'award_financial', 'award'];

	// generate the relevatant elements for each upload type
	types.forEach((type) => {
		output[type + 'Wrapper'] = {
			selector: "div[data-testid='validate-wrapper-" + type + "']"
		};

		output[type + 'Message'] = {
			selector: "div[data-testid='validate-wrapper-" + type + "'] div[data-testid='validate-message']"
		};

		output[type + 'Icon'] = {
			selector: "div[data-testid='validate-wrapper-" + type + "'] div[data-testid='validate-icon'] svg"
		};

		output[type + 'Upload'] = {
			selector: "div[data-testid='validate-wrapper-" + type + "'] div[data-testid='validate-upload'] input[type=file]"
		};
	});


	// add an element for the overlay
	output['overlay'] = {
		selector: "div[data-testid='validate-header-overlay']"
	};
	output['valueOverlay'] = {
		selector: "div[data-testid='validate-value-overlay']"
	};

	output['uploadButton'] = {
		selector: "button[data-testid='validate-overlay-upload-button']"
	};
	output['reviewButton'] = {
		selector: "button[data-testid='validate-overlay-review-button']"
	};

	return output;
}


module.exports = {
	elements: generateElements()
}