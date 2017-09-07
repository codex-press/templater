import Snapdragon from 'snapdragon'

var snapdragon = new Snapdragon();

var p = snapdragon.parser

p.set('startTag', () => {
  var match = p.match(/^<([^/][^>]*)>/);
  if (match) {
    const tagName = match[1].split(' ')[0]
    const node = p.position()({ type: tagName, nodes: [], attributes: [] })
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

p.set('templateTag', () => {
  const match = p.match(/^{([^{}]+)}/)
  return match && p.position()({ type: 'data', prop: match[1].trim() })
})

p.set('text', () => {
  const match = p.match(/^[^<{]+/)
  return match && p.position()({ type: 'text', val: match[0] })
})

// this how it is in the content_v2
// data: { tagName: 'div', classNames: [ 'header' ] }

export default string => {
  // remove 'bos' and 'eos'
  const options = { strict: true }
  const nodes = p.parse(string.trim(), options).nodes.slice(1).slice(0, -1)
  if (nodes.length > 1)
    throw new Error('Templates must have one containing HTML element')
  else
    return JSON.parse(JSON.stringify(nodes[0]))
}


