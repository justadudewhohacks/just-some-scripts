import { IFunction } from '@opencv4nodejs-gen/persistence/types';
import { FetchFunctionSignatureArgs } from '../../../../types';

export type State = {
  readonly classNames: string[]
  readonly functions: IFunction[]
}

export interface ISignaturesService {
  fetchFunction: (args: FetchFunctionSignatureArgs) => Promise<IFunction>
  fetchClassNames: () => Promise<string[]>
}

