/* ==========================================================================
   Dependencies
   ========================================================================== */

    var gulp        =   require('gulp'),
    sass            =   require('gulp-sass'),
    autoprefixer    =   require('gulp-autoprefixer'),
    del             =   require('del'),
    runSequence     =   require('run-sequence'),
    plumber         =   require('gulp-plumber'),
    node_modules    =   'node_modules/';

/* ==========================================================================
   Default task
   ========================================================================== */

    gulp.task('default', function(callback) {
        runSequence('sass', 'watch', callback);
    });


/* ==========================================================================
   Watch task
   ========================================================================== */

    gulp.task('watch', function() {
        gulp.watch('./source/**/*.scss', ['sass']);
    });

/* ==========================================================================
   SASS Task
   ========================================================================== */

    gulp.task('sass', function () {
        var app = gulp.src('source/hbg-mix.scss')
                .pipe(plumber())
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer({
                        browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1']
                    }))
                .pipe(gulp.dest('./dist'))
        return [app];
    });

/* ==========================================================================
   Clean/Clear tasks
   ========================================================================== */

    gulp.task('clean:dist', function () {
        return del.sync('./dist');
    });

