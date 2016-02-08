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
import del from 'del';
import vinylPaths from 'vinyl-paths';

// Base Directories
const dir = {
    BASE: './',
    BUILD: './build',
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

    CSS_SRC: dir.SRC + '/css/**',
    CSS_BUILD: dir.BUILD + '/css',
    CSS_PUBLIC: dir.PUBLIC + '/css',

    FONTS_SRC: dir.SRC + '/fonts/**',
    FONTS_BUILD: dir.BUILD + '/fonts',
    FONTS_PUBLIC: dir.PUBLIC + '/fonts',

    IMAGES_SRC: dir.SRC + '/images/**',
    IMAGES_BUILD: dir.BUILD + '/images',
    IMAGES_PUBLIC: dir.PUBLIC + '/images',

    GRAPHICS_SRC: dir.SRC + '/graphics/**',
    GRAPHICS_BUILD: dir.BUILD + '/graphics',
    GRAPHICS_PUBLIC: dir.PUBLIC + '/graphics'
};

let production = false;

// TODO: Refactor these 3 tasks to avoid code reuse
// Copy Fonts to build
gulp.task('fonts', () => {
    return gulp.src([path.FONTS_SRC])
        .pipe(gulp.dest((!production) ? path.FONTS_BUILD : path.FONTS_PUBLIC));
});

// Copy Images to build
gulp.task('images', () => {
    return gulp.src([path.IMAGES_SRC])
        .pipe(gulp.dest((!production) ? path.IMAGES_BUILD : path.IMAGES_PUBLIC));
});

// Copy Graphics to build
gulp.task('graphics', () => {
    return gulp.src([path.GRAPHICS_SRC])
        .pipe(gulp.dest((!production) ? path.GRAPHICS_BUILD : path.GRAPHICS_PUBLIC));
});

// Compile react files with Browserify and watch
// for changes with Watchify
gulp.task('watch', ['fonts', 'images', 'graphics'], () => {
    const props = {
        entries: [path.ENTRY_POINT],
        transform: [[babelify, { presets: ['es2015', 'react'] }]],
        debug: !production,
        cache: {}, packageCache: {}, fullPaths: true
    };
    const watcher = production ? browserify(props) : watchify(browserify(props));

    return watcher.on('update', () => {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: !production }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest((!production) ? dir.BUILD : dir.PUBLIC))
            .pipe(browserSync.reload({ stream: true }));
    })
        .bundle().on('error', gutil.log)
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: !production }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest((!production) ? dir.BUILD : dir.PUBLIC));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src(path.CSS_SRC)
        .pipe(sass())
        .pipe(gulp.dest((!production) ? path.CSS_BUILD : path.CSS_PUBLIC))
        .pipe(browserSync.reload({ stream: true }));
});

// HTML replace scripts with minified version for production
// Move index.html to public folder for deployment
gulp.task('html-replace', () => {
    return gulp.src([path.INDEX_SRC])
        .pipe(replace('build/', ''))
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

// Set the NODE_ENV variable for conditional code in front end.
gulp.task('set-prod-node-env', () => {
    production = true;
    process.env.NODE_ENV = 'production';

    return process.env.NODE_ENV;
});

// Production task
// TODO:
// * Remove pre-minified files and sourcemaps
// * Minify CSS
gulp.task('production', ['set-prod-node-env', 'minify']);

// Default task for development
gulp.task('default', ['serve']);
