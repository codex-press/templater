'use strict';

var _snapdragon = require('snapdragon');

var _snapdragon2 = _interopRequireDefault(_snapdragon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this how it is in the content_v2
// data: { tagName: 'div', classNames: [ 'header' ] }

var template = '\n  <div class="top-story">\n     <a href="{{url}}">\n       {{#cover}}{{/cover}}\n       <div class=headers>\n         <p class=headline>{{hed}}</p>\n         <p>\n           Foliios\n           <span class=story-type>{{story_type}}</span>\n         </p>\n         <p class="dek">{{description}}</p>\n       </div>\n     </a>\n   </div>\n';

var snapdragon = new _snapdragon2.default();
var options = {};

var p = snapdragon.parser;

p.set('startTag', function () {
  var match = p.match(/^<([^/][^>]*)>/);
  if (match) {
    var tagName = match[1].split(' ')[0];
    console.log('start ' + tagName);
    var node = p.position()({ type: tagName, nodes: [], attributes: [] });
    console.log('stack', p.stack.length);
    console.log('prev', p.prev());
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

p.set('text', function () {
  var match = p.match(/^[^<]*/);
  return match && p.position()({ type: 'text', val: match[0] });
});

var ast = p.parse(template);

console.log(JSON.stringify(ast, null, 2));

// const tree = snapdragon.compiler
//   .set('div', function () { console.log(this) })
//   .set('text', function () { console.log(this) })
//   .compile(ast)
//console.log(tree)

// var htmlparser = require("htmlparser2");
// var handler = new htmlparser.DomHandler((error, dom) => {
//   if (error) return console.log(error);

//   console.log(dom[1].children);
// })
// var parser = new htmlparser.Parser(handler);
// parser.write(template);
// parser.end();


// var Snapdragon = require('snapdragon');
// var snapdragon = new Snapdragon();
// var options = {}

// var ast = snapdragon.parser
//   .set('foo', function() {
//     var pos = this.position();
//     var match = this.match(/{{.*?}}/);
//     console.log(match && match[0]);
//     console.log(this);
//     if (match) {
//       console.log(pos(this.node(match[0])));
//       return pos({ val: match[0] });
//     }
//   })
//   .set('text', function () {
//     var pos = this.position();
//     var match = this.match(/^\w+/);
//     if (match) {
//       return pos({val: match[0]});
//     } 
//   })
//   .parse(template, options);

// console.log(ast);

// var parser = snapdragon.parser
//   .set('at', function() {
//     var pos = this.position();
//     var match = this.match(/^@/);
//     if (match) {
//       return pos({val: match[0]});
//     }
//   })
//   .set('slash', function() {
//     var pos = this.position();
//     var match = this.match(/^\//);
//     if (match) {
//       return pos({val: match[0]});
//     }
//   })
//   .set('text', function() {
//     var pos = this.position();
//     var match = this.match(/^\w+/);
//     if (match) {
//       return pos({val: match[0]});
//     }
//   })
//   .set('dot', function() {
//     var pos = this.position();
//     var match = this.match(/^\./);
//     if (match) {
//       return pos({val: match[0]});
//     }
//   })
//   .set('colon', function() {
//     var pos = this.position();
//     var match = this.match(/^:/);
//     if (match) {
//       return pos({val: match[0]});
//     }
//   })


// var ast = parser.parse('git@github.com:foo/bar.git');
// console.log(ast)