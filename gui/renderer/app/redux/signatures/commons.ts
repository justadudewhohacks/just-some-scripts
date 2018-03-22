import { State } from './types';
import { IArgument, IFunction } from '@opencv4nodejs-gen/persistence';

export function hasFnIdPredicate(_id: string) {
  return function(fn: IFunction) {
    return fn._id === _id
  }
}

export function findArgumentByName(args: IArgument[], argName: string): [number, IArgument | null] {
  const idx = args.findIndex(arg => arg.name === argName)
  return [idx, args[idx]]
}

export function getCurrentlyEdited(state: State) {
  const { _id } = state.currentlyEditing
  if (!_id)
    return null

  const currentFnIdx = state.editedFunctions.findIndex(hasFnIdPredicate(_id))
  if (currentFnIdx === -1)
    return null

  const currentFn = state.editedFunctions[currentFnIdx]
  const currentSignature = currentFn.signatures[state.currentlyEditing.selectedSignatureIdx]
  if (!currentSignature)
    return null

  return { currentFnIdx, currentFn, currentSignature }
}