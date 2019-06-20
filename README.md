# DATA Act Broker Web App

The DATA Act broker website is the front-end to the [DATA Act broker backend](https://github.com/fedspendingtransparency/data-act-broker-backend "DATA Act broker backend").

## Development Set Up

To stand up a local copy of the DATA Act broker website, follow the directions below.

Assumptions:

* You're able to install software on your machine.
* You have git installed on your machine and are able to clone code repositories from GitHub. If this isn't the case, the easiest way to get started is to install [GitHub Desktop](https://desktop.github.com/ "GitHub desktop"), available for Windows or Mac.
* You're familiar with opening a terminal on your machine and using the command line as needed.

### Install Prerequisites and Code

1. If you're not already running Node.js, download and run the installer for your operating system. We recommend v10.x: [https://nodejs.org/en/](https://nodejs.org/en/ "Node.js installer").

2. From the command line, clone the DATA Act web app repository from GitHub to your local machine:

        $ git clone https://github.com/fedspendingtransparency/data-act-broker-web-app.git

3. Switch to the alpha release version of the code. This is the latest stable release.

        $ git checkout v0.1.0-alpha

    **Note:** If you'd rather use the latest, work-in-progress features of the DATA Act broker, replace the above command with `git checkout staging`.

4. Change to the `data-act-broker-web-app` directory that was created when you cloned the DATA Act web repository.

5. Install the web application's package dependencies:

        $ npm install


### Create Configurations

The `data-act-broker-web-app` folder provides three sample `GlobalConstants` files:

 * `sampleGlobalConstants_dev.js`
 * `sampleGlobalConstants_local.js`
 * `sampleGlobalConstants_prod.js`.

Use these sample files to create files named `GlobalConstants_dev.js`, `GlobalConstants_local.js`, and `GlobalConstants_prod.js` respectively.

The sample files require you to provide values for:

* `API` is the base API URL for the server that is hosting the API. It should start with an `https://` or `http://` protocol and end with `/v1/`, including the trailing slash

	* Note: the `sampleGlobalConstants_local.js` already has this field configured for you.

* `LOCAL_ROOT` is the URL from which you are serving the frontend (this can be left as an empty string for non-local usage).
* `CAS_ROOT` is the root endpoint for the [CAS server](https://apereo.github.io/cas/4.2.x/protocol/CAS-Protocol-Specification.html#cas-uris) when a CAS single sign-on service is used.
* `AUTH_CALLBACK` is the [callback URL](https://apereo.github.io/cas/4.2.x/protocol/CAS-Protocol-Specification.html#response) that the CAS server redirects to upon successful login.
* `GA_TRACKING_ID` is the tracking ID for Google Analytics.

Other fields, such as `LOCAL` and `DEV` should be left based on their sample values.

### Run npm scripts:

Several npm scripts are available to build the frontend web site for various use cases.

#### Hosted Production

If you are building the web site for a hosted production environment, run:

```bash
	$ npm run prod
```
This will build the frontend files to the `/public` directory, which you can then deploy on your host. In this mode, JavaScript files are minified, debugging tools are disabled, and the `GlobalConstants_prod.js` file is used as the GlobalConstants file.

#### Local Production

If you are using the DATA Act Broker in a fully local environment and you are not a developer, run:

```bash
	$ npm run start:local
```
This will build the frontend files to the `/public` directory and start a web server on port 3000. In this mode, JavaScript files are minified, debugging tools are disabled, and the `GlobalConstants_local.js` file is used as the GlobalConstants file.

To use the frontend, go to [http://localhost:3000](http://localhost:3000) in a supported web browser.

*Note:* Before running the gulp task, ensure that no other applications or services are using port 3000 on your computer.

#### Hosted Development (Build-only)

If you are deploying the frontend to a hosted environment for development/testing purposes, use:

```bash
	$ npm run dev
```
This will build the frontend files to the `/public` directory, which you can then deploy on your host. In this mode, JavaScript files are uncompressed and sourcemapped, debugging tools are enabled, and the `GlobalConstants_dev.js` file is used as the GlobalConstants file.

#### Local Development

Finally, if you are a frontend developer, use:

```bash
	$ npm run start
```

This will build the frontend files to the `/public` directory and also start a web server on port 3000. In this mode, JavaScript files are uncompressed and sourcemapped, debugging tools are enabled and the `GlobalConstants_dev.js` file is used as the GlobalConstants file. Additionally, SASS files in the `/src/_scss` and `/src/css` folders are watched, along with JS files in the `/src/js` folder, and these files are recompiled (and the browser automatically refreshed) whenever a change is detected.

### Running Tests

To run the unit test suite, run `npm test`.

### Modifying global constants:

In the top level directory, you will find `GlobalConstants_prod.js`, `GlobalConstants_local.js`, and `GlobalConstant_dev.js` that you may use for any conditional, global constants, such as the API endpoint you'd like to point to in either given scenario.

## Full DATA Act Broker Setup

For instructions on contributing to this project or installing the DATA Act broker backend, please refer to the [documentation in the DATA Act core responsitory](https://github.com/fedspendingtransparency/data-act-core/blob/master/doc/INSTALL.md "DATA Act broker installation guide").
