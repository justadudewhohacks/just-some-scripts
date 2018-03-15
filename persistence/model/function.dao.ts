import { FunctionModel } from './function.model';
import { IFunction } from '../types';

function findFunctionsByOwner(owner: string): Promise<IFunction[]> {
  return FunctionModel.find({ owner }).exec()
}

export const FunctionDao = {
  findFunctionsByOwner
}
