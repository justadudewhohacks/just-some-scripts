import 'mocha'
import { expect } from 'chai';
import { assert, spy } from 'sinon';
import { reduceSignature } from '../../../../app/redux/signatures/reduceSignature';
import { createSignature, createAsyncFunctionWithId, createArgument, createState } from './utils';


export function reduceSignatureTests() {

  it('should invoke reduceTarget correctly', () => {
    const uuid = 'function1'
    const argument = createArgument('Mat', 'foo')
    const returnValues = [argument]
    const functions = [
      createAsyncFunctionWithId(uuid, [
        createSignature(returnValues, [], [])
      ])
    ]
    const state = createState(functions, functions, { uuid, selectedSignatureIdx: 0 })

    const reduceSpy = spy()

    const newState = reduceSignature(state, 'returnValues', 'foo', reduceSpy)

    expect(newState).to.not.equal(state)
    assert.calledWith(reduceSpy, returnValues, 0, argument)
  })

}