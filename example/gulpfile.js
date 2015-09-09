// gulp-jadelint-example

var gulp = require('gulp'),
jadelint = require('gulp-jadelint');

gulp.task('default', function () {
	return gulp
		.src('views/*.jade')
		.pipe(jadelint());
});

// EoF
