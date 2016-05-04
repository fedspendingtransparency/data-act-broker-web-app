# End-to-End Tests

## Installation

1. Install Nightwatch.js globally using NPM: `[sudo] npm install -g nightwatch`.
2. Run `npm install` in the `test` directory.
3. Install Selenium and ChromeDriver by running `node install.js` from the `test` directory.

You should only have to perform these steps once.

## Configuration

You will need to create a `globals.js` file in the `test` directory in order to run the tests successfully. A sample file has been provided as `sampleGlobals.js`.

The following values are required:

* `baseURL` - The root URL you are running the tests against, with a trailing slash.
* `accounts`
	* `user` - A broker account with user (not admin) privileges. Provide the username, password, and display name as `username`, `password`, and `name` child key-value pairs respectively.
	* `admin` - A broker account with admin privileges. Provide the username, password, and display name as `username`, `password`, and `name` child key-value pairs respectively.

## Running Tests

In the `test` directory, run:

* `nightwatch` to run the tests in the default mode (headlessly using PhantomJS with screenshot output on errors/failures)
* `nightwatch -e chrome` to run the tests in Chrome
* `nightwatch -e textonly` to run the tests headlessly but without screenshots