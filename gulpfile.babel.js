import gulp from 'gulp';
import browserSync from 'browser-sync';
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
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')({scope: ['dependencies']});
var shell = require('gulp-shell')

// Base Directories
const dir = {
    BASE: './',
    DEV: './dev',
    PUBLIC: './public',
    SRC: './src'
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
    CONSTANTS_DESTNAME: 'GlobalConstants.js',
    CONSTANTS_DEST: dir.SRC + '/js/',

    CSS_SRC: dir.SRC + '/css/**',
    CSS_DEV: dir.DEV + '/css',
    CSS_PUBLIC: dir.PUBLIC + '/css',

    FONTS_SRC: dir.SRC + '/fonts/**',
    FONTS_DEV: dir.DEV + '/fonts',
    FONTS_PUBLIC: dir.PUBLIC + '/fonts',

    IMAGES_SRC: dir.SRC + '/images/**',
    IMAGES_DEV: dir.DEV + '/images',
    IMAGES_PUBLIC: dir.PUBLIC + '/images',

    GRAPHICS_SRC: dir.SRC + '/graphics/**',
    GRAPHICS_DEV: dir.DEV + '/graphics',
    GRAPHICS_PUBLIC: dir.PUBLIC + '/graphics'
};

let build = false;
let prodConstants = false;

require('harmonize')();

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

// Use the proper constants file and move to src
gulp.task('copyConstants', () => {
    return gulp.src((prodConstants) ? path.PROD_CONSTANTS : path.DEV_CONSTANTS)
        .pipe(rename(path.CONSTANTS_DESTNAME))
        .pipe(gulp.dest(path.CONSTANTS_DEST));
});

// Compile react files with Browserify and watch
// for changes with Watchify
gulp.task('watch', ['fonts', 'images', 'graphics', 'copyConstants'], () => {
    const props = {
        entries: [path.ENTRY_POINT],
        transform: [[babelify, { presets: ['es2015', 'react'] }]],
        debug: !build,
        cache: {}, packageCache: {}, fullPaths: true
    };
    const watcher = build ? browserify(props) : watchify(browserify(props));

    return watcher.on('update', () => {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: !build }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest((!build) ? dir.DEV : dir.PUBLIC))
            .pipe(browserSync.reload({ stream: true }));
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
        .pipe(sass())
        .pipe(gulpif(build, cssNano()))
        .pipe(gulp.dest((!build) ? path.CSS_DEV : path.CSS_PUBLIC))
        .pipe(browserSync.reload({ stream: true }));
});

// HTML replace scripts with minified version for build
// Move index.html to public folder for deployment
gulp.task('html-replace', () => {
    return gulp.src([path.INDEX_SRC])
        .pipe(replace('dev/', ''))
        .pipe(replace(path.OUT, path.MINIFIED_OUT))
        .pipe(gulp.dest(dir.PUBLIC));
});

// Minifying
gulp.task('minify', ['sass', 'watch', 'html-replace'], () => {
    return gulp.src([dir.PUBLIC + '/' + path.OUT])
        .pipe(vinylPaths(del))
        .pipe(rename(path.MINIFIED_OUT))
        .pipe(uglify())
        .pipe(gulp.dest(dir.PUBLIC));
});

gulp.task('serve', ['sass', 'watch'], () => {
    gulp.watch([path.SASS_SRC, path.CSS_SRC], ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);

    return browserSync.init({
        server: {
            baseDir: dir.BASE
        }
    });
});

// Set build variable for conditional build tasks
gulp.task('set-build', () => {
    build = true;
});

// Set constants variable for production constants file
gulp.task('set-prod-constants', () => {
    prodConstants = true;
});

// Production task
gulp.task('production', ['set-build', 'set-prod-constants', 'minify']);

// Build with dev constants for demos task
gulp.task('buildDev', ['set-build', 'minify']);

// Default task for development
gulp.task('default', ['serve']);


gulp.task('jest', shell.task('jest', {
    // So our task doesn't error out when a test fails
    ignoreErrors: true
}));

