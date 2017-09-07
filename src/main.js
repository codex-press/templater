import Snapdragon from 'snapdragon'


// this how it is in the content_v2
// data: { tagName: 'div', classNames: [ 'header' ] }

var template = `
  <div class="top-story">
     <a href="{{url}}">
       {{#cover}}{{/cover}}
       <div class=headers>
         <p class=headline>{{hed}}</p>
         <p>
           Foliios
           <span class=story-type>{{story_type}}</span>
         </p>
         <p class="dek">{{description}}</p>
       </div>
     </a>
   </div>
`;

var snapdragon = new Snapdragon();
var options = {}

var p = snapdragon.parser

p.set('startTag', () => {
  var match = p.match(/^<([^/][^>]*)>/);
  if (match) {
    const tagName = match[1].split(' ')[0]
    console.log('start ' + tagName)
    const node = p.position()({ type: tagName, nodes: [], attributes: [] })
    console.log('stack', p.stack.length)
    console.log('prev', p.prev())
    p.prev().pushNode(node)
    p.push(tagName, node)
  }
})

p.set('endTag', () => {
  var match = p.match(/^<\/([^>]*)>/);
  if (match) {
    const tagName = match[1].split(' ')[0]
    p.pop(tagName)
  }
})

p.set('text', () => {
  const match = p.match(/^[^<]*/)
  return match && p.position()({ type: 'text', val: match[0] })
})

var ast = p.parse(template)

console.log(JSON.stringify(ast, null, 2))


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

