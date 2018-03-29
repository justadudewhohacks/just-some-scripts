export interface IAction<T> {
  readonly type: string
  readonly payload: T
}

export interface IActionCreator<T> {
  type: string
  (payload?: T): IAction<T>
}

export function actionCreator<T>(type: string): IActionCreator<T> {
  return Object.assign(
    (payload?: T) => ({ type, payload }),
    { type }
  )
}

export function isType<T>(action: IAction<any>, actionCreator: IActionCreator<T>): action is IAction<T> {
  return action.type === actionCreator.type;
}
