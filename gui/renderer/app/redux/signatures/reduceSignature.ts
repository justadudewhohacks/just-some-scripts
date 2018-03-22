import { ISignature, IFunction, IArgument } from '@opencv4nodejs-gen/persistence';
import { State } from './types';
import { findArgumentByName, getCurrentlyEdited } from './commons';
import { replaceItem } from '../immutibilityUtils';

export function reduceSignature(
  state: State,
  target: string,
  argName: string,
  reduceTarget: (targetArray: IArgument[], idx: number, arg: IArgument) => IArgument[]
): State {

  const currentlyEdited = getCurrentlyEdited(state)

  if (!currentlyEdited)
    return state

  const { currentFnIdx, currentFn, currentSignature } = currentlyEdited

  const [idx, arg] = findArgumentByName(currentSignature[target] || [], argName)

  if (idx === -1 || !arg)
    return state

  const updatedSignature = {
    ...currentSignature,
    [target]: reduceTarget(currentSignature[target], idx, arg)
  }
  const updatedSignatures = replaceItem<ISignature>(currentFn.signatures, updatedSignature, state.currentlyEditing.selectedSignatureIdx)
  const updatedFunction = { ...currentFn, signatures: updatedSignatures }

  return {
    ...state,
    editedFunctions: replaceItem<IFunction>(state.editedFunctions, updatedFunction, currentFnIdx)
   }
}