import { connection } from '../persistence'
import { ipcMain } from 'electron'

let connected = false

ipcMain.on('connect', (event: any) => {
  if (connected) {
    return event.sender.send('connect', { success: true })
  }

  connection.connect()
    .then(() => {
      connected = true
      event.sender.send('connect', { success: true })
    })
    .catch((error) => {
      event.sender.send('connect', { error })
    })
})

ipcMain.on('close', (event: any) => {
  if (!connected) {
    return event.sender.send('close', { success: true })
  }

  connection.close()
    .then(() => {
      connected = false
      event.sender.send('close', { success: true })
    })
    .catch((error) => {
      event.sender.send('close', { error })
    })
})

ipcMain.on('fetchFunctionSignature', (event: any) => {

})