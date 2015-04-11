var gulp = require('gulp');
var gautoprefixer = require('gulp-autoprefixer');
var mbfiles = require('main-bower-files');
var gflatten = require('gulp-flatten');
var gchanged = require('gulp-changed');
var gcssvalidator = require('gulp-css-validator');
var gcsslint = require('gulp-csslint');
var ginject = require('gulp-inject');
var gminifycss = require('gulp-minify-css');
var gminifyhtml = require('gulp-minify-html');
var gngannotate = require('gulp-ng-annotate');
var gorder = require('gulp-order');
var gplumber = require('gulp-plumber');
var rimraf = require('rimraf');
var gstripdebug = require('gulp-strip-debug');
var gstylus = require('gulp-stylus');
var gtodo = require('gulp-todo');
var guglify = require('gulp-uglify');
var gusing = require('gulp-using');
var gutil = require('gulp-util');
var eventstream = require('event-stream');
var imageminpngcrush = require('imagemin-pngcrush');

gulp.task('default', function() {
  // place code for your default task here
});
