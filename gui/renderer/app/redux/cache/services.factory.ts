import { IFunction, IFunctionMetaData } from '@opencv4nodejs-gen/persistence/types';
import { ipcRenderer } from 'electron'
import { ipcHandlerFactory } from '../../commons/ipcHandler.factory';
import { FetchFunctionSignatureArgs } from '../../../../types';
import { ISignaturesService } from './types';

export default function() : ISignaturesService {

  const fetchFunction = ipcHandlerFactory<FetchFunctionSignatureArgs, IFunction>('fetchFunction')
  const fetchClassNames = ipcHandlerFactory<void, string[]>('fetchClassNames')
  const fetchFunctionMetaData = ipcHandlerFactory<void, IFunctionMetaData[]>('fetchFunctionMetaData')

  return {
    fetchFunction,
    fetchClassNames,
    fetchFunctionMetaData
  }
}