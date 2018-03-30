import { Argument, Signature } from '@opencv4nodejs-gen/entities';

import { hasFnIdPredicate } from '../../commons/hasFnIdPredicate';
import { ArgsArrayName, IEditFunctionContext, IEditFunctionSignatureContext, State } from './types';

function hasArgumentWithName(
  args: Argument[],
  argName: string
): boolean {
  return findArgumentByName(args, argName)[0] !== -1
}

export function findArgumentByName(args: Argument[], argName: string): [number, Argument | null] {
  const idx = args.findIndex(arg => arg.name === argName)
  return [idx, args[idx]]
}

export function findArgsArrayNameByArgName(
  argsArrayNames: ArgsArrayName[],
  argName: string,
  signature: Signature
): ArgsArrayName | null {
  return argsArrayNames.find(argsArrayName => hasArgumentWithName(signature[argsArrayName] || [], argName))
}

export function getCurrentlyEditedFunctionContext(state: State) : IEditFunctionContext | null {
  const { uuid } = state.currentlyEditing
  if (!uuid)
    return null

  const currentFnIdx = state.editedFunctions.findIndex(hasFnIdPredicate(uuid))
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