import { IFunction, ISignature } from '@opencv4nodejs-gen/persistence/types';

export type EditContext = {
  currentFn: IFunction
  currentFnIdx: number
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

