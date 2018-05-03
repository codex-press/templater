import Snapdragon from 'snapdragon'

const snapdragon = new Snapdragon();
const p = snapdragon.parser

const attribute = `\\s*([\\w-]+)=("([^"]+)"|'([^']+)'|([^\\s>]+))\\s*`
const tagName = `[a-zA-Z][a-zA-Z0-9\\-]*`
const startTagRE = RegExp(`^<((${ tagName })(${ attribute })*)\\/?>`)

p.set('startTag', () => {
  var match = p.match(startTagRE)
  if (match) {
    const tag = match[1]
    const tagIndex = tag.indexOf(' ') > -1 ? tag.indexOf(' ') : tag.length
    const tagName = tag.slice(0, tagIndex)
    const attributeMatches = tag.slice(tagIndex).match(RegExp(attribute, 'g'))
    const attributes = (attributeMatches || [ ]).map(pair => {
      const match = pair.match(RegExp(attribute))
      return [ match[1], match[3] || match[4] || match[5] ]
    })
    const node = p.position()({
      type: 'node',
      tagName,
      attributes,
      nodes: [],
    })
    p.prev().pushNode(node)
    p.push(tagName, node)
  }
})

p.set('endTag', () => {
  const match = p.match(/^<\/([^>]*)>/);
  if (match) {
    const tagName = match[1].split(' ')[0]
    p.pop(tagName)
  }
})

p.set('text', () => {
  const match = p.match(/^[^<]+/)
  return match && match[0].trim() && p.position()({ content: match[0] })
})


export default function toAST(template) {
  // remove 'bos' and 'eos'
  const options = { strict: true }
  const nodes = p.parse(template.trim(), options).nodes.slice(1).slice(0, -1)
  if (nodes.length > 1)
    throw new Error('Templates must have one containing HTML element')
  else
    return JSON.parse(JSON.stringify(nodes[0]))
}


