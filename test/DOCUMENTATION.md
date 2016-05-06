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

* ` files` - See next section.

## Sample Files

You will also need to provide sample files that will be uploaded as part of the automated testing. These files should be located in an `uploads` folder inside the top-level `test` directory.

The `globals.js` file contains a `files` array. Each item of the array should be an object:

```
{
	"appropriations": "appropriationsFile.csv",
	"programActivity": "programActivityFile.csv",
	"awardFinancial": "awardFinancialFile.csv",
	"award": "awardFile.csv"
}

```

The value of each key should reference a file inside the `uploads` folder (for example, the appropriations file is at `uploads/appropriationsFile.csv`).

The keys reference the following file types:

* `appropriations` - Appropriation data
* `programActivity` - Program activity and object class data
* `awardFinancial` - Award financial data
* `award` - Financial assistance award file

Each object in the `files` array represents an upload attempt. Thus, the first object is the initial file submission. The second object represents the corrected files that will be uploaded when the initial uploads fail validation, etc.

## Running Tests

In the `test` directory, run:

* `nightwatch` to run the tests in the default mode (headlessly using PhantomJS with screenshot output on errors/failures)
* `nightwatch -e chrome` to run the tests in Chrome
* `nightwatch -e textonly` to run the tests headlessly but without screenshots