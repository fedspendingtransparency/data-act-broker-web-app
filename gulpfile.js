var gulp        = require('gulp');
var babel       = require('gulp-babel');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');

// Path constants
var path = {
    BASE_DIR: './',
    BUILD_DIR: 'build',
    BUILD_ENTRY: 'build/app.js',
    ENTRY_POINT: 'src/js/app.jsx',
    ALL_JSX: 'src/js/**/*.jsx',
    SASS_DIR: 'src/_scss/*.scss'
};

// Compile React into JS
gulp.task('babel', function () {
    return gulp.src(path.ALL_JSX)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});

// Browserify will compile Node style require in code
// Calling Babel here will ensure it finishes compiling
// before Browserify runs on the code.
// TODO: Add Watchify
gulp.task('browserify', ['babel'], function() {
    return browserify(path.BUILD_ENTRY).bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.BUILD_DIR))
        .pipe(browserSync.stream());
});

// Run Browserify and Babel before reloading browser
gulp.task('jsx-watch', ['browserify'], browserSync.reload);

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(path.SASS_DIR)
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

// Static Server from BrowserSync
gulp.task('serve', ['sass', 'browserify'], function() {
    browserSync.init({
        server: {
            baseDir: path.BASE_DIR
        }
    });
});

// Default task for development
gulp.task('default', ['serve'], function () {
    gulp.watch(path.SASS_DIR, ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch(path.ALL_JSX, ['jsx-watch']);
});
