import templater from './main'
import { assert } from 'chai';

describe('HTML nodes', () => {


  it('parses simple node', () => {

    const ast = templater(`<div>Hiya</div>`)

    const expected = {
      type: "div",
      nodes: [ { type: "text", val: "Hiya" } ],
      attributes: [],
    }

    assert.deepEqual(ast, expected)
  })



  it.skip('includes attributes', () => {

    const ast = templater(`<div>Hiya</div>`)

    const expected = {
      type: "div",
      nodes: [ { type: "text", val: "Hiya" } ],
      attributes: [],
    }

    assert.deepEqual(ast, expected)
  })


})



describe('Data nodes', () => {


  it('parses simple node', () => {

    const ast = templater(`<div>{ hiya }</div>`)

    const expected = {
      type: "div",
      nodes: [ { type: "data", prop: "hiya" } ],
      attributes: [],
    }

    assert.deepEqual(ast, expected)
  })

})



describe('Errors', () => {

  it('Throws for two adjacent elements', () => {
    assert.throws(() => templater(`<div></div><div></div>`))
  })

})



