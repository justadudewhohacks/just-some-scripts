import { ipcRenderer } from 'electron'
import { ISignaturesService } from './types'

export default function() : ISignaturesService {

  async function fetchFunctionSignature(name: string) {
    return new Promise(function(resolve, reject) {
      function onResponse (event: any, response: any) {
        ipcRenderer.removeListener('fetchFunctionSignature', onResponse)
        if (response.success)
          return resolve(response.result)

        return reject(response.error)
      }
      ipcRenderer.on('fetchFunctionSignature', onResponse)
      ipcRenderer.send('fetchFunctionSignature', name)
    })
  }

  return {
    fetchFunctionSignature
  }
}