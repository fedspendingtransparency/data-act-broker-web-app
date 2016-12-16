
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