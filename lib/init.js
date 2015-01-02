var fs = require('fs-extra')
  , path = require('path');

module.exports = function (target) {
  fs.copy(path.resolve(__dirname, '../sample'), target);
}
