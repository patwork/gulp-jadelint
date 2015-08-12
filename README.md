# Gulp plugin for Jadelint

## Usage

``
var gulp = require('gulp'),
	jadelint = require('gulp-jadelint');

gulp.task('default', function () {
	return gulp
		.src('views/*.jade')
		.pipe(jadelint());
});
``

## References

[rrdelaney/jadelint](https://github.com/rrdelaney/jadelint)

## License

MIT
