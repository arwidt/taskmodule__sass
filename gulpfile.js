
var gulp = require('gulp');
var async = require('async');
var tm_sass = require('./index.js');

gulp.task('default', function() {

    async.series([
        tm_sass('test/main.scss', 'dist/main.css')
    ], function() {
        console.log("DONE");
    });

});
