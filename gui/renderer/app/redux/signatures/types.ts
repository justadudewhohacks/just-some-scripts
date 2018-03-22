import { IFunction } from '@opencv4nodejs-gen/persistence/types';

export type CurrentlyEditing = {
  _id?: string,
  selectedSignatureIdx: number
}

export type State = {
  readonly functions: IFunction[]
  readonly editedFunctions: IFunction[]
  readonly currentlyEditing: CurrentlyEditing
}

export type FetchFunctionSignatureArgs = {
  readonly owner: string
  readonly className: string
}

export interface ISignaturesService {
  fetchFunction: (args: FetchFunctionSignatureArgs) => Promise<IFunction>
}

