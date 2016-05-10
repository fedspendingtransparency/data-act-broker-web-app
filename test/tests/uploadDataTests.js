module.exports = {
	
	before: (client, done) => {
		// login
		const loginPage = client.page.loginPage();

		client.maximizeWindow();

		loginPage
			.navigate()
			.login(client.globals.accounts.admin.username, client.globals.accounts.admin.password)
			.waitForElementVisible('.usa-da-content-landing', 10000, () => {
				done();
			});
			
	},
	'valid metadata submission leads to upload page': (client) => {
		const metadataPage = client.page.addMetadataPage();

		metadataPage
			.navigate()
			.fillMetadata('Department of Energy', '01/01/2015', '12/31/2015');
		
		metadataPage.expect.element('@appropriationsUpload').to.be.present;
	},
	'providing a full set of files results in a successful upload':(client) => {
		const landingPage = client.page.landingPage();
		const metadataPage = client.page.addMetadataPage();
		const uploadFilesPage = client.page.uploadFilesPage();

		landingPage
			.navigate()
			.waitForElementVisible('@pageTitle');

		// go back to the home page
		metadataPage
			.navigate()
			.fillMetadata('Department of Energy', '01/01/2015', '12/31/2015');

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

		// confirm that we've entered the validation screen
		client.waitForElementPresent("div[data-testid='validate-wrapper-appropriations']");

		client.end();

	}

}