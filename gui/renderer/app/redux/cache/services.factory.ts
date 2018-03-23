import { ipcRenderer } from 'electron'
import { ipcHandlerFactory } from '../../commons/ipcHandler.factory';
import { IFunction } from '@opencv4nodejs-gen/persistence';
import { FetchFunctionSignatureArgs } from '../../../../types';
import { ISignaturesService } from './types';

export default function() : ISignaturesService {

  const fetchFunction = ipcHandlerFactory<FetchFunctionSignatureArgs, IFunction>('fetchFunction')
  const fetchClassNames = ipcHandlerFactory<void, string[]>('fetchClassNames')

  return {
    fetchFunction,
    fetchClassNames
  }
}