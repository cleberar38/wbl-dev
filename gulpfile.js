//#########################################################################################
//
//		GULP INSTALLATIONS - BY CLEBER ARRUDA - 2015 GITHUB WBL-DEV
//
//#########################################################################################
var gulp = require('gulp');
var gautoprefixer = require('gulp-autoprefixer');
var mbowerfiles = require('main-bower-files');
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
var mkdirp = require('mkdirp');
var del = require('del');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var gimagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var grename = require('gulp-rename');
var connect = require('gulp-connect');

//#########################################################################################
//
//		GLOBAL VARIABLES
//
//#########################################################################################

var indexTemplate = "index_template.html";
var baseTemplate = "base_template.html";

var w = {

	htmlTemplate: indexTemplate,
	djangoBaseTemplate: baseTemplate,

	// ----- External libs for WBL ------
	libsCss: [

		// 'dist/lib/font-awesome/**/*.css',
		// 'dist/lib/sass-bootstrap/**/*.css',
		// 'dist/lib/leaflet/**/*.css',
		'dist/lib/**/*.css'
	],
	libsJs: [

		// 'dist/lib/es5-shim/es5-shim.js',
		// 'dist/lib/json3/**/*.js',
		'dist/lib/proj4/**/*.js',
		'dist/lib/jquery/**/*.js',
		'dist/lib/bootstrap/**/*.js',

		// 'dist/lib/sass-bootstrap/**/*.js',
		'dist/lib/leaflet/**/*.js',
		'!dist/lib/leaflet/dist/leaflet.js',
		// "dist/lib/Leaflet.NonTiledLayer/NonTiledLayer.js", // Must come before NonTiledLayer.WMS.js
		// 'dist/lib/GeoJSON.WFS/index.js',
		// 'dist/lib/leaflet.draw/**/*.js',

		// 'dist/lib/Leaflet.GeometryUtil/dist/*.js',
		// 'dist/lib/Leaflet.Snap/*.js',

		// //'dist/lib/Leaflet.print-smap/**/*.js',
		// 'lib/jquery.mobile.custom/jquery.mobile.custom.min.js', // Note! I could not install this lib with bower.
		'dist/lib/**/*.js'
		// '!dist/lib/leaflet-dist/*', // messing up
		// '!dist/lib/libs.js', // Don't use previously compressed lib file
		// '!dist/lib/add-to-homescreen/**/*.js', // Exclude this lib, it's optionally injected by plugin
		// 'core/js/buildLibOverrides.js'  // Override libs js
	],
	assetsCss: [

		'/static/assets/**/*.css'
	],
	assetsJs: [

		'/static/assets/**/*.js'
	],

	// ----- WBL code ------
	wblSass: [

		// first
		//"core/css/**/*.scss",

		// last
		// "plugins/**/*.scss"

	],
	wblStylus: [

		// first
		// "core/css/global.styl",
		// "core/css/**/*.styl",

		// last
		// "plugins/**/*.styl"
	],
	wblCss: [

		// first
		"core/css/wbl.css",
		// "core/css/lib-overrides.css",

		// // last
		"plugins/**/*.css"
		// "!plugins/**/_*.css",
		// "!plugins/DrawSmap/*.css",
		// "!plugins/Edit/**/*.css",
		// "!plugins/MyPlugin/**/*.css",
		// "!plugins/SideBars/**/*.css",
		// "!plugins/ThreeD/**/*.css",
		// "!plugins/WorkshopPlugin/**/*.css",
		// "core/css/themes/theme-malmo.css"

		
	],

	wblConfig: [
		"configs/wbl_config.js"
	],
	wblJs: [

		"core/js/wbl.js",
		"core/js/*.js",
		"plugins/**/*.js"
		// "!plugins/**/_*.js",
		// "!plugins/Test/**/*.js",
		// "!plugins/DrawSmap/*.js",
		// "!plugins/Edit/**/*.js",
		// "!plugins/MyPlugin/**/*.js",
		// "!plugins/SideBars/**/*.js",
		// "!plugins/ThreeD/**/*.js",
		// "!plugins/WorkshopPlugin/**/*.js",
		// "!plugins/PluginTemplate.js",
		// '!core/js/buildLibOverrides.js'

	]

};

//#########################################################################################
//
//		THIS IS THE ALL PURPOSE SECTION - TASKS ARE BELOW
//
//#########################################################################################
var onError = function(err) {
	console.log(err.toString());
  	// this.emit('end');
};
gulp.task('default', function() {
  // place code for your default task here
});
gulp.task('full', ["cleancode"], function() {
	return gulp.start("_full");
});
gulp.task('_full', ["images", "html", "configs"]);
gulp.task('htmlinject', ["htmlinjectdev", "htmlinjectprod"]);
gulp.task('htmlcompress', ['htmlinject'], function() {
	return gulp
		.src('index.html')
		.pipe(gminifyhtml())
		.pipe(gulp.dest("."));
});
gulp.task('html', ["htmlcompress"]);
gulp.task('reset', ["cleantotal", "full"]);
gulp.task('webserver', function() {
	connect.server({
		port: 8090,
		livereload: true
	});
});
gulp.task('watch', function() {
	var css = w.wblCss.concat(w.wblStylus).concat(w.wblSass);
	// var js = w.wblJs.concat("dist/configs/*.js");
	var tasks = ["wblcode"];
	gulp.start(tasks); // Start by running once
	return gulp.watch(css, tasks);
});
gulp.task('watchweb', ["webserver", "watch"]); // Allow auto-publishing whenever something changes
gulp.task('default', ["watch"]); // Note! <gulp> is same as <gulp default>

