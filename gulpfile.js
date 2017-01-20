var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');

// Sources Configurable
var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	];
var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];

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
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
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
		.pipe(connect.reload())
});

// Watch for changes
gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function(){
	connect.server({
		root : 'builds/development/',
		livereload : true
	});
});

gulp.task ('html', function(){
	gulp.src(htmlSources)
	.pipe(connect.reload())
});

gulp.task ('json', function(){
	gulp.src(jsonSources)
	.pipe(connect.reload())
});

// Run all tasks for developement
gulp.task('default', ['html','coffee', 'js', 'compass', 'connect', 'watch'], function(){});