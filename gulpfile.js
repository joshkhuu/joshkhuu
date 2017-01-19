var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
	'components/scripts/jquery.1.11.1.js',
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
		.pipe(gulp.dest('builds/development/js'))
});