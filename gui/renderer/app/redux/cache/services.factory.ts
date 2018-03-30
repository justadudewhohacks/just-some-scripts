import { Function, IFunctionMetaData } from '@opencv4nodejs-gen/entities';

import { FetchFunctionSignatureArgs } from '../../../../types';
import { ipcHandlerFactory } from '../../commons/ipcHandler.factory';
import { ISignaturesService } from './types';

export default function() : ISignaturesService {

  const fetchFunction = ipcHandlerFactory<FetchFunctionSignatureArgs, Function>('fetchFunction')
  const fetchClassNames = ipcHandlerFactory<void, string[]>('fetchClassNames')
  const fetchFunctionMetaData = ipcHandlerFactory<void, IFunctionMetaData[]>('fetchFunctionMetaData')

  return {
    fetchFunction,
    fetchClassNames,
    fetchFunctionMetaData
  }
}