# DATA Act Broker Web App

The DATA Act broker website is the front-end to the [DATA Act broker API](https://github.com/fedspendingtransparency/data-act-broker "DATA Act broker API") and the [DATA Act validator](https://github.com/fedspendingtransparency/data-act-validator "DATA Act validator").

## Development Set Up

Make sure you have the latest version of gulp to ensure it can run the babel version of the `gulpfile`:

```bash
    $ npm install gulp && npm install gulp -g
```

Install dependencies:

```bash
    $ npm install
```

#### Configuration

Three sample `GlobalConstants` files are provided: `sampleGlobalConstants_dev.js`, `sampleGlobalConstants_local.js`, and `sampleGlobalConstants_prod.js`. These sample files should be used as the basis of files named `GlobalConstants_dev.js`, `GlobalConstants_local.js`, and `GlobalConstants_prod.js` respectively.

The sample files require you to provide values for:

* `API` is the base API URL for the server that is hosting the API. It should start with an `https://` or `http://` protocol and end with `/v1/`, including the trailing slash

	* Note: the `sampleGlobalConstants_local.js` already has this field configured for you.

* `LOCAL_ROOT` is the URL from which you are serving the frontend (this can be left as an empty string for non-local usage).
* `GA_TRACKING_ID` is the tracking ID for Google Analytics.
* `BUCKET_NAME` is the name of the AWS S3 bucket where uploaded files will reside.
* `AWS_REGION` is the name of the [AWS region](http://docs.aws.amazon.com/general/latest/gr/rande.html) where the S3 bucket is hosted.

Other fields, such as `LOCAL` and `DEV` should be left based on their sample values.

### Run gulp tasks:

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

For complete instructions on contributing to this project or running your own copy DATA Act broker, please refer to the [documentation in the DATA Act core responsitory](https://github.com/fedspendingtransparency/data-act-core/blob/master/doc/INSTALL.md "DATA Act broker installation guide").
