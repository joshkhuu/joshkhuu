var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');

// Sources Configurable
var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
	'components/scripts/bootstrap.js',
	'components/scripts/SmoothScroll.js',
	'components/scripts/easypiechart.js',
	'components/scripts/jquery.prettyPhoto.js',
	'components/scripts/jquery.isotope.js',
	'components/scripts/jquery.counterup.js',
	'components/scripts/waypoints.js',
	'components/scripts/jqBootstrapValidation.js',
	'components/scripts/contact_me.js',
	'components/scripts/main.js',
	];
var sassSources = ['components/sass/style.scss'];

// Transpile Coffeescript to Javascript
gulp.task('coffee', function(){
	gulp.src(coffeeSources)
		.pipe(coffee({ bare: true})
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
		
});

// Concat all Javscript to scripts.js
gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('scripts.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
});

// Concat all Javscript to scripts.js
gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/developement/img',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
});