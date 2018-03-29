import { ISignature, IFunction, IArgument } from '../../../../../persistence';
import { State, ArgsArrayName, IEditFunctionSignatureContext } from './types';
import { replaceItem } from '../immutibilityUtils';

export function reduceFunctions(
  functions: IFunction[],
  editContext: IEditFunctionSignatureContext,
  argsArrayName: ArgsArrayName,
  reduceArgsArray: (targetArray: IArgument[]) => IArgument[]
) : IFunction[] {
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

  const updatedSignatures = replaceItem<ISignature>(currentFn.signatures, updatedSignature, currentSignatureIdx)
  const updatedFunction = { ...currentFn, signatures: updatedSignatures }

  return replaceItem<IFunction>(functions, updatedFunction, currentFnIdx)
}
