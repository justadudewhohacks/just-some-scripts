import { Argument, Function, Signature } from '@opencv4nodejs-gen/entities';

import { replaceItem } from '../immutibilityUtils';
import { ArgsArrayName, IFunctionSignatureSelection } from './types';

export function reduceFunctions(
  functions: Function[],
  sel: IFunctionSignatureSelection,
  argsArrayName: ArgsArrayName,
  reduceArgsArray: (targetArray: Argument[]) => Argument[]
) : Function[] {
  const updatedSignature = {
    ...sel.sig,
    [argsArrayName]: reduceArgsArray(sel.sig[argsArrayName] || [])
  }

  const updatedSignatures = replaceItem<Signature>(sel.fn.signatures, updatedSignature, sel.sigIdx)
  const updatedFunction = { ...sel.fn, signatures: updatedSignatures }

  return replaceItem<Function>(functions, updatedFunction, sel.fnIdx)
}
