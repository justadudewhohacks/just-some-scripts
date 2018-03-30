import { Function, Signature } from '@opencv4nodejs-gen/entities';

export interface IFunctionSelection {
  fn: Function
  fnIdx: number
}

export interface IFunctionSignatureSelection extends IFunctionSelection {
  sig: Signature
  sigIdx: number
}

export enum ArgsArrayName {
  returnValues = 'returnValues',
  requiredArgs = 'requiredArgs',
  optionalArgs = 'optionalArgs'
}

export type CurrentlyEditing = {
  fnUuid?: string,
  sigUuid?: string
}

export type State = {
  readonly functions: Function[]
  readonly currentlyEditing: CurrentlyEditing
}

