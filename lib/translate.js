var htmlparser = require('htmlparser2')
  , DomUtils = htmlparser.DomUtils
  , postcss = require('postcss')
  , fs = require('fs')
  , path = require('path')
  , selectorREG = /\.([\w\-]+?)__/g
  , cssgrace = require('cssgrace')
  , nested = require('postcss-nested')
  , minmax = require('postcss-media-minmax')
  , selector = require('postcss-custom-selectors');

function _strSplice(str, index, length, replace) {
  var arr = str.split('');
  arr.splice(index, length, replace);
  return arr.join('');
}

function translate(options) {
  var file = options.file
    , contents = options.contents || fs.readFileSync(file, 'utf-8')
    , dom = htmlparser.parseDOM(contents)
    , links = DomUtils.find(function (ele) {
        if (
          ele.type === 'tag' &&
            ele.name === 'link' &&
              ele.attribs.rel === 'stylesheet'
        ) {
          return true;
        }
      }, dom, true)
    , link, contenter, block, blockREG, css, body;

  function fixBlock(css) {
    css.eachRule(function (rule) {
      rule.selector = rule.selector.replace(selectorREG, function (all, name) {
        // first time capture block name is the block name
        if (!block) block = name;
        // other must match this block name
        if (block && block === name) {
          return '.$__';
        } else {
          throw new Error('Block name must be ' + block);
        }
      });
    });
  }

  if (links.length > 0) {
    // ignore the second link
    link = path.resolve(path.dirname(file), links[0].attribs.href);
    contenter = postcss()
      .use(minmax())
      .use(cssgrace)
      .use(selector())
      .use(nested)
      .use(fixBlock);

    css = contenter.process(fs.readFileSync(link, 'utf-8'), { from: link }).css;
  }

  // need to fix the block name
  if (block) {
    blockREG = new RegExp(block.replace(/\-/g, '\\-') + '__', 'g');
  }

  DomUtils.find(function (ele) {
    if (
      ele.type === 'tag' &&
        ele.name === 'body'
    ) {
      body = ele;
      // need fix
      block && DomUtils.find(function (ele) {
        if (
          ele.type === 'tag'
        ) {
          ele.attribs && ele.attribs.class &&
            (ele.attribs.class = ele.attribs.class.replace(blockREG, '$__'));
        }
      }, [ele], true);
    }
  }, dom, true);

  contents = DomUtils.getInnerHTML(body).trim();

  return {
    css: css,
    html: contents,
    block: block
  };
}

module.exports = translate;
