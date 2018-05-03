import templater from './index'
import { assert } from 'chai';

describe('HTML nodes', () => {


  it('parses simple node', () => {

    const ast = templater(`<div>Foobar</div>`)

    const expected = {
      type: 'node',
      tagName: 'div',
      nodes: [ { type: 'text', content: 'Foobar' } ],
      attributes: [],
    }

    assert.deepEqual(ast, expected)
  })


  it('does not parse invalid tags', () => {
    assert.throws(() => templater(`<div><>Hiya</div>`))
  })


  it('includes attributes', () => {

    const ast = templater(`<div class=byline data-foo=bar>Hiya</div>`)

    const expected = {
      type: 'node',
      tagName: 'div',
      nodes: [ { type: 'text', content: 'Hiya' } ],
      attributes: [
        [ 'class', 'byline' ],
        [ 'data-foo', 'bar' ],
      ],
    }

    assert.deepEqual(ast, expected)
  })


  it('includes attributes with double quotes', () => {

    const ast = templater(`<div class="byline">Hiya</div>`)

    const expected = {
      type: 'node',
      tagName: 'div',
      nodes: [ { type: 'text', content: 'Hiya' } ],
      attributes: [
        [ 'class', 'byline' ]
      ],
    }

    assert.deepEqual(ast, expected)
  })


  it('includes attributes with single quotes', () => {

    const ast = templater(`<div class='byline'>Hiya</div>`)

    const expected = {
      type: 'node',
      tagName: 'div',
      nodes: [ { type: 'text', content: 'Hiya' } ],
      attributes: [
        [ 'class', 'byline' ]
      ],
    }

    assert.deepEqual(ast, expected)
  })


  it('includes attributes with spaces', () => {

    const ast = templater(`<div style="background: black;">Hiya</div>`)

    const expected = {
      type: 'node',
      tagName: 'div',
      nodes: [ { type: 'text', content: 'Hiya' } ],
      attributes: [
        [ 'style', 'background: black;' ]
      ],
    }

    assert.deepEqual(ast, expected)
  })


  it('includes attributes with closing tags inside', () => {

    const ast = templater(`<div data-tricky="</div>">Hiya</div>`)

    const expected = {
      type: 'node',
      tagName: 'div',
      nodes: [ { type: 'text', content: 'Hiya' } ],
      attributes: [
        [ 'data-tricky', '</div>' ]
      ],
    }

    assert.deepEqual(ast, expected)
  })


  it('parses nested template', () => {

    const ast = templater(`
      <div class="top-story">
        <a href=$url>
          <p class=hed slot=hed></p>
          <p slot=description></p>
        </a>
      </div>`
    )

    const expected = {
      type: 'node',
      tagName: 'div',
      attributes: [ [ 'class', 'top-story' ] ],
      nodes: [ {
        type: 'node',
        tagName: 'a',
        attributes: [ [ 'href', '$url' ] ],
        nodes: [
          {
            type: 'node',
            tagName: 'p',
            attributes: [ [ 'class', 'hed' ], [ 'slot', 'hed' ] ],
            nodes: [ ]
          },
          {
            type: 'node',
            tagName: 'p',
            attributes: [ [ 'slot', 'description' ] ],
            nodes: [ ]
          },
        ]
      } ],
    }

    assert.deepEqual(ast, expected)
  })


  it('Throws for two adjacent elements', () => {
    assert.throws(() => templater(`<div></div><div></div>`))
  })

})



