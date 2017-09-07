'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _snapdragon = require('snapdragon');

var _snapdragon2 = _interopRequireDefault(_snapdragon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var snapdragon = new _snapdragon2.default();

var p = snapdragon.parser;

p.set('startTag', function () {
  var match = p.match(/^<([^/][^>]*)>/);
  if (match) {
    var tagName = match[1].split(' ')[0];
    var node = p.position()({ type: tagName, nodes: [], attributes: [] });
    p.prev().pushNode(node);
    p.push(tagName, node);
  }
});

p.set('endTag', function () {
  var match = p.match(/^<\/([^>]*)>/);
  if (match) {
    var tagName = match[1].split(' ')[0];
    p.pop(tagName);
  }
});

p.set('templateTag', function () {
  var match = p.match(/^{([^{}]+)}/);
  return match && p.position()({ type: 'data', prop: match[1].trim() });
});

p.set('text', function () {
  var match = p.match(/^[^<{]+/);
  return match && p.position()({ type: 'text', val: match[0] });
});

// this how it is in the content_v2
// data: { tagName: 'div', classNames: [ 'header' ] }

exports.default = function (string) {
  // remove 'bos' and 'eos'
  var options = { strict: true };
  var nodes = p.parse(string.trim(), options).nodes.slice(1).slice(0, -1);
  if (nodes.length > 1) throw new Error('Templates must have one containing HTML element');else return JSON.parse(JSON.stringify(nodes[0]));
};