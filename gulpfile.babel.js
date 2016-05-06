import gulp from 'gulp';
import connect from 'gulp-connect';
import chalk from 'chalk';
import sass from 'gulp-sass';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import gulpif from 'gulp-if';
import del from 'del';
import vinylPaths from 'vinyl-paths';
import cssNano from 'gulp-cssnano';
import shell from 'gulp-shell';
import fs from 'fs';
import looseEnvify from 'loose-envify';

import mocha from 'gulp-mocha';
import babel from 'babel-core/register';

// Base Directories
const dir = {
    BASE: './',
    DEV: './dev',
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
    LOCAL_CONSTANTS: 'GlobalConstants_local.js',
    CONSTANTS_DESTNAME: 'GlobalConstants.js',
    CONSTANTS_DEST: dir.SRC + '/js/',

    CSS_SRC: dir.SRC + '/css/**',
    CSS_DEV: dir.DEV + '/css',
    CSS_PUBLIC: dir.PUBLIC + '/css',

    FONTS_SRC: dir.SRC + '/fonts/**',
    FONTS_DEV: dir.DEV + '/fonts',
    FONTS_PUBLIC: dir.PUBLIC + '/fonts',

    IMAGES_SRC: dir.SRC + '/img/**',
    IMAGES_DEV: dir.DEV + '/img',
    IMAGES_PUBLIC: dir.PUBLIC + '/img',

    GRAPHICS_SRC: dir.SRC + '/graphics/**',
    GRAPHICS_DEV: dir.DEV + '/graphics',
    GRAPHICS_PUBLIC: dir.PUBLIC + '/graphics',

    DOCS_SRC: dir.SRC + '/docs/**',
    DOCS_DEV: dir.DEV + '/docs',
    DOCS_PUBLIC: dir.PUBLIC + '/docs',

    TEST_RESULTS: dir.TEST + '/test-results',

    NEWRELIC_SRC: dir.SRC + '/newrelic.js',
    NEWRELIC_DEV: dir.DEV + '/',
    NEWRELIC_PUBLIC: dir.PUBLIC + '/'
};

let build = false;

let environmentConstantsEnum = {
    LOCAL: 0,
    DEV: 1,
    PROD: 2,
    DEVHOSTED: 3
};
let environmentConstants = environmentConstantsEnum.DEV;

require('harmonize')();

function makeTestFolder() {
    if (!fs.existsSync(path.TEST_RESULTS)){
        fs.mkdirSync(path.TEST_RESULTS);
    }
}

// TODO: Refactor these 3 tasks to avoid code reuse
// Copy Fonts to relevant path
gulp.task('fonts', () => {
    return gulp.src([path.FONTS_SRC])
        .pipe(gulp.dest((!build) ? path.FONTS_DEV : path.FONTS_PUBLIC));
});

// Copy Images to relevant path
gulp.task('images', () => {
    return gulp.src([path.IMAGES_SRC])
        .pipe(gulp.dest((!build) ? path.IMAGES_DEV : path.IMAGES_PUBLIC));
});

// Copy Graphics to build
gulp.task('graphics', () => {
    return gulp.src([path.GRAPHICS_SRC])
        .pipe(gulp.dest((!build) ? path.GRAPHICS_DEV : path.GRAPHICS_PUBLIC));
});

gulp.task('docs', () => {
    return gulp.src([path.DOCS_SRC])
        .pipe(gulp.dest((!build) ? path.DOCS_DEV : path.DOCS_PUBLIC));
});

// Use the proper constants file and move to src
gulp.task('copyConstants', () => {
    return gulp.src(!environmentConstants ? path.LOCAL_CONSTANTS : ((environmentConstants === 1) ? path.DEV_CONSTANTS : path.PROD_CONSTANTS))
        .pipe(rename(path.CONSTANTS_DESTNAME))
        .pipe(gulp.dest(path.CONSTANTS_DEST));
});

gulp.task('copyNewRelic', () => {
    return gulp.src(path.NEWRELIC_SRC)
        .pipe(gulp.dest((!build) ? path.NEWRELIC_DEV : path.NEWRELIC_PUBLIC));
});

