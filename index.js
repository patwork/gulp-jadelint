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
	chalk = require('chalk'),
	table = require('text-table'),
	symbols = require('log-symbols'),
	Linter = require('jadelint');

// ---------------------------------------------------------------------------
function reporter(results, filename) {

	// let's create a pretty table
	var tbl = table(results.filter(function (msg) {
		return (msg.level && msg.level !== 'ignore');
	}).map(function (msg) {
		return [ '', symbols[msg.level], chalk.grey('line ' + msg.line), chalk.blue(msg.name) ];
	}));

	// append filename and stuff
	if (tbl.length) {
		return [ '', chalk.underline(filename), tbl, '' ].join('\n');
	}

	// ops, there were no errors after all
	return '';

}

// ---------------------------------------------------------------------------
module.exports = function () {
	return through.obj(function (file, enc, cb) {

		var linter, results, output;

		// ignore empty files
		if (file.isNull()) {
			return cb(null, file);
		}

		// no love for streams for some reason
		if (file.isStream()) {
			return cb(new gutil.PluginError('gulp-jadelint', 'streaming not supported'));
		}

		// run linter
		try {
			linter = new Linter(file.path, file.contents.toString());
			results = linter.lint();

			var errorArr  = [];
			var warningArr = [];

			for(var i=0; i < results.length; i++){
				if(results[i].level === 'error'){
					errorArr.push(results[i]);
				}else if(results[i].level === 'warning'){
					warningArr.push(results[i]);
				}
			}

			file.jadelint = {
				errors: errorArr,
				warnings: warningArr
			};
		} catch (err) {
			return cb(new gutil.PluginError('gulp-jadelint', err));
		}

		// reporter
		if (results.length) {
			output = reporter(results, file.path);
			if (output.length) {
				console.log(output);
			}
		}

		// next!
		cb(null, file);

	});
};

/* EoF */
