#!/usr/bin/env node

!function () {
  'use strict';

  var fs = require('fs-extra')
    , path = require('path')
    , qpack = require('./')
    , cwd = process.cwd()
    , HTML_REG = /\.html$/
    , mkdirp = fs.mkdirs
    , program = require('commander');

  function translate(root, dist) {
    fs.readdirSync(root).forEach(function (file) {
      file = path.resolve(root, file);
      if (HTML_REG.test(file)) {
        var data = qpack.translate({
          file: file
        }), dirname = path.dirname(file), css, html;
        dist = dist || path.resolve(dirname, '../' + data.block);
        css = path.resolve(dist, './main.css');
        html = path.resolve(dist, './main.html');
        mkdirp(dist, function (err) {
          if (err) {
            console.error(err);
          } else {
            fs.writeFileSync(css, data.css, 'utf-8');
            fs.writeFileSync(html, data.html, 'utf-8');
          }
        });
      }
    });
  }

  program
    .command('tran [src] [dist]')
    .description('translate Que component')
    .action(function (src, dist) {
      src = src ? path.join(cwd, src) : cwd;
      dist = dist ? path.join(cwd, dist) : undefined;
      translate(src, dist);
    });

  program
    .command('app [path]')
    .description('set up a local server to run the component')
    .option('-p, --port <port>', 'listen which port')
    .action(function (path, options) {
      path = path || cwd;
      qpack.app(path, options.port);
    });

  program
    .command('init [path]')
    .description('initialize a component')
    .action(function (path) {
      path = path || cwd;
      qpack.init(path);
    });

  program
    .version(qpack.version)
    .parse(process.argv);

}();
