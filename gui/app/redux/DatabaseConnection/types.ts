export type State = {
  readonly isConnected: boolean
}

export interface IConnectionService {
  connect: () => Promise<void>
  close: () => Promise<void>
}

