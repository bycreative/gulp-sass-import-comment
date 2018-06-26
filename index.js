const through = require('through2');

module.exports = function(opts) {
	 return through.obj(function(file, encoding, callback) {
			if (file.isNull()) {
				return callback(null, file);
			}

			let styles = file.contents.toString().replace(/@import(.*?);/gi, function(match, contents, offset, input_string) {
				if (opts.exclude.test(contents)) return match;
return `
/*!------------------------------------------------------------------------
 * Import: ${contents.trim().replace(/['"]/g, '').replace(/\.scss/i, '')}
/* -----------------------------------------------------------------------*/

${match}
`;
			});

			file.contents = new Buffer(styles, encoding);

			callback(null, file);
	 });
};
