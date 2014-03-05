#!/usr/bin/env node

var fs = require('fs');
var csv = require('csv');

var begin = [
	'exports.mainCharset = function(_charset) {',
	'var charset = _charset.toLowerCase();',
	'switch(charset) {',
	''
	].join('\n');
var end = [
	'}', 
	'};'
	].join('\n');
var code = '';

csv()
.from.path(__dirname+'/character-sets-1.csv', { delimiter: ',', escape: '"', columns: true })
.transform( function(row) {
  //set relative weight to move most common on top
  var weight = 0;
  if(row.Name == 'UTF-8') weight = 100;
  else if(row.Name == 'US-ASCII') weight = 99;
  else if(row.Name == 'UTF-16LE') weight = 98;
  else if(row.Name.match(/windows-/)) weight = 90;

  return { main: row.Name, aliases: row.Aliases.split('\n'), weight: weight };
})
.to.array(function(data) {
	data.sort(function(c1, c2) { return c2.weight - c1.weight; });

	data.forEach(function(row) {
		code += 'case "' + row.main.toLowerCase() + '":\n';
		row.aliases.forEach(function(a) {
			code += 'case "' + a.toLowerCase() + '":\n';
		});
		code += '\treturn "' + row.main + '";\n';
	});

	fs.writeFileSync('iana-names.js', begin + code + end);
});
