# DATA Act Broker Web App

The DATA Act broker website is the front-end to the [DATA Act broker API](https://github.com/fedspendingtransparency/data-act-broker "DATA Act broker API") and the [DATA Act validator](https://github.com/fedspendingtransparency/data-act-validator "DATA Act validator").

## Development Set Up

To stand up a local copy of the DATA Act broker website, follow the directions below.

Assumptions:

* You're able to install software on your machine.
* You have git installed on your machine and are able to clone code repositories from GitHub. If this isn't the case, the easiest way to get started is to install [GitHub Desktop](https://desktop.github.com/ "GitHub desktop"), available for Windows or Mac.
* You're familiar with opening a terminal on your machine and using the command line as needed.

### Install Prerequisites and Code

1. If you're not already running Node.js, download and run the installer for your operating system. We recommend v4.x: [https://nodejs.org/en/](https://nodejs.org/en/ "Node.js installer").

2. Use *npm* (Node's package manager, which is part of the Node.js install) to install the latest version of gulp. This is necessary for runing the babel version of the `gulpfile`):

    ```bash
        $ npm install gulp && npm install gulp -g
    ```

3. From the command line, clone the DATA Act web app repository from GitHub to your local machine:

        $ git clone git@github.com:fedspendingtransparency/data-act-broker-web-app.git

4. Switch to the alpha release version of the code:

        $ git checkout v0.1.0-alpha

5. Change to the `data-act-broker-web-app` directory that was created when you cloned the DATA Act web repository.

6. Install the web application's package dependencies:

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
* `GA_TRACKING_ID` is the tracking ID for Google Analytics.
* `BUCKET_NAME` is the name of the AWS S3 bucket where uploaded files will reside.
* `AWS_REGION` is the name of the [AWS region](http://docs.aws.amazon.com/general/latest/gr/rande.html) where the S3 bucket is hosted.

Other fields, such as `LOCAL` and `DEV` should be left based on their sample values.

### Run gulp tasks:

To start the DATA Act broker website, run the appropriate gulp task as specified below.

For production:

```bash
    $ gulp production
```

For demoing a build, but still using dev constants:

```bash
    $ gulp buildDev
```

Both of the above tasks will build and minify the project, putting the result in `/public`.

For Development:

```bash
    $ gulp
```

This will start a development environment using Browserify to hot reload when changes are made. Copies result into `/dev` for inspection.

### Modifying global constants:

In the top level directory, you will find `GlobalConstants_prod.js` and `GlobalConstants_dev.js` that you may use for any conditional, global constants, such as the API endpoint you'd like to point to in either given scenario.

## Full DATA Act Broker Setup

For instructions on contributing to this project or installing the DATA Act broker backend, please refer to the [documentation in the DATA Act core responsitory](https://github.com/fedspendingtransparency/data-act-core/blob/master/doc/INSTALL.md "DATA Act broker installation guide").
