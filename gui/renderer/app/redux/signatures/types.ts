import { IFunction, ISignature } from '../../../../../persistence/types';

export interface IEditFunctionContext {
  currentFn: IFunction
  currentFnIdx: number
}

export interface IEditFunctionSignatureContext extends IEditFunctionContext {
  currentSignature: ISignature
  currentSignatureIdx: number
}

export enum ArgsArrayName {
  returnValues = 'returnValues',
  requiredArgs = 'requiredArgs',
  optionalArgs = 'optionalArgs'
}

export type CurrentlyEditing = {
  _id?: string,
  currentSignatureIdx: number
}

export type State = {
  readonly editedFunctions: IFunction[]
  readonly currentlyEditing: CurrentlyEditing
}

