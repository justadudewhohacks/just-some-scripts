import { IFunction } from './../../../../persistence/types/index';

export enum ActionTypes {
  FETCHING_FUNCTION_SIGNATURE = 'FETCHING_FUNCTION_SIGNATURE',
  FETCH_FUNCTION_SIGNATURE_SUCCESS = 'FETCH_FUNCTION_SIGNATURE_SUCCESS',
  FETCH_FUNCTION_SIGNATURE_ERROR = 'FETCH_FUNCTION_SIGNATURE_ERROR',
  FETCH_FUNCTION_SIGNATURE_NOT_FOUND = 'FETCH_FUNCTION_SIGNATURE_NOT_FOUND',
  FETCH_FUNCTION_SIGNATURE_INVALID_INPUT = 'FETCH_FUNCTION_SIGNATURE_INVALID_INPUT'
}

export type Action = {
  readonly type: ActionTypes
  readonly payload: {
    readonly signature: IFunction
  }
}

export type State = {
  readonly signatures: IFunction[]
}

export type FetchFunctionSignatureArgs = {
  readonly owner: string
  readonly className: string
}

export interface ISignaturesService {
  fetchFunctionSignature: (args: FetchFunctionSignatureArgs) => Promise<IFunction>
}

