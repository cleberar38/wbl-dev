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
var indexTemplate = "index_template.html";

gulp.task('default', function() {
  // place code for your default task here
});


var w = {

	htmlTemplate: indexTemplate,

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
		"core/css/wbl.css"
		// "core/css/lib-overrides.css",

		// // last
		// "plugins/**/*.css",
		// "!plugins/**/_*.css",
		// "!plugins/DrawSmap/*.css",
		// "!plugins/Edit/**/*.css",
		// "!plugins/MyPlugin/**/*.css",
		// "!plugins/SideBars/**/*.css",
		// "!plugins/ThreeD/**/*.css",
		// "!plugins/WorkshopPlugin/**/*.css",
		// "core/css/themes/theme-malmo.css"

		
	],
	wblJs: [

		"core/js/wbl.js",
		"core/js/*.js"
		// "plugins/**/*.js",
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


// ----- Tasks ------
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
// gulp.task('cleanconfigs', function() {
// 	return gulp.src("dist/configs").pipe(rimraf());
// });
gulp.task('cleanimg', function() {
	return gulp.src("dist/img").pipe(rimraf());
});
gulp.task('clean', ['cleanlib', 'cleancode']); // Clean all but img folder
gulp.task('cleantotal', function() {
	return gulp.src("dist").pipe(rimraf());
});


var onError = function(err) {
	console.log(err.toString());
  	// this.emit('end');
};

//commented by CLEBER
// gulp.task('move', function() {
// 	gulp.src("plugins/**/resources/**/*") //, {base: "./"})
// 		.pipe(gflatten())
// 		// .pipe(using())
// 		.pipe(gulp.dest("dist/resources/"));
// });

// ---- wbl code -----

//Commented by CLEBER
// gulp.task('wblcsscompile', function() {
// 	var streamStylus = gulp.src(w.wblStylus, {base: "./"})
// 			.pipe(stylus()).on("error", onError);
// 	// var streamSass = gulp.src(w.wblSass, {base: "./"})
// 	// 		.pipe(sass());

// 	return es.merge(streamStylus) //streamSass)
// 			.pipe(gautoprefixer("last 1 version", "> 1%", "ie 8", "ie 9")) //.on('error', onError)
// 			.pipe(gulp.dest("."));
// });

gulp.task('wblcss', function() {
//Commented by CLEBER
//gulp.task('wblcss', ['wblcsscompile'], function() {
	return gulp
		.src(w.wblCss)
		.pipe(gautoprefixer("last 1 version", "> 1%", "ie 8", "ie 9"))
		// .pipe(csslint())
		// .pipe(csslint.reporter())
		// .pipe(order(w.wblCss.concat("*")))
		.pipe(concat('wbl.css'))
		.pipe(gminifycss())
		// .pipe(grename("smap.css"))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
});

gulp.task('wbljs', function() {
	return gulp
		.src(w.wblJs)
		// .pipe(order(w.wblJs.concat("*")))
		// .pipe(jshint())
  // 		.pipe(jshint.reporter('default'))
  		.pipe(gstripdebug())
  		.pipe(gngannotate())
		.pipe(guglify())  // {mangle: false}
  		.pipe(concat("wbl.js"))
		.pipe(gulp.dest("dist"))
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

gulp.task('configs', function() {
	return gulp
		.src(['examples/configs/*.js'])
			.pipe(gulp.dest("dist/configs"));
});

// gulp.task('movecssresources', function() {
// 	return gulp
// 		.src(['dist/lib/**/*.{eot,svg,ttf,woff,png,jpg,jpeg,gif}'], {base: "dist/lib/", ignorePath: "dist/lib/"})
// 		.pipe(gulp.dest("dist/css"));
// });

gulp.task('libs', function() {
	return gulp.src(mbowerfiles(), {base: "./bower_components/"}).pipe(gulp.dest("dist/lib"));  // {checkExistence: true}
});

gulp.task('libsjs', ["libs"], function() {
	return gulp
		.src(w.libsJs)
		// .pipe(order(p.libsJs.concat("*")))
		// .pipe(using())
  		.pipe(concat("libs.js"))
		// .pipe(guglify())  // {mangle: false}
		.on('error', onError)
		.pipe(gulp.dest("dist"));
});

// gulp.task('libscss', function() {
// 	return gulp
// 		.src(p.libsCss)
// 		.pipe(gautoprefixer("last 1 version", "> 1%", "ie 8"))
// 		// .pipe(csslint())
// 		// .pipe(csslint.reporter())
// 		// .pipe(order(w.wblCss.concat("*")))
// 		.pipe(concat('libs.css'))
// 		.pipe(mincss())
// 		// .pipe(grename("smap.css"))
// 		.pipe(gulp.dest("dist"));
// });

gulp.task('htmlinjectdev', ["libs", "wblcss", "wbljs"], function() {
	var libsJs = w.libsJs.slice(0, w.libsJs.length-1); // we don't want buildLibOverrides.js because we don't compress libs
	var devSrcs = libsJs.concat(w.libsCss).concat(w.wblJs).concat(w.wblCss);
	console.log(libsJs);
	return gulp
		.src(w.htmlTemplate)
		.pipe(ginject(gulp.src(devSrcs, {read: false}), {addRootSlash: false}))
		.pipe(grename("dev.html"))
		.pipe(gulp.dest("."));
});

gulp.task('htmlinjectprod', ["libsjs", "wblcss", "wbljs"], function() {
	var libsJs = ["dist/libs.js"]; //p.libsJs
	var libsCss = w.libsCss; //["dist/libs.css"];
	var prodSrcs = libsJs.concat(libsCss).concat("dist/wbl.js").concat("dist/wbl.css");
	return gulp
		.src(w.htmlTemplate)
		.pipe(ginject(gulp.src(prodSrcs, {read: false}), {addRootSlash: false, ignorePath: 'dist/'}))
		.pipe(grename("index.html"))
		.pipe(gulp.dest("dist"));
});
gulp.task('htmlinject', ["htmlinjectdev", "htmlinjectprod"]);

gulp.task('htmlcompress', ['htmlinject'], function() {
	return gulp
		.src('index.html')
		.pipe(gminifyhtml())
		.pipe(gulp.dest("."));
});
gulp.task('html', ["htmlcompress"]);

// Build wbl code (during dev)
gulp.task('wblcode', ["wblcss", "wbljs"]);  // "move"

gulp.task('_full', ["images", "html", "configs"]);
//Modified by CLEBER
//gulp.task('_full', ["images", "html", "move", "configs"]);

// Clean the code and libs and then make a full build (i.e. fetch libs to dist,
// compile js/css/sass/styl and insert into HTML).
gulp.task('full', ["cleancode"], function() {
	return gulp.start("_full");
});

//gulp.task('fullmalmo', ["cleancode"], function() {
// 	// w.wblSass.unshift("dist/lib/malmo_shared_assets/**/*.scss");  In case we need advanced sass functionality from malmo assets
// 	p.htmlTemplate = indexTemplate;
// 	return gulp.start("_full");
// });

// Note! It's wise to run <bower update> before resetting. Thereby, packages will be
// up to date and any missing files (however that might happen...) will be filled-in.
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

