var middlePipe = require('middleware-pipe')
  , post = require('./gulp/post');

function app(src, port) {
  port = port || 80;
  require('connect')()
    .use(
      middlePipe(src, /\.css$/)
        .pipe(post())
    )
    .use(
      middlePipe(src)
    )
    .listen(port);
}

module.exports = app;
