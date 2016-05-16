import gulp from 'gulp';
import connect from 'gulp-connect';
import chalk from 'chalk';
import sass from 'gulp-sass';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import gutil from 'gulp-util';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import del from 'del';
import vinylPaths from 'vinyl-paths';
import replace from 'gulp-replace';
import gulpif from 'gulp-if';
import cssNano from 'gulp-cssnano';
import merge from 'merge-stream';
import git from 'gulp-git';
import header from 'gulp-header';
import moment from 'moment-timezone';
import mocha from 'gulp-mocha';

// Base Directories
const dir = {
    BASE: './',
    PUBLIC: './public',
    SRC: './src',
    TEST: './__tests__'
};

// Path constants
const path = {
    MINIFIED_OUT: 'app.min.js',
    OUT: 'app.js',
    ENTRY_POINT: dir.SRC + '/js/app.jsx',
    INDEX_SRC: 'index.html',
    SASS_SRC: dir.SRC + '/_scss/**',

    PROD_CONSTANTS: 'GlobalConstants_prod.js',
    DEV_CONSTANTS: 'GlobalConstants_dev.js',
    LOCAL_CONSTANTS: 'GlobalConstants_local.js'
};

let minified = false;

const environmentTypes = {
    DEVLOCAL: 0,
    DEVHOSTED: 1,
    PROD: 2,
    LOCAL: 3
};

const serverDeps = [];

let commitHash = '';
const currentTime = moment().tz('America/New_York').format('MMMM D, YYYY h:mm A z');

// set the environment
let environment = environmentTypes.DEVLOCAL;

gulp.task('setDev', () => {
    minified = false;
    environment = environmentTypes.DEVLOCAL;

    // set the NodeJS environment so that Redux compiles correctly in production modes
    process.env.NODE_ENV = 'development';

    // update the local server dependencies to wait for the compile process to finish before starting
    serverDeps.push('compile');

    gutil.log('You are running in ' + chalk.black.bgYellow(' DEVELOPMENT (LOCAL) ') + ' mode.');
});

gulp.task('setDevHosted', () => {
    minified = false;
    environment = environmentTypes.DEVHOSTED;
    process.env.NODE_ENV = 'development';

    gutil.log('You are running in ' + chalk.black.bgYellow(' DEVELOPMENT (HOSTED) ') + ' mode.');
})

gulp.task('setProd', () => {
    minified = true;
    environment = environmentTypes.PROD;
    process.env.NODE_ENV = 'production';

    gutil.log('You are running in ' + chalk.black.bgGreen(' PRODUCTION (HOSTED) ') + ' mode.');
});

gulp.task('setLocal', () => {
    minified = true;
    environment = environmentTypes.LOCAL;
    process.env.NODE_ENV = 'production';

    // update the local server dependencies to wait for the compile process to finish before starting
    serverDeps.push('compile');

    // also have it wait for the minification and HTML modification process
    serverDeps.push('modifyHtml');

    gutil.log('You are running in ' + chalk.black.bgGreen(' PRODUCTION (LOCAL) ') + ' mode.');
});

// clear out the existing folder contents
gulp.task('clean', () => {
    return del(dir.PUBLIC + '/**/*');
});

// get the current git metadata
gulp.task('meta', ['clean'], (done) => {
    git.revParse({
        args: '--short HEAD',
        quiet: true
    }, (err, hash) => {
        commitHash = hash;
        gutil.log('This build is based on commit ' + chalk.cyan(hash) + '.');
        done();
    });
});

// copy the correct constants file into the source directory
gulp.task('copyConstants', ['meta'], () => {

    let file = path.DEV_CONSTANTS;

    if (environment == environmentTypes.PROD) {
        file = path.PROD_CONSTANTS;
    }
    else if (environment == environmentTypes.LOCAL) {
        file = path.LOCAL_CONSTANTS;
    }

    return gulp.src('./' + file)
        .pipe(rename('GlobalConstants.js'))
        .pipe(gulp.dest(dir.SRC + '/js'))
        .on('end', () => {
            gutil.log('Using ' + chalk.magenta(file) + ' as the constants file...');
        });
});

// copy the assets
gulp.task('copyAssets', ['copyConstants'], () => {

    // determine the destination
    const destination = dir.PUBLIC;

    // combine all the copy streams into a single stream
    // return the stream to wait for the task to complete
    return merge(
        // copy fonts
        gulp.src(dir.SRC + '/fonts/**/*')
            .pipe(gulp.dest(dir.PUBLIC + '/fonts'))
            .on('end', () => {
                gutil.log('Fonts copied');
            }),

        // copy graphics
        gulp.src(dir.SRC + '/graphics/**/*')
            .pipe(gulp.dest(dir.PUBLIC + '/graphics'))
            .on('end', () => {
                gutil.log('Graphics copied');
            }),

         // copy images
        gulp.src(dir.SRC + '/img/**/*')
            .pipe(gulp.dest(dir.PUBLIC + '/img'))
            .on('end', () => {
                gutil.log('Images copied');
            }),

        // copy CSS files
        gulp.src(dir.SRC + '/css/**/*.css')
            .pipe(gulp.dest(dir.PUBLIC + '/css'))
            .on('end', () => {
                gutil.log('CSS copied');
            }),

        // copy the main index file
        gulp.src('./index.html')
            .pipe(gulp.dest(dir.PUBLIC))
            .on('end', () => {
                gutil.log('index.html copied');
            }),

        // copy newrelic.js
        gulp.src(dir.SRC + '/newrelic.js')
            .pipe(gulp.dest(dir.PUBLIC))
            .on('end', () => {
                gutil.log('newrelic.js copied');
            })

    );
});

