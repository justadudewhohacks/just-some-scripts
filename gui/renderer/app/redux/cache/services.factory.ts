import { IFunctionMetaData } from '@opencv4nodejs/entities';

import { FetchFunctionSignatureArgs } from '../../../../types';
import { FunctionInstance } from '../../classes';
import { ipcHandlerFactory } from '../../commons/ipcHandler.factory';
import { ISignaturesService } from './types';

export default function() : ISignaturesService {

  const fetchFunction = ipcHandlerFactory<FetchFunctionSignatureArgs, FunctionInstance>('fetchFunction')
  const fetchClassNames = ipcHandlerFactory<void, string[]>('fetchClassNames')
  const fetchFunctionMetaData = ipcHandlerFactory<void, IFunctionMetaData[]>('fetchFunctionMetaData')

  return {
    fetchFunction,
    fetchClassNames,
    fetchFunctionMetaData
  }
}