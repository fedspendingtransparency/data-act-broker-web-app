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
import nodemon from 'gulp-nodemon';

// Base Directories
const dir = {
    BASE: './',
    BUILD: './build',
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
    FONTS_SRC: dir.SRC + '/fonts/**',
    FONTS_BUILD: dir.BUILD + '/fonts',
    IMAGES_SRC: dir.SRC + '/images/**',
    IMAGES_BUILD: dir.BUILD + '/images',
    GRAPHICS_SRC: dir.SRC + '/graphics/**',
    GRAPHICS_BUILD: dir.BUILD + '/graphics'
};

// TODO: Refactor these 3 tasks to avoid code reuse
// Copy Fonts to build
gulp.task('fonts', () => {
    return gulp.src([path.FONTS_SRC])
        .pipe(gulp.dest(path.FONTS_BUILD));
});

// Copy Images to build
gulp.task('images', () => {
    return gulp.src([path.IMAGES_SRC])
        .pipe(gulp.dest(path.IMAGES_BUILD));
});

// Copy Graphics to build
gulp.task('graphics', () => {
    return gulp.src([path.GRAPHICS_SRC])
        .pipe(gulp.dest(path.GRAPHICS_BUILD));
});

// Compile react files with Browserify and watch
// for changes with Watchify
gulp.task('watch', ['fonts', 'images', 'graphics'], () => {
    const watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [[babelify, { presets: ['es2015', 'react'] }]],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', () => {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dir.BUILD))
            .pipe(browserSync.reload({ stream: true }));
        console.log('Updated');
    })
        .bundle().on('error', gutil.log)
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dir.BUILD));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src(path.CSS_SRC)
        .pipe(sass())
        .pipe(gulp.dest(path.CSS_BUILD))
        .pipe(browserSync.reload({ stream: true }));
});

// HTML replace scripts with minified version for production
// Move index.html to build folder for deployment
gulp.task('html-replace', () => {
    return gulp.src([path.INDEX_SRC])
        .pipe(replace('build/', ''))
        .pipe(replace(path.OUT, path.MINIFIED_OUT))
        .pipe(gulp.dest(dir.BUILD));
});

// Minifying
gulp.task('minify', ['sass', 'watch', 'html-replace'], () => {
    return gulp.src([dir.BUILD + '/' + path.OUT])
        .pipe(rename(path.MINIFIED_OUT))
        .pipe(uglify())
        .pipe(gulp.dest(dir.BUILD));
});

gulp.task('serve', ['sass', 'watch'], (cb) => {
    const BROWSER_SYNC_RELOAD_DELAY = 500;
    let started = false;

    gulp.watch([path.SASS_SRC, path.CSS_SRC], ['sass']);

    gulp.watch('*.html').on('change', browserSync.reload);

    return nodemon({
        script: 'server.js',
        ignore: [
            './bower_components/**',
            './node_modules/**',
            './build/**'
        ]
    }).on('start', () => {
        if (!started) {
            cb();

            // Static Server from BrowserSync
            browserSync.init({
                // Tells BrowserSync on where the express app is running
                proxy: 'http://localhost:5001'
            });

            started = true;
        }
    }).on('restart', () => {
        // Reload connected browsers after a slight delay
        setTimeout(() => {
            browserSync.reload({
                stream: false
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

// Production task
// TODO:
// * Remove pre-minified files and sourcemaps
// * Minify CSS
gulp.task('production', ['minify']);

// Default task for development
gulp.task('default', ['serve']);
