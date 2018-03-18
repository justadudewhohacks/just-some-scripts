import { IFunction } from './../../../../persistence/types/index';

export type State = {
  readonly functions: IFunction[]
  readonly editedFunctions: IFunction[]
  readonly currentlyEditing: { _id?: string, signatureIdx?: number }
}

export type FetchFunctionSignatureArgs = {
  readonly owner: string
  readonly className: string
}

export interface ISignaturesService {
  fetchFunction: (args: FetchFunctionSignatureArgs) => Promise<IFunction>
}

