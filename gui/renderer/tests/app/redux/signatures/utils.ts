import { ISignature, IFunction } from '@opencv4nodejs-gen/persistence/index';
import { IArgument, IOptionalArgument } from '../../../../../persistence/types/index';
import { CurrentlyEditing } from '../../../../app/redux/signatures/types';
import { State } from 'app/redux/Signatures/types';

export function createArgument(type: string, name: string): IArgument {
  return {
    type,
    name
  }
}

export function createSignature(
  returnValues: IArgument[],
  requiredArgs: IArgument[],
  optionalArgs: IOptionalArgument[]
): ISignature {
  return {
    returnValues,
    requiredArgs,
    optionalArgs
  }
}

export function createAsyncFunctionWithId(_id: string, signatures: ISignature[]): IFunction {
  return {
    cvModule: 'foo',
    owner: 'foo',
    fnName: 'foo',
    hasAsync: true,
    _id,
    signatures
  }
}

export function createState(functions: IFunction[], editedFunctions: IFunction[], currentlyEditing: CurrentlyEditing): State {
  return {
    functions,
    editedFunctions,
    currentlyEditing
  }
}