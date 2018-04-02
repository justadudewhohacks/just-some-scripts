import { ArgumentInstance, SignatureInstance } from '../../classes';
import { replaceItem } from '../immutibilityUtils';
import { ArgsArrayName, IFunctionSignatureSelection } from './types';
import { FunctionInstance } from '../../classes/index';

export function reduceFunctions(
  functions: FunctionInstance[],
  sel: IFunctionSignatureSelection,
  argsArrayName: ArgsArrayName,
  reduceArgsArray: (targetArray: ArgumentInstance[]) => ArgumentInstance[]
) : FunctionInstance[] {
  const updatedSignature = {
    ...sel.sig,
    [argsArrayName]: reduceArgsArray(sel.sig[argsArrayName] || [])
  }

  const updatedSignatures = replaceItem<SignatureInstance>(sel.fn.signatures, updatedSignature, sel.sigIdx)
  const updatedFunction = { ...sel.fn, signatures: updatedSignatures }

  return replaceItem<FunctionInstance>(functions, updatedFunction, sel.fnIdx)
}
