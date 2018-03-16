import { IFunction } from './../../../../persistence/types/index';

export enum ActionTypes {
  FETCHING_FUNCTION_SIGNATURE = 'FETCHING_FUNCTION_SIGNATURE',
  FETCH_FUNCTION_SIGNATURE_SUCCESS = 'FETCH_FUNCTION_SIGNATURE_SUCCESS',
  FETCH_FUNCTION_SIGNATURE_ERROR = 'FETCH_FUNCTION_SIGNATURE_ERROR'
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

export interface ISignaturesService {
  fetchFunctionSignature: (name: string) => Promise<any>
}

