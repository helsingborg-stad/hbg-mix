/* ==========================================================================
   Dependencies
   ========================================================================== */

    var gulp        =   require('gulp'),
    sass            =   require('gulp-sass'),
    autoprefixer    =   require('gulp-autoprefixer'),
    del             =   require('del'),
    runSequence     =   require('run-sequence'),
    plumber         =   require('gulp-plumber'),
    bump            =   require('gulp-bump'),
    git             =   require('gulp-git'),
    filter          =   require('gulp-filter'),
    tag_version     =   require('gulp-tag-version'),
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
   Verisioning tasks
   ========================================================================== */

function inc(importance) {
    return gulp.src(['./package.json'])
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('Bumps package version'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
}

gulp.task('patch', function() { return inc('patch'); })
gulp.task('minor', function() { return inc('minor'); })
gulp.task('major', function() { return inc('major'); })
