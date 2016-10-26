var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var rename          = require('gulp-rename');
var plumber         = require('gulp-plumber');
var cssnano         = require('gulp-cssnano');
var gutil           = require('gulp-util');

module.exports = function(source, output) {
    return function(callback) {
        var onError = function (err) {
            gutil.beep();
            gutil.log(err);
            this.emit('end');
        };

        var paths = output.split('/');
        var outputName = paths[paths.length-1].split('.').slice(0, -1).join('.');
        var outputPath = paths.slice(0, -1).join('/');

        return gulp.src(source)
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sourcemaps.init())
            .pipe(sass({style: 'compact', errLogToConsole: true}))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(cssnano())
            .pipe(rename(outputName + ".css"))
            .pipe(gulp.dest(outputPath))
            .on('finish', function() {
                if (callback) {
                    callback();
                }
            });
    };
}
