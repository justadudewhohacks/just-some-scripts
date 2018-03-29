import { IFunction, IFunctionMetaData } from '../../../../../persistence/types';
import { FetchFunctionSignatureArgs } from '../../../../types';

export type State = {
  readonly classNames: string[]
  readonly functionMetaDataByOwner: Map<string, IFunctionMetaData[]>
  readonly functions: IFunction[]
}

export interface ISignaturesService {
  fetchFunction: (args: FetchFunctionSignatureArgs) => Promise<IFunction>
  fetchClassNames: () => Promise<string[]>
  fetchFunctionMetaData: () => Promise<IFunctionMetaData[]>
}