// Compile react files with Browserify and watch
// for changes with Watchify
gulp.task('watch', ['fonts', 'images', 'graphics', 'docs', 'copyConstants', 'copyNewRelic'], () => {
    const props = {
        entries: [path.ENTRY_POINT],
        transform: [[babelify, { presets: ['es2015', 'react'] }, {envify: { global: true}}]],
        debug: !build,
        cache: {}, packageCache: {}, fullPaths: true
    };
    let watcher = browserify(props);
    if (environmentConstants == environmentConstantsEnum.DEV) {
        watcher = watchify(browserify(props));
    }

    return watcher.on('update', () => {
        watcher.bundle()
            .on('error', gutil.log)
            .pipe(source(path.OUT))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: !build }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest((!build) ? dir.DEV : dir.PUBLIC))
            .on('end', () => {
                gutil.log(chalk.cyan('Reloading JS...'));
            })
            .pipe(connect.reload());
    })
        .bundle().on('error', gutil.log)
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: !build }))
        .pipe(gulpif(!build, sourcemaps.write('.')))
        .pipe(gulp.dest((!build) ? dir.DEV : dir.PUBLIC));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src(path.CSS_SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(build, cssNano()))
        .pipe(gulp.dest((!build) ? path.CSS_DEV : path.CSS_PUBLIC))
        .pipe(connect.reload());
});

// HTML replace scripts with minified version for build
// Move index.html to public folder for deployment
gulp.task('html-replace', () => {

    // don't replace with minified files unless not in local dev
    if (environmentConstants == environmentConstantsEnum.DEV) {
        return gulp.src([path.INDEX_SRC])
            .pipe(gulp.dest(dir.PUBLIC));
    }
    else {
        return gulp.src([path.INDEX_SRC])
            .pipe(replace(path.OUT, path.MINIFIED_OUT))
            .pipe(gulp.dest(dir.PUBLIC));
    }


    
});

// Minifying
gulp.task('minify', ['sass', 'watch', 'html-replace'], () => {
    return gulp.src([dir.PUBLIC + '/' + path.OUT])
        .pipe(vinylPaths(del))
        .pipe(rename(path.MINIFIED_OUT))
        .pipe(uglify())
        .pipe(gulp.dest(dir.PUBLIC));
});

gulp.task('reload', () => {
    connect.reload();
});

gulp.task('serve', ['set-build', 'html-replace', 'sass', 'watch'], () => {
    gulp.watch([path.SASS_SRC, path.CSS_SRC], ['sass']);
    gulp.watch(['*.html'], ['reload']);

    connect.server({
        root: dir.PUBLIC,
        port: 3000,
        livereload: true
    });
});

// Set build variable for conditional build tasks
gulp.task('set-build', () => {
    build = true;
});

gulp.task('set-hosted-dev', () => {
    environmentConstants = environmentConstantsEnum.DEVHOSTED;
})

// Set constants variable for production constants file
gulp.task('set-prod-constants', () => {
    environmentConstants = environmentConstantsEnum.PROD;
});

// Set constants variable for local constants file
gulp.task('set-local-constants', () => {
    environmentConstants = environmentConstantsEnum.LOCAL;
});

// Production task
gulp.task('production', ['set-build', 'set-prod-constants', 'minify']);

// Build with dev constants for demos task
gulp.task('buildDev', ['set-build', 'set-hosted-dev', 'minify']);

// Build with local constants for local deployment
gulp.task('buildLocal', ['set-build', 'set-local-constants', 'minify']);

// Default task for development
gulp.task('default', ['serve']);

gulp.task('test-results', () => {
    makeTestFolder();
});

gulp.task('jest', shell.task('jest', {
    // So our task doesn't error out when a test fails
    ignoreErrors: true
}));

gulp.task('test', ['test-results', 'jest']);

gulp.task('expresso', () => {
    return gulp.src(['./__unittests__/**/*-spec.js','./__unittests__/**/*-spec.jsx', '!./__unittests__/support/*.js'], { read: false })
        .pipe(mocha({
            compilers: {
                js: babel
            },
            require: ['./__unittests__/setup.js']
        }))
})

gulp.task('mocha', () => {
    return gulp.src(['./__unittests__/**/*-spec.js','./__unittests__/**/*-spec.jsx', '!./__unittests__/support/*.js'], { read: false })
        .pipe(mocha({
            compilers: {
                js: babel
            },
            require: ['./__unittests__/setup.js'],
            reporter: 'mocha-junit-reporter',
            reporterOptions: {
                mochaFile: './__unittests__/mocha.xml'
            }
        }))
})
