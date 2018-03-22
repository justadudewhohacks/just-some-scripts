import { ipcMain } from 'electron'
import { connection, FunctionDao, stringifyId } from '../../persistence'
import { FetchFunctionSignatureArgs } from '../renderer/app/redux/Signatures/types'

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

ipcMain.on('fetchFunction', async (event: any, args: FetchFunctionSignatureArgs) => {
  try {
    const result = await FunctionDao.find(args.owner, args.className)
    event.sender.send('fetchFunction', { result: result ? stringifyId(result) : result })
  } catch (error) {
    event.sender.send('fetchFunction', { error })
  }
})