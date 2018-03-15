import { ipcRenderer } from 'electron'
import { IConnectionService } from './types'

export default function() : IConnectionService {

  async function connect() {
    return new Promise(function(resolve, reject) {
      ipcRenderer.send('connect')
      ipcRenderer.on('connect', function (event: any, arg: any) {
        ipcRenderer.removeListener('connect', this)

        if (arg.success)
          return resolve()

        return reject(arg.error)
      })
    })
  }

  async function close() {
    return new Promise(function(resolve, reject) {
      ipcRenderer.send('close')
      ipcRenderer.on('close', function (event: any, arg: any) {
        ipcRenderer.removeListener('connect', this)

        if (arg.success)
          return resolve()

        return reject(arg.error)
      })
    })
  }

  return {
    connect,
    close
  }
}