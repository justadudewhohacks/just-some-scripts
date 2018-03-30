import { Argument, Function, Signature } from '@opencv4nodejs-gen/entities';

import { replaceItem } from '../immutibilityUtils';
import { ArgsArrayName, IEditFunctionSignatureContext } from './types';

export function reduceFunctions(
  functions: Function[],
  editContext: IEditFunctionSignatureContext,
  argsArrayName: ArgsArrayName,
  reduceArgsArray: (targetArray: Argument[]) => Argument[]
) : Function[] {
  const {
    currentFn,
    currentFnIdx,
    currentSignature,
    currentSignatureIdx,
  } = editContext

  const updatedSignature = {
    ...currentSignature,
    [argsArrayName]: reduceArgsArray(currentSignature[argsArrayName] || [])
  }

  const updatedSignatures = replaceItem<Signature>(currentFn.signatures, updatedSignature, currentSignatureIdx)
  const updatedFunction = { ...currentFn, signatures: updatedSignatures }

  return replaceItem<Function>(functions, updatedFunction, currentFnIdx)
}
