import { ipcRenderer } from 'electron'
import { ipcHandlerFactory } from '../../commons/ipcHandler.factory';
import { IConnectionService } from './types';

export default function() : IConnectionService {

  const connect = ipcHandlerFactory<void, void>('connect')
  const close = ipcHandlerFactory<void, void>('close')

  return {
    connect,
    close
  }
}