import { IFunctionEntity, IFunctionMetaData } from '@opencv4nodejs/entities';

import { FetchFunctionSignatureArgs } from '../../../../types';
import { FunctionInstance } from '../../classes';

export type State = {
  readonly classNames: string[]
  readonly functionMetaDataByOwner: Map<string, IFunctionMetaData[]>
  readonly functions: FunctionInstance[]
}

export interface ISignaturesService {
  fetchFunction: (args: FetchFunctionSignatureArgs) => Promise<IFunctionEntity>
  fetchClassNames: () => Promise<string[]>
  fetchFunctionMetaData: () => Promise<IFunctionMetaData[]>
}

