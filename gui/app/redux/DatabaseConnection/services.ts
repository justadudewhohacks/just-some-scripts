import { ipcRenderer } from 'electron'
import { IConnectionService } from './types'

export default function() : IConnectionService {

  async function connect() {
    return new Promise(function(resolve, reject) {
      function onResponse (event: any, response: any) {
        ipcRenderer.removeListener('connect', onResponse)
        if (response.success)
          return resolve()

        return reject(response.error)
      }
      ipcRenderer.on('connect', onResponse)
      ipcRenderer.send('connect')
    })
  }

  async function close() {
    return new Promise(function(resolve, reject) {
      function onResponse (event: any, response: any) {
        ipcRenderer.removeListener('close', onResponse)
        if (response.success)
          return resolve()

        return reject(response.error)
      }
      ipcRenderer.on('close', onResponse)
      ipcRenderer.send('close')
    })
  }

  return {
    connect,
    close
  }
}