var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var browserify  = require('browserify');
var watchify    = require('watchify');
var reactify    = require('reactify');
var uglify      = require('gulp-uglify');
var buffer      = require('vinyl-buffer');
var source      = require('vinyl-source-stream');
var sourcemaps  = require('gulp-sourcemaps');
var gutil       = require('gulp-util');

// Base Directories
var dir = {
    BASE: './',
    BUILD: './build',
    SRC: './src'
};

// Path constants
var path = {
    MINIFIED_OUT: 'app.min.js',
    OUT: 'app.js',
    ENTRY_POINT: dir.SRC + '/js/app.jsx',
    SASS_SRC: dir.SRC + '/css/**',
    SASS_BUILD: dir.BUILD + '/css',
    FONTS_SRC: dir.SRC + '/fonts/**',
    FONTS_BUILD: dir.BUILD + '/fonts',
    IMAGES_SRC: dir.SRC + '/images/**',
    IMAGES_BUILD: dir.BUILD + '/images',
    GRAPHICS_SRC: dir.SRC + '/graphics/**',
    GRAPHICS_BUILD: dir.BUILD + '/graphics'
};

// TODO: Refactor these 3 tasks to avoid code reuse
// Copy Fonts to build
gulp.task('fonts', function() {
    return gulp.src([path.FONTS_SRC])
        .pipe(gulp.dest(path.FONTS_BUILD));
});

// Copy Images to build
gulp.task('images', function() {
    return gulp.src([path.IMAGES_SRC])
        .pipe(gulp.dest(path.IMAGES_BUILD));
});

// Copy Graphics to build
gulp.task('graphics', function() {
    return gulp.src([path.GRAPHICS_SRC])
        .pipe(gulp.dest(path.GRAPHICS_BUILD));
});

// Compile react files with Browserify and watch
// for changes with Watchify
gulp.task('watch', ['fonts', 'images', 'graphics'], function() {
    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            //.pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dir.BUILD))
            .pipe(browserSync.reload({stream:true}));
        console.log('Updated');
    })
        .bundle().on('error', gutil.log)
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dir.BUILD));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(path.SASS_SRC)
        .pipe(sass())
        .pipe(gulp.dest(path.SASS_BUILD))
        .pipe(browserSync.reload({stream:true}));
});

// Static Server from BrowserSync
gulp.task('serve', ['sass', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: dir.BASE
        }
    });
});

// Default task for development
gulp.task('default', ['serve'], function () {
    gulp.watch(path.SASS_SRC, ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});
