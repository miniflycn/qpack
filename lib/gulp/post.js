var map = require('map-stream')
  , postcss = require('postcss')
  , cssgrace = require('cssgrace')
  , nested = require('postcss-nested')
  , minmax = require('postcss-media-minmax')
  , selector = require('postcss-custom-selectors');

module.exports = function () {
  var contenter = postcss()
    .use(minmax())
    .use(cssgrace)
    .use(selector())
    .use(nested);
  return map(function (file, fn) {
    file.contents = new Buffer(
      contenter.process(file.contents.toString(), { from: file.path }).css
    );
    fn(null, file);
  });
}
