export enum ActionTypes {
  CONNECTING_TO_DATABASE = 'CONNECTING_TO_DATABASE',
  CONNECT_TO_DATABASE_SUCCESS = 'CONNECT_TO_DATABASE_SUCCESS',
  CONNECT_TO_DATABASE_ERROR = 'CONNECT_TO_DATABASE_ERROR'
}

export type Action = {
  readonly type: ActionTypes
  readonly payload: {
    readonly message: string
  }
}

export type State = {
  readonly isConnected: boolean
}

export interface IConnectionService {
  connect: () => Promise<void>
  close: () => Promise<void>
}

