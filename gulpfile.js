var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var jsonMinify = require('gulp-jsonminify');
var concat = require('gulp-concat');

var env, 
	coffeeSources, 
	jsSources, 
	htmlSources, 
	sassSources, 
	jsonSources, 
	outputDir,
	sassStyle;

// Environmet settings
// env = process.env.NODE_ENV || 'development';

env = 'production';

if (env === 'development'){
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
}else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

// Sources Configurable
coffeeSources = ['components/coffee/tagline.coffee'];
jsSources = [
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	];
sassSources = ['components/sass/style.scss'];
htmlSources = ['builds/development/*.html'];
jsonSources = ['builds/development/js/*.json'];

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
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

// Concat all Javscript to scripts.js
gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir + 'img',
			style: sassStyle
		})
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});

// Watch for changes
gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
	gulp.watch('builds/development/img/**/*.*', ['images']);
});

gulp.task('connect', function(){
	connect.server({
		root : outputDir,
		livereload : true
	});
});

gulp.task ('html', function(){
	gulp.src(htmlSources)
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task ('images', function(){
	gulp.src('builds/development/img/**/*.*')
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'img')))
		.pipe(connect.reload())
});

gulp.task ('json', function(){
	gulp.src(jsonSources)
		.pipe(gulpif(env === 'production', jsonMinify()))
		.pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
		.pipe(connect.reload())
});

// Run all tasks for development
gulp.task('default', ['html', 'coffee', 'js', 'json', 'compass', 'images', 'connect', 'watch']);