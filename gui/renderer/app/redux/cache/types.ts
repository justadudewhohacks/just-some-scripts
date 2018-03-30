import { Function, IFunctionMetaData } from '@opencv4nodejs-gen/entities';

import { FetchFunctionSignatureArgs } from '../../../../types';

export type State = {
  readonly classNames: string[]
  readonly functionMetaDataByOwner: Map<string, IFunctionMetaData[]>
  readonly functions: Function[]
}

export interface ISignaturesService {
  fetchFunction: (args: FetchFunctionSignatureArgs) => Promise<Function>
  fetchClassNames: () => Promise<string[]>
  fetchFunctionMetaData: () => Promise<IFunctionMetaData[]>
}

