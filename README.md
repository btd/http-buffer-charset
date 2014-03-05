This module help to get correct charset for node Buffer, when you know http charset (e.g from Content-Type). Node developers choose another names for charsets in Buffer, so this module should help to map each other.

How to use
----------

```
npm install http-buffer-charset
```

```
var getCharset = require('http-buffer-charset');

getCharset('UTF-8') // => 'utf8'
getCharset('csutf8') // => 'utf8'

// node buffer support only 3 charsets according to docs: utf-8, utf-16le and us-ascii, so
getCharset('windows-1251') // => undefined

// if you want convert buffer to another encoding e.g. in utf8 you may use iconv or similar thing, to resolve aliases in charsets
getCharset.resolveAliasCharset('cswindows1251') // => 'windows-1251'
```

Other things
------------

In this repository stored csv list of charsets from http://www.iana.org/assignments/character-sets/character-sets.xhtml. 
By this list generated file `iana-names.js`. So do not even try to edit it manually.

License
-------

MIT
