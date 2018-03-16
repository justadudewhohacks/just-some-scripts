import { connection, FunctionDao } from '../persistence'
import { ipcMain } from 'electron'
import { FetchFunctionSignatureArgs } from './app/redux/Signatures/types';

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
    .catch((error: any) => {
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
    .catch((error: any) => {
      event.sender.send('close', { error })
    })
})

ipcMain.on('fetchFunctionSignature', async (event: any, args: FetchFunctionSignatureArgs) => {
  try {
    const result = await FunctionDao.find(args.owner, args.className)
    event.sender.send('fetchFunctionSignature', { result })
  } catch (error) {
    event.sender.send('fetchFunctionSignature', { error })
  }
})