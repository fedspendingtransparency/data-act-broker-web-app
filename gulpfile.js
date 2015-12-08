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

// Path constants
var path = {
    BASE_DIR: './',
    BUILD_DIR: 'build',
    MINIFIED_OUT: 'app.min.js',
    OUT: 'app.js',
    ENTRY_POINT: './src/js/app.jsx',
    SASS_DIR: 'src/css/*.*'
};

gulp.task('watch', function() {
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
            .pipe(gulp.dest(path.BUILD_DIR))
            .pipe(browserSync.reload({stream:true}));
        console.log('Updated');
    })
        .bundle().on('error', gutil.log)
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.BUILD_DIR));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(path.SASS_DIR)
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream:true}));
});

// Static Server from BrowserSync
gulp.task('serve', ['sass', 'watch'], function() {
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
});
