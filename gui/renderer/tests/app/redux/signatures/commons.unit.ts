import 'mocha'
import { expect } from 'chai'
import { getCurrentlyEdited } from '../../../../app/redux/signatures/commons'
import { createAsyncFunctionWithId, createSignature, createState } from './utils'

export function commonsTests() {

  describe('getCurrentlyEdited', () => {

    it('returns null if no function edited', () => {
      const uuid = 'function1'
      const state = createState(
        [],
        [],
        { uuid, selectedSignatureIdx: 0 }
      )

      expect(getCurrentlyEdited(state)).to.be.null
    })

    it('returns null if no signature', () => {
      const uuid = 'function1'
      const state = createState(
        [createAsyncFunctionWithId(uuid, [])],
        [createAsyncFunctionWithId(uuid, [])],
        { uuid, selectedSignatureIdx: 0 }
      )

      expect(getCurrentlyEdited(state)).to.be.null
    })

    it('returns currently edited signature', () => {
      const uuid = 'function1'
      const currentSig = createSignature([], [], [])
      const currentFn = createAsyncFunctionWithId(uuid, [currentSig])
      const state = createState(
        [currentFn],
        [currentFn],
        { uuid, selectedSignatureIdx: 0 }
      )

      const current = getCurrentlyEdited(state)
      expect(current).to.not.be.null;
      expect(current!.currentFnIdx).to.equal(0)
      expect(current!.currentFn).to.equal(currentFn)
      expect(current!.currentSignature).to.equal(currentSig)
    })
  })
}