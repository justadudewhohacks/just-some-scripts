import { ISignature, IFunction, IArgument } from '@opencv4nodejs-gen/persistence';
import { State, ArgsArrayName, EditContext } from './types';
import { getCurrentlyEdited } from './commons';
import { replaceItem } from '../immutibilityUtils';

export function reduceFunctions(
  functions: IFunction[],
  editContext: EditContext,
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
