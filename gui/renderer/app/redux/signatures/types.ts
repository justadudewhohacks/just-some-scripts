import { SignatureInstance, FunctionInstance } from '../../classes';
export interface IFunctionSelection {
  fn: FunctionInstance
  fnIdx: number
}

export interface IFunctionSignatureSelection extends IFunctionSelection {
  sig: SignatureInstance
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
  readonly functions: FunctionInstance[]
  readonly currentlyEditing: CurrentlyEditing
}

