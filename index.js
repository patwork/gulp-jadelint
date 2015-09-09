/*
 * gulp-jadelint
 * https://github.com/patwork/gulp-jadelint
 */

/* jshint node: true */
/* eslint-env node */
'use strict';

// ---------------------------------------------------------------------------
var gutil = require('gulp-util'),
	through = require('through2'),
	vinylfs = require('vinyl-fs'),
	jadelint = require('jadelint'),
	RcLoader = require('rcloader');

// ---------------------------------------------------------------------------
module.exports = function (options) {

	var rc = new RcLoader('.jadelintrc', options);

	return through.obj(function (file, enc, cb) {

		// ignore empty files
		if (file.isNull()) {
			return cb(null, file);
		}

		// no love for streams for some reason
		if (file.isStream()) {
			return cb(new gutil.PluginError('gulp-jadelint', 'streaming not supported'));
		}

		// get options for linter
		rc.for(file.path, function (errRc, conf) {

			// run linter
			if (!errRc) {
				try {

					vinylfs
						.src(file.path)
						.pipe(jadelint(conf, void 0, function (reporter) {
							if (reporter.report()) {
								console.log(reporter.log);
							}
						}));

				} catch (errLint) {
					return cb(new gutil.PluginError('gulp-jadelint', errLint));
				}
			}

			// next!
			cb(null, file);

		});

	});

};

/* EoF */