//#########################################################################################
//
//		THIS IS THE DEVELOPMENT SECTION - TASKS ARE BELOW
//
//#########################################################################################

gulp.task('wblcss', function() {
	return gulp
		.src(w.wblCss)
		.pipe(gautoprefixer("last 1 version", "> 1%", "ie 8", "ie 9"))
		.pipe(concat('wbl.css'))
		.pipe(gminifycss())
		.pipe(gulp.dest("dist"))
		.pipe(gulp.dest('./sites/development/static/css'))
		.pipe(connect.reload());
});
gulp.task('libs', function() {
	return gulp
		.src(mbowerfiles(), {base: "./bower_components/"})
		.pipe(gulp.dest("dist/lib"))
		.pipe(gulp.dest('./sites/development/static/assets'));  //Goes to the Django static files
});
gulp.task('htmlinjectdev', ["libs", "wblcss", "wbljs"], function() {
	var libsJs = w.libsJs.slice(0, w.libsJs.length-1); // we don't want buildLibOverrides.js because we don't compress libs
	var configJs = w.wblConfig;
	var devSrcs = libsJs.concat(configJs).concat(w.libsCss).concat(w.wblJs).concat(w.wblCss);
	console.log(libsJs);
	return gulp
		.src(w.htmlTemplate)
		.pipe(ginject(gulp.src(devSrcs, {read: false}), {addRootSlash: false}))
		.pipe(grename("dev.html"))
		.pipe(gulp.dest("."));
});

gulp.task('djangotemplates', function() {
	var assetsJs = w.assetsJs.slice(0, w.assetsJs.length-1); // we don't want buildLibOverrides.js because we don't compress libs
	var devSrcs = assetsJs.concat(w.assetsCss);
	console.log(assetsJs);
	return gulp.src(w.djangoBaseTemplate)
		.pipe(ginject(gulp.src(devSrcs, {read: false}), {relative: true, addRootSlash: false}))
		.pipe(grename("base.html"))
		.pipe(gulp.dest('./sites/development/templates'));

});

//#########################################################################################
//
//		THIS IS THE PRODUCTION SECTION - TASKS ARE BELOW
//
//#########################################################################################

gulp.task('cleancode', function() {
	del(["dist/css","dist/js","dist/*.*"], function (err, deletedFiles) {
		console.log('Files deleted:', deletedFiles.join(', '));
	});
});
gulp.task('cleanlib', function() {
	return gulp.src("dist/lib").pipe(rimraf());
});
gulp.task('cleanlib', function() {
	return gulp.src("dist/lib").pipe(rimraf());
});
gulp.task('cleanimg', function() {
	return gulp.src("dist/img").pipe(rimraf());
});
gulp.task('clean', ['cleanlib', 'cleancode']); // Clean all but img folder
gulp.task('cleantotal', function() {
	return gulp.src("dist").pipe(rimraf());
});
gulp.task('wbljs', function() {
	return gulp
		.src(w.wblJs)
  		.pipe(gstripdebug())
  		.pipe(gngannotate())
		.pipe(guglify())
  		.pipe(concat("wbl.js"))
		.pipe(gulp.dest("dist"))
		.pipe(gulp.dest('./sites/production/static'))
		.pipe(connect.reload());
});
gulp.task('images', function () {
	var imgDest = 'dist/img';
    return gulp
    	.src(['img/**/*.{png,jpg,jpeg,gif}'])
    	.pipe(gchanged(imgDest))
        .pipe(gimagemin({
        	progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [imageminpngcrush()]
        }))
        .pipe(gulp.dest(imgDest));
});
gulp.task('libsjs', ["libs"], function() {
	return gulp
		.src(w.libsJs)
  		.pipe(concat("libs.js"))
		.on('error', onError)
		.pipe(gulp.dest("dist"))
		.pipe(gulp.dest('./sites/production/static'));
});
gulp.task('htmlinjectprod', ["libsjs", "wblcss", "wbljs"], function() {
	var libsJs = ["dist/libs.js"];
	var configJs = w.wblConfig;
	var libsCss = w.libsCss; 
	var prodSrcs = libsJs.concat(libsCss).concat(configJs).concat("dist/wbl.js").concat("dist/wbl.css");
	return gulp
		.src(w.htmlTemplate)
		.pipe(ginject(gulp.src(prodSrcs, {read: false}), {addRootSlash: false, ignorePath: 'dist/'}))
		.pipe(grename("index.html"))
		.pipe(gulp.dest("dist"))
		.pipe(grename("base.html"))
		.pipe(gulp.dest('./sites/production/templates'));
});
// Build wbl code (during dev)
gulp.task('wblcode', ["wblcss", "wbljs"]);

gulp.task('configs', function() {
	return gulp
		.src(['configs/*.js'])
			.pipe(gulp.dest("dist/configs"));
});

//#########################################################################################
//
//					SECTIONS END
//
//#########################################################################################

// Note! It's wise to run <bower update> before resetting. Thereby, packages will be
// up to date and any missing files (however that might happen...) will be filled-in.
