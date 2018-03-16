import { ipcRenderer } from 'electron'
import { ISignaturesService, FetchFunctionSignatureArgs } from './types';
import { ipcHandlerFactory } from '../../commons/ipcHandler.factory';
import { IFunction } from '@opencv4nodejs-gen/persistence';

export default function() : ISignaturesService {

  const fetchFunctionSignature = ipcHandlerFactory<FetchFunctionSignatureArgs, IFunction>('fetchFunctionSignature')

  return {
    fetchFunctionSignature
  }
}