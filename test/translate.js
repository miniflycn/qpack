var translate = require('../').translate
  , compareLine = require('./lib/compareLine');

describe('translate', function () {
  it('should xxx', function () {
    var data = translate({
      file: './test/src/index.html'
    });
    compareLine(data.css, './test/dist/main.css');
    compareLine(data.html, './test/dist/main.html');
  });
});
