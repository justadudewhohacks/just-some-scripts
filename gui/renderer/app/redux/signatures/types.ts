import { Function, Signature } from '@opencv4nodejs-gen/entities';

export interface IEditFunctionContext {
  currentFn: Function
  currentFnIdx: number
}

export interface IEditFunctionSignatureContext extends IEditFunctionContext {
  currentSignature: Signature
  currentSignatureIdx: number
}

export enum ArgsArrayName {
  returnValues = 'returnValues',
  requiredArgs = 'requiredArgs',
  optionalArgs = 'optionalArgs'
}

export type CurrentlyEditing = {
  uuid?: string,
  currentSignatureIdx: number
}

export type State = {
  readonly editedFunctions: Function[]
  readonly currentlyEditing: CurrentlyEditing
}

