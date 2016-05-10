var path = require('path');
const types = ['appropriations', 'program_activity', 'award_financial', 'award'];

module.exports = {
	
	before: (client, done) => {
		// login
		const loginPage = client.page.loginPage();
		const landingPage = client.page.landingPage();
		const metadataPage = client.page.addMetadataPage();
		const uploadFilesPage = client.page.uploadFilesPage();

		client.maximizeWindow();

		loginPage
			.navigate()
			.login(client.globals.accounts.admin.username, client.globals.accounts.admin.password)
			.waitForElementVisible('.usa-da-content-landing', 10000, () => {
				done();
			});

		landingPage
			.navigate()
			.waitForElementVisible('@pageTitle');

		// go back to the home page
		metadataPage
			.navigate()
			.fillMetadata('Department of Energy', '01/01/2015', '12/31/2015');

			
	},
	'successful initial upload takes user to validation page':(client) => {
		const uploadFilesPage = client.page.uploadFilesPage();
		const validationPage = client.page.validationPage();

		uploadFilesPage
			.waitForElementPresent('@appropriationsUpload');

		// inject jQuery into the page so we can access it
		client.injectScript("https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js");
		// wait 800ms for it to load
		client.pause(800);
		// make all the hidden upload inputs visible so their values can be set in PhantomJS
		client.execute(() => {
			$("input[type=file]").css("display","block");
		});

		// set the upload values
		uploadFilesPage
			.uploadFiles(0);

		// we need to wait some time after the files are placed because the autoscrolling behavior causes the upload button to move
		// wait 800 ms for safety (scroll animation is 500ms)
		client.pause(800);

		// now press the upload button
		uploadFilesPage
			.click('@uploadButton');

		// confirm that we've entered the validation screen and that there are entries for all four file types
		types.forEach((type) => {
			validationPage.waitForElementPresent('@' + type + 'Wrapper');
		});
		

	},
	'uploading files with invalid headers results in header validation errors':(client) => {

		const validationPage = client.page.validationPage();

		// wait for the overlay to appear (up to two minutes)
		validationPage.waitForElementVisible('@overlay', 2 * 60 * 1000);

		// appropriations file has a header error
		validationPage.assert.cssClassPresent('@appropriationsIcon', 'usa-da-icon-exclamation-circle');

		// other files should pass without header errors
		validationPage.assert.cssClassPresent('@program_activityIcon', 'usa-da-icon-check-circle');
		validationPage.assert.cssClassPresent('@award_financialIcon', 'usa-da-icon-check-circle');
		validationPage.assert.cssClassPresent('@awardIcon', 'usa-da-icon-check-circle');

	},

	'header errors can pass validation by uploading corrected files': (client) => {

		const validationPage = client.page.validationPage();

		// unhide the upload inputs
		client.execute(() => {
			$("input[type=file]").css("display","block");
		});

		validationPage
			.setValue('@appropriationsUpload', path.join(__dirname, '../uploads', client.globals.files[1].appropriations))
			.click('@uploadButton');

		// wait for validation to finish
		validationPage.waitForElementVisible('@valueOverlay', 2 * 60 * 1000);

		// all the files except for program activity should fail in the next stage
		validationPage.assert.cssClassPresent('@appropriationsIcon', 'usa-da-icon-exclamation-circle');
		validationPage.assert.cssClassPresent('@program_activityIcon', 'usa-da-icon-check-circle');
		validationPage.assert.cssClassPresent('@award_financialIcon', 'usa-da-icon-exclamation-circle');
		validationPage.assert.cssClassPresent('@awardIcon', 'usa-da-icon-exclamation-circle');

	},

	'value errors can pass validation by uploading corrected files': (client) => {
		const validationPage = client.page.validationPage();

		// unhide the upload inputs
		client.execute(() => {
			$("input[type=file]").css("display","block");
		});

		validationPage
			.setValue('@appropriationsUpload', path.join(__dirname, '../uploads', client.globals.files[2].appropriations))
			.setValue('@award_financialUpload', path.join(__dirname, '../uploads', client.globals.files[2].awardFinancial))
			.setValue('@awardUpload', path.join(__dirname, '../uploads', client.globals.files[2].award))
			.click('@uploadButton');

		// wait for validation to finish
		validationPage.waitForElementVisible('@reviewButton', 2 * 60 * 1000);

		// all the files should pass
		validationPage.assert.cssClassPresent('@appropriationsIcon', 'usa-da-icon-check-circle');
		validationPage.assert.cssClassPresent('@program_activityIcon', 'usa-da-icon-check-circle');
		validationPage.assert.cssClassPresent('@award_financialIcon', 'usa-da-icon-check-circle');
		validationPage.assert.cssClassPresent('@awardIcon', 'usa-da-icon-check-circle');

		validationPage.click('@reviewButton');

	},
	'successful validation redirects to the Review & Publish page': (client) => {

		const reviewPage = client.page.reviewPage();

		reviewPage.waitForElementVisible('@reviewHeader');

		client.end();

	}

}