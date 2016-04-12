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
