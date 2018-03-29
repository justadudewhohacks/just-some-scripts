import { State, IEditFunctionContext, IEditFunctionSignatureContext, ArgsArrayName } from './types';
import { IArgument, IFunction, ISignature } from '../../../../../persistence';
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

export function getCurrentlyEditedFunctionContext(state: State) : IEditFunctionContext | null {
  const { _id } = state.currentlyEditing
  if (!_id)
    return null

  const currentFnIdx = state.editedFunctions.findIndex(hasFnIdPredicate(_id))
  if (currentFnIdx === -1)
    return null

  const currentFn = state.editedFunctions[currentFnIdx]

  return { currentFn, currentFnIdx }
}

export function getCurrentlyEditedFunctionSignatureContext(state: State) : IEditFunctionSignatureContext | null {
  const currentFnCtx = getCurrentlyEditedFunctionContext(state)
  if (!currentFnCtx)
    return null

  const { currentSignatureIdx } = state.currentlyEditing

  const currentSignature = currentFnCtx.currentFn.signatures[currentSignatureIdx]
  if (!currentSignature)
    return null

  return { ...currentFnCtx, currentSignature, currentSignatureIdx }
}