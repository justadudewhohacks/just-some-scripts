import 'mocha'
import { expect } from 'chai'
import { getCurrentlyEdited } from '../../../../app/redux/signatures/commons'
import { createAsyncFunctionWithId, createSignature, createState } from './utils'

export function commonsTests() {

  describe('getCurrentlyEdited', () => {

    it('returns null if no function edited', () => {
      const _id = 'function1'
      const state = createState(
        [],
        [],
        { _id, selectedSignatureIdx: 0 }
      )

      expect(getCurrentlyEdited(state)).to.be.null
    })

    it('returns null if no signature', () => {
      const _id = 'function1'
      const state = createState(
        [createAsyncFunctionWithId(_id, [])],
        [createAsyncFunctionWithId(_id, [])],
        { _id, selectedSignatureIdx: 0 }
      )

      expect(getCurrentlyEdited(state)).to.be.null
    })

    it('returns currently edited signature', () => {
      const _id = 'function1'
      const currentSig = createSignature([], [], [])
      const currentFn = createAsyncFunctionWithId(_id, [currentSig])
      const state = createState(
        [currentFn],
        [currentFn],
        { _id, selectedSignatureIdx: 0 }
      )

      const current = getCurrentlyEdited(state)
      expect(current).to.not.be.null;
      expect(current!.currentFnIdx).to.equal(0)
      expect(current!.currentFn).to.equal(currentFn)
      expect(current!.currentSignature).to.equal(currentSig)
    })
  })
}