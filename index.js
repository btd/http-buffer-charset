var ianaCharsets = require('./iana-names');

// it is very unclear why node developers does not take iana charset names
module.exports = function(httpCharset) {
	var mainCharset = ianaCharsets.mainCharset(httpCharset);

	switch(mainCharset) {
		case 'UTF-8': return 'utf8';
		case 'US-ASCII': return 'ascii';
		case 'UTF-16LE': return 'utf16le';
	}
}

exports.resolveAliasCharset = ianaCharsets.mainCharset;