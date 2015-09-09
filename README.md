# Gulp plugin for Jadelint

[![npm version](https://badge.fury.io/js/gulp-jadelint.svg)](http://badge.fury.io/js/gulp-jadelint)
[![Dependency Status](https://david-dm.org/patwork/gulp-jadelint.svg)](https://david-dm.org/patwork/gulp-jadelint)
[![devDependency Status](https://david-dm.org/patwork/gulp-jadelint/dev-status.svg)](https://david-dm.org/patwork/gulp-jadelint#info=devDependencies)

## Usage

```javascript
var gulp = require('gulp'),
	jadelint = require('gulp-jadelint');

gulp.task('default', function () {
	return gulp
		.src('views/*.jade')
		.pipe(jadelint());
});
```

## Configuration

```javascript
[...]
	.pipe(jadelint({ 'HTMLRootRequiresLang': 'ignore' }));
[...]
```

Plugin will also read .jadelintrc file.

## References

[rrdelaney/jadelint](https://github.com/rrdelaney/jadelint)

## License

MIT
