'use strict';
var fs = require('fs');

function compareLine(css, file) {
  css = css.trim().replace(/(\r?\n)+/g, '\n').split('\n');
  file = fs.readFileSync(file, { encoding: 'utf8' }).trim()
    .replace(/(\r?\n)+/g, '\n').split(/\n/);
  css.forEach(function (line, i) {
    line.should.equal(file[i]);
  });
}

return module.exports = compareLine;
