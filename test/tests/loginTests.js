
module.exports = {
	'Display error message when provided a nonexistent account': (client) => {
		const loginPage = client.page.loginPage();

		client.maximizeWindow();

		loginPage
			.navigate()
			.login("fakeuser@inter.net", "badpass")
			.expect.element("@errorMessage").text.to.equal('Invalid username and/or password');

		client.end();
	},
	'Log in when provided a valid account': (client) => {
		const loginPage = client.page.loginPage();
		const landingPage = client.page.landingPage();

		client.maximizeWindow();

		loginPage
			.navigate()
			.login(client.globals.accounts.user.username, client.globals.accounts.user.password);

		landingPage.expect.element("@pageTitle").text.to.equal('Welcome to the DATA Act Broker');


		client.end();
	},
	'Admin button appears when an admin user logs in': (client) => {
		const loginPage = client.page.loginPage();
		const landingPage = client.page.landingPage();

		client.maximizeWindow();

		loginPage
			.navigate()
			.login(client.globals.accounts.admin.username, client.globals.accounts.admin.password);

		landingPage.expect.element("@adminButton").to.be.visible;


		client.end();
	},
	'Admin button does not appear when a non-admin user logs in': (client) => {
		const loginPage = client.page.loginPage();
		const landingPage = client.page.landingPage();

		loginPage
			.navigate()
			.login(client.globals.accounts.user.username, client.globals.accounts.user.password);


		// make sure the page title is in pace in order to ensure the landing page has loaded when the admin check is performed
		landingPage.expect.element("@pageTitle").text.to.equal('Welcome to the DATA Act Broker');
		landingPage.expect.element("@adminButton").to.not.be.present;
		client.end();
	},
	'User button displays the user\'s name': (client) => {
		const loginPage = client.page.loginPage();
		const landingPage = client.page.landingPage();

		loginPage
			.navigate()
			.login(client.globals.accounts.user.username, client.globals.accounts.user.password);

		landingPage.expect.element("@userButton").text.to.equal(client.globals.accounts.user.name);
		client.end();
	}
}