// build the SASS
gulp.task('sass', ['copyAssets'], () => {

    if (environment == environmentTypes.DEVLOCAL) {
        // set up a watcher for future SASS changes
        gulp.watch([dir.SRC + '/css/**/*.scss', dir.SRC + '/_scss/**/*.scss'])
            .on('change', () => {
                gutil.log(chalk.green('Starting SASS recompile...'));
                return gulp.src(dir.SRC + '/css/**/*.scss')
                    .pipe(sass.sync().on('error', sass.logError))
                    .pipe(gulp.dest(dir.PUBLIC + '/css'))
                    // auto reload the browser
                    .pipe(connect.reload())
                    .on('end', () => {
                        gutil.log(chalk.green('SASS compiled.'));
                    });
            });
    }

    // compile SASS files
    return gulp.src(dir.SRC + '/css/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        // add in the commit hash and timestamp header
        .pipe(header('/* Build ' + commitHash  + '\n' + currentTime + ' */\n\n'))
        // .pipe(gulpif(minified, cssNano()))
        .pipe(gulp.dest(dir.PUBLIC + '/css'));
});

// convert the React JSX into normal JS
gulp.task('build', ['sass'], () => {
    const buildProps = {
        entries: [path.ENTRY_POINT],
        transform: [
            [
                babelify, 
                { 
                    presets: ['es2015', 'react']
                },
                {
                    envify: {
                        global: true 
                    }
                }
            ]
        ],
        debug: !minified,
        cache: {},
        packageCache: {},
        fullPaths: true
    };

    let buildTool = browserify(buildProps);

    // use a watcher if we're serving the file in local dev instead
    if (environment == environmentTypes.DEVLOCAL) {
        buildTool = watchify(browserify(buildProps));

        // set up watcher for recompiling
        buildTool.on('update', () => {
            gutil.log(chalk.cyan('Starting JS recompile...'));
            buildTool.bundle().on('error', gutil.log)
            .pipe(source(path.OUT))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: !minified }))
            .pipe(gulpif(!minified, sourcemaps.write('.')))
            .pipe(gulp.dest(dir.PUBLIC))
            // auto reload the browser
            .pipe(connect.reload())
            .on('end', () => {
                gutil.log(chalk.cyan('Reloading JS...'));
            });
        });
    }

    return buildTool
        .bundle().on('error', gutil.log)
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: !minified }))
        .pipe(gulpif(!minified, sourcemaps.write('.')))
        // add in the commit hash and timestamp header
        .pipe(header('/* Build ' + commitHash  + '\n' + currentTime + ' */\n\n'))
        .pipe(gulp.dest(dir.PUBLIC));
});


// minify the JS
gulp.task('minify', ['build'], () => {

    return gulp.src(dir.PUBLIC + '/' + path.OUT)
        // delete the non-minified file
        .pipe(vinylPaths(del))
        // set the minified output
        .pipe(rename(path.MINIFIED_OUT))
        // minify
        .pipe(uglify())
        // add in the commit hash and timestamp header (which would have been removed by the minification process)
        .pipe(header('/* Build ' + commitHash  + '\n' + currentTime + ' */\n\n'))
        // write out the output
        .pipe(gulp.dest(dir.PUBLIC));

});

// after minifying, change the HTML script tag to point to the minified file
gulp.task('modifyHtml', ['minify'], () => {
    return gulp.src(dir.PUBLIC + '/index.html')
        .pipe(replace(path.OUT, path.MINIFIED_OUT))
        .pipe(gulp.dest(dir.PUBLIC));
});


// serve the frontend locally
gulp.task('serve', serverDeps, () => {
    connect.server({
        root: dir.PUBLIC,
        port: 3000,
        livereload: true
    });
});

// convenience task that does all the copying and compiling subtasks
gulp.task('compile', ['clean', 'meta', 'copyConstants', 'copyAssets', 'sass', 'build']);

// user-initiated gulp tasks
gulp.task('buildDev', ['setDevHosted', 'compile'], () => {
    
});

gulp.task('dev', ['setDev', 'compile', 'serve'], () => {
    
});

gulp.task('buildLocal', ['setDevHosted', 'compile'], () => {

});

gulp.task('local', ['setLocal', 'compile', 'minify', 'modifyHtml', 'compile', 'serve'], () => {

});

gulp.task('production', ['setProd', 'compile', 'minify', 'modifyHtml'], () => {
    
});

gulp.task('default', ['local']);



// run unit tests
gulp.task('expresso', () => {
    return gulp.src(['./__unittests__/**/*-spec.js','./__unittests__/**/*-spec.jsx', '!./__unittests__/support/*.js'], { read: false })
        .pipe(mocha({
            compilers: {
                js: require('babel-core/register')
            },
            require: ['./__unittests__/setup.js']
        }))
})

gulp.task('mocha', () => {
    return gulp.src(['./__unittests__/**/*-spec.js','./__unittests__/**/*-spec.jsx', '!./__unittests__/support/*.js'], { read: false })
        .pipe(mocha({
            compilers: {
                js: require('babel-core/register')
            },
            require: ['./__unittests__/setup.js'],
            reporter: 'mocha-junit-reporter',
            reporterOptions: {
                mochaFile: './__unittests__/mocha.xml'
            }
        }))
})
