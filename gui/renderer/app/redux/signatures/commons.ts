import { State, EditContext, ArgsArrayName } from './types';
import { IArgument, IFunction } from '@opencv4nodejs-gen/persistence';
import { ISignature } from '@opencv4nodejs-gen/persistence/types/index';
import { hasFnIdPredicate } from '../../commons/hasFnIdPredicate';

function hasArgumentWithName(
  args: IArgument[], 
  argName: string
): boolean {
  return findArgumentByName(args, argName)[0] !== -1
}

export function findArgumentByName(args: IArgument[], argName: string): [number, IArgument | null] {
  const idx = args.findIndex(arg => arg.name === argName)
  return [idx, args[idx]]
}

export function findArgsArrayNameByArgName(
  argsArrayNames: ArgsArrayName[], 
  argName: string, 
  signature: ISignature
): ArgsArrayName | null {
  return argsArrayNames.find(argsArrayName => hasArgumentWithName(signature[argsArrayName] || [], argName))
}

export function getCurrentlyEdited(state: State) : EditContext | null {
  const { _id } = state.currentlyEditing
  if (!_id)
    return null

  const currentFnIdx = state.editedFunctions.findIndex(hasFnIdPredicate(_id))
  if (currentFnIdx === -1)
    return null

  const currentFn = state.editedFunctions[currentFnIdx]

  const { currentSignatureIdx } = state.currentlyEditing

  const currentSignature = currentFn.signatures[currentSignatureIdx]
  if (!currentSignature)
    return null
    console.log('asd')

  return { currentFn, currentFnIdx, currentSignature, currentSignatureIdx }
}