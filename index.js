var translate = require('./lib/translate')
  , app = require('./lib/app')
  , init = require('./lib/init');

module.exports = {
  translate: translate,
  app: app,
  init: init,
  version: require('./package').version
};
