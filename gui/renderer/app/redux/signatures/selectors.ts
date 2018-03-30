import { IFunctionSelection, IFunctionSignatureSelection, State } from './types';

export function selectFunction(state: State, fnUuid: string | null): IFunctionSelection | null {
  if (!fnUuid)
    return null

  const fnIdx = state.functions.findIndex(f => f.uuid === fnUuid)
  return fnIdx === -1 ? null : { fnIdx, fn: state.functions[fnIdx] }
}

export function selectCurrentlyEditedFunction(state: State): IFunctionSelection | null {
  return selectFunction(state, state.currentlyEditing.fnUuid)
}

export function selectFunctionSignature(state: State, sigUuid: string | null): IFunctionSignatureSelection | null {
  const fnSel = selectCurrentlyEditedFunction(state)
  if (!fnSel)
    return null

  const sigIdx = fnSel.fn.signatures.findIndex(sig => sig.uuid === sigUuid)
  return sigIdx === -1 ? null : { ...fnSel, sigIdx, sig: fnSel.fn.signatures[sigIdx] }
}

export function selectCurrentlyEditedFunctionSignature(state: State): IFunctionSignatureSelection | null {
  return selectFunctionSignature(state, state.currentlyEditing.sigUuid)
}