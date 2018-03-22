import { ipcRenderer } from 'electron'

export interface IIpcResponse<ResultType> {
  error?: Error
  result?: ResultType
}

export function ipcHandlerFactory<ArgsType, ResultType>(eventCode: string) {
  return async function(args?: ArgsType) {
    return new Promise<ResultType>(function(resolve, reject) {
      function onResponse (event: any, response: IIpcResponse<ResultType>) {
        ipcRenderer.removeListener(event, onResponse)
        if (response.error)
          return reject(response.error)

        return resolve(response.result)
      }
      ipcRenderer.on(eventCode, onResponse)
      ipcRenderer.send(eventCode, args)
    })
  }
}