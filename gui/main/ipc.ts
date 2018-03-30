import { ipcMain } from 'electron';

import { ClassDao, connection, FunctionDao, stringifyId } from '../../persistence';
import { FetchFunctionSignatureArgs } from '../types';

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
      event.sender.send('connect', { error: error.toString() })
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
      event.sender.send('close', { error: error.toString() })
    })
})

ipcMain.on('fetchFunction', async (event: any, args: FetchFunctionSignatureArgs) => {
  try {
    const result = await FunctionDao.find(args.owner, args.className)
    event.sender.send('fetchFunction', { result: result ? stringifyId(result) : result })
  } catch (error) {
    event.sender.send('fetchFunction', { error: error.toString() })
  }
})

ipcMain.on('fetchClassNames', async (event: any) => {
  try {
    event.sender.send('fetchClassNames', { result: await ClassDao.findAllClassNames() })
  } catch (error) {
    console.log(error)
    event.sender.send('fetchClassNames', { error: error.toString() })
  }
})

ipcMain.on('fetchFunctionMetaData', async (event: any) => {
  try {
    event.sender.send('fetchFunctionMetaData', { result: await FunctionDao.findAllMetaData() })
  } catch (error) {
    event.sender.send('fetchFunctionMetaData', { error: error.toString() })
  }
})